import Sequelize, { Model } from 'sequelize';

class Recipients extends Model {
  static init() {
    super.init(
      {
        name: Sequelize.STRING,
        street: Sequelize.STRING,
        number_anddress: Sequelize.INTEGER,
        complement: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        zip_code: Sequelize.INTEGER,
      },
      {
        Sequelize,
      }
    );
  }
}

export default Recipients;
