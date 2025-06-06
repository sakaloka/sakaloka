export function saveSession(data) {
  if (!data) return;
  localStorage.setItem('accessToken', data.token);
  localStorage.setItem('user', JSON.stringify(data));
}

export function getSession() {
  return {
    accessToken: localStorage.getItem('accessToken'),
    user: JSON.parse(localStorage.getItem('user') || '{}'),
  };
}

export function getAccessToken() {
  return getSession().accessToken;
}
  
export function clearSession() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
}
