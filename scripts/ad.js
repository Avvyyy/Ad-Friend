// Function to fetch a motivational quote from the local server
// Function to fetch a motivational quote from ZenQuotes API

async function fetchMotivationalQuote() {
  try {
    const response = await fetch("https://ad-friend.vercel.app//api/fetchQuotes");
    const data = await response.json();

    const quoteNumber = Math.floor(Math.random() * data.length);

    return data[quoteNumber] || "Stay positive and keep going!";
  } catch (error) {
    console.error("Error fetching quote:", error);
    return "Stay positive and keep going!";
  }
}

// Function to replace ads with motivational content
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
                                <p style="text-wrap:wrap; ">'${quoteParameter.quote}'</p>
                                <p style="font: semi-bold; text-align: right;">--${quoteParameter.author}</p>
                            </div>
                        </div>`;
          ad.dataset.replaced = "true"; // Mark as replaced
        }
      });
    });
  };

  updateAds(); //Initial replacement

  setInterval(updateAds, 10000); //Update every 5 seconds
}

// MutationObserver to detect dynamically loaded ads
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      replaceAds();
    }
  });
});

// Start observing the body for added elements
observer.observe(document.body, { childList: true, subtree: true });

// Initial ad replacement for already loaded elements
replaceAds();
