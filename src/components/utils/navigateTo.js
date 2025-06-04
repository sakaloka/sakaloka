export function navigateTo(path) {
  if (location.hash === `#/${path}`) {
    handleRoute();
  } else {
    location.hash = `#/${path}`;
  }
}
