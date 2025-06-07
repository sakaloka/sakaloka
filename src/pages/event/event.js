import { html, render } from 'lit-html';
import {
  addEventBookmark,
  getEvents,
  getUserBookmarks,
  removeBookmark,
} from '../../constants/urlApi.js';
import { getSession } from '../../components/utils/auth.js';
import Swal from 'sweetalert2';

let currentEvents = [];
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

export async function renderCalendarPage(container) {
  currentEvents = await fetchEvents();

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

  render(
    html`
      <section class="mt-20 w-full px-4 flex flex-col md:flex-row gap-6 items-start">
        <!-- Kalender -->
        <div class="w-full md:w-2/3">
  <h3 class="text-2xl font-bold text-black mt-[16px] flex items-center mb-6">Kalender Budaya</h3>
  <div class="bg-[#bea5a5] border border-black rounded-lg px-5 py-5">
            <div class="flex justify-center items-center gap-6 mb-1">
              <button @click=${() => changeMonth(-1)}><i class="fa fa-angle-left"></i></button>
              <div class="text-center">
                <div class="text-xl font-bold">${new Date(year, month).toLocaleString('id', { month: 'long' })}</div>
                <div>${year}</div>
              </div>
              <button @click=${() => changeMonth(1)}><i class="fa fa-angle-right"></i></button>
            </div>
            <div class="grid grid-cols-7 text-center font-semibold mb-2">
              ${['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((d) => html`<div>${d}</div>`)}
            </div>
            <div class="grid grid-cols-7 gap-2">
              ${cells.map((day) =>
                day === null ? html`<div></div>` : renderDayBox(day, year, month),
              )}
            </div>
          </div>
        </div>

        <!-- Daftar Acara -->
        <div class="w-full md:w-1/3 space-y-4 mt-16">
          <div class="bg-white border border-black rounded-lg px-5 py-5 shadow">
            <h3 class="text-xl font-semibold mb-4">Daftar Acara Bulan Ini</h3>
            <div class="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <div class="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2">
  ${monthEvents.map(
    (e) => html`
      <a
        href="#/event/detail/${e.id}"
        class="bg-white rounded-lg p-3 border-l-4 border-[#678337] shadow hover:shadow-md transition-all"
      >
        <p class="text-xs text-[#678337] font-semibold mb-1">${formatDateIndo(e.date)}</p>
        <h4 class="font-bold text-sm text-black mb-1">${e.title}</h4>
        <p class="text-xs text-gray-600 leading-snug line-clamp-3">
          ${e.description.slice(0, 100)}...
        </p>
      </a>
    `,
  )}
</div>
          </div>
        </div>

        <div id="calendarModal"></div>
      </section>
    `,
    container,
  );
}

function renderDayBox(day, year, month) {
  const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const isEventDate = currentEvents.some((e) => e.date === dateStr);

  return html`
    <div
      class="${isEventDate
        ? 'bg-[#678337] text-white'
        : 'bg-white'} border p-3 h-16 rounded-md cursor-pointer"
      @click=${() =>
        openModal(
          dateStr,
          currentEvents.filter((e) => e.date === dateStr),
        )}
    >
      ${day}
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
  render(
    html`
      <div class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div class="bg-white max-w-md w-full rounded-lg p-6 relative">
          <div class="flex items-center mb-4">
            <button class="text-xl" @click=${() => render('', container)}>
              <i class="fas fa-xmark"></i>
            </button>
            <h2 class="ml-3 font-bold text-[#678337]">Acara pada ${formatDateIndo(date)}</h2>
          </div>
          ${
            events.length
              ? events.map(
                  (e) => html`
                    <ul class="mb-4 list-disc ml-5 text-sm">
                      <li>
                        <a href="#/event/detail/${e.id}" target="_blank"> ${e.title} </a>
                      </li>
                    </ul>
                    <div class="flex justify-end">
                      <button
                        class="w-fit px-4 py-2 rounded ${e.is_saved
                          ? 'btn-bookmark-remove'
                          : 'btn-bookmark'}"
                        @click=${async () => {
                          if (e.is_saved) {
                            await handleRemoveEventBookmark(e.id);
                            e.is_saved = false;
                          } else {
                            await handleAddEventBookmark(e.id);
                            e.is_saved = true;
                          }
                          openModal(date, events);
                        }}
                      >
                        ${e.is_saved ? 'Tersimpan' : 'Simpan Acara'}
                      </button>
                    </div>
                  `,
                )
              : html`
                  <ul class="mb-4 list-disc ml-5 text-sm">
                    <li class="italic text-gray-400">Belum ada acara</li>
                  </ul>
                `
          }
          </ul>
          
        </div>
      </div>
    `,
    container,
  );
}

async function saveEvent(eventId) {
  const result = await addEventBookmark(eventId);

  if (result.ok) {
    render('', document.getElementById('calendarModal'));
  } else {
    alert('Terjadi kesalahan saat menyimpan Acara Budaya ini.');
  }
}

function formatDateIndo(dateStr) {
  const [year, month, day] = dateStr.split('-');
  return `${day}-${month}-${year}`;
}

async function fetchEvents() {
  try {
    const res = await getEvents();
    return res.data.map((e) => {
      const [year, month, day] = e.start_date.split('-');
      const monthMap = {
        Januari: '01',
        Februari: '02',
        Maret: '03',
        April: '04',
        Mei: '05',
        Juni: '06',
        Juli: '07',
        Agustus: '08',
        September: '09',
        Oktober: '10',
        November: '11',
        Desember: '12',
      };
      const date = `${year}-${month}-${day.padStart(2, '0')}`;
      return {
        id: e.id,
        date,
        title: e.title,
        description: e.description,
        url: e.detail_url,
        is_saved: e.is_saved,
      };
    });
  } catch (err) {
    console.error('Gagal mengambil data event:', err);
    return [];
  }
}

async function handleAddEventBookmark(eventId) {
  const result = await addEventBookmark(eventId);
  if (result.ok) {
    Swal.fire({
      icon: 'success',
      title: 'Tersimpan!',
      text: 'Acara berhasil disimpan.',
      timer: 1500,
      showConfirmButton: false,
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Gagal!',
      text: 'Gagal menyimpan acara.',
    });
  }
}

async function handleRemoveEventBookmark(eventId) {
  const session = getSession();
  const userId = session?.user?.userId;
  const result = await getUserBookmarks();
  const bookmarks = result?.data ?? [];

  const match = bookmarks.find((b) => b.event_id == eventId && b.user_id == userId);
  if (match) {
    const res = await removeBookmark(match.id);
    if (res.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Dihapus!',
        text: 'Acara berhasil dihapus dari bookmark.',
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Gagal menghapus bookmark.',
      });
    }
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Tidak ditemukan',
      text: 'Bookmark tidak ditemukan.',
    });
  }
}
