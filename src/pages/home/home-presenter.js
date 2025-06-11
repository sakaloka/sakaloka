import { getRecommendedDestinationsByRating, getUserSummary } from '../../constants/urlApi';

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
      const result = await getUserSummary();
      console.log(result);
      const data = result?.data;
      console.log(data);

      return {
        totalFavorit: data?.bookmark_total ?? 0,
        totalDestinasi: data?.destination_total ?? 0,
        totalEvent: data?.event_total ?? 0,
        totalRatingDestinasi: data?.rating_dest_count ?? 0,
      };
    } catch (err) {
      console.warn('[HomePresenter] Gunakan fallback:', err.message);
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      return {
        totalFavorit: Array.isArray(bookmarks) ? bookmarks.length : 0,
        totalDestinasi: 182,
        totalEvent: 103,
        totalRatingDestinasi: 0,
      };
    }
  }

  async getRecommendedDestinations() {
    try {
      const result = await getRecommendedDestinationsByRating();
      return result?.data ?? [];
    } catch (err) {
      console.warn('[HomePresenter] Gagal ambil rekomendasi:', err.message);
      return [];
    }
  }
}
