export default class AuthModel {}
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
