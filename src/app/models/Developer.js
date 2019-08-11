import Sequelize, { Model } from 'sequelize';

class Developers extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        user: Sequelize.STRING,
        bio: Sequelize.STRING,
        avatar: Sequelize.STRING,
        likes: Sequelize.ARRAY(Sequelize.INTEGER),
        dislikes: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Developers, { foreignKey: 'id' });
  }
}

export default Developers;
