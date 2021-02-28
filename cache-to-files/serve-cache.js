require("dotenv").config();

const http = require("http");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs/promises");

const { HOST, PORT, CACHE_DIR } = process.env;

function getFilename(str) {
  const hash = crypto.createHash("sha1").update(str).digest("hex");

  return `${hash}.json`;
}

async function handler(req, res) {
  const filename = getFilename(req.url);
  const filepath = path.resolve(__dirname, CACHE_DIR, filename);
  const data = await fs.readFile(filepath);

  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  res.write(data);
  res.end();
  console.log(`📤 ${req.method} ${req.url}`);
}

http.createServer(handler).listen(PORT, HOST, () => {
  console.log(`Server is running on 🌎 http://${HOST}:${PORT}`);
});
