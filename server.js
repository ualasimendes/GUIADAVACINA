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
    console.log('   Guia Vacinal - Servidor Local Ativo! 💉');
    console.log(`   URL Local: http://localhost:${PORT}`);
    console.log('   Pressione F5 no navegador para atualizar');
    console.log('   Pressione Ctrl + C no terminal para parar');
    console.log('====================================================');
});
