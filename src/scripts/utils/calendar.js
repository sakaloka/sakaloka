import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default class Calendar {
  #selectedDate;
  #onDateChange;
  #inputEl;

  constructor({ selectedDate = new Date(), onDateClick }) {
    this.#selectedDate = selectedDate;
    this.#onDateChange = onDateClick;
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('calendar-wrapper');

    this.#inputEl = document.createElement('input');
    this.#inputEl.setAttribute('type', 'text');
    this.#inputEl.classList.add('calendar-input');
    wrapper.appendChild(this.#inputEl);

    flatpickr(this.#inputEl, {
      defaultDate: this.#selectedDate,
      onChange: (selectedDates) => {
        if (selectedDates.length > 0) {
          this.#selectedDate = selectedDates[0];
          this.#onDateChange(this.#selectedDate);
        }
      },
    });

    return wrapper.outerHTML;
  }
} 
