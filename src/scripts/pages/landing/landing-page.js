import Database from '../../data/database';
import LandingPresenter from './landing-presenter';

export default class LandingPage {
  #presenter = null;
  async render() {
    return `ini landing page`;
  }

  async afterRender() {
    this.#presenter = new LandingPresenter({
      view: this,
      model: Database,
    });
  }
}