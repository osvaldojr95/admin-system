import { WebSocketServer } from 'ws';

function onError(ws, err) {
    console.error(`onError: ${err.message}`);
}

function onMessage(ws, data) {
    console.log(`onMessage: ${data}`);
}

export function send(wss, data) {
    wss.clients.forEach(client => {
        if (client.readyState === 1) {  // Verifica se a conexão está aberta
            client.send(data);  // Envia a mensagem para o cliente
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