export function showLoadingIndicator() {
  const el = document.getElementById('loadingIndicator');
  if (el) el.classList.remove('hidden');
}

export function hideLoadingIndicator() {
  const el = document.getElementById('loadingIndicator');
  if (el) el.classList.add('hidden');
}
