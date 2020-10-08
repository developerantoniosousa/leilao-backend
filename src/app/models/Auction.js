import Sequelize, { Model } from 'sequelize';

class Auction extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        value: Sequelize.FLOAT,
        is_used: Sequelize.BOOLEAN,
        completed_at: Sequelize.DATE,
        openning_date: {
          type: Sequelize.VIRTUAL,
          get() {
            return this.createdAt;
          },
        },
        is_completed: {
          type: Sequelize.VIRTUAL,
          get() {
            return Boolean(this.completed_at);
          },
        },
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'responsabler_id',
      as: 'resonsabler',
    });
  }
}

export default Auction;
