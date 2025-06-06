export default class AuthModel {
  async login(email, password) {
    // Dummy Login
    if (email === 'admin' && password === 'admin123') {
      return {
        accessToken: 'dummy-token',
        user: { name: 'Admin', email },
      };
    }

    throw new Error('Email atau password salah (dummy)');
  }

  async register(name, email, password) {
    // Dummy Register
    return {
      accessToken: 'dummy-token',
      user: { name, email },
    };
  }

  async saveFavoritDestinasi(destinasiList) {
    // Simpan destinasi favorit
    console.log('Disimpan ke dummy session:', destinasiList);
    return true;
  }
}
// API
//
// async login(email, password) {
//   const res = await fetch(`${API_URL}/auth/login`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ email, password }),
//   });

//   if (!res.ok) {
//     const errorData = await res.json();
//     throw new Error(errorData?.message || 'Gagal login');
//   }

//   const json = await res.json();
//   return {
//     accessToken: json?.accessToken,
//     user: json?.user,
//   };
// }

// async register(name, email, password) {
//   const res = await fetch(`${API_URL}/auth/register`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ name, email, password }),
//   });

//   if (!res.ok) {
//     const errorData = await res.json();
//     throw new Error(errorData?.message || 'Gagal registrasi');
//   }

//   const json = await res.json();
//   return {
//     accessToken: json?.accessToken,
//     user: json?.user,
//   };
// }
