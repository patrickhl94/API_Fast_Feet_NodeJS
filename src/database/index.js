import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

// IMPORT MODELS
import UserAdmin from '../app/models/UserAdmin';
import Recipients from '../app/models/Recipients';

const models = [UserAdmin, Recipients];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
