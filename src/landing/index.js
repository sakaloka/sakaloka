import { html, render } from 'lit-html';
import { generateTopDestinationItems } from './destination_items';
import { destinationTop } from '../constants/urlApi';

export function renderLandingIndex(container) {
  const template = html`
    <section id="landing">
      <!-- Hero Section -->
      <section
        id="hero"
        class="section-fade min-h-screen justify-center relative bg-cover bg-center text-white text-center flex flex-col items-center px-5 py-25 pt-36"
        style="background-image: url('/images/bg-hero.svg');"
      >
        <div class="backdrop-brightness-75 absolute inset-0 z-0"></div>
        <div class="z-10 max-w-4xl">
          <h1 class="text-5xl md:text-6xl font-extrabold mb-4">SakaLoka</h1>
          <h3 class="text-2xl font-semibold">Jelajahi Budaya & Wisata Lokal Jawa</h3>
          <p class="mt-4 text-xl mx-auto">
            Temukan acara budaya dan destinasi lokal sesuai minat dan lokasimu. Dengan smart map dan
            rekomendasi berbasis machine learning, kami menyediakan apa yang kamu cari.
          </p>
          <a
            href="#/login"
            class="block mt-10 bg-[#dce8c4] px-6 py-4 text-xl mx-auto text-black rounded-full font-semibold hover:bg-[#c4d8a0] transition text-center w-fit"
          >
            Jelajahi Sekarang
            <i
              class="fa fa-arrow-right ml-2 transition-transform duration-300 group-hover:translate-x-1"
            ></i>
          </a>
        </div>
      </section>

      <!-- Fitur -->
      <section
        id="features-section"
        class="section-fade bg-primary text-white py-20 px-4 text-center"
      >
        <h2 class="text-3xl font-extrabold mb-6">Jelajahi Keindahan Jawa dalam Sekejap</h2>
        <p class="text-xl mx-auto mb-10">
          Sakaloka hadir dengan dua fitur utama yang dirancang untuk menemani petualangan Anda dalam
          menjelajahi budaya Jawa
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
          <div class="bg-[#dce8c4] text-black rounded-lg p-6 flex flex-col gap-4">
            <div class="w-12 h-12 bg-[#1f1f1f] rounded"></div>
            <div class="text-left">
              <h3 class="font-bold text-xl">Kalender Budaya</h3>
              <p class="mt-1 text-md">
                Cari dan ulas berbagai acara budaya menarik seperti festival, pertunjukan
                tradisional, dan event khas dari berbagai kota di Jawa.
              </p>
            </div>
          </div>
          <div class="bg-[#dce8c4] text-black rounded-lg p-6 flex flex-col gap-4">
            <div class="w-12 h-12 bg-[#1f1f1f] rounded"></div>
            <div class="text-left">
              <h3 class="font-bold text-xl">Peta Destinasi Personal</h3>
              <p class="mt-1 text-md">
                Temukan tempat wisata terbaik di Jawa yang disesuaikan dengan minat dan interaksi
                Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Destinasi Populer -->
      <section
        id="destination-section"
        class="section-fade bg-[#3c2626] text-white py-20 px-4 text-center"
      >
        <h2 class="text-4xl font-bold mb-4">Destinasi Populer</h2>
        <p class="max-w-xl text-white mx-auto mb-12 text-base md:text-lg">
          Jelajahi keindahan budaya dan alam di Pulau Jawa yang sedang digemari wisatawan.
        </p>
        <div
          id="destination-container"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto px-2 sm:px-4"
        >
          <!-- Destination Items akan dirender disini -->
        </div>
      </section>

      <!-- FAQ -->
      <section id="faq-section" class="section-fade bg-[#d7e4c0] text-primary py-20 px-4">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-4xl text-primary font-bold text-center mb-6">Pertanyaan Umum (FAQ)</h2>
          <p class="text-center text-gray-600 mb-10 text-base md:text-lg">
            Temukan jawaban atas pertanyaan yang sering diajukan tentang SakaLoka.
          </p>
          <div class="flex flex-col gap-4">
            ${faqItems.map(
              (item) => html`
                <div
                  class="faq-item border border-gray-200 bg-white rounded-xl shadow-sm transition overflow-hidden"
                >
                  <button
                    class="faq-toggle w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition"
                  >
                    <h3 class="text-2xl font-medium text-gray-800 grow">${item.q}</h3>
                    <i
                      class="fas fa-chevron-down text-gray-500 transition-transform duration-300"
                    ></i>
                  </button>
                  <div class="faq-answer px-6 pb-4 text-lg text-gray-600 hidden">${item.a}</div>
                </div>
              `,
            )}
          </div>
        </div>
      </section>

      <!-- Kontak -->
      <section
        id="contact-section"
        class="section-fade bg-[#3c2626] text-white py-20 px-4 text-center"
      >
        <h2 class="text-3xl font-extrabold mb-6">Hubungi Kami</h2>
        <div class="flex flex-col items-center gap-4 text-xl w-full mx-auto">
          <p>Punya pertanyaan atau saran? Kami siap mendengar Anda.</p>
          <div class="flex flex-wrap justify-center items-center gap-6 mt-4 text-xl">
            <a href="mailto:sakaloka@gmail.com" class="flex items-center gap-2 hover:underline">
              <i class="fas fa-envelope text-white"></i>
              <span>sakaloka@gmail.com</span>
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              class="flex items-center gap-2 hover:underline"
            >
              <i class="fab fa-instagram text-white"></i>
              <span>@sakaloka</span>
            </a>
          </div>
        </div>
      </section>
    </section>
  `;

  // Render konten utama
  render(template, container);

  // Render tombol backTop ke luar dari kontainer utama
  const backTopBtn = html`
    <button
      id="backTop"
      class="btn fixed bottom-4 right-4 z-50 rounded-full hidden 
          w-[70px] h-[70px] bg-[rgba(255,255,255,0.5)] text-black
            text-3xl shadow-lg transition transform hover:scale-110 flex items-center justify-center"
    >
      <i class="fa fa-arrow-up"></i>
    </button>
  `;
  const holder = document.createElement('div');
  document.body.appendChild(holder);
  render(backTopBtn, holder);

  requestAnimationFrame(() => {
    setTimeout(() => {
      // FAQ behavior
      document.querySelectorAll('.faq-toggle').forEach((btn) => {
        btn.addEventListener('click', () => {
          const wrapper = btn.closest('.faq-item');
          const answer = wrapper.querySelector('.faq-answer');
          const icon = btn.querySelector('i');
          if (answer) {
            answer.classList.toggle('hidden');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
          }
        });
      });

      // Fade in animation
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('show');
              observer.unobserve(e.target);
            }
          });
        },
        { threshold: 0.15 },
      );

      document.querySelectorAll('.section-fade').forEach((el) => observer.observe(el));

      // Back to top behavior
      const backTop = document.getElementById('backTop');
      window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
          backTop.classList.remove('hidden');
        } else {
          backTop.classList.add('hidden');
        }
      });
      backTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }, 0);

    // ambil destinasi
    setTimeout(async () => {
      // Render destinasi
      const response = await destinationTop();
      const destinations = response?.data || [];
      const destinationTemplates = destinations.map((d) =>
        generateTopDestinationItems(d.name, d.location, d.photo, d.rating),
      );

      const destinationContainer = document.getElementById('destination-container');
      render(html`${destinationTemplates}`, destinationContainer);
    }, 0);
  });
}

const faqItems = [
  {
    q: 'Apa itu Sakaloka?',
    a: 'SakaLoka adalah platform eksplorasi budaya Jawa yang memudahkanmu menemukan acara budaya dan destinasi menarik, lengkap dengan peta dan kalender interaktif.',
  },
  {
    q: 'Bagaimana Sakaloka bisa menemukan destinasi yang saya suka?',
    a: 'Kami menganalisis interaksi Anda selama menggunakan SakaLoka dan berdasarkan ulasan yang diberikan pada setiap acara budaya ataupun destinasi.',
  },
  {
    q: 'Bagaimana cara mengetahui acara budaya yang sedang berlangsung?',
    a: 'Acara budaya yang sedang berlangsung akan ditampilkan di beranda dan kalender acara yang dapat dilihat pada menu Acara Budaya.',
  },
];
