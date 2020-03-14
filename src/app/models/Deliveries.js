import { Sequelize, Model } from 'sequelize';

class Deliveries extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        end_date: Sequelize.DATE,
        start_date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(model) {
    this.belongsTo(model.Deliverman, {
      foreignKey: 'deliveryman_id	',
      as: 'deliverman',
    });

    this.belongsTo(model.Recipients, {
      foreignKey: 'recipient_id	',
      as: 'recipient',
    });

    this.belongsTo(model.Signature, {
      foreignKey: 'signature_id	',
      as: 'signature',
    });
  }
}

export default Deliveries;
