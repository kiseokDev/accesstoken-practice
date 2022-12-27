export default (sequelizeConfig, Sequelize) => {
  // Set Model
  const Posts = sequelizeConfig.define(
    "posts",
    {
      postId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: "고유번호",
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
      },
      body: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  return Posts;
};
