const form = document.querySelector('#destination-form');
const destination = document.querySelector('#destination');
const status = document.querySelector('#status');
const savedDestination = document.querySelector('#saved-destination');

try {
  const saved = destinationStore.getDestination();
  if (saved) {
    destination.value = saved;
    savedDestination.textContent = saved;
  }
} catch {
  savedDestination.textContent = 'Unable to read the saved destination.';
  status.textContent = 'Browser storage is unavailable. Allow local storage to save a destination.';
}

destination.addEventListener('input', () => {
  destination.setCustomValidity('');
  status.textContent = '';
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = destination.value.trim();
  destination.setCustomValidity('');

  try {
    const url = new URL(value);
    if (['javascript:', 'data:', 'vbscript:', 'file:', 'blob:', 'about:'].includes(url.protocol)) {
      throw new Error('Unsupported scheme');
    }
  } catch {
    destination.setCustomValidity('Enter a full URL.');
    destination.reportValidity();
    return;
  }

  try {
    destinationStore.setDestination(value);
    destination.value = value;
    savedDestination.textContent = value;
    status.textContent = 'Destination saved in this browser.';
  } catch {
    status.textContent = 'Could not save the destination. Check your browser storage settings and try again.';
  }
});
