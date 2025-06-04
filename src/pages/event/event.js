import { html, render } from 'lit-html';

const dummyEvents = [
  {
    id: 'festival-bali',
    date: '2025-06-10',
    title: 'Festival Budaya Bali',
    description: 'Perayaan budaya khas Bali dengan tari-tarian dan kuliner.',
  },
  {
     id: 'upacara-toraja',
    date: '2025-06-12',
    title: 'Upacara Adat Toraja',
    description: 'Tradisi unik masyarakat Toraja yang sarat makna spiritual.',
  },
  {
    id: 'Pameran-Batik-Yogyakarta',
    date: '2025-06-15',
    title: 'Pameran Batik Yogyakarta',
    description: 'Pameran batik dari seniman lokal dan nasional di Yogyakarta.',
  },
];

let currentEvents = [...dummyEvents];
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

export function renderCalendarPage(container) {
  const year = currentYear;
  const month = currentMonth;

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay();
  const daysInMonth = Array.from({ length: lastDay.getDate() }, (_, i) => i + 1);
  const emptyStart = Array(startDay).fill(null);
  const cells = [...emptyStart, ...daysInMonth];

  const monthEvents = currentEvents.filter((e) => {
    const d = new Date(e.date);
    return d.getFullYear() === year && d.getMonth() === month;
  });

  const template = html`
  <section
    class="mt-20 w-full px-4 flex flex-col md:flex-row gap-6 items-start transition-all duration-300"
  >
    <!-- Bagian Kiri: Kalender Budaya -->
    <div class="w-full md:w-2/3 space-y-4">
      <div class="bg-[#bea5a5] border border-black rounded-lg px-5 py-5">
        <h2 class="text-xl font-semibold text-black mb-4">Kalender Budaya</h2>

        <!-- Navigasi Bulan -->
        <div class="flex justify-center items-center gap-6 mb-4">
          <button class="text-lg text-black-700 hover:text-black" @click=${() => changeMonth(-1)}>
            <i class="fa fa-angle-left"></i>
          </button>
          <div class="flex flex-col items-center">
            <span class="text-xl font-bold text-black">
              ${new Date(year, month).toLocaleString('id', { month: 'long' })}
            </span>
            <span class="text-base text-black-600">${year}</span>
          </div>
          <button class="text-lg text-gray-black hover:text-black" @click=${() => changeMonth(1)}>
            <i class="fa fa-angle-right"></i>
          </button>
        </div>

        <!-- Header Hari -->
        <div class="grid grid-cols-7 text-center text-sm font-semibold text-black-700 mb-2">
          <div>Min</div>
          <div>Sen</div>
          <div>Sel</div>
          <div>Rab</div>
          <div>Kam</div>
          <div>Jum</div>
          <div>Sab</div>
        </div>

        <!-- Hari -->
        <div class="grid grid-cols-7 gap-2 text-sm">
          ${cells.map((day) =>
            day === null ? html`<div></div>` : renderDayBox(day, year, month),
          )}
        </div>
      </div>
    </div>

    <!-- Bagian Kanan: Daftar Acara -->
    <div class="w-full md:w-1/3 space-y-4">
      <div class="bg-white border border-black rounded-lg px-5 py-5 shadow border">
        <h3 class="text-xl font-semibold text-black mb-4">Daftar Acara Bulan Ini</h3>
        <div class="grid gap-4">
          ${monthEvents.map(
            (e) => html`
              <a
                href="#/event/detail"
                class="block rounded-xl p-4 border-l-4 border-[#678337] bg-white shadow hover:shadow-md transition-all"
              >
                <p class="text-sm text-[#678337] font-semibold mb-1">${formatDateIndo(e.date)}</p>
                <h4 class="text-base font-bold text-gray-800">${e.title}</h4>
                <p class="text-sm text-gray-600 mt-1">${e.description}</p>
              </a>
            `
          )}
        </div>
      </div>
    </div>

    <div id="calendarModal"></div>
  </section>
`;

  render(template, container);
}

function renderDayBox(day, year, month) {
  const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const isEventDate = currentEvents.some((e) => e.date === dateStr);

  return html`
    <div
      class="${isEventDate ? 'bg-[#678337] text-white font-semibold' : 'bg-white text-black'} 
        border border-gray-300 rounded-md p-3 h-16 text-left cursor-pointer hover:bg-blue-50 transition"
      @click=${() =>
        openModal(
          dateStr,
          currentEvents.filter((e) => e.date === dateStr),
        )}
    >
      <div>${day}</div>
    </div>
  `;
}

function changeMonth(offset) {
  currentMonth += offset;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  const container = document.getElementById('pageWrapper');
  renderCalendarPage(container);
}

function openModal(date, events) {
  const container = document.getElementById('calendarModal');

  const modal = html`
    <div
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999]"
    >
      <div class="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
        <!-- Flex bar: ikon X di kiri dan judul -->
        <div class="flex items-center gap-3 mb-2">
          <button
            class="text-gray-500 hover:text-black text-xl"
            @click=${() => render('', container)}
            title="Tutup"
          >
            <i class="fas fa-xmark"></i>
          </button>

          <h2 class="text-lg font-bold text-[#678337]">
            Acara pada ${formatDateIndo(date)}
          </h2>
        </div>

        <!-- List event -->
        <ul class="mb-4 list-disc ml-5 text-sm">
          ${events.length > 0
            ? events.map(
                (e) => html`
                  <li>
                    <a
                        href="#/event/detail"
                        style="color: #black; font-weight: semibold;"
                        class="hover:underline"
                      >
                      ${e.title}
                  </a>
                  </li>
                `
              )
            : html`<li class="text-gray-400 italic">Belum ada acara</li>`}
        </ul>

        <!-- Tombol simpan -->
        <div class="flex justify-end">
          <button
            class="px-4 py-2 bg-[#678337] text-white rounded hover:bg-[#57732e]"
            @click=${() => saveEvent(date)}
          >
            Simpan Acara
          </button>
        </div>
      </div>
    </div>
  `;

  render(modal, container);
}

function saveEvent(date) {
  const selectedEvents = currentEvents.filter(e => e.date === date);
  if (selectedEvents.length === 0) return;

  // Ambil bookmark yang sudah ada
  const existing = JSON.parse(localStorage.getItem('bookmarkedEvents') || '[]');

  // Tambah hanya jika belum ada
  selectedEvents.forEach((event) => {
    const alreadyExists = existing.some(e => e.title === event.title && e.date === event.date);
    if (!alreadyExists) {
      existing.push(event);
    }
  });

  // Simpan kembali ke localStorage
  localStorage.setItem('bookmarkedEvents', JSON.stringify(existing));

  // Tutup modal
  const modalContainer = document.getElementById('calendarModal');
  if (modalContainer) render('', modalContainer);
}

function formatDateIndo(dateStr) {
  const [year, month, day] = dateStr.split('-');
  return `${day}-${month}-${year}`;
}
