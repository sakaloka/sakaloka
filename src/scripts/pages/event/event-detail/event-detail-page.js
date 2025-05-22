import Database from '../../../data/database';
import EventDetailPresenter from './event-detail-presenter';

export default class EventDetailPage {
  #presenter = null;
  async render() {
    return `ini detail event`;
  }

  async afterRender() {
    this.#presenter = new EventDetailPresenter({
      view: this,
      model: Database,
    });
  }
}