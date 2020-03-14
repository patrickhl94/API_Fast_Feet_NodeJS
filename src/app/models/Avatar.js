import { Sequelize, Model } from 'sequelize';

class Avatar extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3300/avatar/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );
  }
}

export default Avatar;
