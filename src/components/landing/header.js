import { html, render } from 'lit-html';

export function renderLandingHeader(containerId = 'header') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const template = html`
    <header id="headerNavigasi" class="fixed top-0 left-0 right-0 z-50 py-2 px-2 shadow-md bg-white">
      <div class="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <a href="/"><img src="/images/logo.png" alt="Logo Sakaloka" class="w-full object-contain" style="height:50px;"/></a>
        </div>

        <!-- Hamburger (only shows on small screen) -->
        <button id="hamburger" class="md:hidden focus:outline-none">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2"
            viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <!-- Menu -->
        <div
          id="navMenu"
          class=" md:flex flex-col md:flex-row md:items-center md:gap-6 absolute md:static top-full left-0 w-full md:w-auto px-4 md:px-0 pb-4 md:pb-0 text-lg text-white shadow md:shadow-none"
        >
          <a href="#hero" class="block scroll-link hover:text-green-600 font-medium">Beranda</a>
          <a href="#features-section" class="block scroll-link hover:text-green-600 font-medium">Fitur</a>
          <a href="#destination-section" class="block scroll-link hover:text-green-600 font-medium">Populer</a>
          <a href="#faq-section" class="block scroll-link hover:text-green-600 font-medium">FAQ</a>
          <a href="#contact-section" class="block scroll-link hover:text-green-600 font-medium">Hubungi Kami</a>
          <div class="flex flex-col md:flex-row gap-3 mt-2 md:mt-0">
            <a href="#/login" class="btn btn-outline text-lg">Masuk</a>
            <a href="#/register" class="btn btn-primary text-lg">Daftar</a>
          </div>
        </div>
      </div>
    </header>
  `;

  render(template, container);

  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  hamburger?.addEventListener('click', () => {
    // Hanya toggle hidden jika layar <768px
    if (window.innerWidth < 768) {
      navMenu.classList.toggle('hidden');
    }
  });

  // Fungsi untuk cek dan atur visibilitas menu saat resize
  const checkhide = () => {
    if (window.innerWidth < 768) {
      navMenu.classList.add('hidden');
    } else {
      navMenu.classList.remove('hidden');
    }
  };

  // Jalankan sekali saat awal
  checkhide();

  // Event saat resize
  window.addEventListener('resize', checkhide);

  // Smooth scroll
  const links = document.querySelectorAll('.scroll-link');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').replace('#', '');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        window.scrollTo({ top: targetEl.offsetTop - 60, behavior: 'smooth' });
        if (window.innerWidth < 768) navMenu.classList.add('hidden');
      }
    });
  });
}
