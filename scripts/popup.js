document.addEventListener("DOMContentLoaded", async () => {
  const button = document.querySelector(".toggleButton");

  // Function to update button text based on the enabled state
  const updateButtonState = async () => {
    chrome.storage.local.get(["enabled"], (result) => {
      const isEnabled = result.enabled || false;
      button.innerText = isEnabled ? "Off" : "On";
    });
  };

  // Function to toggle the enabled state
  const handleClick = async () => {
    chrome.storage.local.get(["enabled"], (result) => {
      const isEnabled = result.enabled || false;
      chrome.storage.local.set({ enabled: !isEnabled }, updateButtonState);
    });
  };

  // Attach event listener to button
  button.addEventListener("click", handleClick);

  // Set initial button state
  updateButtonState();
});
