import { saveSession } from '../../components/utils/auth';
import { login, register } from '../../constants/urlApi';
import Swal from 'sweetalert2';

export default class RegisterPresenter {
  #view;

  constructor({ view }) {
    this.#view = view;
  }

  async handleRegister({ name, email, password, confirmPassword, agreement }) {
    if (!agreement) {
      Swal.fire({
        icon: 'warning',
        title: 'Syarat & Ketentuan',
        text: 'Kamu harus menyetujui Syarat dan Ketentuan.',
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Tidak Cocok',
        text: 'Konfirmasi password tidak cocok.',
        confirmButtonColor: '#483434',
      });
      return;
    }

    try {
      const res = await register({ name, email, password });

      if (!res.ok) {
        const msg = res?.message || 'Registrasi gagal.';
        Swal.fire({
          icon: 'error',
          title: 'Gagal Registrasi',
          text: msg,
        });
        return;
      }

      const loginResponse = await login({ email, password });
      if (loginResponse.ok) {
        saveSession(loginResponse.loginResult);
        Swal.fire({
          icon: 'success',
          title: 'Registrasi Berhasil!',
          text: 'Akun berhasil dibuat.',
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          window.location.hash = '#/personal-option';
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Gagal',
          text: 'Terjadi kesalahan saat melakukan registrasi.',
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Koneksi Gagal',
        text: 'Terjadi kesalahan koneksi.',
      });
    }
  }
}
