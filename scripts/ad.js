// Manipulating ads on the page

async function getAds() {
    // checking if the extension is enabled
    let isEnabled = await chrome.storage.local.get('enabled');
    if (!isEnabled) return;

    const adSelectors = ['div[class^="ad"]', 'div.ad', 'iframe', 'ins'];
    // The motivational quote on the page
    const replacementText = await fetch('http://127.0.0.1:5500/motivation.html').then(response => response.text());

    // This gets all the elements with the selectors in the adSelectors array
    adSelectors.forEach(selector => {
        ads = document.querySelectorAll(selector);
        // This now gets the individual elements with this selector on the page
        ads.forEach(ad => {
            ad.innerHTML =  replacementText;
        });
    });
}