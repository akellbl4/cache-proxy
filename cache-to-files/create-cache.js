require("dotenv").config();

const path = require("path");
const crypto = require("crypto");
const fs = require("fs/promises");
const fetch = require("isomorphic-unfetch");

const { API_URL, CACHE_DIR } = process.env;
const RESOUCES = ["/posts", "/albums"];

function getFilename(str) {
  const hash = crypto.createHash("sha1").update(str).digest("hex");

  return `${hash}.json`;
}

function writeResponseToFile(filepath, data) {
  return fs.writeFile(filepath, data, "utf-8");
}

function cacheRequests([endpoint, ...r]) {
  return new Promise((resolve, reject) => {
    if (!endpoint) {
      console.log("\nResources have been succesfully cached 📦");
      return resolve();
    }

    const url = `${API_URL}${endpoint}`;
    const filename = getFilename(endpoint);
    const filepath = path.resolve(__dirname, CACHE_DIR, filename);

    fetch(url)
      .then((r) => r.text())
      .then((d) => writeResponseToFile(filepath, d))
      .then(() => {
        console.log(`${endpoint} -> ${filepath} 💾`);
        cacheRequests(r);
      })
      .catch((e) => reject(e));
  });
}

cacheRequests(RESOUCES);
