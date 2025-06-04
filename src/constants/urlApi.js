export const API_URL = 'http://localhost:9000'; // ganti nanti

const SakaLokaAPI = {
  saveSession({ accessToken, user }) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(user));
  },

  getSession() {
    const token = localStorage.getItem('accessToken');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return { token, user };
  },

  clearSession() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  },

  async get(key) {
    if (key === 'profile') {
      // Versi backend (ganti nanti)
      // const res = await fetch(`${API_URL}/profile`, {
      //   headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      // });
      // return await res.json();

      // Versi dummy lokal
      return JSON.parse(localStorage.getItem('user') || '{}');
    }
    return null;
  },

  async update(key, data) {
    if (key === 'profile') {
      // Versi backend (ganti nanti)
      // await fetch(`${API_URL}/profile`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      //   },
      //   body: JSON.stringify(data),
      // });

      // Simpan lokal
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    }
    return null;
  }
};

export default SakaLokaAPI;

