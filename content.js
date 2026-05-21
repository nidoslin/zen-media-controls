let backPressCount = 0;
let backPressTimer = null;

function getVideo() {
  return document.querySelector('video');
}

function restartVideo() {
  const video = getVideo();
  if (!video) return;
  video.currentTime = 0;
  video.play().catch(() => {});
}

function isShortsPage() {
  return location.pathname.startsWith('/shorts/');
}

function previousVideo() {
  if (isShortsPage()) {
    document.querySelector('#navigation-button-up button')?.click();
  } else {
    document.querySelector('.ytp-prev-button')?.click();
  }
}

function nextVideo() {
  if (isShortsPage()) {
    document.querySelector('#navigation-button-down button')?.click();
  } else {
    document.querySelector('.ytp-next-button')?.click();
  }
}

function handlePreviousTrack() {
  backPressCount++;
  if (backPressCount === 1) {
    restartVideo();
    backPressTimer = setTimeout(() => {
      backPressCount = 0;
    }, 800);
  } else if (backPressCount >= 2) {
    clearTimeout(backPressTimer);
    backPressCount = 0;
    previousVideo();
  }
}

function handleNextTrack() {
  nextVideo();
}

function setupMediaSession() {
  try {
    navigator.mediaSession.setActionHandler('previoustrack', handlePreviousTrack);
    navigator.mediaSession.setActionHandler('nexttrack', handleNextTrack);
  } catch (e) {
    // Media Session API not available
  }
}

setupMediaSession();

// Title change — YouTube SPA navigation safety net (works for both regular and Shorts)
const titleEl = document.querySelector('title');
if (titleEl) {
  new MutationObserver(() => setupMediaSession())
    .observe(titleEl, { childList: true });
}

// Re-register handlers when a video starts playing
document.addEventListener('play', (e) => {
  if (e.target instanceof HTMLVideoElement) setupMediaSession();
}, true);

// Shorts-specific: YouTube's SPA navigation event
document.addEventListener('yt-navigate-finish', () => {
  if (isShortsPage()) setupMediaSession();
});
