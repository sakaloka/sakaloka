import { html, render } from 'lit-html';
import RegisterPresenter from './register-presenter.js';
import Swal from 'sweetalert2';

export function renderRegister(container) {
  const presenter = new RegisterPresenter({
    view: {
      showSuccess: (msg) =>
        Swal.fire({
          title: 'Berhasil!',
          text: msg,
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        }),
      showError: (msg) =>
        Swal.fire({
          title: 'Gagal!',
          text: msg,
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#483434',
        }),
    },
  });

  const template = html`
    <div class="register-wrapper">
      <div class="register-card">
        <h2>Register</h2>
        <form id="register-form">
          <div class="form-group">
            <i class="fas fa-user-plus"></i>
            <input type="text" name="name" placeholder="Nama" required />
          </div>
          <div class="form-group">
            <i class="fas fa-envelope"></i>
            <input type="email" name="email" placeholder="Email" required />
          </div>
          <div class="form-group">
            <i class="fas fa-plus-square"></i>
            <input type="password" name="password" placeholder="Kata Sandi" required />
          </div>
          <div class="form-group">
            <i class="fas fa-plus-square"></i>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Konfirmasi Kata Sandi"
              required
            />
          </div>
          <div class="form-checkbox">
            <input type="checkbox" name="agreement" id="agreement" required />
            <label for="agreement">Saya setuju dengan Syarat dan Ketentuan SakaLoka.</label>
          </div>
          <button type="submit" class="form-button">Buat Akun</button>
          <div class="form-link">Sudah punya akun? <a href="#/login">Masuk</a></div>
        </form>
      </div>
    </div>
  `;

  render(template, container);

  document.querySelector('#register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;

    presenter.handleRegister({
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      password: form.password.value.trim(),
      confirmPassword: form.confirmPassword.value.trim(),
      agreement: form.agreement.checked,
    });
  });
}
