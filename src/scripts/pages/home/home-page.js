import Database from '../../data/database';
import HomePresenter from './home-presenter';

export default class HomePage {
  #presenter = null;
  async render() {
    return `ini home`;
  }

  async afterRender() {
    this.#presenter = new HomePresenter({
      view: this,
      model: Database,
    });
  }
}