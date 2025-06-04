export default class HomePresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }
//API
  async getSummary() {
    try {
      const data = await this.#model.fetchSummary();
      return {
        totalFavorit: data?.totalFavorit ?? 0,
        totalDestinasi: data?.totalDestinasi ?? 0,
        totalEvent: data?.totalEvent ?? 0,
      };
    } catch (err) {
      console.warn('[HomePresenter] Gunakan fallback:', err.message);
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      return {
        totalFavorit: Array.isArray(bookmarks) ? bookmarks.length : 0,
        totalDestinasi: 182,
        totalEvent: 103,
      };
    }
  }
}
