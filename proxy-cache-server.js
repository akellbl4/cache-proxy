require("dotenv").config();

const http = require("http");
const fetch = require("isomorphic-unfetch");

const { API_URL, PORT, HOST } = process.env;

const map = new Map();

async function handler(req, res) {
  if (map.has(req.url)) {
    const data = await map.get(req.url);

    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.write(data);
    res.end();
    console.log(`📦 Cached request to: ${req.url}`);

    return;
  }

  const request = fetch(`${API_URL}${req.url}`).then((res) => res.text());

  map.set(req.url, request);

  const data = await request;

  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  res.write(data);
  res.end();
  console.log(`📥 GET ${req.url}`);
}

http.createServer(handler).listen(PORT, HOST, () => {
  console.log(`Server is running on 🌎 http://${HOST}:${PORT}`);
});
