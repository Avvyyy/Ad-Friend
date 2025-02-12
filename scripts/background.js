// Runs when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ enabled: true }); // Default to enabled
});

// Listen for storage changes (e.g., enable/disable state)
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && "enabled" in changes) {
        updateIcon(changes.enabled.newValue);
    }
});

// Update the extension icon based on enable/disable state
// function updateIcon(isEnabled) {
//     // Change the icons here
//     const iconPath = isEnabled ? "icons/on.svg" : "icons/off.svg";
//     chrome.action.setIcon({ path: iconPath });
// }

// Listen for tab updates (when a user navigates to a new page)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url.startsWith("http")) {
        chrome.storage.local.get("enabled", ({ enabled }) => {
            if (enabled) {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ["ad.js"] // Inject content script
                });
            }
        });
    }
});
