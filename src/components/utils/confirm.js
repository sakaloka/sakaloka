import { html, render } from 'lit-html';

export function confirmDialog(message = 'Yakin?') {
  return new Promise((resolve) => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const cleanup = () => {
      const dialog = container.querySelector('dialog');
      if (dialog) dialog.close();
      setTimeout(() => {
        render(null, container);
        container.remove();
      }, 200);
    };

    const template = html`
      <dialog open class="modal modal-open z-[9999]">
        <div class="modal-box">
          <h3 class="font-bold text-lg mb-4">Konfirmasi</h3>
          <p>${message}</p>
          <div class="modal-action mt-6">
            <button
              class="btn"
              @click=${() => {
                cleanup();
                resolve(false);
              }}
            >
              Batal
            </button>
            <button
              class="btn btn-primary"
              @click=${() => {
                resolve(true);
                cleanup();
              }}
            >
              Ya, lanjutkan
            </button>
          </div>
        </div>
      </dialog>
    `;

    render(template, container);
  });
}
