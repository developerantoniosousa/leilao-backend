const tableName = 'auctions';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      value: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      is_used: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      responsabler_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { key: 'id', model: 'users' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      completed_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable(tableName);
  },
};
