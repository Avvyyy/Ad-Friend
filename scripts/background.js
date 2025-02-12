chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ enabled: true }); // Default to enabled
});

// Listen for storage changes (enable/disable)
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && "enabled" in changes) {
        updateIcon(changes.enabled.newValue);
        updateContentScripts(changes.enabled.newValue);
    }
});

// Update extension icon
function updateIcon(isEnabled) {
    const iconPath = isEnabled ? "icons/on.svg" : "icons/off.svg";
    chrome.action.setIcon({ path: iconPath });
}

// Inject or remove `ad.js`
function updateContentScripts(isEnabled) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) return;
        const tabId = tabs[0].id;

        if (isEnabled) {
            console.log("[DEBUG] Injecting ad.js into active tab...");
            chrome.scripting.executeScript({
                target: { tabId },
                files: ["ad.js"]
            });
        } else {
            console.log("[DEBUG] Removing motivational quotes...");
            chrome.scripting.executeScript({
                target: { tabId },
                func: disableAdReplacer
            });
        }
    });
}

// Remove quotes and stop observer
function disableAdReplacer() {
    console.log("[DEBUG] Removing replaced ads and stopping observer...");
    
    // Remove all injected quotes
    document.querySelectorAll("[data-replaced]").forEach((ad) => {
        ad.remove();
    });

    // Stop the mutation observer
    if (window.adObserver) {
        window.adObserver.disconnect();
        window.adObserver = null;
    }
}
