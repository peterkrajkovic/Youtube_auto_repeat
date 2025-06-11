(() => {
  const videoEl = document.querySelector('video');
  if (videoEl) {
    videoEl.loop = !videoEl.loop;
    alert(`Repeat is now ${videoEl.loop ? 'ON' : 'OFF'}`);
  } else {
    alert("No video found on the page.");
  }
})();
