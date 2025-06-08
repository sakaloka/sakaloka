import { saveSession } from '../../components/utils/auth';
import { API_URL } from '../../constants/urlApi';
import Swal from 'sweetalert2';

export default class LoginPresenter {
  async handleLogin(email, password) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // Jika email/password salah
      if (response.status === 401) {
        await Swal.fire({
          title: 'Gagal!',
          text: 'Email atau password salah',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#483434',
        });
        return this.redirectToLogin();
      }

      const result = await response.json();

      // Jika response dari API gagal
      if (result.error === 'fail') {
        await Swal.fire({
          title: 'Gagal!',
          text: result.message || 'Terjadi kesalahan saat login',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#483434',
        });
        return this.redirectToLogin();
      }

      // Simpan sesi dan arahkan ke home
      saveSession(result.loginResult);

      await Swal.fire({
        title: 'Berhasil!',
        text: 'Login berhasil',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });

      location.hash = '#/home';
    } catch (err) {
      await Swal.fire({
        title: 'Gagal!',
        text: 'Terjadi kesalahan saat login',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#483434',
      });
      this.redirectToLogin();
    }
  }

  redirectToLogin() {
    location.hash = '#/login';
  }
}
