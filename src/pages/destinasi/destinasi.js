import { html, render } from 'lit-html';
import DestinasiPresenter from './destinasi-presenter.js';
import { getSession } from '../../components/utils/auth.js';
import { getRecommendedDestinations } from '../../constants/urlApi.js';

export function renderDestinasi(container) {
  const view = new DestinasiView(container);
  const presenter = new DestinasiPresenter({ view });
  presenter.loadDestinations();
}

class DestinasiView {
  constructor(container) {
    this.container = container;
  }

  renderList(destinations, categories) {
    this.originalDestinations = destinations;
    this.filteredDestinations = [...destinations];
    this.originalCategories = categories;
    this.filteredCategories = [...categories];

    const updateView = () => {
      const template = html`
        <section class="mt-24 w-full h-[80vh] flex flex-col gap-4">
          <!-- Header -->
          <div class="mt-[1px]">
            <h2 class="text-2xl font-bold text-black">Destinasi</h2>
            <p class="text-sm text-gray-500 mt-1">
              <i class="fas fa-circle-info"></i>
              Klik kategori manapun untuk memulai perjalananmu
            </p>

            <!-- Search -->
            <div class="mt-4">
              <input
                type="text"
                placeholder="Cari destinasi..."
                class="flex-1 border w-full px-4 py-3 rounded-lg shadow-sm text-lg"
                @input=${(e) => this.filterDestinations(e.target.value)}
              />
            </div>

            <!-- Tabs -->
            <div class="flex gap-6 mt-4 border-b text-sm font-medium max-w-screen overflow-x-auto scrollbar-none">
              <!-- Tab manual "Untuk Kamu" -->
              <button
                @click=${(e) => this.searchKeyword(e, 'Untuk Kamu')}
                class="min-w-fit pb-2 flex gap-1 items-center text-gray-600 hover:text-[#678337] category-tab"
              >
                <i class="fas fa-wand-magic-sparkles text-yellow-400"></i>
                Untuk Kamu
              </button>

              <!-- Tab kategori dinamis -->
              ${this.filteredCategories.map(
                (tab) => html`
                  <button
                    @click=${(e) => this.searchCategory(e, tab.name)}
                    class="min-w-fit pb-2 text-gray-600 hover:text-[#678337] category-tab"
                  >
                    ${tab.name}
                  </button>
                `,
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
                      <div class="mt-2 text-xs text-gray-400">
                        Koordinat: ${d.latitude}, ${d.longitude}
                      </div>
                    </div>
                  `,
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
    const template = html` <div class="text-center text-red-500 mt-20">${message}</div> `;
    render(template, this.container);
  }

  filterDestinations(keyword) {
    const lowerKeyword = keyword.toLowerCase();
  
    this.filteredDestinations = this.originalDestinations.filter((d) => {
      const name = d.name?.toLowerCase() || '';
      const location = d.location?.toLowerCase() || '';
      const description = d.description?.toLowerCase() || '';
  
      return (
        name.includes(lowerKeyword) ||
        location.includes(lowerKeyword) ||
        description.includes(lowerKeyword)
      );
    });
  
    this.updateView();
  }  

  initMap(destinations) {
    if (!destinations.length) return;

    this.map = L.map('leafletMap').setView(
      [destinations[0].latitude, destinations[0].longitude],
      13,
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    this.markers = destinations.map((d) =>
      L.marker([d.latitude, d.longitude])
        .addTo(this.map)
        .bindPopup(`<strong>${d.name}</strong><br>${d.latitude}, ${d.longitude}`),
    );
  }

  flyToDestination(lat, lng, name) {
    if (this.map) {
      this.map.flyTo([lat, lng], 14);
      L.popup().setLatLng([lat, lng]).setContent(`<strong>${name}</strong>`).openOn(this.map);
    }
  }

  searchCategory(event, category) {
    // Reset semua tombol
    document.querySelectorAll('.category-tab').forEach((btn) => {
      btn.classList.remove('border-b-2', 'border-[#678337]', 'text-[#678337]');
      btn.classList.add('text-gray-600');
    });

    // Aktifkan tombol yang diklik
    const clickedBtn = event.currentTarget;
    clickedBtn.classList.remove('text-gray-600');
    clickedBtn.classList.add('border-b-2', 'border-[#678337]', 'text-[#678337]');

    const lowerKeyword = category.toLowerCase();

    this.filteredDestinations = this.originalDestinations.filter((d) => {
      const categories = d.categories?.split(',').map((c) => c.trim().toLowerCase()) || [];

      // Jika salah satu kategori cocok
      if (categories.includes(lowerKeyword)) {
        return true;
      }

      return false;
    });

    this.updateView();
  }

  async searchKeyword(event, keyword) {
    // Hapus semua class aktif dari tombol lain
    document.querySelectorAll('.category-tab').forEach((btn) => {
      btn.classList.remove('border-b-2', 'border-[#678337]', 'text-[#678337]');
      btn.classList.add('text-gray-600');
    });

    // Tambahkan class aktif ke tombol yang diklik
    const clickedBtn = event.currentTarget;
    clickedBtn.classList.remove('text-gray-600');
    clickedBtn.classList.add('border-b-2', 'border-[#678337]', 'text-[#678337]');

    // Logika khusus untuk tab "Untuk Kamu"
    if (keyword === 'Untuk Kamu') {
      const userId = getSession().user.userId;
      this.filteredDestinations = await this.loadRecommendedDestinations(userId);
    } else {
      // Logika filter kategori biasa
      const lowerKeyword = keyword.toLowerCase();
      this.filteredDestinations = this.originalDestinations.filter((d) => {
        const name = d.name?.toLowerCase() || '';
        const description = d.description?.toLowerCase() || '';
        const location = d.location?.toLowerCase() || '';

        // Jika name mengandung keyword, langsung lolos
        if (name.includes(lowerKeyword)) {
          return true;
        } else if (description.includes(lowerKeyword)) {
          return true;
        } else {
          return location.includes(lowerKeyword);
        }

      });
    }

    this.updateView();
  }

  async loadRecommendedDestinations(userId) {
    try {
      const json = await getRecommendedDestinations(userId);
      const data = json.data;

      if (json.status !== 'success') {
        throw new Error(json.message || 'Gagal mengambil data rekomendasi');
      }
      return data;
    } catch (err) {
      this.renderError(
        err.message || 'Terjadi kesalahan saat mengambil data rekomendasi destinasi',
      );
    }
  }
}
