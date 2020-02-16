import Sequelize, { Model } from 'sequelize';

class UserAdmin extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
        modelName: 'usersAdmins',
      }
    );
  }
}

export default UserAdmin;
