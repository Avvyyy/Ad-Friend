/**
 *  I had to create a node server to fetch the quotes from the local server
 * Fetching the quotes from the local server is a better option than fetching from the ZenQuotes API
 * Fetching the json file resulted in a CORS error so I had to create a node server to fetch the quotes
 */

const cors = require('cors');
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*'); // or use the specific domain you need

  try {
    const response = await fetch('https://ad-friend.vercel.app/quotes.json');
    const data = await response.json();

    res.writeHead(200);
    res.end(JSON.stringify(data));
  } catch (error) {
    console.error('Error fetching quotes', error);
    res.writeHead(500);
    res.end(JSON.stringify({ error: 'Failed to fetch quotes' }));
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
