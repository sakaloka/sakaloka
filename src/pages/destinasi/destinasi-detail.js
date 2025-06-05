import { html, render } from 'lit-html';
import { DestinasiDetailPresenter } from './destinasi-detail-presenter.js';
import { getSession } from '../../components/utils/auth.js'; 

export async function renderDestinasiDetailPage(container, destinationId) {
  const presenter = new DestinasiDetailPresenter();
  const session = getSession();
  const userId = session?.user?.id;

  const data = await presenter.loadData(destinationId);
  let existingReview = null;
  if (userId) {
    existingReview = await presenter.getUserReview(destinationId, userId);
  }

  if (!data) {
    render(html`<p class="text-center text-red-500">Data tidak ditemukan.</p>`, container);
    return;
  }

  let comment = existingReview?.comment || '';
  let rating = existingReview?.rating || 5;
  let selectedTab = 'lokasi';

  const updateView = () => {
    const template = html`
      <section class="max-w-5xl mx-auto px-4 py-6 mt-20">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold">${data.name}</h1>
            <p class="text-black-500 text-sm mt-1"><i class="fas fa-map-marker-alt"></i> ${data.city}, ${data.province}</p>
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
           <iframe
        class="w-full h-64 rounded"
        loading="lazy"
        allowfullscreen
        src="https://www.google.com/maps?q=${data.latitude},${data.longitude}&z=14&output=embed">
        </iframe>
            <p class="mt-4 text-sm text-gray-700">${data.description || '-'}</p>
          </div>
        ` : ''}

        ${selectedTab === 'galeri' ? html`
          <div class="mt-6">
            <h2 class="text-xl font-semibold mb-2">Galeri</h2>
            <div class="grid grid-cols-3 gap-4">
              ${(data.gallery || []).map(img => html`
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
            }} class="mt-3 px-4 py-2 bg-blue-600 text-white rounded">
              Kirim Ulasan
            </button>
          </div>
        ` : ''}
      </section>
    `;

    render(template, container);
  };

  updateView();
} 
