const http = require('http');
const url = require('url');

const key = "84BR6HSS7F11LSVZTUFJ82TO8NH4BZTM85HO7CFICH1FXZDDJ8PRCNQGRTVHHMFGLJPS5AH6BGZ6261SV7VNMK30ZD6OZVYY0R83AUJVPOXETS9M1R537JGKWWG45G4B";

exports.name = "/send";
exports.index = async (req, res) => {
    const number = req.query.number;
    const message = req.query.msg;

    if (!number || !message) {
        return res.status(400).send({error:'Number and message are required'});
    }

    const options = {
        method: 'GET',
        hostname: 'api.smsdev.com.br',
        port: 80,
        path: `/v1/send?key=${key}&type=9&number=${number}&msg=${encodeURIComponent(message)}`,
        headers: {}
    };

    const apiReq = http.request(options, (apiRes) => {
        let chunks = [];

        apiRes.on('data', (chunk) => {
            chunks.push(chunk);
        });

        apiRes.on('end', () => {
            const body = Buffer.concat(chunks);
            res.send(body.toString());
        });
    });

    apiReq.on('error', (e) => {
        res.status(500).send(`Error: ${e.message}`);
    });

    apiReq.end();
};
