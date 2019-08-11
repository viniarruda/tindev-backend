import Sequelize from 'sequelize';

import Developer from '../app/models/Developer';

import databaseConfig from '../config/database';

const models = [Developer];

class Database {
  constructor() {
    this.connection = new Sequelize(databaseConfig);

    this.init();
  }

  init() {
    models.forEach(model => model.init(this.connection));
  }
}

export default new Database();
