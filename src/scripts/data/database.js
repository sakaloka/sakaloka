import { openDB } from 'idb';

const DATABASE_NAME = 'sakaloka';
const DATABASE_VERSION = 1;
const OBJECT_STORE_NAME = 'saved-items';

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade: (database) => {
    database.createObjectStore(OBJECT_STORE_NAME, {
      keyPath: 'id',
    });
  },
});

const Database = {};

export default Database;