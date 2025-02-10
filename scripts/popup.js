document.addEventListener("DOMContentLoaded", async () => {
    const button = document.querySelector(".toggleButton");

    const updateButtonState = async () => {
        const { enabled } = await chrome.storage.local.get("enabled") || { enabled: false };
        button.innerText = enabled ? "Off" : "On";
    };

    const handleClick = async () => {
        const { enabled } = await chrome.storage.local.get("enabled") || { enabled: false };
        await chrome.storage.local.set({ enabled: !enabled });
        updateButtonState();
    };

    button.addEventListener("click", handleClick);
    updateButtonState();
});
