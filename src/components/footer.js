import { html, render } from 'lit-html';

export function renderFooter(containerId = 'footer') {
  const container = document.getElementById(containerId);

  const template = html`
    <footer class="bg-white border-t border-gray-200 py-4 text-center w-full">
      <p class="text-sm text-gray-600">
        &copy; ${new Date().getFullYear()} SakaLoka – Platform Pemetaan dan Rekomendasi Wisata
        Budaya Indonesia. All rights reserved.
      </p>
    </footer>
  `;

  render(template, container);
}
