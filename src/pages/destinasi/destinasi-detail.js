import { html, render } from 'lit-html';
import { DestinasiDetailPresenter } from './destinasi-detail-presenter.js';
import { getSession } from '../../components/utils/auth.js';
import {
  addDestinationBookmark,
  getUserBookmarks,
  removeBookmark,
} from '../../constants/urlApi.js';
import Swal from 'sweetalert2';

export async function renderDestinasiDetailPage(container, destinationId) {
  const presenter = new DestinasiDetailPresenter();
  const session = getSession();
  const userId = session?.user?.userId;

  let data = null;
  data = await presenter.loadData(destinationId);

  if (!data) {
    render(html`<p class="text-center text-red-500">Data tidak ditemukan.</p>`, container);
    return;
  }

  let ulasan = null;
  let comment = '';
  let rating = 0;

  let selectedTab = 'lokasi';

  async function handleAddBookmark(destinationId) {
    const res = await addDestinationBookmark(destinationId);
    if (res.ok) {
      await Swal.fire({
        title: 'Berhasil!',
        text: 'Bookmark berhasil ditambahkan.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#483434',
      });
      await updateView();
      return true;
    } else {
      await Swal.fire({
        title: 'Oops!',
        text: 'Terjadi kesalahan saat menambahkan bookmark.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#483434',
      });
      return false;
    }
  }

  async function handleRemoveBookmark(destinationId, userId) {
    const result = await getUserBookmarks();
    const bookmarks = result.data;

    const found = bookmarks.find((b) => b.destination_id == destinationId && b.user_id == userId);

    if (found) {
      const res = await removeBookmark(found.id);
      if (res.ok) {
        await Swal.fire({
          title: 'Berhasil!',
          text: 'Bookmark berhasil dihapus.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#483434',
        });
        await updateView();
        return true;
      } else {
        await Swal.fire({
          title: 'Oops!',
          text: 'Terjadi kesalahan saat menghapus bookmark.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#483434',
        });
        return false;
      }
    } else {
      await Swal.fire({
        title: 'Oops!',
        text: 'Bookmark tidak ditemukan.',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#483434',
      });
      return false;
    }
  }

  let isEditing = false;
  const updateView = async () => {
    data = await presenter.loadData(destinationId);
    ulasan = await presenter.loadUlasan(destinationId);
    const userReview = ulasan?.data?.find((d) => d.user_id === userId);
    const otherReviews = ulasan?.data?.filter((d) => d.user_id !== userId);
    if (!isEditing && userReview) {
      comment = userReview.comment;
      rating = userReview.rating;
    }

    const template = html`
      <section class="max-w-5xl mx-auto px-4 py-6 mt-20">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold">${data.name}</h1>
            <p class="text-black-500 text-sm mt-1">
              <i class="fas fa-map-marker-alt"></i> ${data.location}
            </p>
            <p class="text-sm text-black-600 mt-2">
              <i class="fas fa-star text-yellow-400"></i>
              ${data.rating_average
                ? `${data.rating_average} / 5 (${data.rating_count} ulasan) | `
                : 'Belum ada ulasan | '}
              <i class="fas fa-bookmark"></i> ${data.bookmark_count ?? 0} orang menyimpan ini
            </p>
          </div>
          <button
            id="save-dest"
            title="${data.is_saved ? 'Tersimpan' : 'Simpan'}"
            class="text-2xl hover:scale-110 transition"
            @click=${async () => {
              const success = data.is_saved
                ? await handleRemoveBookmark(destinationId, userId)
                : await handleAddBookmark(destinationId);
              if (success) await updateView();
            }}
          >
            <i class="${data.is_saved ? 'fas' : 'far'} fa-bookmark text-black"></i>
          </button>
        </div>

        <!-- Tabs -->
        <div class="mt-6 border-b max-w-screen overflow-x-auto">
          <nav class="flex gap-4 text-sm font-medium text-gray-600">
            ${['lokasi', 'galeri', 'ulasan'].map(
              (tab) => html`
                <button
                  class="tab-items py-2 ${selectedTab === tab
                    ? 'border-b-2 border-black text-black'
                    : 'hover:text-black'}"
                  @click=${() => {
                    selectedTab = tab;
                    updateView();
                  }}
                >
                  ${tab[0].toUpperCase() + tab.slice(1)}
                </button>
              `,
            )}
          </nav>
        </div>

        ${selectedTab === 'lokasi'
          ? html`
              <div class="mt-6">
                <h2 class="text-xl font-semibold mb-2">Lokasi</h2>
                <div id="map" class="w-full h-64 rounded"></div>
                <p class="mt-4 text-sm text-gray-700">${data.description || '-'}</p>
              </div>
            `
          : ''}
        ${selectedTab === 'galeri'
          ? html`
              <div class="mt-6">
                <h2 class="text-xl font-semibold mb-2">Galeri</h2>
                <div class="grid md:grid-cols-3 gap-4">
                  ${(data.photo_urls || '')
                    .split(' || ')
                    .filter((url) => url.trim() !== '')
                    .map(
                      (img) => html`
                        <div
                          class="aspect-square border flex items-center justify-center bg-gray-100"
                        >
                          <img src="${img}" alt="galeri" class="object-cover w-full h-full" />
                        </div>
                      `,
                    )}
                </div>
              </div>
            `
          : ''}
        ${selectedTab === 'ulasan'
          ? html`
              <div class="mt-6 border border-black rounded-xl p-4">
                <h2 class="text-xl font-semibold mb-2">Ulasan Kamu</h2>
                ${userReview && !isEditing
                  ? html`
                      <div class="bg-gray-100 p-4 rounded shadow-sm">
                        <div class="flex justify-between mb-2">
                          <div class="flex items-center gap-1 text-yellow-400 text-sm">
                            ${[1, 2, 3, 4, 5].map(
                              (i) =>
                                html`<i
                                  class="${i <= userReview.rating ? 'fas' : 'far'} fa-star"
                                ></i>`,
                            )}
                          </div>
                          <div class="flex gap-2">
                            <button
                              class="text-sm text-blue-600 hover:underline"
                              @click=${() => {
                                isEditing = true;
                                updateView();
                              }}
                            >
                              Edit
                            </button>
                            <button
                              class="text-sm text-red-600 hover:underline"
                              @click=${async () => {
                                const confirm = await Swal.fire({
                                  title: 'Hapus Ulasan?',
                                  text: 'Ulasanmu akan dihapus permanen.',
                                  icon: 'warning',
                                  showCancelButton: true,
                                  confirmButtonText: 'Ya, Hapus',
                                  cancelButtonText: 'Batal',
                                  confirmButtonColor: '#483434',
                                });

                                if (confirm.isConfirmed) {
                                  await presenter.deleteReview(userReview.id);
                                  await Swal.fire({
                                    icon: 'success',
                                    title: 'Ulasan Dihapus',
                                    text: 'Ulasanmu berhasil dihapus.',
                                    confirmButtonColor: '#483434',
                                    timer: 1500,
                                    showConfirmButton: false,
                                  });
                                  comment = '';
                                  rating = 0;
                                  await updateView();
                                }
                              }}
                            >
                              Hapus
                            </button>
                          </div>
                        </div>
                        <p class="text-sm text-gray-800">${userReview.comment}</p>
                      </div>
                    `
                  : html`
                      <div class="mt-2">
                        <div class="flex items-center gap-1 mb-2">
                          ${[1, 2, 3, 4, 5].map(
                            (i) => html`
                              <i
                                class="fa-star ${i <= rating
                                  ? 'fas text-yellow-500'
                                  : 'far text-gray-400'} cursor-pointer text-lg"
                                @click=${() => {
                                  rating = i;
                                  updateView();
                                }}
                              ></i>
                            `,
                          )}
                        </div>

                        <textarea
                          id="reviewComment"
                          class="w-full border rounded p-2"
                          rows="4"
                          placeholder="Tulis ulasan..."
                          .value=${comment}
                          @input=${(e) => {
                            comment = e.target.value;
                          }}
                        ></textarea>

                        <div class="flex gap-2 mt-3 justify-end">
                          ${userReview
                            ? html`
                                <button
                                  class="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                                  @click=${() => {
                                    isEditing = false;
                                    updateView();
                                  }}
                                >
                                  Batal
                                </button>
                              `
                            : ''}
                          <button
                            @click=${async () => {
                              const commentVal = document.getElementById('reviewComment').value;
                              const res = await presenter.submitReview({
                                destinationId,
                                userId,
                                comment: commentVal,
                                rating,
                              });

                              if (res) {
                                await Swal.fire({
                                  icon: 'success',
                                  title: userReview ? 'Ulasan Diperbarui' : 'Ulasan Terkirim',
                                  text: userReview
                                    ? 'Ulasanmu berhasil diperbarui.'
                                    : 'Terima kasih atas ulasanmu!',
                                  confirmButtonColor: '#483434',
                                  timer: 1500,
                                  showConfirmButton: false,
                                });
                              }

                              isEditing = false;
                              await updateView();
                            }}
                            class="px-4 py-2 bg-primary text-white rounded"
                          >
                            ${userReview ? 'Perbarui Ulasan' : 'Kirim Ulasan'}
                          </button>
                        </div>
                      </div>
                    `}
              </div>

              <!-- Ulasan Pengguna Lain -->
              <div class="mt-6 flex flex-col gap-3">
                <h2 class="text-lg font-semibold mb-2">Ulasan Pengunjung</h2>
                ${otherReviews && otherReviews.length > 0
                  ? otherReviews.map(
                      (d) => html`
                        <div
                          class="flex gap-4 items-start bg-white border rounded-lg p-4 shadow-sm"
                        >
                          <div
                            class="w-10 h-10 rounded-full bg-[#678337] flex items-center justify-center text-sm font-bold text-white"
                          >
                            ${d.name?.[0]?.toUpperCase() || 'U'}
                          </div>
                          <div class="flex-1">
                            <div class="flex justify-between items-center mb-1">
                              <h4 class="font-semibold text-sm text-gray-800">
                                ${d.name || 'Pengguna'}
                              </h4>
                              <span class="text-xs text-gray-500"
                                >${new Date(d.updated_at).toLocaleDateString()}</span
                              >
                            </div>
                            <div class="flex items-center gap-1 text-yellow-400 text-sm mb-1">
                              ${[1, 2, 3, 4, 5].map(
                                (i) => html`
                                  <i class="${i <= d.rating ? 'fas' : 'far'} fa-star"></i>
                                `,
                              )}
                            </div>
                            <p class="text-sm text-gray-700">${d.comment}</p>
                          </div>
                        </div>
                      `,
                    )
                  : html`<p class="text-gray-500 text-sm">Belum ada ulasan lain.</p>`}
              </div>
            `
          : ''}
      </section>
    `;

    render(template, container);

    // Peta
    if (selectedTab === 'lokasi') {
      if (window.leafletMap) {
        window.leafletMap.remove();
      }
      window.leafletMap = L.map('map').setView([data.latitude, data.longitude], 14);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(window.leafletMap);
      L.marker([data.latitude, data.longitude])
        .addTo(window.leafletMap)
        .bindPopup(data.name)
        .openPopup();
    }
  };

  await updateView();
}
