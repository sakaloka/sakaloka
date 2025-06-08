import { html, render } from 'lit-html';
import LoginPresenter from './login-presenter.js';

export function renderLogin(container) {
  const presenter = new LoginPresenter({
    view: {
      showSuccess: () => {},
      showError: () => {},
    },
  });

  const template = html`
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
          <div class="form-link">Belum punya akun? <a href="#/register">Buat akun</a></div>
        </form>
      </div>
    </div>
  `;

  render(template, container);

  const form = document.querySelector('#login-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    presenter.handleLogin(email, password);
  });
}
