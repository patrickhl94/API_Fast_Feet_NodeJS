import { Sequelize, Model } from 'sequelize';

class Signature extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3300/signature/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );
  }
}

export default Signature;
