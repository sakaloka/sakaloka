import Database from '../../data/database';
import ProfilePresenter from './profile-presenter';

export default class ProfilePage {
  #presenter = null;
  async render() {
    return `ini profile`;
  }

  async afterRender() {
    this.#presenter = new ProfilePresenter({
      view: this,
      model: Database,
    });
  }
}