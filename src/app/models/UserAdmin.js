import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

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

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default UserAdmin;
