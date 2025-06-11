const toggleBtn = document.getElementById('toggle-btn');
const statusDiv = document.getElementById('status');

chrome.storage.local.get('repeatOn', (data) => {
  updateStatus(data.repeatOn);
});

 toggleBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: 'toggleRepeat' }, (response) => {
    if (response?.repeatOn !== undefined) {
      updateStatus(response.repeatOn);
    }
  });
});

function updateStatus(on) {
  statusDiv.textContent = on ? 'YouTube repeat is now ON' : 'YouTube repeat is now OFF';
}

