import { html, render } from 'lit-html';
import PersonalOptionPresenter from './personal-option-presenter.js';
import AuthModel from '../../components/utils/auth-model.js';

export function renderPersonalOption(container) {
  const presenter = new PersonalOptionPresenter({
    view: {
      showError: (msg) => alert(msg),
      showSuccess: (msg) => alert(msg),
    },
    authModel: new AuthModel(),
  });

  const destinasiList = [
    'Bahari',
    'Desa Wisata',
    'Taman Hiburan',
    'Budaya',
    'Cagar Alam',
    'Taman Nasional',
  ];

  const template = html`
    <div class="option-wrapper">
      <div class="option-card">
        <h2 class="option-title">Pilih 3 Destinasi Favoritmu</h2>
        <form id="option-form" class="option-form">
          ${destinasiList.map(
            (item) => html`
              <label>
                <input type="checkbox" name="destinasi" value="${item}" />
                <span>${item}</span>
              </label>
            `,
          )}
          <div class="submit-wrapper">
            <button type="submit" class="submit-button">Submit</button>
          </div>
        </form>
      </div>
    </div>
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
      (el) => el.value,
    );
    presenter.handleSubmit(selected);
  });
}
