import { html, render } from 'lit-html';
import { addEventBookmark, getEventById, getUserBookmarks, removeBookmark } from '../../constants/urlApi';
import { EventDetailPresenter } from './event-detail-presenter.js';
import { getSession } from '../../components/utils/auth.js';

export async function renderEventDetailPage(container, id) {
  const page = new EventDetailPage(id);
  await page.init();
  page.renderTo(container);
}

class EventDetailPage {
  #data = null;

  constructor(id) {
    this.userReview = null;
    this.isEditing = false;
    this.id = id;
    this.reviewText = '';
    this.rating = 0;
    this.isSaved = false;
    this.reviews = [];
    this.container = null;
    this.presenter = new EventDetailPresenter();
  }

  async init() {
    try {
      const json = await getEventById(this.id);
      const data = json?.data[0];
      if (!data) throw new Error('Data event tidak ditemukan');

      this.#data = {
        id: data.id,
        title: data.title,
        category: data.category,
        location: data.location,
        startDate: data.start_date,
        endDate: data.end_date,
        description: data.description,
        url: data.detail_url,
        image: data.image || '/images/default.jpg',
        isSaved: data.is_saved, 
      };

      const session = getSession();
      const userId = session?.user?.userId;

      this.reviews = await this.presenter.getReviews(this.#data.id);

      // Pisahkan review user sendiri dari list umum
      if (userId) {
        const existing = this.reviews.find(r => r.user_id === userId);
        if (existing) {
          this.userReview = existing;
          this.reviewText = existing.comment;
          this.rating = existing.rating;

          // Filter biar nggak double tampil
          this.reviews = this.reviews.filter(r => r.user_id !== userId);
        }
      }
    } catch (err) {
      console.error('Gagal ambil detail event:', err);
      this.#data = {
        title: 'Event tidak ditemukan',
        category: '-',
        location: '-',
        startDate: '2025-01-01',
        endDate: '2025-01-01',
        description: 'Event tidak tersedia',
        url: '#',
        image: '/images/default.jpg',
        isSaved: 0,
      };
    }
  }

  renderTo(container) {
    this.container = container;
    render(this.render(), container);
  }

  
  async toggleSave(isSaved, eventId) {
    const session = getSession();
    const userId = session?.user?.userId;
  
    if (!userId) {
      alert('Anda harus login untuk menyimpan event.');
      return;
    }
  
    if (!isSaved) {
      const res = await addEventBookmark(eventId);
      if (res.ok) {
        alert('Bookmark berhasil ditambahkan');
        this.#data.isSaved = true; 
      } else {
        alert('Gagal menambahkan bookmark');
      }
    } else {
      const result = await getUserBookmarks();
      const bookmarks = result.data;
  
      const found = bookmarks.find(
        (b) => b.event_id === eventId && b.user_id === userId
      );
  
      if (found) {
        const res = await removeBookmark(found.id);
        if (res.ok) {
          alert('Bookmark berhasil dihapus');
          this.#data.isSaved = false; 
        } else {
          alert('Gagal menghapus bookmark');
        }
      } else {
        alert('Bookmark tidak ditemukan');
      }
    }
  
    this.update(); 
  }
  

  async saveReview() {
    if (this.rating === 0 || !this.reviewText.trim()) return;
  
    const session = getSession();
    const userId = session?.user?.userId;
  
    const payload = {
      comment: this.reviewText,
      rating: this.rating,
      userId,
      eventId: this.#data.id,
    };
  
    let result;
    if (this.userReview) {
      // Sudah ada review → update
      result = await this.presenter.updateReview(this.userReview.id, payload.comment, payload.rating);
      if (result) this.isEditing = false;
    } else {
      // Belum ada → add
      result = await this.presenter.submitReview(payload);
    }
  
    if (result) {
      this.reviewText = '';
      this.rating = 0;
      this.userReview = null;
      this.reviews = await this.presenter.getReviews(this.#data.id);
      await this.init(); 
      this.update();
    } else {
      alert(result.message || 'Gagal mengirim ulasan.');
    }
  }  

  async deleteReview () {
    const result = await this.presenter.deleteReview(this.userReview.id);
    if (result) {
      this.isEditing = false;
      this.reviewText = '';
      this.rating = 0;
      this.userReview = null;
      this.reviews = await this.presenter.getReviews(this.#data.id);
      await this.init(); 
      this.update();
    } else {
      alert('Gagal menghapus ulasan.');
    }
  }

  formatRangeTanggal(start, end) {
    const formatter = new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    const s = new Date(start);
    const e = new Date(end);
    const isSame = s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear();
    return isSame
      ? `${s.getDate()} – ${formatter.format(e)}`
      : `${formatter.format(s)} – ${formatter.format(e)}`;
  }

  parseMySQLDate(mysqlDateStr) {
    return new Date(mysqlDateStr.replace(' ', 'T'));
  }
  
  formatTanggalIndo(dateStr) {
    const date = this.parseMySQLDate(dateStr);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  }
  
  formatWaktuRelatif(dateStr) {
    const now = new Date();
    const past = this.parseMySQLDate(dateStr);
    const diffMs = now - past;
  
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (seconds < 60) return 'Baru saja';
    if (minutes < 60) return `${minutes} menit yang lalu`;
    if (hours < 24) return `${hours} jam yang lalu`;
    if (days < 7) return `${days} hari yang lalu`;
  
    return this.formatTanggalIndo(dateStr);
  }   

  update() {
    if (this.container) render(this.render(), this.container);
  }

  renderReviewForm(isEditing = false) {
    return html`
      <div
        class="max-w-4xl mx-auto mt-6 bg-white border border-[#3c2b2b] rounded-lg shadow-md p-6"
      >
        <h2 class="text-lg font-semibold text-[#3c2b2b] mb-2">
          ${this.userReview ? 'Ulasan Kamu' : 'Tulis Ulasan'}
        </h2>
        <div class="flex items-center gap-1 mb-3">
          ${[1, 2, 3, 4, 5].map(
            (i) => html`
              <span
                class="cursor-pointer"
                @click=${() => {
                  this.rating = i;
                  this.update();
                }}
              >
                <i
                  class="fa-star ${i <= this.rating ? 'fas text-yellow-500' : 'far text-gray'}"
                ></i>
              </span>
            `,
          )}
        </div>
        <textarea
          rows="3"
          class="w-full border px-3 border-[#3c2b2b] py-2 rounded text-sm bg-white text-black placeholder-gray"
          .value=${this.reviewText}
          @input=${(e) => (this.reviewText = e.target.value)}
          placeholder="Tulis ulasanmu di sini..."
        ></textarea>
        <div class="flex justify-end mt-2 gap-3">
          ${this.userReview
            ? html`
                <button
                  class="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                  @click=${() => {
                    this.isEditing = false;
                    this.update();
                  }}
                >
                  Batal
                </button>
              `
            : ''}
          <button
            class="bg-[#3c2b2b] text-white px-4 py-2 rounded hover:bg-[#483434]"
            @click=${() => this.saveReview()}
          >
            ${this.userReview ? 'Simpan Perubahan' : 'Kirim'}
          </button>
        </div>
      </div>
    `;
  }  

  render() {
    const d = this.#data;

    return html`
      <section class="mt-24 text-left relative">
        <div class="max-w-4xl mx-auto flex justify-right mb-2">
          <a
            href="#/event"
            class="text-sm px-4 py-2 bg-[#3c2b2b] text-white rounded hover:bg-[#4a3838] transition"
          >
            ← Kembali ke Event
          </a>
        </div>

        <div
          class="max-w-4xl bg-white border border-[#3c2b2b] rounded-lg shadow-md overflow-hidden mx-auto"
        >
          <div class="p-6 space-y-4 text-gray-800">
            <img
              src="${d.image}"
              alt="${d.title}"
              class="w-40 h-40 object-cover rounded-md flex-shrink-0"
            />
            <h1 class="text-2xl font-bold text-black">${d.title}</h1>
            <p><i class="fas fa-tags text-black"></i> <strong>Kategori:</strong> ${d.category}</p>
            <p>
              <i class="fas fa-map-marker-alt text-black"></i>
              <strong>Lokasi:</strong> ${d.location}
            </p>
            <p>
              <i class="fas fa-calendar-alt text-black"></i>
              <strong>Tanggal:</strong> ${this.formatRangeTanggal(d.startDate, d.endDate)}
            </p>
            <p><i class="fas fa-book text-black"></i> ${d.description}</p>

            <div class="flex items-center justify-between pt-4 border-t mt-4">
              <a
                href="${d.url}"
                class="text-blue-600 hover:underline break-all text-sm"
                target="_blank"
              >
                <i class="fas fa-link mr-1 text-black"></i> ${d.url}
              </a>
              <button
                @click=${() => this.toggleSave(d.isSaved, d.id)}
                title="${d.isSaved ? 'Tersimpan' : 'Simpan'}"
                class="text-2xl hover:scale-110 transition"
              >
                <i class="${d.isSaved ? 'fas' : 'far'} fa-bookmark text-black"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Form Review -->
        ${!this.userReview || this.isEditing
          ? this.renderReviewForm()
          : html`
              <div class="max-w-4xl mx-auto mt-6 bg-[#FFF] border border-primary rounded-lg shadow-md p-6">
                <h2 class="text-lg font-semibold text-[#3c2b2b] mb-3">Ulasan Kamu</h2>
                <div class="bg-gray-100 p-4 rounded shadow-sm mt-4">
                  <div class="flex justify-between mb-2">
                    <div class="flex items-center gap-1 text-yellow-400 text-sm">
                      ${[1, 2, 3, 4, 5].map(
                        (i) => html`<i class="${i <= this.userReview.rating ? 'fas' : 'far'} fa-star"></i>`
                      )}
                    </div>
                    <div class="flex gap-2">
                      <button
                        class="text-sm text-blue-600 hover:underline"
                        @click=${() => {
                          this.reviewText = this.userReview.comment;
                          this.rating = this.userReview.rating;
                          this.isEditing = true;
                          this.update();
                        }}
                      >
                        Edit
                      </button>
                      <button
                        class="text-sm text-red-600 hover:underline"
                        @click=${async () => {
                          const confirmed = confirm('Yakin hapus ulasanmu?');
                          if (confirmed) {
                            await this.deleteReview();
                          }
                        }}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                  <p class="text-sm text-gray-800">${this.userReview.comment}</p>
                </div>
              </div>
          `
        }     

        <!-- List Review -->
              <div
                class="max-w-4xl mx-auto mt-6 bg-white border border-[#3c2b2b] rounded-lg shadow-md p-6"
              >
                <h2 class="text-lg font-semibold text-[#3c2b2b] mb-3">Ulasan Pengunjung</h2>
                <div class="flex flex-col gap-3">
                  ${Array.isArray(this.reviews) && this.reviews.length > 0
                    ? this.reviews.map(
                        (d) => html`
                          <div
                            class="flex gap-4 items-start bg-white border rounded-lg p-4 shadow-sm"
                          >
                            <div
                              class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold text-white"
                            >
                              ${d.name?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <div class="flex-1">
                              <div class="flex justify-between items-center mb-1">
                                <h4 class="font-semibold text-sm text-gray-800">
                                  ${d.name || 'Pengguna'}
                                </h4>
                                <span class="text-xs text-gray-500"
                                  >${this.formatWaktuRelatif(d.updated_at)}</span
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
                    : html`<p class="text-gray-500 text-sm">Belum ada ulasan dari pengunjung</p>`}
                </div>
              </div>
      </section>
    `;
  }
}
