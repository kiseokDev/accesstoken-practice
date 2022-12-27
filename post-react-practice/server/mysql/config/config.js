export default {
  host: "localhost",
  port: 3306,
  username: "root",
  password: "2536",
  db: "test_db",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
