export function getUser() {
  try {
    const data = JSON.parse(localStorage.getItem('user') || '{}');
    return data;
  } catch {
    return {};
  }
}
