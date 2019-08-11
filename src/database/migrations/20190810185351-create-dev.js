module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('developers', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      bio: {
        type: Sequelize.STRING,
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      likes: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false,
        defaultValue: [],
      },
      dislikes: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false,
        defaultValue: [],
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
    return queryInterface.dropTable('developers');
  },
};
