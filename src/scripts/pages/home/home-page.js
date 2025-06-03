import Database from '../../data/database';
import HomePresenter from './home-presenter';

export default class HomePage {
  #presenter = null;

  async render() {
    return `
      <div class="flex min-h-screen bg-gray-100">
        <!-- Sidebar -->
        <aside id="sidebar" class="w-64 bg-white shadow-md hidden md:block">
          <div class="p-4 border-b">
            <h1 class="text-2xl font-bold text-[#483434]">SakaLoka</h1>
          </div>
          <div class="p-4 text-center">
            <div class="w-16 h-16 bg-gray-300 rounded-full mx-auto"></div>
            <p class="mt-2 font-semibold">Hai Marta</p>
          </div>
          <nav class="mt-4 px-4 space-y-2">
            <a href="#/home" class="block px-4 py-2 rounded hover:bg-gray-200">Dasbor</a>
            <a href="#/destination" class="block px-4 py-2 rounded hover:bg-gray-200">Tujuan</a>
            <a href="#/event" class="block px-4 py-2 rounded hover:bg-gray-200">Peristiwa</a>
            <a href="#/bookmark" class="block px-4 py-2 rounded hover:bg-gray-200">Penanda buku</a>
          </nav>
        </aside>

        <div>
            <h1 class="text-2xl font-bold mb-6">Dasbor</h1>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div onclick="location.href='#/bookmark'" class="cursor-pointer p-6 bg-white rounded-lg border shadow hover:shadow-md">
                <p class="text-lg font-semibold">Favorit</p>
                <p class="text-4xl">🔖</p>
                <p class="text-2xl font-bold">30</p>
              </div>
              <div onclick="location.href='#/destination'" class="cursor-pointer p-6 bg-white rounded-lg border shadow hover:shadow-md">
                <p class="text-lg font-semibold">Total Destinasi</p>
                <p class="text-4xl">📍</p>
                <p class="text-2xl font-bold">30</p>
              </div>
              <div onclick="location.href='#/event'" class="cursor-pointer p-6 bg-white rounded-lg border shadow hover:shadow-md">
                <p class="text-lg font-semibold">Total Acara Budaya</p>
                <p class="text-4xl">🎭</p>
                <p class="text-2xl font-bold">30</p>
              </div>
            </div>
          </main>
      </div>
    `;
  }

  async afterRender() {
    this.#presenter = new HomePresenter({ view: this, model: Database });

    document.getElementById('toggle-sidebar')?.addEventListener('click', () => {
      const sidebar = document.getElementById('sidebar');
      sidebar.classList.toggle('hidden');
    });

    document.getElementById('user-toggle')?.addEventListener('click', () => {
      const dropdown = document.getElementById('user-dropdown');
      dropdown.classList.toggle('hidden');
    });
  }
}
