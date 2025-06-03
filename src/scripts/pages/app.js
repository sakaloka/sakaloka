import { getActiveRoute } from '../routes/url-parser';
import { setupSkipToContent, transitionHelper } from '../utils';
import { getAccessToken, getLogout } from '../utils/auth';
import { routes } from '../routes/routes';
import { generateAuthenticatedNavigationListTemplate, generateUnauthenticatedNavigationListTemplate } from '../templates';

export default class App {
  #content;
  #drawerButton;
  #drawerNavigation;
  #skipLinkButton;

  constructor({ content, drawerNavigation, drawerButton, skipLinkButton }) {
    this.#content = content;
    this.#drawerButton = drawerButton;  
    this.#drawerNavigation = drawerNavigation;
    this.#skipLinkButton = skipLinkButton;

    this.#init();
  }

  #init() {
    setupSkipToContent(this.#skipLinkButton, this.#content);
    this.#setupDrawer();
  }

  #setupDrawer() {
    this.#drawerButton.addEventListener('click', () => {
      this.#drawerNavigation.classList.toggle('open');
    });

    document.body.addEventListener('click', (event) => {
      const isTargetInsideDrawer = this.#drawerNavigation.contains(event.target);
      const isTargetInsideButton = this.#drawerButton.contains(event.target);

      if (!(isTargetInsideDrawer || isTargetInsideButton)) {
        this.#drawerNavigation.classList.remove('open');
      }

      this.#drawerNavigation.querySelectorAll('a').forEach((link) => {
        if (link.contains(event.target)) {
          this.#drawerNavigation.classList.remove('open');
        }
      });
    });
  }

  #setupNavigationList() {
    const isLogin = !!getAccessToken();
    const navlist = this.#drawerNavigation.children.namedItem('navlist');
    const headerContainer = document.getElementById('header-container');
    
    // Unauthenticated User
    if (!isLogin) {
      headerContainer.classList.add('unauthenticated-nav');
      navlist.innerHTML = generateUnauthenticatedNavigationListTemplate();
      return;
    }
    
    headerContainer.classList.remove('unauthenticated-nav');
    navlist.innerHTML = generateAuthenticatedNavigationListTemplate();

    document.getElementById('user-toggle').addEventListener('click', () => {
      const dropdown = document.getElementById('user-dropdown');
      dropdown.classList.toggle('hidden');
    });

    const logoutButton = document.getElementById('logout-button');
    logoutButton.addEventListener('click', (event) => {
      event.preventDefault();

      if (confirm('Apakah Anda yakin ingin keluar?')) {
        getLogout();

        // Redirect
        location.hash = '/landing';
      }
    });
  }
  async renderPage() {
    const url = getActiveRoute();
    const route = routes[url];
    const isLogin = getAccessToken();

    // Get page instance
    const page = route();

    const transition = transitionHelper({
      updateDOM: async () => {
        const header = document.getElementById('header');
        
        this.#content.innerHTML = await page.render();
        console.log('isi halaman', await page.render());
        page.afterRender();
      },
    });

    transition.ready.catch(console.error);
    transition.updateCallbackDone.then(() => {
      scrollTo({ top: 0, behavior: 'instant' });
      this.#setupNavigationList();
    });
  }
}
