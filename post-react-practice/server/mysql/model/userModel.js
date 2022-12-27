export default (sequelizeConfig, Sequelize) => {
  // Set Model
  const Users = sequelizeConfig.define(
    "users",
    {
      userId: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        comment: "고유번호",
      },
      username: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  return Users;
};
