const status = document.querySelector('#status');
const destination = document.querySelector('#destination');

function redirect() {
  let saved;
  try {
    saved = destinationStore.getDestination();
  } catch {
    status.textContent = 'Browser storage is unavailable. Allow local storage and try again.';
    return;
  }

  if (!saved) {
    status.textContent = 'No destination saved. Go back to setup to save one in this browser.';
    return;
  }

  let url;
  try {
    url = new URL(saved);
    if (['javascript:', 'data:', 'vbscript:', 'file:', 'blob:', 'about:'].includes(url.protocol)) {
      throw new Error('Unsupported scheme');
    }
  } catch {
    status.textContent = 'The saved destination is invalid. Go back to setup to update it.';
    return;
  }

  if (window.location.search) {
    url.search += (url.search ? '&' : '?') + window.location.search.slice(1);
  }

  destination.href = url.href;
  destination.hidden = false;
  status.textContent = 'Opening your destination. If nothing happens, use the link below.';

  try {
    window.location.replace(url.href);
  } catch {
    status.textContent = 'Could not open your destination automatically. Use the link below.';
  }
}

redirect();
