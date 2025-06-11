let repeatOn = false;

chrome.action.onClicked.addListener((tab) => {
  repeatOn = !repeatOn;
  chrome.storage.local.set({ repeatOn });

  // Run toggleRepeat function in page
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: toggleRepeat,
    args: [repeatOn]
  });

  // Also send a message to content script to update button color
  chrome.tabs.sendMessage(tab.id, { type: 'updateRepeatState', repeatOn });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "toggleRepeat") {
    repeatOn = !repeatOn;
    chrome.storage.local.set({ repeatOn });
    sendResponse({ repeatOn });

    if (sender.tab?.id) {
      // Run toggleRepeat function in page
      chrome.scripting.executeScript({
        target: { tabId: sender.tab.id },
        func: toggleRepeat,
        args: [repeatOn]
      });

      // Send message to update button color
      chrome.tabs.sendMessage(sender.tab.id, { type: 'updateRepeatState', repeatOn });
    }
  }
});

function toggleRepeat(on) {
  const video = document.querySelector('video');
  if (!video) return;
  video.loop = on;
}
