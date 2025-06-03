import LoginPage from '../pages/auth/login/login-page';
import RegisterPage from '../pages/auth/register/register-page';
import DestinationDetailPage from '../pages/destination/destination-detail/destination-detail-page';
import DestinationPage from '../pages/destination/destination/destination-page';
import EventDetailPage from '../pages/event/event-detail/event-detail-page';
import EventPage from '../pages/event/event/event-page';
import HomePage from '../pages/home/home-page';
import LandingPage from '../pages/landing/landing-page';
import ProfilePage from '../pages/profile/profile-page';
import { checkAuthenticatedRoute, checkUnauthenticatedRouteOnly } from '../utils/auth';
import PersonalOptionPage from '../pages/auth/option/personal-option-page'; 

export const routes = {
  '/': () => new LandingPage(),
  
  '/login': () => checkUnauthenticatedRouteOnly(new LoginPage()),
  '/register': () => checkUnauthenticatedRouteOnly(new RegisterPage()),
  '/personal-option': () => checkUnauthenticatedRouteOnly(new PersonalOptionPage()),

  // !!NOTE: kalau auth page (login, register) udah jadi, tinggal tambahin function kaya hash login di atas,
  // misalnya utk destinasi: checkAuthenticatedRoute(new DestinationPage())
  // jadi page destinasi hanya untuk aunthenticated user (sudah login)
  '/home': () => checkAuthenticatedRoute(new HomePage()),
  '/destinations': () => checkAuthenticatedRoute(new DestinationPage()),
  '/destinations/:id': () => checkAuthenticatedRoute(new DestinationDetailPage()),
  '/events': () => checkAuthenticatedRoute(new EventPage()),
  '/events/:id': () => checkAuthenticatedRoute(new EventDetailPage()),
  '/bookmark': () => checkAuthenticatedRoute(new BookmarkPage()),
  '/profile': () => checkAuthenticatedRoute(new ProfilePage()),
};
