import { html, render } from 'lit-html';

export async function renderEventDetailPage(container) {
  const page = new EventDetailPage();
  page.renderTo(container);
}

class EventDetailPage {
  #data = {
    title: 'Festival Budaya Bali',
    category: 'Budaya',
    location: 'Bali',
    startDate: '2025-06-10',
    endDate: '2025-06-12',
    description: `Perayaan keberagaman budaya dari berbagai daerah Indonesia. Akan ada pertunjukan tari tradisional, pameran batik, dan bazar kuliner khas.`,
    url: 'https://idetrips.com/bali-arts-festival/',
  };

  constructor() {
    this.reviewText = '';
    this.rating = 0;
    this.isSaved = this.checkIsSaved();
    this.reviews = this.getReviews();
    this.container = null;
  }

  renderTo(container) {
    this.container = container;
    render(this.render(), container);
  }

  checkIsSaved() {
    const saved = JSON.parse(localStorage.getItem('bookmarkedEvents') || '[]');
    return saved.some(e => e.title === this.#data.title);
  }

  toggleSave() {
    const saved = JSON.parse(localStorage.getItem('bookmarkedEvents') || '[]');
    const exists = saved.find(e => e.title === this.#data.title);

    if (exists) {
      const filtered = saved.filter(e => e.title !== this.#data.title);
      localStorage.setItem('bookmarkedEvents', JSON.stringify(filtered));
    } else {
      saved.push(this.#data);
      localStorage.setItem('bookmarkedEvents', JSON.stringify(saved));
    }

    this.isSaved = !this.isSaved;
    this.update();
  }

  getReviews() {
    const all = JSON.parse(localStorage.getItem('eventReviews') || '{}');
    return all[this.#data.title] || [];
  }

  saveReview() {
    if (this.rating === 0 || !this.reviewText.trim()) return;

    const newReview = {
      rating: this.rating,
      text: this.reviewText,
      time: new Date().toISOString(),
    };

    const all = JSON.parse(localStorage.getItem('eventReviews') || '{}');
    const current = all[this.#data.title] || [];
    current.push(newReview);
    all[this.#data.title] = current;

    localStorage.setItem('eventReviews', JSON.stringify(all));

    this.reviewText = '';
    this.rating = 0;
    this.reviews = current;
    this.update();
  }

  update() {
    if (this.container) render(this.render(), this.container);
  }

  render() {
    const data = this.#data;

    return html`
      <section class="px-4 mt-24 text-left">
        <div class="max-w-4xl bg-white border border-[#3c2b2b] rounded-lg shadow-md overflow-hidden mx-auto">
        <div class="p-6 space-y-4 text-gray-800">
          <img src="${data.image}" alt="${data.title}" class="w-50 h-50 object-cover rounded-md flex-shrink-0"/>
            <h1 class="text-2xl font-bold text-black">${data.title}</h1>

            <p><i class="fas fa-tags text-black"></i> <strong>Kategori:</strong> ${data.category}</p>
            <p><i class="fas fa-map-marker-alt text-black"></i> <strong>Lokasi:</strong> ${data.location}</p>
            <p><i class="fas fa-calendar-alt text-black"></i> <strong>Tanggal:</strong> ${this.formatRangeTanggal(data.startDate, data.endDate)}</p>
            <p><i class="fas fa-book text-black"></i> ${data.description}</p>

            <div class="flex items-center justify-between">
              <a
                href="${data.url}"
                class="text-blue-600 hover:underline break-all text-sm"
                target="_blank"
              >
                <i class="fas fa-link mr-1 text-black"></i>
                ${data.url}
              </a>

              <button
                @click=${() => this.toggleSave()}
                title="${this.isSaved ? 'Tersimpan' : 'Simpan'}"
                class="text-2xl hover:scale-110 transition"
              >
                <i class="${this.isSaved ? 'fas' : 'far'} fa-bookmark text-black"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- REVIEW -->
        <div class="max-w-4xl mx-auto mt-6 bg-[#bea5a5] border border-[#3c2b2b] rounded-lg shadow-md p-6">
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
                  <i class="fa-star ${i <= this.rating ? 'fas text-yellow-500' : 'far text-white'}"></i>
                </span>
              `,
            )}
          </div>

          <textarea
            rows="3"
            class="w-full border px-3 py-2 rounded text-sm bg-white text-black placeholder-grey"
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

        ${this.reviews.length > 0
          ? html`
              <div class="max-w-4xl mx-auto mt-6 bg-white border border-[#3c2b2b] rounded-lg shadow-md p-6">
                <h2 class="text-lg font-semibold text-[#3c2b2b] mb-2">Ulasan Pengunjung</h2>
                <ul class="space-y-3">
                  ${this.reviews.map(
                    (r) => html`
                      <li class="border rounded p-3 text-sm bg-[#bea5a5] text-white">
                        <div class="flex items-center gap-1 mb-1">
                          ${[1, 2, 3, 4, 5].map(
                            (i) =>
                              html`<i class="fa-star ${i <= r.rating ? 'fas text-yellow-500' : 'far text-white'}"></i>`,
                          )}
                        </div>
                        <p class="text-black">${r.text}</p>
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

  async afterRender() {}

  formatRangeTanggal(start, end) {
    const formatter = new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    const s = new Date(start);
    const e = new Date(end);
    const isSame =
      s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear();
    return isSame
      ? `${s.getDate()} – ${formatter.format(e)}
      ` : `${formatter.format(s)} – ${formatter.format(e)}`;
  }
}
