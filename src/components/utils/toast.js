import { html, render } from 'lit-html';

export function toast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  // Buat elemen kosong untuk toast individual
  const toastEl = document.createElement('div');
  container.appendChild(toastEl);

  // Template toast dengan animasi
  const template = html`
    <div
      class="alert alert-${type} mt-3 text-white shadow-lg text-sm animate-fade-in flex items-center gap-2"
    >
      ${iconTemplate(type)}
      <span>${message}</span>
    </div>
  `;

  // Render toast ke elemen
  render(template, toastEl);

  // Auto dismiss setelah 3 detik + animasi keluar
  setTimeout(() => {
    toastEl.firstElementChild.classList.add('animate-fade-out');
    setTimeout(() => {
      toastEl.remove();
    }, 300); // tunggu animasi fade-out selesai
  }, 3000);
}

// Template ikon berdasarkan tipe alert
function iconTemplate(type) {
  const icons = {
    success: 'M5 13l4 4L19 7', // ✔️
    error: 'M6 18L18 6M6 6l12 12', // ✖️
    warning: 'M12 9v2m0 4h.01M12 5.5l7.5 13H4.5L12 5.5z', // ⚠️
    info: 'M13 16h-1v-4h-1m1-4h.01', // ℹ️
  };
  const path = icons[type] || icons.info;

  return html`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="stroke-current shrink-0 h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${path}" />
    </svg>
  `;
}
