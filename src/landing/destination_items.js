import { html } from 'lit-html';

export function generateTopDestinationItems(name, city, photo_url, rating) {
  const rounded = Number(parseFloat(rating).toFixed(1));
  return html`
    <div class="destination-items flex flex-col bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden" @click=${() => window.location.hash = '/login'}>
      <div class="relative h-48 w-full">
        <img
          src="${photo_url}"
          alt="${name}"
          class="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div class="p-4 flex-1 flex flex-col justify-between text-left">
        <h3 class="text-lg font-semibold text-gray-800 mb-1">${name}</h3>
        <div class="flex items-center text-sm text-gray-600 gap-2">
          <i class="fas fa-map-marker-alt text-red-500"></i>
          <span>${city}</span>
        </div>
        <div class="flex items-center text-sm text-gray-600 gap-2">
          <i class="fas fa-star text-orange-500"></i>
          <span>${rounded}</span>
        </div>
      </div>
    </div>
  `;
}
