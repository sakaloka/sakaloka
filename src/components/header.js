import { html, render } from 'lit-html';
import { clearSession } from './utils/auth';

export function renderHeader(containerId = 'header') {
  const header = document.getElementById(containerId);

  // Tambahkan ini untuk ambil user dari localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  // Pastikan default state dropdown tertutup
  if (typeof window.__isProfileDropdownOpen === 'undefined') {
    window.__isProfileDropdownOpen = false;
  }

  const toggleProfileDropdown = () => {
    window.__isProfileDropdownOpen = !window.__isProfileDropdownOpen;
    renderHeader(); // render ulang header
  };
  const template = html`
    <header
      class="shadow-md fixed w-full z-20 top-0 left-0 bg-white"
      id="headerNavigasi"
    >
      <div class="flex items-center justify-between px-4 py-3 relative">
        <div class="flex items-center gap-3">
          <img src="/images/logo.png" alt="Logo" class="w-[120px] h-auto object-contain" />
          <span class="text-lg font-semibold"></span>
          <button
            id="burgerButton"
            class="focus:outline-none text-2xl pl-3"
            @click=${toggleSidebar}
          >
            ☰
          </button>
        </div>
        <!-- Avatar + Dropdown -->
        <div class="relative">
          <button
            class="profile-button"
            @click=${toggleProfileDropdown}
          >
            ${user?.name || 'Akun'}
            <i class="fa fa-chevron-down ml-2 text-xs"></i>
          </button>

          ${window.__isProfileDropdownOpen
            ? html`
              <div class="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-md z-50">
                <a
                  href="#/profile"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >Akun</a
                >
                <button
                  class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  @click=${handleLogout}
                >
                  Logout
                </button>
              </div>
            `
              : ''
            }
          </div>
        </div>
      </div>
    </header>
    <aside
      id="sidebar"
      class="fixed top-0 left-0 h-full w-64 md:w-64 w-full shadow-md z-10 transform transition-transform duration-300 bg-white"
    >
      <div class="mt-20 flex items-center gap-3 px-4">
  <div class="avatar-sidebar w-10 h-10 rounded-full overflow-hidden border border-gray-300 bg-gray-100 flex items-center justify-center">
    ${user?.photoUrl
      ? html`<img src=${user.avatar} alt="Avatar" class="w-full h-full object-cover" />`
      : html`<i class="fa fa-user text-black-500 text-lg"></i>`
    }
  </div>
  <p class="text-base font-semibold text-[#678337]">Hai, ${user?.name || 'Martha'}</p>
</div>

      <nav class="mt-6 space-y-2 px-4 border-t pb-5">
        <a href="#/home" class="block px-4 py-2 rounded hover:bg-blue-100 mt-4"
          >Dashboard</a
        >
        <a
          href="#/destinasi"
          class="block px-4 py-2 rounded hover:bg-blue-100"
          >Destination</a
        >
        <a href="#/event" class="block px-4 py-2 rounded hover:bg-blue-100"
          >Event</a
        >
        <a href="#/bookmark" class="block px-4 py-2 rounded hover:bg-blue-100"
          >Bookmark</a
        >
      </nav>
    </aside>
  `;
  render(template, header);

  const sidebar = document.getElementById('sidebar');
  const main = document.querySelector('main');

  if (window.innerWidth <= 768) {
    window.__isSidebarOpen = false;
    sidebar?.classList.add('-translate-x-full');
    main?.classList.remove('pl-64');
  } else {
    window.__isSidebarOpen = true;
    sidebar?.classList.remove('-translate-x-full');
    main?.classList.add('pl-64');
  }
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const main = document.querySelector('main');

  sidebar?.classList.toggle('-translate-x-full');

  const isNowOpen = !sidebar.classList.contains('-translate-x-full');
  window.__isSidebarOpen = isNowOpen;

  console.log('Sidebar sekarang:', isNowOpen ? 'TERBUKA' : 'TERTUTUP');

  if (isNowOpen) {
    main.classList.add('pl-64');
  } else {
    main.classList.remove('pl-64');
  }
}

function handleLogout() {
  // Tambahkan logika logout kamu di sini
  console.log('Logout clicked');
  clearSession();
  window.location.href = '#/index';
  window.location.reload();
}
