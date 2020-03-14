module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('deliveries', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      deliveryman_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'delivermans', key: 'id' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      recipient_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'recipients', key: 'id' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      signature_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'signatures', key: 'id' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      product: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      canceled_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('deliveries');
  },
};
