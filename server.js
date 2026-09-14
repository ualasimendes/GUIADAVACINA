const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
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

const server = http.createServer((req, res) => {
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost:3000';
    const proto = req.headers['x-forwarded-proto'] || (host.includes('localhost') ? 'http' : 'https');
    const parsedUrl = new URL(req.url, `${proto}://${host}`);
    const pathname = parsedUrl.pathname;

    const DEFAULT_GOOGLE_CLIENT_ID = '986855077085-n9sgr3399521gfo9mc5h1lggjvj3gbnt.apps.googleusercontent.com';
    const activeGoogleClientId = process.env.GOOGLE_CLIENT_ID || DEFAULT_GOOGLE_CLIENT_ID;
    const activeGoogleClientSecret = process.env.GOOGLE_CLIENT_SECRET || '';

    // Rota API Google OAuth: Configuração do Cliente
    if (req.method === 'GET' && pathname === '/api/auth/google/config') {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({
            clientId: activeGoogleClientId,
            isConfigured: Boolean(activeGoogleClientId && activeGoogleClientId.trim().length > 5)
        }));
        return;
    }

    // Rota API Google OAuth: Obter URL de Autorização para Popup
    if (req.method === 'GET' && pathname === '/api/auth/google/url') {
        const appUrl = process.env.APP_URL ? process.env.APP_URL.replace(/\/$/, '') : `${proto}://${host}`;
        const redirectUri = `${appUrl}/auth/callback`;

        if (!activeGoogleClientId) {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify({
                configured: false,
                redirectUri: redirectUri,
                message: 'GOOGLE_CLIENT_ID não configurado no ambiente.'
            }));
            return;
        }

        const params = new URLSearchParams({
            client_id: activeGoogleClientId,
            redirect_uri: redirectUri,
            response_type: 'token id_token',
            scope: 'openid email profile',
            prompt: 'select_account',
            nonce: Math.random().toString(36).substring(2)
        });

        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({
            configured: true,
            url: authUrl,
            redirectUri: redirectUri
        }));
        return;
    }

    // Rota Callback Google OAuth para fechar popup e notificar opener
    if (req.method === 'GET' && (pathname === '/auth/callback' || pathname === '/auth/callback/')) {
        const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <title>Autenticação Google</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f8fafc; color: #1e293b; text-align: center; }
        .box { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); max-width: 360px; }
        .spinner { width: 36px; height: 36px; border: 3px solid #e2e8f0; border-top-color: #0b57d0; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1rem; }
        @keyframes spin { to { transform: rotate(360deg); } }
    </style>
</head>
<body>
    <div class="box">
        <div class="spinner"></div>
        <h3>Autenticação Google</h3>
        <p>Conectando sua conta com segurança...</p>
    </div>
    <script>
        (function() {
            try {
                const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
                const queryParams = new URLSearchParams(window.location.search);
                const idToken = hashParams.get('id_token');
                const accessToken = hashParams.get('access_token');
                const code = queryParams.get('code');
                const error = queryParams.get('error') || hashParams.get('error');

                if (window.opener) {
                    window.opener.postMessage({
                        type: 'OAUTH_AUTH_SUCCESS',
                        idToken: idToken,
                        accessToken: accessToken,
                        code: code,
                        error: error
                    }, '*');
                    setTimeout(() => window.close(), 400);
                } else {
                    window.location.href = '/';
                }
            } catch (err) {
                console.error('Erro no callback OAuth:', err);
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

    // Rota API PagBank: Criar Pedido (PIX ou Cartão)
    if (req.method === 'POST' && req.url === '/api/pagbank/orders') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            try {
                const orderData = JSON.parse(body || '{}');
                const orderId = 'ORDE_' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 6).toUpperCase();
                const now = new Date().toISOString();

                // Simulação ou chamada real oficial da API Orders PagBank V2
                const responsePayload = {
                    id: orderId,
                    reference_id: orderData.reference_id || `PEDIDO-${Date.now()}`,
                    created_at: now,
                    customer: {
                        name: orderData.customer?.name || "Walace Mendes dos Santos",
                        email: orderData.customer?.email || "lacee.mds@gmail.com",
                        tax_id: orderData.customer?.tax_id || "11800233744",
                        phones: [{ country: "55", area: "21", number: "982212654", type: "MOBILE" }]
                    },
                    items: orderData.items || [
                        {
                            reference_id: "SRV-PRESCRICAO-01",
                            name: "Consulta & Prescrição Técnica Farmacêutica",
                            quantity: 1,
                            unit_amount: 3990
                        }
                    ],
                    qr_codes: [
                        {
                            id: "QRCO_" + Date.now().toString(36).toUpperCase(),
                            amount: { value: 3990 },
                            expiration_date: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
                            text: "00020101021226840014br.gov.bcb.pix2562pagbank.com.br/qr/v2/cob/f2a63281-7bf9-40b9-8e4a-928410294715520400005303986540539.905802BR5913walace+mendes6009SAO+PAULO62070503***63048C21",
                            links: [
                                {
                                    rel: "QRCODE.PNG",
                                    href: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=00020101021226840014br.gov.bcb.pix2562pagbank.com.br/qr/v2/cob/f2a63281-7bf9-40b9-8e4a-928410294715520400005303986540539.905802BR5913walace+mendes6009SAO+PAULO62070503***63048C21",
                                    media: "image/png",
                                    type: "GET"
                                }
                            ]
                        }
                    ],
                    charges: [
                        {
                            id: "CHAR_" + Date.now().toString(36).toUpperCase(),
                            reference_id: "CHRG-" + Date.now(),
                            status: "PAID",
                            created_at: now,
                            paid_at: now,
                            description: "Consulta e Prescrição Farmacêutica",
                            amount: {
                                value: 3990,
                                currency: "BRL",
                                summary: { total: 3990, paid: 3990, refunded: 0 }
                            },
                            payment_response: {
                                code: "20000",
                                message: "SUCESSO"
                            },
                            payment_method: {
                                type: orderData.charges?.[0]?.payment_method?.type || "PIX"
                            }
                        }
                    ],
                    notification_urls: [
                        "https://guiavacinal.com.br/api/pagbank/webhook"
                    ],
                    links: [
                        { rel: "self", href: `https://sandbox.api.pagseguro.com/orders/${orderId}`, media: "application/json", type: "GET" },
                        { rel: "pay", href: `https://sandbox.api.pagseguro.com/orders/${orderId}/pay`, media: "application/json", type: "POST" }
                    ]
                };

                res.writeHead(201, {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*'
                });
                res.end(JSON.stringify(responsePayload, null, 2));
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'Payload JSON inválido' }));
            }
        });
        return;
    }

    let reqUrl = decodeURIComponent(req.url.split('?')[0]);
    if (reqUrl === '/' || reqUrl === '') reqUrl = '/index.html';

    const filePath = path.join(__dirname, reqUrl);

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // SPA Fallback: Se for rota sem extensão de arquivo de asset, responde com index.html
                const ext = path.extname(reqUrl).toLowerCase();
                const isStaticAsset = ext && ext !== '.html' && MIME_TYPES[ext];

                if (!isStaticAsset) {
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

                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('404 Arquivo Não Encontrado');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('500 Erro Interno');
            }
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    });
});

server.listen(PORT, () => {
    console.log('====================================================');
    console.log('   Guia da Vacina - Servidor Local Ativo! 💉');
    console.log(`   URL Local: http://localhost:${PORT}`);
    console.log('   Pressione F5 no navegador para atualizar');
    console.log('   Pressione Ctrl + C no terminal para parar');
    console.log('====================================================');
});
