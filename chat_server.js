const WebSocket = require('ws');
const PORT = 5000;

const wss = new WebSocket.Server({ port: PORT });

const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);
  console.log('Новое подключение к чату');

  ws.on('message', (message) => {
    for (let client of clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
  });
});

console.log(`Чат-сервер запущен на ws://localhost:${PORT}`);
