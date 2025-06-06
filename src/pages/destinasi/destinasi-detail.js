import { html, render } from 'lit-html';
import { DestinasiDetailPresenter } from './destinasi-detail-presenter.js';
import { getSession } from '../../components/utils/auth.js'; 

export async function renderDestinasiDetailPage(container, destinationId) {
  const presenter = new DestinasiDetailPresenter();
  const session = getSession();
  const userId = session?.user?.userId;

  const data = await presenter.loadData(destinationId);
  let ulasan = null;
  let existingReview = null;
  // if (userId) {
  //   existingReview = await presenter.getUserReview(destinationId, userId);
  // }

  if (!data) {
    render(html`<p class="text-center text-red-500">Data tidak ditemukan.</p>`, container);
    return;
  }

  let comment = existingReview?.comment || '';
  let rating = existingReview?.rating || 5;
  let selectedTab = 'lokasi';

  const updateView = async () => {
    ulasan = await presenter.loadUlasan(destinationId);
    const template = html`
      <section class="max-w-5xl mx-auto px-4 py-6 mt-20">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold">${data.name}</h1>
            <p class="text-black-500 text-sm mt-1"><i class="fas fa-map-marker-alt"></i> ${data.location}</p>
            <p class="text-sm text-black-600 mt-2">
              <i class="fas fa-star text-yellow-400"></i> ${data.avgRating ?? 0} / ${data.totalReviews ?? 0} ulasan —
              <i class="fas fa-bookmark"></i> ${data.totalSaved ?? 0} orang menyimpan destinasi ini
            </p>
          </div>
          <button class="ml-auto border border-black bg-[#bea5a5] px-4 py-2 rounded-full text-sm hover:bg-gray-100">Simpan</button>
        </div>

        <!-- Tabs -->
        <div class="mt-6 border-b">
          <nav class="flex gap-4 text-sm font-medium text-gray-600">
            ${['lokasi', 'galeri', 'ulasan'].map(tab => html`
              <button
                class="py-2 ${selectedTab === tab ? 'border-b-2 border-black text-black' : 'hover:text-black'}"
                @click=${() => { selectedTab = tab; updateView(); }}
              >
                ${tab[0].toUpperCase() + tab.slice(1)}
              </button>
            `)}
          </nav>
        </div>

        ${selectedTab === 'lokasi' ? html`
          <div class="mt-6">
            <h2 class="text-xl font-semibold mb-2">Lokasi</h2>
            <div id="map" class="w-full h-64 rounded"></div>
            <p class="mt-4 text-sm text-gray-700">${data.description || '-'}</p>
          </div>
        ` : ''}

        ${selectedTab === 'galeri' ? html`
          <div class="mt-6">
            <h2 class="text-xl font-semibold mb-2">Galeri</h2>
            <div class="grid grid-cols-3 gap-4">
              ${(data.photo_urls || '')
                .split(' || ')
                .filter(url => url.trim() !== '')
                .map(img => html`
                  <div class="aspect-square border flex items-center justify-center bg-gray-100">
                    <img src="${img}" alt="galeri" class="object-cover w-full h-full" />
                  </div>
                `)}
            </div>
          </div>
        ` : ''}        

        ${selectedTab === 'ulasan' ? html`
          <div class="mt-6">
            <h2 class="text-xl font-semibold mb-2">Tulis Ulasan Kamu</h2>
            <!-- Bintang Rating -->
            <div class="flex items-center gap-1 mb-2">
              ${[1, 2, 3, 4, 5].map(i => html`
                <i
                  class="fa-star ${i <= rating ? 'fas text-yellow-500' : 'far text-gray-400'} cursor-pointer text-lg"
                  @click=${() => { rating = i; updateView(); }}
                ></i>
              `)}
            </div>

            <textarea id="reviewComment" class="w-full border rounded p-2" rows="4"
              placeholder="Tulis ulasan..." .value=${comment}></textarea>

            <button @click=${async () => {
              const commentVal = document.getElementById('reviewComment').value;
              const res = await presenter.submitReview({ destinationId, userId, comment: commentVal, rating });
                alert(res?.message || 'Berhasil disimpan');
                await updateView();
              }} class="mt-3 px-4 py-2 bg-blue-600 text-white rounded">
              Kirim Ulasan
            </button>
          </div>
          <div class="mt-6">
            ${Array.isArray(ulasan?.data) && ulasan.data.length > 0
              ? ulasan.data.map((d) => html`
                  <div class="flex gap-4 items-start bg-white border rounded-lg p-4 shadow-sm mb-4">
                    <div class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold text-white">
                      ${d.user_name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div class="flex-1">
                      <div class="flex justify-between items-center mb-1">
                        <h4 class="font-semibold text-sm text-gray-800">${d.user_name || 'Pengguna'}</h4>
                        <span class="text-xs text-gray-500">${new Date(d.created_at).toLocaleDateString()}</span>
                      </div>
                      <div class="flex items-center gap-1 text-yellow-400 text-sm mb-1">
                        ${[1, 2, 3, 4, 5].map(i => html`
                          <i class="${i <= d.rating ? 'fas' : 'far'} fa-star"></i>
                        `)}
                      </div>
                      <p class="text-sm text-gray-700">${d.comment}</p>
                    </div>
                  </div>
                `)
              : html`<p class="text-gray-500 text-sm">Belum ada ulasan.</p>`}
          </div>
        ` : ''}
      </section>
    `;

    render(template, container);

    // Inisialisasi peta hanya jika tab 'lokasi' aktif
    if (selectedTab === 'lokasi') {
      // Pastikan map belum pernah dibuat (agar tidak error saat re-render)
      if (window.leafletMap) {
        window.leafletMap.remove();
      }
      window.leafletMap = L.map('map').setView([data.latitude, data.longitude], 14);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(window.leafletMap);
      L.marker([data.latitude, data.longitude]).addTo(window.leafletMap)
        .bindPopup(data.name)
        .openPopup();
    }
  };

  await updateView();
} 
