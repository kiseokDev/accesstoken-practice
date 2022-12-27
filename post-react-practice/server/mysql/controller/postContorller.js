import db from "../model/index.js";
const Posts = db.posts;
const Users = db.users;
import getUserIdFromToken from "../../util/posts.js";
const Op = db.sequelize.Op;

// Create tutorial

const create = (req, res) => {
  // Validate request !req.body.userid ||
  const token = req.cookies?.accessToken;
  const userId = getUserIdFromToken(req, res);

  if (!req.body.body || !req.body.title || !req.body.username) {
    res.status(400).send({
      message: "something is empty!",
    });
    return;
  }

  // Set tutorial
  const post = {
    title: req.body.title,
    body: req.body.body,
    username: req.body.username,
    userId: userId,
  };

  // Save tutorial
  Posts.create(post)
    .then(data => {
      const { user } = data;
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
      // where: {
      //   [Op.or]: [
      //     {
      //       title: {
      //         [Op.like]: `%${keyword}%`,
      //       },
      //     },
      //     {
      //       description: {
      //         [Op.like]: `%${keyword}%`,
      //       },
      //     },
      //   ],
      // },
    };
  }
  Posts.findAll({
    include: "user",
  })
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
  console.log(id);
  Posts.findByPk(id, { include: "user" })
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
  const condition = id ? { where: { postId: id } } : null;

  Posts.update(req.body, condition)
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

  Posts.destroy(condition)
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
