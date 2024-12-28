import { WebSocketServer } from 'ws';
import customerServices from "../services/customerServices.js";

function onError(ws, err) {
    console.error(`onError: ${err.message}`);
}

async function onMessage(ws, data) {
    const message = data.toString();
    if (message === 'getStats') {
        const result = await customerServices.calculatePublicInfos(false);
        ws.send(JSON.stringify(result));
    }
}

export function send(wss, data) {
    wss.clients.forEach(client => {
        if (client.readyState === 1) {
            client.send(data);
        }
    });
}

function onConnection(ws, req) {
    ws.on('message', data => onMessage(ws, data));
    ws.on('error', error => onError(ws, error));
    console.log(`onConnection`);
}

export default (server) => {
    const wss = new WebSocketServer({
        server,
    });
    wss.on('connection', onConnection);
    console.log(`App Web Socket Server is running!`);
    return wss;
}