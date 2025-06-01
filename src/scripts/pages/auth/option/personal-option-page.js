import * as SakaLokaAPI from '../../../data/api';
import * as AuthModel from '../../../utils/auth';
import PersonalOptionPresenter from './personal-option-presenter';

export default class PersonalOptionPage {
  #presenter = null;

  async render() {
    return `
      <div class="option-wrapper">
  <div class="option-card">
    <h2 class="option-title">Pilih 3 Destinasi Favoritmu</h2>
    <form id="option-form" class="option-form">
      <label><input type="checkbox" name="destinasi" value="Bahari" /><span>Bahari</span></label>
      <label><input type="checkbox" name="destinasi" value="Desa Wisata" /><span>Desa Wisata</span></label>
      <label><input type="checkbox" name="destinasi" value="Taman Hiburan" /><span>Taman Hiburan</span></label>
      <label><input type="checkbox" name="destinasi" value="Budaya" /><span>Budaya</span></label>
      <label><input type="checkbox" name="destinasi" value="Cagar Alam" /><span>Cagar Alam</span></label>
      <label><input type="checkbox" name="destinasi" value="Taman Nasional" /><span>Taman Nasional</span></label>

      <div class="submit-wrapper">
        <button type="submit" class="submit-button">Submit</button>
      </div>
    </form>
  </div>
</div>

    `;
  }

  async afterRender() {
    this.#presenter = new PersonalOptionPresenter({
      view: this,
      model: SakaLokaAPI,
      authModel: AuthModel,
    });

    const form = document.getElementById('option-form');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const checked = [...form.querySelectorAll('input[name="destinasi"]:checked')];

      if (checked.length !== 3) {
        alert('Pilih tepat 3 destinasi favorit.');
        return;
      }

      const values = checked.map((c) => c.value);
      this.#presenter.savePreferences(values);
    });
  }

  optionSavedSuccessfully(message) {
    alert(message);
    location.hash ='/login'; 
  }

  optionSaveFailed(message) {
    alert(message);
  }
}
