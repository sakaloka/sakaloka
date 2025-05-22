import { parseActivePathname } from '../../../routes/url-parser';
import * as SakaLokaAPI from '../../../data/api';
import * as AuthModel from '../../../utils/auth';
import LoginPresenter from './login-presenter';

export default class LoginPage {
  #presenter = null;

  async render() {
    return `ini sign in`;
  }

  async afterRender() {
    this.#presenter = new LoginPresenter(parseActivePathname().id, {
      view: this,
      apiModel: SakaLokaAPI,
      authModel: AuthModel,
    });
  }

  loginSuccessfully(message) {
    console.log(message);

    // Redirect
    location.hash = '/';
  }

  loginFailed(message) {
    alert(message);
  }
}