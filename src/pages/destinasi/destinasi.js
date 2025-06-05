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
  this.originalDestinations = destinations;
  this.filteredDestinations = [...destinations];

  const updateView = () => {
    const template = html`
      <section class="mt-24 w-full h-[80vh] flex flex-col gap-4">
        <!-- Header -->
        <div class="mt-[1px]">
          <h2 class="text-2xl font-bold text-black">Destinasi</h2>
          <p class="text-sm text-gray-500 mt-1">Klik provinsi manapun untuk memulai perjalananmu</p>

          <!-- Search dan Filter -->
          <div class="flex flex-wrap items-center gap-2 mt-4">
            <input
              type="text"
              placeholder="Cari destinasi..."
              class="flex-1 border px-4 py-2 rounded text-sm"
              @input=${(e) => this.filterDestinations(e.target.value)}
            />
            <button class="px-4 py-2 border rounded text-sm flex items-center gap-1">
              <i class="fas fa-filter"></i> Filter
            </button>
          </div>

          <!-- Tabs Provinsi (nonaktif / dummy) -->
          <div class="flex gap-6 mt-4 border-b text-sm font-medium">
            ${['Untuk Kamu', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur'].map(
              (tab, i) => html`
                <button class="pb-2 ${i === 0 ? 'border-b-2 border-[#678337] text-[#678337]' : 'text-gray-600'}">
                  ${tab}
                </button>
              `
            )}
          </div>
        </div>

        <!-- Peta + Daftar -->
        <div class="flex-1 flex flex-col md:flex-row gap-6 px-4 overflow-hidden">
          <!-- Peta -->
          <div id="leafletMap" class="w-full md:w-2/3 h-full rounded border"></div>

       <!-- Daftar -->
<div class="w-full md:w-1/3 h-full overflow-y-auto pr-2">
  <div class="space-y-3">
    ${this.filteredDestinations.map(
      (d) => html`
        <div
          class="rounded border-l-4 border-[#678337] bg-white shadow hover:shadow-md transition p-4 cursor-pointer"
          @click=${() => this.flyToDestination(d.latitude, d.longitude, d.name)}
        >
          <h4 class="font-bold text-black">
            <a
              href="#/destinasi/detail/${d.id}"
              class="text-black hover:underline"
              @click=${(e) => e.stopPropagation()}
            >
              ${d.name}
            </a>
          </h4>
          <p class="text-sm text-gray-600 mt-1">
            ${d.description ? d.description.slice(0, 80) + '...' : '-'}
          </p>
          <div class="mt-2 text-xs text-gray-400">Koordinat: ${d.latitude}, ${d.longitude}</div>
        </div>
      `
    )}
  </div>
</div>

        </div>
      </section>
    `;
    render(template, this.container);
    setTimeout(() => this.initMap(this.filteredDestinations), 0);
  };

  this.updateView = updateView;
  updateView();
}

  renderError(message) {
    const template = html`
      <div class="text-center text-red-500 mt-20">${message}</div>
    `;
    render(template, this.container);
  }

  filterDestinations(keyword) {
    const lowerKeyword = keyword.toLowerCase();
    this.filteredDestinations = this.originalDestinations.filter((d) =>
      d.name.toLowerCase().includes(lowerKeyword)
    );
    this.updateView();
  }

  initMap(destinations) {
    if (!destinations.length) return;

    this.map = L.map('leafletMap').setView([destinations[0].latitude, destinations[0].longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    this.markers = destinations.map((d) =>
      L.marker([d.latitude, d.longitude])
        .addTo(this.map)
        .bindPopup(`<strong>${d.name}</strong><br>${d.latitude}, ${d.longitude}`)
    );
  }

  flyToDestination(lat, lng, name) {
    if (this.map) {
      this.map.flyTo([lat, lng], 14);
      L.popup()
        .setLatLng([lat, lng])
        .setContent(`<strong>${name}</strong>`)
        .openOn(this.map);
    }
  }
}
