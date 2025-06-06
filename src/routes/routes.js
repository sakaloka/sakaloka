import { renderHome } from '../pages/home/home.js';
import { renderCalendarPage } from '../pages/event/event.js';
import { renderEventDetailPage } from '../pages/event/event-detail.js';
import { renderDestinasi } from '../pages/destinasi/destinasi.js';
import { renderDestinasiDetailPage } from '../pages/destinasi/destinasi-detail.js';
import { renderLogin } from '../pages/auth/login.js';
import { renderRegister } from '../pages/auth/register.js';
import { renderPersonalOption } from '../pages/auth/personal-option.js';
import { renderProfile } from '../pages/profile/profile.js';
import { renderBookmarkPage } from '../pages/bookmark/bookmark.js';
import { renderLandingIndex } from '../landing/index.js';

const homeRoutes = {
  'home': {
    path: 'home',
    title: 'Home',
    render: renderHome,
    protectedRoute: true,
    showNavbar: true,
  },
  'event': {
    path: 'event',
    title: 'Event',
    render: renderCalendarPage,
    protectedRoute: true,
    showNavbar: true,
  },
  'event/detail/:id': {
    path: 'event/detail/:id',
    title: 'Detail Event',
    render: renderEventDetailPage,
    protectedRoute: true,
    showNavbar: true,
  },
  'destinasi': {
    path: 'destinasi',
    title: 'Destinasi',
    render: renderDestinasi,
    protectedRoute: true,
    showNavbar: true,
  },
  'destinasi/detail/:id': {
    path: 'destinasi/detail/:id',
    title: 'Detail Destinasi',
    render: renderDestinasiDetailPage,
    protectedRoute: true,
    showNavbar: true,
  },
  'profile': {
    path: 'profile',
    title: 'Profil Saya',
    render: renderProfile,
    protectedRoute: true,
    showNavbar: true,
  },
  'bookmark': {
    path: 'bookmark',
    title: 'Bookmark',
    render: renderBookmarkPage,
    protectedRoute: true,
    showNavbar: true,
  },
};

const authRoutes = {
  'login': {
    path: 'login',
    title: 'Login',
    render: renderLogin,
    showNavbar: false,
  },
  'register': {
    path: 'register',
    title: 'Register',
    render: renderRegister,
    showNavbar: false,
  },
  'personal-option': {
    path: 'personal-option',
    title: 'Pilih Destinasi',
    render: renderPersonalOption,
    showNavbar: false,
  },
};

const landingPage = {
  index: {
    path: 'index',
    title: 'Sakalola Apps',
    render: renderLandingIndex,
    showNavbar: true,
  },
};

export const routes = {
  ...homeRoutes,
  ...authRoutes,
  ...landingPage,
};
