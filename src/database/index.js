import Sequelize from 'sequelize';

import databaseCOnfig from '../config/database';

// IMPORT MODELS
import UserAdmin from '../app/models/UserAdmin';

const models = [UserAdmin];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseCOnfig);
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
