import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

// IMPORT MODELS
import UserAdmin from '../app/models/UserAdmin';
import Recipients from '../app/models/Recipients';
import Avatar from '../app/models/Avatar';
import Deliverman from '../app/models/Deliverman';

const models = [UserAdmin, Recipients, Avatar, Deliverman];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
