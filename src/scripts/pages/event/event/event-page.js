import Calendar from '../../../utils/calendar.js';
import Database from '../../../data/database.js';
import EventPresenter from './event-presenter.js';
import { formatDateRange } from '../../../utils/format-date.js';

export default class EventPage {
  #presenter = null;
  #container = null;
  #selectedDate = new Date();
  #events = [];
  #currentPage = 0;

  async render() {
    this.#container = document.createElement('section');
    this.#container.id = 'event-page';
    this.#container.className = 'px-4 py-6 md:px-10 max-w-screen-xl mx-auto';
    return this.#container;
  }

  async afterRender() {
    this.#presenter = new EventPresenter({
      view: this,
      model: Database,
    });

    this.#renderSkeleton();
    await this.#loadEventsForDate(this.#selectedDate);
  }

  #renderSkeleton() {
    const calendar = new Calendar({
      selectedDate: this.#selectedDate,
      onDateClick: (date) => {
        this.#selectedDate = date;
        this.#loadEventsForDate(date);
      },
    });

    this.#container.innerHTML = '';

    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 md:grid-cols-2 gap-6';

    const calendarContainer = document.createElement('div');
    calendarContainer.className = 'calendar-container bg-white p-4 rounded-lg shadow';
    calendarContainer.innerHTML = calendar.render();

    const eventListContainer = document.createElement('div');
    eventListContainer.className = 'event-list-container bg-white p-4 rounded-lg shadow';
    eventListContainer.id = 'event-list';

    grid.appendChild(calendarContainer);
    grid.appendChild(eventListContainer);
    this.#container.appendChild(grid);
  }

  async #loadEventsForDate(date) {
    const dateStr = date.toISOString().split('T')[0];
    this.#events = await this.#presenter.getEventsByDate(dateStr);
    this.#currentPage = 0;
    this.#renderEventList();
  }

  #renderEventList() {
    const eventListContainer = this.#container.querySelector('#event-list');
    eventListContainer.innerHTML = '';

    const title = document.createElement('h2');
    title.className = 'text-xl font-semibold mb-4';
    title.textContent = 'Kumpulan Events untuk kamu';
    eventListContainer.appendChild(title);

    const eventsToShow = this.#events.slice(this.#currentPage * 5, (this.#currentPage + 1) * 5);

    if (eventsToShow.length === 0) {
      const p = document.createElement('p');
      p.className = 'text-gray-500';
      p.textContent = 'Tidak ada event pada tanggal ini.';
      eventListContainer.appendChild(p);
    } else {
      for (const event of eventsToShow) {
        const card = document.createElement('div');
        card.className = 'flex items-center justify-between p-4 mb-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 cursor-pointer';
        card.addEventListener('click', () => {
          location.hash = `/events/${event.id}`;
        });

        const icon = document.createElement('div');
        icon.className = 'text-2xl';
        icon.textContent = '📅';

        const content = document.createElement('div');
        content.className = 'flex-1 px-4';

        const title = document.createElement('div');
        title.className = 'font-medium text-gray-800';
        title.textContent = event.title;

        const dates = document.createElement('div');
        dates.className = 'text-sm text-gray-500';
        dates.textContent = formatDateRange(event.start_date, event.end_date);

        content.appendChild(title);
        content.appendChild(dates);

        const arrow = document.createElement('div');
        arrow.className = 'text-xl text-gray-400';
        arrow.textContent = '➡️';

        card.appendChild(icon);
        card.appendChild(content);
        card.appendChild(arrow);

        eventListContainer.appendChild(card);
      }
    }

    // Pagination
    const pagination = document.createElement('div');
    pagination.className = 'flex justify-center gap-4 mt-6';

    const prevBtn = document.createElement('button');
    prevBtn.textContent = '⟨';
    prevBtn.className = 'px-3 py-1 border rounded disabled:opacity-50';
    prevBtn.disabled = this.#currentPage === 0;
    prevBtn.onclick = () => this.#changePage(-1);

    const nextBtn = document.createElement('button');
    nextBtn.textContent = '⟩';
    nextBtn.className = 'px-3 py-1 border rounded disabled:opacity-50';
    nextBtn.disabled = (this.#currentPage + 1) * 5 >= this.#events.length;
    nextBtn.onclick = () => this.#changePage(1);

    pagination.appendChild(prevBtn);
    pagination.appendChild(nextBtn);
    eventListContainer.appendChild(pagination);
  }

  #changePage(delta) {
    this.#currentPage += delta;
    this.#renderEventList();
  }
}
