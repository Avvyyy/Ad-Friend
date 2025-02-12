// Function to fetch a motivational quote from the local server
// Function to fetch a motivational quote from ZenQuotes API

async function fetchMotivationalQuote() {
  try {
    const response = await fetch("https://ad-friend.vercel.app/api/fetchQuotes");
    const data = await response.json();
    
    console.log("API Response:", data); 
    if (!Array.isArray(data) || data.length === 0) {
      return { quote: "Stay positive and keep going!", author: "Unknown" };
    }

    const quoteNumber = Math.floor(Math.random() * data.length);
    return data[quoteNumber]; // Ensure this object has { quote, author }
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
    const quoteParameter = await fetchMotivationalQuote();

    adSelectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((ad) => {
        if (!ad.dataset.replaced) {
          ad.innerHTML = `
            <div style="padding: 10px; background: #f4f4f4; border-radius: 5px; text-align: center; opacity:40%; margin:auto; width: 100%">
              <h3>Stay Motivated!</h3>
              <div style="width: 80%; margin: auto;">
                <p style="text-wrap:wrap;">"${quoteParameter?.quote || "Stay positive and keep going!"}"</p>
                <p style="font: semi-bold; text-align: right;">--${quoteParameter?.author || "Unknown"}</p>
              </div>
            </div>`;
          ad.dataset.replaced = "true";
        }
      });
    });
  };

  updateAds(); // Initial replacement

  setInterval(updateAds, 10000); // Update every 10 seconds
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      replaceAds();
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });
replaceAds();
