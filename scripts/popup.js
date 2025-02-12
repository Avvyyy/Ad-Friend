document.addEventListener("DOMContentLoaded", async () => {
  const button = document.querySelector(".toggleButton");

  const updateButtonState = async () => {
    const { enabled } = await chrome.storage.local.get("enabled");
    button.innerHTML = enabled
      ? ` On <i class="bi bi-toggle-on" style="font-size: 2em"></i>`
      : ` Off <i class="bi bi-toggle-off" style="font-size: 2em"></i>`;
  };

  const handleClick = async () => {
    const { enabled } = await chrome.storage.local.get("enabled");
    const newState = !enabled;
    await chrome.storage.local.set({ enabled: newState });

    // Notify the background script
    chrome.runtime.sendMessage({ action: "toggleExtension", enabled: newState });

    updateButtonState();
  };

  button.addEventListener("click", handleClick);
  updateButtonState();
});
