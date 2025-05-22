import Database from '../../../data/database';
import EventPresenter from './event-presenter';

export default class EventPage {
  #presenter = null;
  async render() {
    return `ini event`;
  }

  async afterRender() {
    this.#presenter = new EventPresenter({
      view: this,
      model: Database,
    });
  }
}