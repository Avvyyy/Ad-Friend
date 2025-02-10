/**
 *  I had to create a node server to fetch the quotes from the local server
 * Fetching the quotes from the local server is a better option than fetching from the ZenQuotes API
 * Fetching the json file resulted in a CORS error so I had to create a node server to fetch the quotes
 */
const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*"); //Beats the CORS error

  try {
    const response = await fetch("http://127.0.0.1:8080/scripts/quotes.json");
    const data = await response.json();

    res.writeHead(200);
    res.end(JSON.stringify(data));
  } catch (error) {
    console.error("Error fetching quotes", error);
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Failed to fetch quotes" }));
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
