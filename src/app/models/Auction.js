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
          type: Sequelize.DATE,
          get() {
            return this.createdAt;
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
