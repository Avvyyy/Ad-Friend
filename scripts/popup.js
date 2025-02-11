document.addEventListener("DOMContentLoaded", async () => {
  const button = document.querySelector(".toggleButton");

  const updateButtonState = async () => {
    const result = await chrome.storage.local.get("enabled");
    const enabled = result.enabled !== undefined ? result.enabled : false;
    button.innerHTML = enabled
      ? `<i class="bi bi-toggle-off"></i>Off`
      : `<i class="bi bi-toggle-on"></i> On`;
  };

  // Handles the togge effect of the button
  const handleClick = async () => {
    const result = await chrome.storage.local.get("enabled");
    const enabled = result.enabled !== undefined ? result.enabled : false;
    await chrome.storage.local.set({ enabled: !enabled });
    updateButtonState();
  };

  button.addEventListener("click", handleClick);
  updateButtonState();
});
