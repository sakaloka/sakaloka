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

      this.reviews = await this.presenter.getReviews(this.#data.id);
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

    const result = await this.presenter.submitReview({
      comment: this.reviewText,
      rating: this.rating,
      userId,
      eventId: this.#data.id,
    });

    if (result.status === 'success') {
      this.reviewText = '';
      this.rating = 0;
      this.reviews = await this.presenter.getReviews(this.#data.id);
      this.update();
    } else {
      alert(result.message || 'Gagal mengirim ulasan.');
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

  update() {
    if (this.container) render(this.render(), this.container);
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
        <div
          class="max-w-4xl mx-auto mt-6 bg-[#bea5a5] border border-[#3c2b2b] rounded-lg shadow-md p-6"
        >
          <h2 class="text-lg font-semibold text-[#3c2b2b] mb-2">Tulis Review</h2>
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
                    class="fa-star ${i <= this.rating ? 'fas text-yellow-500' : 'far text-white'}"
                  ></i>
                </span>
              `,
            )}
          </div>
          <textarea
            rows="3"
            class="w-full border px-3 py-2 rounded text-sm bg-white text-black placeholder-gray"
            .value=${this.reviewText}
            @input=${(e) => (this.reviewText = e.target.value)}
            placeholder="Tulis ulasanmu di sini..."
          ></textarea>
          <div class="flex justify-end mt-2">
            <button
              class="bg-[#3c2b2b] text-white px-4 py-2 rounded hover:bg-[#483434]"
              @click=${() => this.saveReview()}
            >
              Kirim Review
            </button>
          </div>
        </div>

        <!-- List Review -->
        ${this.reviews.length > 0
          ? html`
              <div
                class="max-w-4xl mx-auto mt-6 bg-white border border-[#3c2b2b] rounded-lg shadow-md p-6"
              >
                <h2 class="text-lg font-semibold text-[#3c2b2b] mb-2">Ulasan Pengunjung</h2>
                <ul class="space-y-3">
                  ${this.reviews.map(
                    (r) => html`
                      <li class="border rounded p-3 text-sm bg-[#bea5a5] text-white">
                        <div class="flex items-center gap-1 mb-1">
                          ${[1, 2, 3, 4, 5].map(
                            (i) =>
                              html`<i
                                class="fa-star ${i <= r.rating
                                  ? 'fas text-yellow-500'
                                  : 'far text-white'}"
                              ></i>`,
                          )}
                        </div>
                        <p class="text-black">${r.comment}</p>
                      </li>
                    `,
                  )}
                </ul>
              </div>
            `
          : ''}
      </section>
    `;
  }
}
