import * as SakaLokaAPI from '../../../data/api';
import * as AuthModel from '../../../utils/auth';
import LoginPresenter from './login-presenter';

export default class LoginPage {
  #presenter = null;

  async render() {
    return `
      <div class="login-wrapper">
        <div class="login-card">
          <h2>Login</h2>
          <form id="login-form">
            <div class="form-group">
              <i class="fas fa-user"></i>
              <input type="text" name="email" placeholder="Masukkan Nama atau Email" required />
            </div>
            <div class="form-group">
              <i class="fas fa-plus-square"></i>
              <input type="password" name="password" placeholder="Masukkan Kata Sandi" required />
            </div>
            <button type="submit" class="form-button">Masuk</button>
            <div class="form-link" style="margin-top: 12px;">
              Belum punya akun? <a href="#/register">Buat akun</a>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  async afterRender() {
    this.#presenter = new LoginPresenter({
      view: this,
      model: SakaLokaAPI,
      authModel: AuthModel,
    });

    const form = document.querySelector('#login-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.email.value.trim();
      const password = form.password.value.trim();
      this.#presenter.login({ email, password });
    });
  }

  loginSuccessfully(message) {
    alert(message);
    location.hash = '/';
  }

  loginFailed(message) {
    alert(message);
  }
}
