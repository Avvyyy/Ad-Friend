/**
 *  I had to create a node server because attempting to
 * fetch the quotes from the API using the browser
 * would result in a CORS error.
 */
const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*"); //Beats the CORS error

  try {
    const response = await fetch("https://zenquotes.io/api/random");
    const data = await response.json();

    res.writeHead(200);
    res.end(JSON.stringify(data[0]));
  } catch (error) {
    console.error("Error fetching quotes", error);
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Failed to fetch quotes" }));
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
