import Database from '../../../data/database';
import DestinationPresenter from './destination-presenter';

export default class DestinationPage {
  #presenter = null;
  async render() {
    return `ini destinasi`;
  }

  async afterRender() {
    this.#presenter = new DestinationPresenter({
      view: this,
      model: Database,
    });
  }
}
