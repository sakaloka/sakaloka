// src/components/utils/submitFormToApi.js
import { toast } from './toast.js';

export async function submitFormToApi({
  url,
  method = 'POST',
  formId,
  token = null,
  redirectTo = null,
}) {
  const form = document.getElementById(formId);
  if (!form) return toast('Form tidak ditemukan.', 'error');

  const clickedBtn =
    form.querySelector('button[type="submit"]:focus') ||
    form.querySelector('button[type="submit"]');
  const originalText = clickedBtn?.innerHTML;

  // Tombol loading
  if (clickedBtn) {
    clickedBtn.disabled = true;
    clickedBtn.innerHTML = `
      <span class="loading loading-spinner loading-sm mr-2"></span>Loading...
    `;
  }

  try {
    let headers = {};
    let body;

    if (form.enctype === 'multipart/form-data') {
      body = new FormData(form);
    } else {
      const formData = new FormData(form);
      body = JSON.stringify(Object.fromEntries(formData.entries()));
      headers['Content-Type'] = 'application/json';
    }

    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(url, {
      method,
      headers,
      body,
    });

    const json = await res.json();

    if (res.ok) {
      toast(json.message || 'Berhasil.', 'success');
      if (redirectTo) {
        setTimeout(() => {
          location.hash = redirectTo;
        }, 800);
      }
      return true;
    } else {
      const allErrors = json.errors;
      const errorMessages = extractMessages(allErrors);
      toast(
        `Gagal: ${json.message || 'Terjadi kesalahan'}${errorMessages.length ? ' - ' + errorMessages.join(', ') : ''}`,
        'error',
      );
      return false;
    }
  } catch (err) {
    console.error(err);
    toast('Gagal menghubungi server.', 'error');
    return false;
  } finally {
    if (clickedBtn) {
      clickedBtn.disabled = false;
      clickedBtn.innerHTML = originalText || 'Submit';
    }
  }
}

function extractMessages(input) {
  if (!input) return [];

  if (Array.isArray(input)) {
    return input.flatMap(extractMessages);
  }

  if (typeof input === 'object') {
    return Object.values(input).flatMap(extractMessages);
  }

  return [String(input)];
}
