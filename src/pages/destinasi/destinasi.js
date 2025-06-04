import { html, render } from 'lit-html';
import DestinasiPresenter from './destinasi-presenter.js';

export function renderDestinasi(container) {
  const view = new DestinasiView(container);
  const presenter = new DestinasiPresenter({ view });
  presenter.loadDestinations();
}

class DestinasiView {
  constructor(container) {
    this.container = container;
  }

  renderList(destinations) {
    const template = html`
      <section class="mt-20 w-full space-y-6">
        <h2 class="text-xl font-bold mb-4">Destinasi Wisata</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${destinations.map(
            (d) => html`
              <div class="bg-white shadow rounded-lg p-4 border hover:shadow-md">
                <h3 class="font-semibold text-lg">${d.name}</h3>
                <p class="text-sm text-gray-600 mt-1">${d.description.slice(0, 100)}...</p>
                <div class="mt-2 text-xs text-gray-400">Koordinat: ${d.latitude}, ${d.longitude}</div>
              </div>
            `
          )}
        </div>
      </section>
    `;
    render(template, this.container);
  }

  renderError(message) {
    const template = html`
      <div class="text-center text-red-500 mt-20">${message}</div>
    `;
    render(template, this.container);
  }
}
