import { html, render } from 'lit-html';
import { getUserBookmarks, removeBookmark } from '../../constants/urlApi';

export async function renderBookmarkPage(container) {
  const page = new BookmarkPage();
  const template = await page.render();
  render(template, container);
  await page.afterRender();
}

class BookmarkPage {
  #bookmarks = [];

  async render() {
    return html`
      <section class="px-4 mt-[90px] text-left">
        <h2 class="text-2xl font-bold text-black mb-6">Bookmark</h2>
        <div id="bookmark-list" class="flex flex-col gap-3"></div>
      </section>
    `;
  }

  async afterRender() {
    const result = await getUserBookmarks();
    this.#bookmarks = result?.data;
    this.displayBookmarks(this.#bookmarks);
  }

  displayBookmarks(bookmarks) {
    const container = document.getElementById('bookmark-list');

    if (!bookmarks || bookmarks.length === 0) {
      render(html`<p class="text-gray-600">Tidak ada bookmark yang disimpan.</p>`, container);
      return;
    }

    const template = html`
      ${bookmarks.map(
        (item) => html`
          <div class="flex flex-col gap-4">
            <div
              class="flex items-center border border-black rounded-lg p-3 bg-white w-full max-w-xl"
            >
              <a class="flex items-center w-full"
                href=${item.type === 'Acara Budaya'
                ? `#/event/detail/${item.event_id}`
                : `#/destinasi/detail/${item.destination_id}`}
              >
                <img
                  src="${item.photo_url}"
                  alt="${item.name}"
                  class="w-16 h-12 object-cover rounded-md flex-shrink-0"
                />
                <div class="flex-grow ml-3">
                  <h3 class="font-semibold text-sm text-[#678337] mb-1">${item.name}</h3>
                  <p class="text-xs text-gray-600">${item.type}</p>
                </div>
              </a>
              <button
                @click=${() => this.removeBookmark(item.id)}
                class="ml-3 text-black hover:text-gray-700 text-sm"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        `,
      )}
    `;

    render(template, container);
  }

  async removeBookmark(id) {
    const res = await removeBookmark(id);
    if (res.ok) {
      const result = await getUserBookmarks(); 
      this.#bookmarks = result?.data;
      this.displayBookmarks(this.#bookmarks);
    }
  }  
}
