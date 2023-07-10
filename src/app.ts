import * as http from "node:http";
import * as fs from "node:fs";
import { cwd } from 'node:process';
import { Buffer } from "node:buffer";

const PORT = 3000;
const HOST = "127.0.0.1";
const templatePath = `${cwd()}/src/`

const server = http.createServer((req, res) => {
  const method = req.method;

  if (method === "GET") {
    const path = templatePath + req.url.substring(1);

    fs.access(path, (err) => {
      if (err) {
	const response = "Page not found";
        res.writeHead(404, {
          "Content-Type": "text/html",
          "Content-Length": Buffer.byteLength(response),
          "Date": new Date().toUTCString()
        }).write(response);
        res.end();
      } else {
        fs.readFile(path, (err, data) => {
          if (err) throw err;
          res.writeHead(200, {
            "Content-Type": "text/html",
            "Content-Length": Buffer.byteLength(data),
            "Date": new Date().toUTCString()
          }).write(data);
          res.end();
	});
      }
    })
  };
});

server.listen(PORT, HOST);

console.log(`Server running at ${HOST}:${PORT}`);
