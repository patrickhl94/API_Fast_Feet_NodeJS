import Sequelize, { Model } from 'sequelize';

class UserAdmin extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        amail: Sequelize.STRING,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default UserAdmin;
