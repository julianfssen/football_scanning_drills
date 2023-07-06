import * as http from "node:http";
import { Buffer } from "node:buffer";

const PORT = 3000;
const HOST = "127.0.0.1";

const server = http.createServer((req, res) => {
  const response = "hello world"

  res.writeHead(200, {
    "Content-Type": "text/html",
    "Content-Length": Buffer.byteLength(response),
    "Date": new Date().toUTCString()
  }).write(response);

  res.end();
});

server.listen(PORT, HOST);

console.log(`Server running at ${HOST}:${PORT}`);
