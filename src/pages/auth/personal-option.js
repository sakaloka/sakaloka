import { html, render } from 'lit-html';
import PersonalOptionPresenter from './personal-option-presenter.js';

export function renderPersonalOption(container) {
  const presenter = new PersonalOptionPresenter({
    view: {
      showError: (msg) => alert(msg),
      showSuccess: (msg) => alert(msg),
    },
  });

  const destinasiList = [
    'Bahari',
    'Desa Wisata',
    'Taman Hiburan',
    'Budaya',
    'Cagar Alam',
    'Taman Nasional',
    'Pantai',
    'Gunung',
    'Pulau',
    'Desa',
  ];

  const template = html`
  <section class="min-h-screen flex items-center justify-center px-4 py-10 bg-[#F9F9F9]">
    <div class="max-w-xl w-full bg-white rounded-2xl shadow-md p-6 border border-gray-200">
      <h2 class="text-2xl font-bold text-center mb-4 text-[#333]">Pilih 5 Destinasi Favoritmu</h2>
      <p class="text-sm text-gray-500 text-center mb-6">
        Preferensi ini akan membantu kami menampilkan konten yang relevan untukmu.
      </p>
      <form id="option-form" class="grid grid-cols-2 gap-4">
        ${destinasiList.map(
          (item) => html`
            <label
              class="flex items-center gap-2 text-sm text-gray-700 border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 transition cursor-pointer"
            >
              <input
                type="checkbox"
                name="destinasi"
                value="${item}"
                class="accent-[#678337] w-4 h-4"
              />
              <span>${item}</span>
            </label>
          `
        )}
        <div class="col-span-2 mt-6 text-center">
          <button
            type="submit"
            class="bg-[#678337] hover:bg-[#57732e] text-white px-6 py-2 rounded-full transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </section>
`;

  render(template, container);

  const form = document.getElementById('option-form');

  form.addEventListener('change', () => {
    const checked = form.querySelectorAll("input[name='destinasi']:checked");
    const allCheckboxes = form.querySelectorAll("input[name='destinasi']");
    presenter.handleChange(checked, allCheckboxes);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const selected = [...form.querySelectorAll("input[name='destinasi']:checked")].map(
      (el) => el.value
    );
    presenter.handleSubmit(selected);
  });
}
