import { Sequelize, Model } from 'sequelize';

class DeliveryProblems extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(model) {
    this.belongsTo(model.Deliveries, {
      foreignKey: 'delivery_id',
      as: 'deliveries',
    });
  }
}

export default DeliveryProblems;
