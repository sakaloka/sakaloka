export default class EventPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async getEventsByDate(dateStr) {
    try {
      // Sementara, hardcoded dummy event
      const allEvents = [
        {
          id: 1,
          title: 'Webinar AI untuk Semua',
          start_date: '2025-05-29',
          end_date: '2025-05-29',
        },
        {
          id: 2,
          title: 'Pelatihan Sakaloka',
          start_date: '2025-05-29',
          end_date: '2025-05-31',
        },
        {
          id: 3,
          title: 'Diskusi Koperasi',
          start_date: '2025-06-01',
          end_date: '2025-06-02',
        },
      ];

      return allEvents.filter((event) => {
        return (
          event.start_date <= dateStr &&
          event.end_date >= dateStr
        );
      });
    } catch (err) {
      console.error('[EventPresenter] Failed to fetch events:', err);
      return [];
    }
  }
}
