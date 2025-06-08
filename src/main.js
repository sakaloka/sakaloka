import './style.css';
import 'tom-select/dist/css/tom-select.css';
import { html, render, nothing } from 'lit-html';
import { routes } from './routes/routes.js';
import { renderHeader } from './components/header.js';
import { navBackRender } from './components/navBack.js';
import { toast } from './components/utils/toast.js';
import { API_URL } from './constants/urlApi.js';
import { renderFooter } from './components/footer.js';
import { renderLandingHeader } from './components/landing/header.js';
import { registerServiceWorker } from './components/utils/index.js';

document.addEventListener('DOMContentLoaded', () => {
  document.body.setAttribute('data-theme', 'light');

  if (!location.hash || location.hash === '#/') location.hash = '#/' + defaultHome();

  registerServiceWorker();

  window.addEventListener('load', () => {
    const splash = document.getElementById('splashScreen');
    if (splash) {
      splash.classList.add('fade-out');
      setTimeout(() => splash.remove(), 500);
    }
    handleRoute();
  });

  document.addEventListener('focusin', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
      setTimeout(() => {
        e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => window.scrollBy(0, -10), 300);
      }, 300);
    }
  });

  window.addEventListener('hashchange', handleRoute);

  const token = localStorage.getItem('accessToken');
  if (token) {
    const originalFetch = window.fetch;
    window.fetch = async (input, init = {}) => {
      const authInit = {
        ...init,
        headers: { ...init.headers, Authorization: `Bearer ${token}` },
      };

      const res = await originalFetch(input, authInit);
      if (res.status === 401) {
        toast('Refresh token failed, redirecting to login.');
        window.location.href = '/login';
        return;
      }
      if (res.status === 403) {
        localStorage.clear();
        sessionStorage.clear();
        toast('Akun anda telah di Nonaktifkan', 'error');
        navigateTo('login');
        return;
      }
      return res;
    };
  }
});

export function handleRoute() {
  const hash = location.hash.replace(/^#\//, '') || defaultHome();
  const { route, routeKey, param } = matchRoute(hash);
  const accessToken = localStorage.getItem('accessToken');
  const content = document.getElementById('pageWrapper');
  if (!content) return;

  showLoader();

  if (!isModalOpen) {
    content.classList.add('opacity-0', 'translate-y-2', 'transition-all', 'duration-300');
  }

  setTimeout(() => {
    render(html``, content);

    if (route && typeof route.render === 'function') {
      proceedToRoute(route, param, routeKey, content, accessToken);
    } else {
      window.__isSidebarOpen = false;
      if (window.__isSidebarOpen) {
        document.querySelector('main')?.classList.add('pl-64');
      } else {
        document.querySelector('main')?.classList.remove('pl-64');
      }

      navBackRender();
      render(
        html`
          <section class="mt-20 w-full mx-auto px-5 py-5">
            <h2 class="text-1xl font-semibold text-primary">🚧 Fitur Sedang Dikembangkan</h2>
            <p class="text-sm text-gray-500">
              Kami sedang menyelesaikan fitur ini. Nantikan update selanjutnya ya!
            </p>
          </section>
        `,
        content,
      );
      document.title = '404 - Not Found';
    }

    requestAnimationFrame(() => {
      content.classList.remove('transition-all', 'duration-300', 'opacity-0', 'translate-y-2');
      content.classList.add('opacity-100', 'translate-y-0');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    hideLoader();
  }, 150);
}

function proceedToRoute(route, param, routeKey, content, accessToken) {
  renderNavbar(route, routeKey);
  const wrapper = document.getElementById('pageWrapper');
  if (wrapper) {
    if (route?.showNavbar) {
      if (route.protectedRoute) {
        wrapper.classList.add(
          'transition-all',
          'duration-300',
          'opacity-100',
          'translate-y-0',
          'w-full',
          'px-4',
          'sm:px-6',
          'md:px-8',
          'mt-5',
        );
        wrapper.style.setProperty('margin-bottom', '100px', 'important');
      } else {
        wrapper.classList.remove(
          'transition-all',
          'duration-300',
          'opacity-100',
          'translate-y-0',
          'w-full',
          'px-4',
          'sm:px-6',
          'md:px-8',
          'mt-5',
        );
        wrapper.style.marginBottom = '';
      }
    } else {
      wrapper.classList.remove(
        'transition-all',
        'duration-300',
        'opacity-100',
        'translate-y-0',
        'w-full',
        'px-4',
        'sm:px-6',
        'md:px-8',
        'mt-5',
      );
      wrapper.style.marginBottom = '';
    }
  }

  if (route.protectedRoute && !accessToken) {
    toast('Kamu harus login untuk mengakses halaman ini.', 'error');
    const container = document.getElementById('pageWrapper');
    if (container) render(nothing, container);
    const main = document.querySelector('main');
    main?.classList.remove('pl-64');

    location.hash = '#/login';
    return;
  }

  route.render(content, param);
  renderFooter();

  requestAnimationFrame(() => {
    content.classList.add('opacity-100', 'translate-y-0');
    content.classList.remove('opacity-0', 'translate-y-2');
  });

  setActiveNav(routeKey);
  document.title = route.title || 'SakaLoka';
}

function renderNavbar(route, routeKey) {
  const header = document.getElementById('header');
  if (header) render(null, header);
  if (route?.showNavbar) {
    if (route?.backNav) {
      navBackRender(routeKey);
    } else {
      if (route.protectedRoute) {
        renderHeader();
      } else {
        renderLandingHeader();
      }
    }
  }
}

function defaultHome() {
  return 'index';
}

function matchRoute(pathname) {
  pathname = pathname.replace(/\/+$/, '');

  for (const key in routes) {
    if (key.includes('/:')) {
      const pattern = key.replace(/:\w+/g, '([^/]+)');
      const regex = new RegExp(`^${pattern}$`);
      const match = pathname.match(regex);
      if (match) return { route: routes[key], routeKey: key, param: match[1] };
    } else if (key === pathname) {
      return { route: routes[key], routeKey: key, param: null };
    }
  }

  return { route: null, routeKey: pathname, param: null };
}

function setActiveNav(active) {
  document.querySelectorAll('[data-nav]').forEach((btn) => {
    const isActive = btn.getAttribute('data-nav') === active;
    btn.classList.toggle('text-white', isActive);
    btn.classList.toggle('text-white/80', !isActive);
  });
}

export function navigateTo(path) {
  if (location.hash === `#/${path}`) {
    handleRoute();
  } else {
    location.hash = `#/${path}`;
  }
}

export function showLoader() {
  document.getElementById('loadingIndicator')?.classList.remove('hidden');
}

export function hideLoader() {
  document.getElementById('loadingIndicator')?.classList.add('hidden');
}

let isModalOpen = false;
