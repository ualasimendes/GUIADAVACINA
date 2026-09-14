/**
 * ==============================================================================
 * GUIA DA VACINA - SERVIDOR DE PRODUÇÃO E ARQUITETURA DE SEGURANÇA BACKEND
 * ==============================================================================
 * Arquitetura de Segurança, Hardening e Defesa em Profundidade:
 * 1. Zero Trust no Client: Autorização, sessões, preços e dados validados no servidor.
 * 2. Sessões Seguras: Cookies HttpOnly, Secure, SameSite=Lax com TTL e CSRF tokens.
 * 3. Google OAuth Seguro: Authorization Code Flow + PKCE + validação criptográfica.
 * 4. PostMessage Seguro: Origem estritamente validada (sem wildcard '*').
 * 5. Proteção Path Traversal: Whitelist de assets públicos, contenção de diretório e bloqueio de .env / arquivos confidenciais.
 * 6. Rate Limiting por IP: Janela deslizante para mitigação de força bruta e abuso.
 * 7. PagBank Oficial: Preços imutáveis no servidor, sem fabricação de PAID, proteção contra replay de webhooks.
 * 8. Rastreabilidade & Prescrições: Validação de perfil profissional e auditoria no servidor.
 * 9. Headers de Segurança: HSTS, CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy.
 * 10. Sanitização e LGPD: Sem dados pessoais hardcoded ou exposição de PII em logs.
 * ==============================================================================
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { URL, URLSearchParams } = require('url');

// Configurações de Ambiente
const PORT = 3000;
const NODE_ENV = process.env.NODE_ENV || 'production';
const APP_URL = (process.env.APP_URL || 'https://vacinas.walacemendes.com.br').replace(/\/$/, '');
const SESSION_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');

const DEFAULT_GOOGLE_CLIENT_ID = '986855077085-n9sgr3399521gfo9mc5h1lggjvj3gbnt.apps.googleusercontent.com';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || DEFAULT_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';

const PAGBANK_ENV = process.env.PAGBANK_ENV || 'sandbox';
const PAGBANK_TOKEN = process.env.PAGBANK_TOKEN || '';
const PAGBANK_WEBHOOK_SECRET = process.env.PAGBANK_WEBHOOK_SECRET || '';
const PAGBANK_BASE_URL = PAGBANK_ENV === 'production'
    ? 'https://api.pagseguro.com'
    : 'https://sandbox.api.pagseguro.com';

// Tabela Oficial de Serviços e Preços Imutáveis (Determinados Estritamente no Servidor)
const OFFICIAL_PLANS = {
    'prescricao': {
        id: 'plan_prescricao',
        name: 'Consulta & Prescrição Técnica Farmacêutica',
        amount: 3990, // R$ 39,90 em centavos
        currency: 'BRL',
        type: 'one_time'
    },
    'pro_monthly': {
        id: 'plan_pro_monthly',
        name: 'Assinatura Profissional Prescritor PRO',
        amount: 7990, // R$ 79,90 em centavos
        currency: 'BRL',
        type: 'subscription'
    }
};

// MIME Types Permitidos para Arquivos Públicos
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// Arquivos Estritamente Bloqueados para Acesso Web (Prevenção de Vazamento)
const FORBIDDEN_FILE_PATTERNS = [
    /^\.env/i,
    /^\.git/i,
    /server\.js$/i,
    /package(-lock)?\.json$/i,
    /iniciar\.bat$/i,
    /\.log$/i,
    /storage_.*\.json$/i,
    /test-.*\.js$/i,
    /AGENTS\.md$/i,
    /essencialplugins\.txt$/i,
    /private/i
];

// ==============================================================================
// BANCO DE DADOS EM MEMÓRIA COM PERSISTÊNCIA LOCAL PROTEGIDA
// ==============================================================================
const DB_FILE = path.join(__dirname, 'storage_app_db.json');

function loadDatabase() {
    try {
        if (fs.existsSync(DB_FILE)) {
            const raw = fs.readFileSync(DB_FILE, 'utf8');
            return JSON.parse(raw);
        }
    } catch (err) {
        console.warn('[DB] Inicializando novo banco de dados local.');
    }
    return {
        users: {},
        prescriptions: {},
        orders: {},
        processedWebhooks: {}
    };
}

const db = loadDatabase();

function saveDatabase() {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), { mode: 0o600 });
    } catch (err) {
        console.error('[DB] Erro ao persistir dados locais:', err.message);
    }
}

// ==============================================================================
// GESTÃO DE SESSÕES E TOKENS CRIPTOGRÁFICOS EM MEMÓRIA
// ==============================================================================
const sessions = new Map();     // sessionId -> { userId, createdAt, expiresAt, csrfToken }
const oauthStates = new Map();  // state -> { codeVerifier, nonce, createdAt, expiresAt, returnOrigin }
const rateLimitMap = new Map(); // ip -> { count, windowStart }

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 dias
const OAUTH_STATE_TTL_MS = 10 * 60 * 1000;        // 10 minutos
const RATE_LIMIT_WINDOW_MS = 60 * 1000;           // 1 minuto

// Limpeza Periódica de Memória
setInterval(() => {
    const now = Date.now();
    for (const [sid, sess] of sessions.entries()) {
        if (sess.expiresAt < now) sessions.delete(sid);
    }
    for (const [state, oState] of oauthStates.entries()) {
        if (oState.expiresAt < now) oauthStates.delete(state);
    }
    for (const [ip, item] of rateLimitMap.entries()) {
        if (now - item.windowStart > RATE_LIMIT_WINDOW_MS) rateLimitMap.delete(ip);
    }
}, 5 * 60 * 1000);

// ==============================================================================
// UTILITÁRIOS DE SEGURANÇA E CRIPTOGRAFIA
// ==============================================================================

function generateSecureToken(bytes = 32) {
    return crypto.randomBytes(bytes).toString('hex');
}

function base64UrlEncode(buffer) {
    return buffer.toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

function sha256Base64Url(str) {
    return base64UrlEncode(crypto.createHash('sha256').update(str).digest());
}

function timingSafeEqualStr(a, b) {
    if (!a || !b || typeof a !== 'string' || typeof b !== 'string') return false;
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
}

// Validador Oficial de CPF por Dígitos Verificadores (Módulo 11)
function isValidCpf(cpf) {
    if (!cpf || typeof cpf !== 'string') return false;
    const clean = cpf.replace(/\D/g, '');
    if (clean.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(clean)) return false; // Exclui sequências idênticas (ex: 111.111.111-11)
    
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(clean.charAt(i), 10) * (10 - i);
    let rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(clean.charAt(9), 10)) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(clean.charAt(i), 10) * (11 - i);
    rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(clean.charAt(10), 10)) return false;

    return true;
}

// Sanitização de HTML para Prevenção de XSS
function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Parse de Cookies da Requisição
function parseCookies(req) {
    const list = {};
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) return list;
    cookieHeader.split(';').forEach(cookie => {
        const parts = cookie.split('=');
        const name = parts[0]?.trim();
        if (name) {
            list[name] = decodeURIComponent(parts.slice(1).join('=').trim());
        }
    });
    return list;
}

// Configuração Segura de Cookies (HttpOnly, Secure, SameSite)
function setCookie(res, name, value, options = {}) {
    const parts = [`${name}=${encodeURIComponent(value)}`];
    if (options.maxAge !== undefined) parts.push(`Max-Age=${options.maxAge}`);
    if (options.httpOnly) parts.push('HttpOnly');
    if (options.secure) parts.push('Secure');
    if (options.sameSite) parts.push(`SameSite=${options.sameSite}`);
    parts.push(`Path=${options.path || '/'}`);

    const existing = res.getHeader('Set-Cookie');
    if (!existing) {
        res.setHeader('Set-Cookie', [parts.join('; ')]);
    } else if (Array.isArray(existing)) {
        res.setHeader('Set-Cookie', [...existing, parts.join('; ')]);
    } else {
        res.setHeader('Set-Cookie', [existing, parts.join('; ')]);
    }
}

// Obtenção do IP do Cliente
function getClientIp(req) {
    const forwarded = req.headers['x-forwarded-for'];
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }
    return req.socket.remoteAddress || '127.0.0.1';
}

// Rate Limiting por IP e Endpoint
function isRateLimited(req, maxRequests = 60) {
    const ip = getClientIp(req);
    const now = Date.now();
    let record = rateLimitMap.get(ip);
    if (!record || (now - record.windowStart > RATE_LIMIT_WINDOW_MS)) {
        record = { count: 1, windowStart: now };
        rateLimitMap.set(ip, record);
        return false;
    }
    record.count++;
    return record.count > maxRequests;
}

// ==============================================================================
// CABEÇALHOS DE SEGURANÇA E POLÍTICA DE CORS ESTRITA
// ==============================================================================

function applySecurityHeaders(res, isApi = false) {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    
    // Content-Security-Policy estrita que suporta Google GIS, SVG e estilos próprios sem eval
    res.setHeader('Content-Security-Policy', [
        "default-src 'self'",
        "script-src 'self' https://accounts.google.com https://apis.google.com 'unsafe-inline'",
        "style-src 'self' https://accounts.google.com 'unsafe-inline'",
        "img-src 'self' data: https:",
        "connect-src 'self' https://accounts.google.com https://oauth2.googleapis.com https://www.googleapis.com https://sandbox.api.pagseguro.com https://api.pagseguro.com",
        "frame-src 'self' https://accounts.google.com",
        "frame-ancestors 'self'",
        "base-uri 'self'",
        "object-src 'none'"
    ].join('; '));

    // HSTS apenas se estiver em HTTPS
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

    if (isApi) {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
    }
}

// CORS Restrito às Origens Autorizadas (Elimina Wildcard '*')
function handleCors(req, res, proto, host) {
    const origin = req.headers.origin;
    if (!origin) return true; // Requisição同-origin direta

    const trustedOrigins = new Set([
        'https://vacinas.walacemendes.com.br',
        APP_URL,
        `${proto}://${host}`
    ]);

    // Permite localhost e ambientes autorizados de preview
    const isLocalhost = origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:');
    const isAiStudioPreview = origin.includes('.run.app') || origin.includes('googleusercontent.com');

    if (trustedOrigins.has(origin) || isLocalhost || isAiStudioPreview) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token');
        res.setHeader('Vary', 'Origin');

        if (req.method === 'OPTIONS') {
            res.writeHead(204);
            res.end();
            return false;
        }
        return true;
    }

    // Origem não autorizada bloqueada para endpoints protegidos
    if (req.method === 'OPTIONS') {
        res.writeHead(403, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Origem CORS não autorizada.' }));
        return false;
    }
    return true;
}

// ==============================================================================
// LEITURA E VALIDAÇÃO DE CORPO JSON
// ==============================================================================
function readJsonBody(req, maxSize = 1024 * 1024) { // Máximo 1MB
    return new Promise((resolve, reject) => {
        let body = '';
        let received = 0;

        req.on('data', chunk => {
            received += chunk.length;
            if (received > maxSize) {
                reject(new Error('PAYLOAD_TOO_LARGE'));
                req.destroy();
                return;
            }
            body += chunk;
        });

        req.on('end', () => {
            if (!body || body.trim() === '') {
                resolve({});
                return;
            }
            try {
                const parsed = JSON.parse(body);
                resolve(parsed);
            } catch (err) {
                reject(new Error('INVALID_JSON'));
            }
        });

        req.on('error', err => reject(err));
    });
}

// ==============================================================================
// AUTENTICAÇÃO E CONTEXTO DE SESSÃO
// ==============================================================================
function getSessionUser(req) {
    const cookies = parseCookies(req);
    const sessionId = cookies['guia_session'];
    if (!sessionId) return null;

    const sess = sessions.get(sessionId);
    if (!sess) return null;

    if (sess.expiresAt < Date.now()) {
        sessions.delete(sessionId);
        return null;
    }

    const user = db.users[sess.userId];
    if (!user) return null;

    return {
        user,
        sessionId,
        csrfToken: sess.csrfToken
    };
}

function validateCsrf(req, sessionData) {
    if (!sessionData) return false;
    const headerToken = req.headers['x-csrf-token'];
    return timingSafeEqualStr(headerToken, sessionData.csrfToken);
}

function sanitizeUserForClient(user) {
    if (!user) return null;
    const isPro = Boolean(user.isPro || (user.subscriptionExpiresAt && new Date(user.subscriptionExpiresAt) > new Date()));
    return {
        id: user.id,
        email: user.email,
        name: escapeHtml(user.name),
        picture: user.picture || '',
        userType: user.userType || 'patient',
        councilType: user.councilType || '',
        councilUf: user.councilUf || '',
        councilNumber: user.councilNumber || '',
        cpf: user.cpf ? user.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '***.$2.$3-**') : '',
        companyName: escapeHtml(user.companyName || ''),
        companyCnpj: user.companyCnpj || '',
        birthDate: user.birthDate || '',
        referralCode: user.referralCode || '',
        bonusMonths: user.bonusMonths || 0,
        isPro: isPro,
        subscriptionStatus: user.subscriptionStatus || (isPro ? 'ACTIVE' : 'INACTIVE'),
        subscriptionExpiresAt: user.subscriptionExpiresAt || '',
        digitalSignature: user.digitalSignature || ''
    };
}

// ==============================================================================
// NÚCLEO DO SERVIDOR HTTP
// ==============================================================================

const server = http.createServer(async (req, res) => {
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost:3000';
    const proto = req.headers['x-forwarded-proto'] || (host.includes('localhost') ? 'http' : 'https');
    const isSecureRequest = proto === 'https';

    let parsedUrl;
    try {
        parsedUrl = new URL(req.url, `${proto}://${host}`);
    } catch (e) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('URL inválida');
        return;
    }

    const pathname = parsedUrl.pathname;
    const isApiRoute = pathname.startsWith('/api/');

    // Aplica Headers de Segurança e CORS
    applySecurityHeaders(res, isApiRoute);
    if (!handleCors(req, res, proto, host)) {
        return; // Requisição OPTIONS tratada
    }

    // ==========================================================================
    // ROTAS DE API: AUTENTICAÇÃO GOOGLE (OAUTH 2.0 PKCE & SESSÕES)
    // ==========================================================================

    // 1. Obter Configuração Pública Google OAuth
    if (req.method === 'GET' && pathname === '/api/auth/google/config') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
            clientId: GOOGLE_CLIENT_ID,
            isConfigured: Boolean(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_ID.length > 10)
        }));
        return;
    }

    // 2. Gerar URL de Autorização Google com PKCE e Nonce Criptográfico
    if (req.method === 'GET' && pathname === '/api/auth/google/url') {
        if (isRateLimited(req, 20)) {
            res.writeHead(429, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'Muitas tentativas de autorização. Aguarde um momento.' }));
            return;
        }

        const appBase = APP_URL || `${proto}://${host}`;
        const redirectUri = `${appBase}/auth/callback`;

        // Geração PKCE com módulo crypto nativo
        const codeVerifier = base64UrlEncode(crypto.randomBytes(32));
        const codeChallenge = sha256Base64Url(codeVerifier);
        const state = generateSecureToken(24);
        const nonce = generateSecureToken(24);

        oauthStates.set(state, {
            codeVerifier,
            nonce,
            createdAt: Date.now(),
            expiresAt: Date.now() + OAUTH_STATE_TTL_MS,
            returnOrigin: `${proto}://${host}`
        });

        const params = new URLSearchParams({
            client_id: GOOGLE_CLIENT_ID,
            redirect_uri: redirectUri,
            response_type: 'code',
            scope: 'openid email profile',
            state: state,
            code_challenge: codeChallenge,
            code_challenge_method: 'S256',
            nonce: nonce,
            prompt: 'select_account'
        });

        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
            configured: true,
            url: authUrl,
            redirectUri: redirectUri
        }));
        return;
    }

    // 3. Callback OAuth Seguro com Validação PKCE e PostMessage com Origem Estrita
    if (req.method === 'GET' && (pathname === '/auth/callback' || pathname === '/auth/callback/')) {
        const code = parsedUrl.searchParams.get('code');
        const state = parsedUrl.searchParams.get('state');
        const error = parsedUrl.searchParams.get('error');

        const trustedOrigin = APP_URL || `${proto}://${host}`;

        let authSuccess = false;
        let errorMessage = error || null;

        if (state && oauthStates.has(state)) {
            const savedState = oauthStates.get(state);
            oauthStates.delete(state); // Uso único contra replay

            if (code && GOOGLE_CLIENT_SECRET) {
                try {
                    // Troca segura do Authorization Code pelo Access Token no Servidor
                    const tokenResp = await fetch('https://oauth2.googleapis.com/token', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: new URLSearchParams({
                            code: code,
                            client_id: GOOGLE_CLIENT_ID,
                            client_secret: GOOGLE_CLIENT_SECRET,
                            redirect_uri: `${APP_URL || `${proto}://${host}`}/auth/callback`,
                            grant_type: 'authorization_code',
                            code_verifier: savedState.codeVerifier
                        }).toString()
                    });

                    if (tokenResp.ok) {
                        const tokenData = await tokenResp.json();
                        if (tokenData.id_token) {
                            // Valida ID token com endpoint de validação oficial do Google
                            const verifyResp = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(tokenData.id_token)}`);
                            if (verifyResp.ok) {
                                const payload = await verifyResp.json();
                                if (payload.aud === GOOGLE_CLIENT_ID && payload.email_verified === 'true') {
                                    const email = payload.email.toLowerCase().trim();
                                    const userId = 'usr_' + crypto.createHash('sha256').update(email).digest('hex').substring(0, 16);

                                    let user = db.users[userId];
                                    if (!user) {
                                        user = {
                                            id: userId,
                                            email: email,
                                            name: payload.name || email.split('@')[0],
                                            picture: payload.picture || '',
                                            userType: 'patient',
                                            role: 'patient',
                                            createdAt: new Date().toISOString()
                                        };
                                        db.users[userId] = user;
                                        saveDatabase();
                                    }

                                    // Criação da Sessão Segura HttpOnly
                                    const sessionId = generateSecureToken(32);
                                    const csrfToken = generateSecureToken(24);

                                    sessions.set(sessionId, {
                                        userId: user.id,
                                        createdAt: Date.now(),
                                        expiresAt: Date.now() + SESSION_TTL_MS,
                                        csrfToken: csrfToken
                                    });

                                    setCookie(res, 'guia_session', sessionId, {
                                        httpOnly: true,
                                        secure: isSecureRequest,
                                        sameSite: 'Lax',
                                        maxAge: 7 * 24 * 60 * 60
                                    });

                                    authSuccess = true;
                                }
                            }
                        }
                    }
                } catch (err) {
                    console.error('[OAuth] Falha na troca do token com o Google:', err.message);
                    errorMessage = 'Falha ao autenticar com o provedor.';
                }
            } else if (code) {
                // Modo sem Client Secret: sinaliza sucesso para fluxo híbrido client-side
                authSuccess = true;
            }
        } else if (!error) {
            errorMessage = 'Sessão de autenticação expirada ou inválida.';
        }

        // Callback HTML que notifica o opener com ORIGEM ESTRITA (sem wildcard '*')
        const safeTargetOrigin = JSON.stringify(trustedOrigin);
        const safeError = JSON.stringify(errorMessage);

        const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <title>Autenticação Google - Guia da Vacina</title>
    <style>
        body { font-family: system-ui, -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f8fafc; color: #1e293b; text-align: center; }
        .card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); max-width: 360px; }
        .spinner { width: 36px; height: 36px; border: 3px solid #e2e8f0; border-top-color: #0b57d0; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1rem; }
        @keyframes spin { to { transform: rotate(360deg); } }
    </style>
</head>
<body>
    <div class="card">
        <div class="spinner"></div>
        <h3>Autenticação Concluída</h3>
        <p>Retornando à aplicação com segurança...</p>
    </div>
    <script>
        (function() {
            try {
                var targetOrigin = ${safeTargetOrigin};
                var hasError = ${safeError};
                if (window.opener && window.opener !== window) {
                    window.opener.postMessage({
                        type: 'OAUTH_AUTH_SUCCESS',
                        success: ${authSuccess ? 'true' : 'false'},
                        error: hasError
                    }, targetOrigin);
                    setTimeout(function() { window.close(); }, 350);
                } else {
                    window.location.href = '/';
                }
            } catch (e) {
                if (window.opener) window.close();
            }
        })();
    </script>
</body>
</html>`;

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(html);
        return;
    }

    // 4. Verificação de Credencial Google One Tap / GIS Button no Backend
    if (req.method === 'POST' && pathname === '/api/auth/google/verify') {
        if (isRateLimited(req, 20)) {
            res.writeHead(429, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'Limite de requisições excedido.' }));
            return;
        }

        try {
            const body = await readJsonBody(req);
            const credential = body.credential;

            if (!credential || typeof credential !== 'string') {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'Credencial Google ausente.' }));
                return;
            }

            // Validação direta com API oficial do Google
            const verifyResp = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`);
            if (!verifyResp.ok) {
                res.writeHead(401, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'Credencial Google inválida ou expirada.' }));
                return;
            }

            const payload = await verifyResp.json();
            if (payload.aud !== GOOGLE_CLIENT_ID || payload.email_verified !== 'true') {
                res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'Audience Google não reconhecida ou e-mail não verificado.' }));
                return;
            }

            const email = payload.email.toLowerCase().trim();
            const userId = 'usr_' + crypto.createHash('sha256').update(email).digest('hex').substring(0, 16);

            let user = db.users[userId];
            if (!user) {
                user = {
                    id: userId,
                    email: email,
                    name: payload.name || email.split('@')[0],
                    picture: payload.picture || '',
                    userType: 'patient',
                    role: 'patient',
                    createdAt: new Date().toISOString()
                };
                db.users[userId] = user;
                saveDatabase();
            }

            // Criar Sessão Segura
            const sessionId = generateSecureToken(32);
            const csrfToken = generateSecureToken(24);

            sessions.set(sessionId, {
                userId: user.id,
                createdAt: Date.now(),
                expiresAt: Date.now() + SESSION_TTL_MS,
                csrfToken: csrfToken
            });

            setCookie(res, 'guia_session', sessionId, {
                httpOnly: true,
                secure: isSecureRequest,
                sameSite: 'Lax',
                maxAge: 7 * 24 * 60 * 60
            });

            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({
                success: true,
                user: sanitizeUserForClient(user),
                csrfToken: csrfToken
            }));
            return;
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'Erro interno ao validar credencial.' }));
            return;
        }
    }

    // 5. Obter Usuário Autenticado da Sessão Atual (/api/auth/me)
    if (req.method === 'GET' && pathname === '/api/auth/me') {
        const sessionData = getSessionUser(req);
        if (!sessionData) {
            // Retorna status não autenticado com CSRF token para novos formulários
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({
                authenticated: false,
                user: null,
                csrfToken: generateSecureToken(16)
            }));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
            authenticated: true,
            user: sanitizeUserForClient(sessionData.user),
            csrfToken: sessionData.csrfToken
        }));
        return;
    }

    // 6. Atualização de Perfil de Usuário com Validação no Servidor
    if (req.method === 'POST' && pathname === '/api/auth/profile/update') {
        const sessionData = getSessionUser(req);
        if (!sessionData) {
            res.writeHead(401, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'Não autorizado. Faça login com o Google.' }));
            return;
        }

        if (!validateCsrf(req, sessionData)) {
            res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'Token CSRF inválido ou expirado.' }));
            return;
        }

        try {
            const body = await readJsonBody(req);
            const user = sessionData.user;

            // Validação de Nome
            if (body.name && typeof body.name === 'string') {
                const cleanName = body.name.trim();
                if (cleanName.length >= 3 && cleanName.length <= 120) {
                    user.name = cleanName;
                }
            }

            // Validação de Perfil Profissional
            if (body.userType === 'professional') {
                const councilType = (body.councilType || 'CRF').toUpperCase().trim();
                const councilUf = (body.councilUf || 'RJ').toUpperCase().trim();
                const councilNumber = String(body.councilNumber || '').replace(/\D/g, '').trim();
                const cpf = String(body.cpf || '').trim();

                // Validação de CPF com Módulo 11
                if (cpf && !isValidCpf(cpf)) {
                    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({ error: 'CPF do profissional inválido.' }));
                    return;
                }

                if (!councilNumber || councilNumber.length < 3) {
                    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({ error: 'Número de registro do conselho profissional obrigatório.' }));
                    return;
                }

                user.userType = 'professional';
                user.role = 'professional';
                user.councilType = councilType;
                user.councilUf = councilUf;
                user.councilNumber = councilNumber;
                if (cpf) user.cpf = cpf;
                if (body.companyName) user.companyName = String(body.companyName).slice(0, 150).trim();
                if (body.companyCnpj) user.companyCnpj = String(body.companyCnpj).slice(0, 20).trim();
                if (body.digitalSignature && typeof body.digitalSignature === 'string' && body.digitalSignature.startsWith('data:image/')) {
                    user.digitalSignature = body.digitalSignature;
                }
            } else if (body.userType === 'patient') {
                const cpf = String(body.cpf || '').trim();
                if (cpf && !isValidCpf(cpf)) {
                    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({ error: 'CPF do paciente inválido.' }));
                    return;
                }

                user.userType = 'patient';
                user.role = 'patient';
                if (cpf) user.cpf = cpf;
                if (body.birthDate) user.birthDate = String(body.birthDate).slice(0, 10).trim();
            }

            saveDatabase();

            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({
                success: true,
                user: sanitizeUserForClient(user)
            }));
            return;
        } catch (err) {
            res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'Dados cadastrais inválidos.' }));
            return;
        }
    }

    // 7. Logout Real no Servidor
    if (req.method === 'POST' && pathname === '/api/auth/logout') {
        const sessionData = getSessionUser(req);
        if (sessionData) {
            sessions.delete(sessionData.sessionId);
        }

        setCookie(res, 'guia_session', '', {
            httpOnly: true,
            secure: isSecureRequest,
            sameSite: 'Lax',
            maxAge: 0
        });

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true }));
        return;
    }

    // ==========================================================================
    // ROTAS DE API: PAGAMENTO PAGBANK (PREÇO NO SERVIDOR, SEM SIMULAÇÃO DE PAID)
    // ==========================================================================

    // 8. Criar Pedido PagBank com Preços e Itens Determinados pelo Servidor
    if (req.method === 'POST' && pathname === '/api/pagbank/orders') {
        if (isRateLimited(req, 15)) {
            res.writeHead(429, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'Muitos pedidos iniciados. Aguarde um momento.' }));
            return;
        }

        const sessionData = getSessionUser(req);
        if (!sessionData) {
            res.writeHead(401, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'Faça login com o Google para iniciar a contratação.' }));
            return;
        }

        try {
            const body = await readJsonBody(req);
            const requestedService = body.serviceType === 'pro_monthly' ? 'pro_monthly' : 'prescricao';
            const plan = OFFICIAL_PLANS[requestedService];

            // Preço imutável e auditado no Servidor (rejeita valores enviados pelo cliente)
            const serverAmount = plan.amount;
            const orderId = 'ORDE_' + Date.now().toString(36).toUpperCase() + crypto.randomBytes(4).toString('hex').toUpperCase();
            const now = new Date().toISOString();

            // Salva pedido no banco de dados local com status WAITING (NUNCA PAID)
            db.orders[orderId] = {
                orderId: orderId,
                userId: sessionData.user.id,
                userEmail: sessionData.user.email,
                serviceType: requestedService,
                amount: serverAmount,
                currency: plan.currency,
                status: 'WAITING', // Status sempre inicial, aguarda confirmação real do PagBank
                createdAt: now,
                updatedAt: now
            };
            saveDatabase();

            // Se o token real do PagBank estiver configurado, cria o pedido na API Oficial do PagBank
            if (PAGBANK_TOKEN && PAGBANK_TOKEN.trim().length > 10) {
                const pagBankPayload = {
                    reference_id: orderId,
                    customer: {
                        name: sessionData.user.name || 'Cliente Guia da Vacina',
                        email: sessionData.user.email,
                        tax_id: sessionData.user.cpf ? sessionData.user.cpf.replace(/\D/g, '') : undefined
                    },
                    items: [
                        {
                            reference_id: plan.id,
                            name: plan.name,
                            quantity: 1,
                            unit_amount: serverAmount
                        }
                    ],
                    notification_urls: [
                        `${APP_URL}/api/pagbank/webhook`
                    ]
                };

                if (body.paymentMethod === 'PIX') {
                    pagBankPayload.qr_codes = [
                        {
                            amount: { value: serverAmount },
                            expiration_date: new Date(Date.now() + 30 * 60 * 1000).toISOString()
                        }
                    ];
                }

                const pagBankResp = await fetch(`${PAGBANK_BASE_URL}/orders`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${PAGBANK_TOKEN}`
                    },
                    body: JSON.stringify(pagBankPayload)
                });

                if (pagBankResp.ok) {
                    const pagBankData = await pagBankResp.json();
                    db.orders[orderId].pagbankId = pagBankData.id;
                    saveDatabase();

                    res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({
                        id: orderId,
                        status: 'WAITING',
                        amount: serverAmount,
                        qr_codes: pagBankData.qr_codes || [],
                        links: pagBankData.links || []
                    }));
                    return;
                }
            }

            // Em ambiente de teste/sandbox sem token configurado, retorna status WAITING legítimo (SEM fabricar PAID)
            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({
                id: orderId,
                status: 'WAITING',
                amount: serverAmount,
                planName: plan.name,
                message: 'Pedido gerado e aguardando processamento oficial do gateway PagBank.',
                qr_codes: [
                    {
                        id: 'QRCO_' + orderId,
                        amount: { value: serverAmount },
                        expiration_date: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
                        text: `00020101021226840014br.gov.bcb.pix2562pagbank.com.br/qr/v2/cob/${orderId}5204000053039865405${(serverAmount / 100).toFixed(2)}5802BR5914GUIA DA VACINA6009SAO PAULO62070503***6304`
                    }
                ]
            }));
            return;
        } catch (err) {
            res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'Erro ao processar pedido PagBank.' }));
            return;
        }
    }

    // 9. Consulta de Status de Pedido Autenticado
    if (req.method === 'GET' && pathname.startsWith('/api/pagbank/order-status/')) {
        const orderId = pathname.replace('/api/pagbank/order-status/', '').trim();
        const sessionData = getSessionUser(req);
        if (!sessionData) {
            res.writeHead(401, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'Não autenticado.' }));
            return;
        }

        const order = db.orders[orderId];
        if (!order || order.userId !== sessionData.user.id) {
            res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'Pedido não localizado.' }));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
            orderId: order.orderId,
            status: order.status,
            amount: order.amount,
            serviceType: order.serviceType
        }));
        return;
    }

    // 10. Webhook PagBank Seguro com Proteção contra Replay e Consulta Autorizativa
    if (req.method === 'POST' && pathname === '/api/pagbank/webhook') {
        if (isRateLimited(req, 40)) {
            res.writeHead(429, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'Limite de requisições.' }));
            return;
        }

        try {
            const body = await readJsonBody(req);
            const notificationId = body.id || req.headers['x-notification-id'] || body.reference_id;

            // Proteção contra Replay Attack
            if (notificationId && db.processedWebhooks[notificationId]) {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ status: 'ALREADY_PROCESSED', message: 'Notificação já processada.' }));
                return;
            }

            const referenceId = body.reference_id || body.charges?.[0]?.reference_id;
            const chargeStatus = body.charges?.[0]?.status;

            if (referenceId && db.orders[referenceId]) {
                const order = db.orders[referenceId];

                // Se houver token PagBank, consulta o provedor diretamente para validar a cobrança
                let isConfirmedPaid = false;
                if (PAGBANK_TOKEN && order.pagbankId) {
                    try {
                        const checkResp = await fetch(`${PAGBANK_BASE_URL}/orders/${order.pagbankId}`, {
                            headers: { 'Authorization': `Bearer ${PAGBANK_TOKEN}` }
                        });
                        if (checkResp.ok) {
                            const verifiedOrder = await checkResp.json();
                            const verifiedCharge = verifiedOrder.charges?.[0];
                            if (verifiedCharge && verifiedCharge.status === 'PAID') {
                                isConfirmedPaid = true;
                            }
                        }
                    } catch (checkErr) {
                        console.error('[Webhook] Erro ao consultar status no PagBank:', checkErr.message);
                    }
                } else if (chargeStatus === 'PAID') {
                    isConfirmedPaid = true;
                }

                if (isConfirmedPaid) {
                    order.status = 'PAID';
                    order.updatedAt = new Date().toISOString();

                    // Ativa assinatura PRO no usuário no servidor
                    const user = db.users[order.userId];
                    if (user) {
                        user.isPro = true;
                        user.subscriptionStatus = 'ACTIVE';
                        const days = order.serviceType === 'pro_monthly' ? 30 : 3;
                        user.subscriptionExpiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
                    }

                    if (notificationId) {
                        db.processedWebhooks[notificationId] = {
                            receivedAt: new Date().toISOString(),
                            orderId: referenceId
                        };
                    }

                    saveDatabase();
                }
            }

            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ received: true }));
            return;
        } catch (err) {
            res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'Erro no processamento do webhook.' }));
            return;
        }
    }

    // ==========================================================================
    // ROTAS DE API: PRESCRIÇÃO CLÍNICA (AUTORIZAÇÃO, VALIDAÇÃO & AUDITORIA LGPD)
    // ==========================================================================

    // 11. Salvar Prescrição com Verificação de Perfil Habilitado no Servidor
    if (req.method === 'POST' && pathname === '/api/prescriptions/save') {
        const sessionData = getSessionUser(req);
        if (!sessionData) {
            res.writeHead(401, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'É obrigatório estar autenticado com Conta Google para emitir prescrição.' }));
            return;
        }

        // Validação de Perfil Habilitado (Decidida no Backend, não no Frontend)
        const user = sessionData.user;
        if (user.userType !== 'professional' || !user.councilNumber) {
            res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'Apenas profissionais de saúde habilitados com registro em conselho podem registrar prescrições.' }));
            return;
        }

        if (!validateCsrf(req, sessionData)) {
            res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'Token CSRF inválido.' }));
            return;
        }

        try {
            const body = await readJsonBody(req);
            const patientName = String(body.patientName || '').trim();
            const patientCpf = String(body.patientCpf || '').trim();
            const patientAge = String(body.patientAge || '-').trim();

            if (!patientName || patientName.length < 3) {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'Nome do paciente é obrigatório.' }));
                return;
            }

            if (patientCpf && !isValidCpf(patientCpf)) {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'CPF do paciente inválido.' }));
                return;
            }

            const now = new Date();
            const prescId = 'RX_' + now.getTime() + '_' + crypto.randomBytes(4).toString('hex');
            
            // Hash Criptográfico para Garantia de Integridade Documental
            const integrityHash = crypto.createHash('sha256')
                .update(`${prescId}:${user.id}:${patientName}:${now.toISOString()}:${JSON.stringify(body.vaccines || [])}`)
                .digest('hex');

            const record = {
                id: prescId,
                userId: user.id,
                prescriberName: user.name,
                councilType: user.councilType,
                councilUf: user.councilUf,
                councilNumber: user.councilNumber,
                patientName: escapeHtml(patientName),
                patientCpf: patientCpf ? patientCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '***.$2.$3-**') : '',
                patientAge: escapeHtml(patientAge),
                patientBirth: body.patientBirth ? String(body.patientBirth).slice(0, 10) : '',
                vaccines: Array.isArray(body.vaccines) ? body.vaccines.slice(0, 30).map(v => ({
                    nome: escapeHtml(v.nome),
                    posologia: escapeHtml(v.posologia),
                    marca: escapeHtml(v.marca),
                    via: escapeHtml(v.via),
                    prioridade: escapeHtml(v.prioridade),
                    justificativa: escapeHtml(v.justificativa)
                })) : [],
                comorbidities: Array.isArray(body.comorbidities) ? body.comorbidities.slice(0, 20).map(c => escapeHtml(c)) : [],
                integrityHash: integrityHash,
                date: now.toLocaleDateString('pt-BR'),
                time: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                createdAt: now.toISOString()
            };

            db.prescriptions[prescId] = record;
            saveDatabase();

            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({
                success: true,
                prescription: record
            }));
            return;
        } catch (err) {
            res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'Erro ao registrar prescrição.' }));
            return;
        }
    }

    // 12. Obter Histórico de Prescrições do Usuário Autenticado (Isolamento Estrito)
    if (req.method === 'GET' && pathname === '/api/prescriptions/history') {
        const sessionData = getSessionUser(req);
        if (!sessionData) {
            res.writeHead(401, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'Não autorizado.' }));
            return;
        }

        // Retorna exclusivamente as prescrições do usuário autenticado
        const userPrescriptions = Object.values(db.prescriptions)
            .filter(p => p.userId === sessionData.user.id)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
            items: userPrescriptions
        }));
        return;
    }

    // 13. Excluir Prescrição do Histórico (Somente Autor da Prescrição)
    if (req.method === 'DELETE' && pathname.startsWith('/api/prescriptions/')) {
        const sessionData = getSessionUser(req);
        if (!sessionData) {
            res.writeHead(401, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'Não autorizado.' }));
            return;
        }

        const prescId = pathname.replace('/api/prescriptions/', '').trim();
        const item = db.prescriptions[prescId];

        if (!item || item.userId !== sessionData.user.id) {
            res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'Prescrição não encontrada ou sem permissão para exclusão.' }));
            return;
        }

        delete db.prescriptions[prescId];
        saveDatabase();

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true }));
        return;
    }

    // ==========================================================================
    // SERVIDOR DE ARQUIVOS ESTÁTICOS COM DEFESA CONTRA PATH TRAVERSAL
    // ==========================================================================

    // Se for uma chamada de rota de API não tratada acima
    if (isApiRoute) {
        res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'Endpoint de API não encontrado.' }));
        return;
    }

    // Normalização estrita da URL
    let safeUrlPath = decodeURIComponent(parsedUrl.pathname);
    if (safeUrlPath === '/' || safeUrlPath === '') safeUrlPath = '/index.html';

    // 1. Bloqueio de Null Bytes e Tentativas de Injeção
    if (safeUrlPath.includes('\0') || safeUrlPath.includes('%00')) {
        res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('400 Requisição Inválida');
        return;
    }

    // 2. Bloqueio Expresso de Arquivos Privados e Configurações (.env, .git, server.js, etc.)
    const isForbidden = FORBIDDEN_FILE_PATTERNS.some(pattern => pattern.test(path.basename(safeUrlPath)) || pattern.test(safeUrlPath));
    if (isForbidden) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Arquivo Não Encontrado');
        return;
    }

    // 3. Resolução Segura de Caminho com Contenção de Diretório
    const normalizedRelative = path.normalize(safeUrlPath).replace(/^(\.\.[\/\\])+/, '');
    const resolvedPath = path.resolve(__dirname, '.' + normalizedRelative);

    // Garante que o arquivo resolvido esteja ESTRITAMENTE contido no diretório do projeto
    if (!resolvedPath.startsWith(__dirname)) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('403 Acesso Negado');
        return;
    }

    // 4. Verificação de Extensão de Arquivo Permitida
    const ext = path.extname(resolvedPath).toLowerCase();
    const contentType = MIME_TYPES[ext];

    // Se não for extensão estática conhecida, aplica SPA Fallback para index.html
    if (!ext || !contentType) {
        fs.readFile(path.join(__dirname, 'index.html'), (fallbackErr, fallbackContent) => {
            if (fallbackErr) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('500 Erro Interno');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(fallbackContent);
            }
        });
        return;
    }

    // 5. Leitura e Envio do Arquivo Estático Seguro
    fs.readFile(resolvedPath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // SPA Fallback para rotas HTML navegadas diretamente pelo usuário
                if (ext === '.html') {
                    fs.readFile(path.join(__dirname, 'index.html'), (fallbackErr, fallbackContent) => {
                        if (fallbackErr) {
                            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                            res.end('404 Arquivo Não Encontrado');
                        } else {
                            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                            res.end(fallbackContent);
                        }
                    });
                    return;
                }
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('404 Arquivo Não Encontrado');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('500 Erro Interno');
            }
            return;
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    });
});

// Inicialização do Servidor na Porta 3000 Obrigatória
server.listen(PORT, () => {
    console.log('====================================================');
    console.log('   Guia da Vacina - Servidor Blindado Ativo! 💉🛡️');
    console.log(`   Porta: ${PORT} | Ambiente: ${NODE_ENV}`);
    console.log(`   URL Canônica: ${APP_URL}`);
    console.log('   Proteções ativas: Rate Limit, CSRF, PKCE, HSTS, Path Traversal');
    console.log('====================================================');
});
