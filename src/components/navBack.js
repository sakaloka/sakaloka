import { html, render } from 'lit-html';
import { routes } from '../routes/routes.js';
import { navigateTo } from './utils/navigateTo.js';

export function navBackRender(routeKey = '') {
  const header = document.getElementById('header');
  const route = routes[routeKey];

  let defaultHome = 'home';
  const token = localStorage.getItem('token');
  if (token) {
    defaultHome = 'index';
  }

  const template = html`
    <div id="headerNavigasi" class="px-4 py-5 shadow-sm flex items-center text-white">
      <button
        @click=${() => navigateTo(route?.backTo || defaultHome)}
        class="mr-3 p-2 -m-2 rounded hover:bg-white/10 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <h1 class="font-semibold text-lg">${route?.title || 'Kembali'}</h1>
    </div>
  `;

  render(template, header);
}
