function waitForContainer() {
  const container = document.querySelector('ytd-menu-renderer #top-level-buttons-computed');
  if (container) {
    injectButton(container);
  } else {
    setTimeout(waitForContainer, 300);
  }
}

function injectButton(container) {
  if (document.getElementById('youtube-repeat-toggle-btn')) return;

  const btn = document.createElement('button');
  btn.id = 'youtube-repeat-toggle-btn';
  btn.className = 'yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m';
  btn.title = 'Video Repeat';
  btn.style.marginLeft = '8px'; // ✅ margin

  const img = document.createElement('img');
  img.src = chrome.runtime.getURL('icon.png');
  img.style.width = '25px';
  img.style.height = '25px';
  btn.appendChild(img);

  btn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: 'toggleRepeat' }, (response) => {
      if (response?.repeatOn !== undefined) {
        updateButtonState(btn, response.repeatOn);
      }
    });
  });

  container.appendChild(btn);

  // Initialize button state from storage
  chrome.storage.local.get('repeatOn', (data) => {
    updateButtonState(btn, data.repeatOn);
  });
}

function updateButtonState(btn, on) {
  if (on) {
    btn.style.filter = 'invert(35%) sepia(70%) saturate(750%) hue-rotate(90deg) brightness(250%) contrast(100%)'; // green-ish tint
  } else {
    btn.style.filter = 'invert(35%) sepia(70%) saturate(750%) hue-rotate(900deg) brightness(1000%) contrast(1000%)';
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'updateRepeatState') {
    const btn = document.getElementById('youtube-repeat-toggle-btn');
    if (btn) {
      updateButtonState(btn, message.repeatOn);
    }
  }
});


waitForContainer();
