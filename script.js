const LIVE_URL = typeof LIVE_URL !== 'undefined' ? LIVE_URL : 'https://pump.fun/';
const CONTRACT_ADDR = typeof CONTRACT_ADDR !== 'undefined' ? CONTRACT_ADDR : 'TBA';
const TWITTER_URL = typeof TWITTER_URL !== 'undefined' ? TWITTER_URL : 'https://twitter.com/majorleague_dev/status/1968142661879206385';
const TELEGRAM_URL = typeof TELEGRAM_URL !== 'undefined' ? TELEGRAM_URL : 'https://t.me/stimothypumps';
const CONSPIRAAI_URL = typeof CONSPIRAAI_URL !== 'undefined' ? CONSPIRAAI_URL : 'https://conspiraai.com';
const GITHUB_URL = typeof GITHUB_URL !== 'undefined' ? GITHUB_URL : 'https://github.com/conspiraai/-veilcode_landing';
const SITE_DOMAIN = typeof SITE_DOMAIN !== 'undefined' ? SITE_DOMAIN : 'https://veilcore.us';

let toastTimer;

document.addEventListener('DOMContentLoaded', () => {
  hydrateLinks();
  setLive();
  initCopyHandlers();
  initSmoothScroll();
  initNavToggle();
});

function hydrateLinks() {
  const primaryLive = document.querySelectorAll('[data-live-link]');
  primaryLive.forEach((anchor) => {
    anchor.href = LIVE_URL;
  });

  const mapping = {
    live: LIVE_URL,
    twitter: TWITTER_URL,
    telegram: TELEGRAM_URL,
    conspira: CONSPIRAAI_URL,
    github: GITHUB_URL
  };

  document.querySelectorAll('[data-link]').forEach((anchor) => {
    const key = anchor.getAttribute('data-link');
    if (key && mapping[key]) {
      anchor.href = mapping[key];
    }
  });

  const contractValue = document.querySelector('[data-contract-value]');
  if (contractValue) {
    contractValue.textContent = CONTRACT_ADDR;
  }

  const contractCopy = document.querySelector('[data-copy-contract]');
  if (contractCopy) {
    contractCopy.dataset.copy = CONTRACT_ADDR;
  }
}

function setLive() {
  const liveWrapper = document.getElementById('live');
  if (!liveWrapper || liveWrapper.querySelector('iframe')) {
    return;
  }

  const iframe = document.createElement('iframe');
  iframe.src = LIVE_URL;
  iframe.loading = 'lazy';
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('title', 'Stimothy Pumps livestream');
  liveWrapper.appendChild(iframe);
}

function initCopyHandlers() {
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-copy]');
    if (!trigger) {
      return;
    }

    const text = trigger.dataset.copy;
    if (!text) {
      return;
    }

    event.preventDefault();
    copyToClipboard(text.trim());
  });
}

function copyToClipboard(text) {
  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Copied to clipboard');
    }).catch(() => fallbackCopy(text));
    return;
  }

  fallbackCopy(text);
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  const selection = document.getSelection();
  const previousRange = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

  textarea.select();
  try {
    document.execCommand('copy');
    showToast('Copied to clipboard');
  } catch (err) {
    console.error('Copy failed', err);
    showToast('Copy not supported');
  }

  document.body.removeChild(textarea);
  if (previousRange && selection) {
    selection.removeAllRanges();
    selection.addRange(previousRange);
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.hidden = false;
  toast.setAttribute('aria-hidden', 'false');

  if (toastTimer) {
    clearTimeout(toastTimer);
  }

  toastTimer = setTimeout(() => {
    toast.setAttribute('aria-hidden', 'true');
    toastTimer = setTimeout(() => {
      toast.hidden = true;
      toastTimer = undefined;
    }, 200);
  }, 2000);
}

function initSmoothScroll() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    return;
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') {
        return;
      }

      const destination = document.querySelector(targetId);
      if (!destination) {
        return;
      }

      event.preventDefault();
      destination.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) {
    return;
  }

  toggle.addEventListener('click', () => {
    const isOpen = nav.getAttribute('data-open') === 'true';
    nav.setAttribute('data-open', String(!isOpen));
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });

  nav.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', () => {
      nav.setAttribute('data-open', 'false');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}
