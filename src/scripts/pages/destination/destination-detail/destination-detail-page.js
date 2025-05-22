import Database from '../../../data/database';
import DestinationDetailPresenter from './destination-detail-presenter';

export default class DestinationDetailPage {
  #presenter = null;
  async render() {
    return `ini detail destinasi`;
  }

  async afterRender() {
    this.#presenter = new DestinationDetailPresenter({
      view: this,
      model: Database,
    });
  }
}