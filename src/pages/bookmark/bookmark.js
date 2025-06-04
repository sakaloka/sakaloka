import { html, render } from 'lit-html';

export async function renderBookmarkPage(container) {
  const page = new BookmarkPage();
  const template = await page.render();
  render(template, container);
  await page.afterRender();
}

class BookmarkPage {
  #dummyBookmarks = [
    {
      id: 1,
      title: 'Festival Budaya Bali',
      category: 'Acara Budaya',
      imageUrl: '/images/bali-festival.jpg',
    },
    {
      id: 2,
      title: 'Pantai Kuta',
      category: 'Destinasi',
      imageUrl: '/images/kuta.jpg',
    },
    {
      id: 3,
      title: 'Upacara Ngaben',
      category: 'Acara Budaya',
      imageUrl: '/images/ngaben.jpg',
    },
  ];

  async render() {
    return html`
      <section class="px-4 mt-[90px] text-left">
        <h2 class="text-2xl font-bold text-black mb-6">Bookmark</h2>
        <div id="bookmark-list"></div>
      </section>
    `;
  }

  async afterRender() {
    this.displayBookmarks(this.#dummyBookmarks);
  }

  displayBookmarks(bookmarks) {
    const container = document.getElementById('bookmark-list');

    if (!bookmarks || bookmarks.length === 0) {
      render(html`<p class="text-gray-600">Tidak ada bookmark yang disimpan.</p>`, container);
      return;
    }

    const template = html`
      <div class="flex flex-col gap-4">
        ${bookmarks.map(
          (item) => html`
            <div
              class="flex items-center border border-black rounded-lg p-3 bg-white w-full max-w-xl"
            >
              <img
                src="${item.imageUrl}"
                alt="${item.title}"
                class="w-16 h-12 object-cover rounded-md flex-shrink-0"
              />
              <div class="flex-grow ml-3">
                <h3 class="font-semibold text-sm text-[#678337] mb-1">${item.title}</h3>
                <p class="text-xs text-gray-600">${item.category}</p>
              </div>
              <button
                @click=${() => this.removeBookmark(item.id)}
                class="ml-3 text-black hover:text-gray-700 text-sm"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          `,
        )}
      </div>
    `;

    render(template, container);
  }

  removeBookmark(id) {
    this.#dummyBookmarks = this.#dummyBookmarks.filter((item) => item.id !== id);
    this.displayBookmarks(this.#dummyBookmarks);
  }
}
