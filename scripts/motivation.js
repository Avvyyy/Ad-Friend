   // Fetch Quotes from ZenQuotes API

    // Update quote function to update the quote in the div
    async function updateQuote() {
        const quote = await fetch("http://127.0.0.1:3000/").then((res) =>
          res.json()
        );
        const quoteDiv = document.querySelector(".quote");
        if (quote) {
          quoteDiv.innerHTML = `<p>${quote.q}</p><p>-${quote.a}</p>`;
        } else {
          quoteDiv.innerHTML =
            "<p>Be peaceful always and in desperate times, pray to God!</p>";
        }
      }
  
      // Chnage the displayed quote every 20 seconds
      document.addEventListener("DOMContentLoaded", async () => {
        setInterval(updateQuote, 10000);
      });