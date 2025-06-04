import { html } from 'lit-html';

export function generateTopDestinationItems(name, location, imageSrc) {
  return html`
    <div class="flex flex-col bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden">
      <div class="relative h-48 w-full">
        <img
          src="${imageSrc}"
          alt="${name}"
          class="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div class="p-4 flex-1 flex flex-col justify-between text-left">
        <h3 class="text-lg font-semibold text-gray-800 mb-1">${name}</h3>
        <div class="flex items-center text-sm text-gray-600 gap-2">
          <i class="fas fa-map-marker-alt text-red-500"></i>
          <span>${location}</span>
        </div>
      </div>
    </div>
  `;
}
