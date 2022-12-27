import db from "../model/index.js";
const Users = db.users;
const Op = db.sequelize.Op;

// Create tutorial

const create = (req, res) => {
  // Validate request
  if (!req.body.userId) {
    res.status(400).send({
      message: "userId is empty!",
    });
    return;
  }

  // Set tutorial
  const users = {
    userId: req.body.userId,
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  };

  // Save tutorial
  Users.create(users)
    .then(data => {
      console.log("data", data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Create tutorial failure.",
      });
    });
};

// Retrieve all tutorials
const findAll = (req, res) => {
  const title = req.query.title;
  const keyword = req.query.keyword;
  let condition = { where: {} };

  if (keyword) {
    condition = {
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${keyword}%`,
            },
          },
          {
            description: {
              [Op.like]: `%${keyword}%`,
            },
          },
        ],
      },
    };
  }

  Users.findAll(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Retrieve all tutorials failure.",
      });
    });
};

// Retrieve tutorial by id
const findOne = (req, res) => {
  const id = req.params.id;

  Users.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Retrieve tutorial failure. (id: " + id + ")",
      });
    });
};

// Update tutorial by id
const updateById = (req, res) => {
  const id = req.params.id;
  const condition = id ? { where: { id: id } } : null;

  Users.update(req.body, condition)
    .then(resultCount => {
      if (resultCount == 1) {
        res.send({
          message: "Tutorial updated.",
        });
      } else {
        res.send({
          message: "Cannot update tutorial. (id: " + id + ")",
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Update tutorial failure. (id: " + id + ")",
      });
    });
};

// Delete tutorial by id
const deleteById = (req, res) => {
  const id = req.params.id;
  const condition = id ? { where: { id: id } } : null;

  Users.destroy(condition)
    .then(resultCount => {
      if (resultCount == 1) {
        res.send({
          message: "Tutorial deleted.",
        });
      } else {
        res.send({
          message: "Cannot delete tutorial. (id: " + id + ")",
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Delete tutorial failure. (id: " + id + ")",
      });
    });
};
export { create, findAll, findOne, updateById, deleteById };
