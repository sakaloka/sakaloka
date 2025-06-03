export function generateTopDestinationItems(name, location, imageSrc) {
  return `
    <div class="destination-items flex flex-col bg-neutral-200 text-black rounded-lg items-start gap-4 h-full">
      <div class="w-full h-48 overflow-hidden rounded-md">
        <img src="${imageSrc}" alt="${name}" class="w-full h-full object-cover" />
      </div>
      <div class="destination-desc text-left">
        <h3 class="font-bold text-lg">${name}</h3>
        <div class="flex w-full items-center gap-2">
          <i class="fas fa-map-marker-alt"></i>
          <p class="text-sm">${location}</p>
        </div>
      </div>
    </div>
  `;
}

export function generateUnauthenticatedNavigationListTemplate () {
  return `
    <div class="flex grow w-full justify-center">
      <li><a href="#hero">Beranda</a></li>
      <li><a href="#features-section">Fitur</a></li>
      <li><a href="#destination-section">Populer</a></li>
      <li><a href="#faq-section">FAQ</a></li>
      <li><a href="#contact-section">Hubungi Kami</a></li>
    </div>
    <div class="btn-group">
      <li><a id="login-button" href="#/login" class="btn btn-primary-outline">Masuk</a></li>
      <li><a id="register-button" href="#/register" class="btn btn-primary">Daftar</a></li>
    </div>
  `;
}
  
export function generateAuthenticatedNavigationListTemplate () {
  const user = JSON.parse(localStorage.getItem('user'));
  const name = user?.name;
  return `
    <div class="flex grow w-full justify-center">
      <li><a href="#/home">Beranda</a></li>
      <li><a href="#/destinations">Destinasi</a></li>
      <li><a href="#/events">Acara Budaya</a></li>
    </div>
    <li class="relative">
      <button id="user-toggle" class="flex gap-2 btn btn-outline-light">
        ${name}
        <i class="fas fa-chevron-down"></i>
      </button>
      <div id="user-dropdown" class="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow hidden z-50">
        <a href="#/profile" class="block px-4 py-2 hover:bg-gray-100">Profil</a>
        <a id="logout-button" href="#/logout" class="block px-4 py-2 hover:bg-gray-100">Keluar</a>
      </div>
    </li>
  `;
}