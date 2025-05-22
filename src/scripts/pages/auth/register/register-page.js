import { parseActivePathname } from '../../../routes/url-parser';
import * as SakaLokaAPI from '../../../data/api';
import * as AuthModel from '../../../utils/auth';
import RegisterPresenter from './register.presenter';

export default class RegisterPage {
  #presenter = null;

  async render() {
    return `ini sign up`;
  }

  async afterRender() {
    this.#presenter = new RegisterPresenter(parseActivePathname().id, {
      view: this,
      apiModel: SakaLokaAPI,
      authModel: AuthModel,
    });
  }

  registerSuccessfully(message) {
    console.log(message);

    // Redirect
    location.hash = '/';
  }

  registerFailed(message) {
    alert(message);
  }
}