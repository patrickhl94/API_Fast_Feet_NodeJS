import Sequelize, { Model } from 'sequelize';

class Recipients extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        street: Sequelize.STRING,
        number_address: Sequelize.INTEGER,
        complement: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        neighborhood: Sequelize.STRING,
        zip_code: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
}

export default Recipients;
