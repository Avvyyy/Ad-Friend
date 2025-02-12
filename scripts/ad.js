async function fetchMotivationalQuote() {
  try {
    const response = await fetch("https://ad-friend.vercel.app/api/fetchQuotes");
    const data = await response.json();

    const quoteNumber = Math.floor(Math.random() * data.length);

    return data[quoteNumber] || { quote: "Stay positive and keep going!", author: "Unknown" };
  } catch (error) {
    console.error("Error fetching quote:", error);
    return { quote: "Stay positive and keep going!", author: "Unknown" };
  }
}

async function replaceAds() {
  const adSelectors = [
    'iframe[src*="ads"]',
    'div[id*="ad"]',
    'div[class*="ad"]',
    "ins",
    "[data-ad-slot]",
    '[aria-label*="advertisement"]',
  ];

  const updateAds = async () => {
    const quote = await fetchMotivationalQuote();

    adSelectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((ad) => {
        if (!ad.dataset.replaced) {
          ad.innerHTML = `
                        <div style="padding: 10px; background: #f4f4f4; border-radius: 5px; text-align: center; opacity:40%; margin:auto; width: 100%">
                            <h3>Stay Motivated!</h3>
                            <div style="width: 80%; margin: auto;">
                                <p style="text-wrap:wrap;">'${quote.quote}'</p>
                                <p style="font: semi-bold; text-align: right;">-- ${quote.author}</p>
                            </div>
                        </div>`;
          ad.dataset.replaced = "true"; // Mark as replaced
        }
      });
    });
  };

  updateAds(); // Initial replacement

  setInterval(updateAds, 10000); // Update every 10 seconds

  // Start MutationObserver if not already running
  if (!window.adObserver) {
    window.adObserver = new MutationObserver(() => {
      replaceAds();
    });

    window.adObserver.observe(document.body, { childList: true, subtree: true });
  }
}

// Initial execution when `ad.js` runs
replaceAds();
