import Database from '../../data/database';
import LandingPresenter from './landing-presenter';
import { generateTopDestinationItems } from '../../templates';

export default class LandingPage {
  #presenter = null;
  async render() {
    return `
      <section id="landing">
        <!-- Hero Section -->
        <section id="hero" class="section-fade bg-cover bg-center text-white text-center items-center flex flex-col gap-3" style="background-image: url('/images/bg-hero.svg')">
          <h1 class=" text-6xl font-extrabold">SakaLoka</h1>
          <p class="text-xl font-semibold mt-4">Jelajahi Budaya & Wisata Lokal Jawa</p>
          <p class="mt-4 max-w-3xl mx-auto">Temukan acara budaya dan destinasi lokal sesuai minat dan lokasimu. Dengan smart map dan rekomendasi berbasis machine learning, kami menyediakan apa yang kamu cari.</p>
          <button class="btn mt-6 bg-[#dce8c4] gap-4 flex items-center text-black rounded-full font-semibold hover:bg-[#c4d8a0] transition group">
            Jelajahi Sekarang
            <i class="fa fa-arrow-right transform transition-transform duration-300 group-hover:translate-x-1"></i>
          </button>
        </section>
    
        <!-- Fitur Section -->
        <section id="features-section" class="section-fade bg-primary text-white py-20 px-4 text-center gap-3">
          <h2 class="text-3xl font-extrabold mb-6">Jelajahi Keindahan Jawa dalam Sekejap</h2>
          <p class="max-w-2xl mx-auto mb-10">Sakaloka hadir dengan dua fitur utama yang dirancang untuk menemani petualangan Anda dalam menjelajahi budaya Jawa</p>
          <div class="content grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div class="feat-items flex flex-col bg-secondary-100 text-black rounded-lg p-6 items-start gap-4">
              <div class="w-12 h-12 bg-[#1f1f1f] rounded"></div>
              <div class="text-left">
                <h3 class="font-bold text-lg">Kalender Budaya</h3>
                <p class="mt-1 text-sm">Cari dan ulas berbagai acara budaya menarik seperti festival, pertunjukan tradisional, dan event khas dari berbagai kota di Jawa.</p>
              </div>
            </div>
            <div class="feat-items flex flex-col bg-[#dce8c4] text-black rounded-lg p-6 items-start gap-4">
              <div class="w-12 h-12 bg-[#1f1f1f] rounded"></div>
              <div class="text-left">
                <h3 class="font-bold text-lg">Peta Destinasi Personal</h3>
                <p class="mt-1 text-sm">Temukan tempat wisata terbaik di Jawa yang disesuaikan dengan minat dan interaksi Anda. Kurangi waktu dalam mencari destinasi liburan.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Popular Destination Section -->
        <section id="destination-section" class="section-fade bg-white text-black py-20 px-4 text-center gap-3">
          <h2 class="text-3xl font-extrabold mb-6">Destinasi Populer</h2>
          <p class="max-w-2xl mx-auto mb-10">Kunjungi yang sedang ramai dibicarakan dengan penilaian terbaik saat ini</p>
          <div id="destination-container" class="content grid grid-cols-1 md:grid-cols-5 gap-3 w-full mx-auto items-stretch"></div>
        </section>
    
        <!-- FAQ Section -->
        <section id="faq-section" class="section-fade bg-secondary-100 text-center text-primary gap-3">
          <h2 class="text-3xl font-extrabold">FAQ</h2>
          <div class="items-start content flex flex-col max-w-2xl mx-auto text-left text-neutral-1000 space-y-6 gap-5">
            <div class="question-items bg-secondary-200 rounded shadow w-full">
              <div class="flex items-center">
                <button class="faq-toggle w-full flex text-start items-center gap-3">
                  <h3 class="font-semibold grow">Apa itu Sakaloka?</h3>
                  <i class="fas fa-plus"></i>
                </button>
              </div>
              <p class="mt-1 text-sm hidden">SakaLoka adalah platform eksplorasi budaya Jawa yang memudahkanmu menemukan acara budaya dan destinasi menarik, lengkap dengan peta dan kalender interaktif.</p>
            </div>
            <div class="question-items bg-secondary-200 rounded shadow w-full">
              <div class="flex items-center">
                <button class="faq-toggle w-full flex text-start items-center gap-3">
                  <h3 class="font-semibold grow">Bagaimana SakaLoka bisa menemukan destinasi yang saya suka?</h3>
                  <i class="fas fa-plus"></i>
                </button>
              </div>
              <p class="mt-1 text-sm hidden">Kami menganalisis interaksi Anda selama menggunakan SakaLoka dan berdasarkan ulasan yang diberikan pada setiap acara budaya ataupun destinasi.</p>
            </div>
            <div class="question-items bg-secondary-200 rounded shadow w-full">
              <div class="flex items-center">
                <button class="faq-toggle w-full flex text-start items-center gap-3">
                  <h3 class="font-semibold grow">Bagaimana cara mengetahui acara budaya yang sedang berlangsung?</h3>
                  <i class="fas fa-plus"></i>
                </button>
              </div>
              <p class="mt-1 text-sm hidden">Acara budaya yang sedang berlangsung akan ditampilkan di beranda dan kalender acara yang dapat dilihat pada menu Acara Budaya.</p>
            </div>
            </div>
          </div>
        </section>
    
        <!-- Hubungi Kami -->
        <section id="contact-section" class="section-fade bg-[#3c2626] text-white py-20 px-4 text-center">
          <h2 class="text-3xl font-extrabold mb-6">Hubungi Kami</h2>
          <div class="content w-full flex flex-col justify-center text-start gap-4">
            <p class="max-w-3xs">Punya pertanyaan atau saran? Kami siap mendengar Anda.</p>
            <div class="flex flex-col gap-3">
              <a href="mailto:sakaloka@gmail.com" class="flex items-center gap-3 w-fit">
                <img src="./images/icons/gmail.svg" />
                sakaloka@gmail.com
              </a>
              <a href="https://www.instagram.com/" class="flex items-center gap-3 w-fit" target="_blank" rel="noopener noreferrer">
                <img src="./images/icons/instagram.svg"/>
                @sakaloka
              </a>
            </div>
          </div>
        </section>
      </section>

      <button id="backTop"
        class="btn aspect-square rounded-full hidden fixed bottom-4 right-4 z-50 bg-primary text-white shadow-lg transition transform hover:scale-110">
        <i class="fa fa-arrow-up"></i>
      </button>
    `;
  }  

  async afterRender() {
    this.#presenter = new LandingPresenter({
      view: this,
      model: Database,
    });

    // Toggle FAQ
    const faqToggles = document.querySelectorAll('.faq-toggle');

    faqToggles.forEach((button) => {
      button.addEventListener('click', () => {
        const icon = button.querySelector('i');
        const paragraph = button.parentElement.nextElementSibling;

        paragraph.classList.toggle('hidden');

        if (paragraph.classList.contains('hidden')) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-plus');
        } else {
          icon.classList.remove('fa-plus');
          icon.classList.add('fa-times');
        }
      });
    });

    // Section Animation
    const fadeSections = document.querySelectorAll('.section-fade');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('show');
            io.unobserve(e.target);      
          }
        });
      },
      { threshold: 0.15 }
    );
    fadeSections.forEach((sec) => io.observe(sec));
    
    // Back to Top Button
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

    // Destinasi Populer
    const destinations = [
      { name: "Destinasi 1", location: "Yogyakarta", image: "img1.jpg" },
      { name: "Destinasi 2", location: "Bandung", image: "img2.jpg" },
      { name: "Destinasi 3", location: "Bali", image: "img3.jpg" },
      { name: "Destinasi 4", location: "Lombok", image: "img4.jpg" },
      { name: "Destinasi 5", location: "Jakarta", image: "img5.jpg" },
    ];
  
    const container = document.getElementById("destination-container");
  
    destinations.forEach(dest => {
      container.innerHTML += generateTopDestinationItems(dest.name, dest.location, dest.image);
    });
  }
}
