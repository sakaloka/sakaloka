import { html, render } from 'lit-html'; 
import HomePresenter from './home-presenter.js';
import { navigateTo } from '../../components/utils/navigateTo.js';

export async function renderHome(container) {
  const presenter = new HomePresenter({ view: { showDashboard } });
  const summary = await presenter.getSummary();
  showDashboard(summary);

  function showDashboard({ totalFavorit, totalDestinasi, totalEvent }) {
    const template = html`
      <section class="px-4 transition-all duration-300">
        <!-- Judul Dashboard -->
        <div class="mt-[90px] flex items-center mb-6">
          <h2 class="text-xl font-bold text-black">Dashboard</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Favorit -->
          <div
            class="bg-white border border-black rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition"
            @click=${() => navigateTo('bookmark')}
          >
            <div class="border border-black p-3 rounded-full">
              <svg class="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
                C13.09 3.81 14.76 3 16.5 3
                19.58 3 22 5.42 22 8.5
                c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-500">Total Favorit Kamu</p>
              <p class="text-xl font-semibold text-black">${totalFavorit}</p>
            </div>
          </div>

          <!-- Destinasi -->
          <div
            class="bg-white border border-black rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition"
            @click=${() => navigateTo('destinasi')}
          >
            <div class="border border-black p-3 rounded-full">
              <svg
                class="w-6 h-6 text-black"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z" />
                <path d="M9 3v15M15 6v15" />
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-500">Total Destinasi Untuk Kamu</p>
              <p class="text-xl font-semibold text-black">${totalDestinasi}</p>
            </div>
          </div>

          <!-- Acara Budaya -->
          <div
            class="bg-white border border-black rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition"
            @click=${() => navigateTo('event')}
          >
            <div class="border border-black p-3 rounded-full">
              <svg
                class="w-6 h-6 text-black"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-500">Total Acara Budaya Untuk Kamu</p>
              <p class="text-xl font-semibold text-black">${totalEvent}</p>
            </div>
          </div>
        </div>
      </section>
    `;

    render(template, container);
  }
}
