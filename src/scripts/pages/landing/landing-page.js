import Database from '../../data/database';
import LandingPresenter from './landing-presenter';

export default class LandingPage {
  #presenter = null;
  async render() {
    return `
      <section id="landing">
        <!-- Hero Section -->
        <section id="hero" class="bg-cover bg-center text-white text-center items-center flex flex-col gap-3" style="background-image: url('/images/bg-hero.svg')">
          <h1 class=" text-6xl font-extrabold">SakaLoka</h1>
          <p class="text-xl font-semibold mt-4">Jelajahi Budaya & Wisata Lokal Jawa</p>
          <p class="mt-4 max-w-3xl mx-auto">Temukan acara budaya dan destinasi lokal sesuai minat dan lokasimu. Dengan smart map dan rekomendasi berbasis machine learning, kami menyediakan apa yang kamu cari.</p>
          <button class="mt-6 bg-[#dce8c4] gap-4 flex items-center text-black rounded-full font-semibold hover:bg-[#c4d8a0] transition">
            Jelajahi Sekarang
            <i class="fa fa-arrow-right"></i>
          </button>
        </section>
    
        <!-- Fitur Section -->
        <section class="bg-primary text-white py-20 px-4 text-center gap-3">
          <h2 class="text-3xl font-extrabold mb-6">Jelajahi Keindahan Jawa dalam Sekejap</h2>
          <p class="max-w-2xl mx-auto mb-10">Sakaloka hadir dengan dua fitur utama yang dirancang untuk menemani petualangan Anda dalam menjelajahi budaya Jawa</p>
          <div class="content grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div class="flex flex-col bg-secondary-100 text-black rounded-lg p-6 items-start gap-4">
              <div class="w-12 h-12 bg-[#1f1f1f] rounded"></div>
              <div class="text-left">
                <h3 class="font-bold text-lg">Kalender Budaya</h3>
                <p class="mt-1 text-sm">Cari dan ulas berbagai acara budaya menarik seperti festival, pertunjukan tradisional, dan event khas dari berbagai kota di Jawa.</p>
              </div>
            </div>
            <div class="flex flex-col bg-[#dce8c4] text-black rounded-lg p-6 items-start gap-4">
              <div class="w-12 h-12 bg-[#1f1f1f] rounded"></div>
              <div class="text-left">
                <h3 class="font-bold text-lg">Peta Destinasi Personal</h3>
                <p class="mt-1 text-sm">Temukan tempat wisata terbaik di Jawa yang disesuaikan dengan minat dan interaksi Anda. Kurangi waktu dalam mencari destinasi liburan.</p>
              </div>
            </div>
          </div>
        </section>
    
        <!-- FAQ Section -->
        <section class="bg-[#e5f0c7] py-20 px-4 text-center text-[#3c2626] gap-3">
          <h2 class="text-3xl font-extrabold mb-10">FAQ</h2>
          <div class="content max-w-2xl mx-auto text-left space-y-6">
            <div class="bg-white p-4 rounded shadow">
              <h3 class="font-semibold">Apa itu Sakaloka?</h3>
              <p class="mt-1 text-sm">SakaLoka adalah platform eksplorasi budaya Jawa yang memudahkanmu menemukan acara budaya dan destinasi menarik, lengkap dengan peta dan kalender interaktif.</p>
            </div>
            <div class="border-t pt-4">
              <h3 class="font-semibold">Bagaimana SakaLoka bisa menemukan destinasi yang saya suka?</h3>
            </div>
            <div class="border-t pt-4">
              <h3 class="font-semibold">Bagaimana cara mengetahui acara budaya yang sedang berlangsung?</h3>
            </div>
          </div>
        </section>
    
        <!-- Hubungi Kami -->
        <section class="bg-[#3c2626] text-white py-20 px-4 text-center">
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
    `;
  }  

  async afterRender() {
    this.#presenter = new LandingPresenter({
      view: this,
      model: Database,
    });
  }
}
