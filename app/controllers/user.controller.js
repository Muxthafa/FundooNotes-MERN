/* ************************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 * 
 * @description     : get the request, response object from user routes               
 * 
 * @file            : user.controller.js
 * @author          : Mohammad Musthafa
 * @version         : 1.0
 * @since           : 7-Oct-2021
 * 
 **************************************************************************/

const {
  createNewUser,
  findAllUsers,
  findUser,
  updateUser,
  deleteById,
  findUserEmail,
  forgotPass,
  resetPassword,
} = require("../service/user.service.js");
const logger = require("../../config/logger");
const { createCustomError } = require("../error-handler/custom-error");

/**
 * @description handles request response for authenticating the user
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const login = (req, res, next) => {
  const { email, password } = req.body;
  findUserEmail(email, password, (error, data) => {
    if (error) {
      return next(createCustomError(error, 500));
    }
    res.status(200).send({ token: data });
  });
};

/**
 * @description handles request response for creating an user
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const create = (req, res, next) => {
  let userDetails = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };
  createNewUser(userDetails, (error, data) => {
    if (error)
      return next(
        createCustomError("Error occurred while creating the User.", 401)
      );
      logger.info(`Created a new user ${data._id}`);
    return res.status(200).json({
      message: `created user ${data.firstName} successfully`,
      request: {
        type: "POST",
        url: "http://localhost:3000/users/"
      },
    });
  });
};

/**
 * @description handles request response for retrieving and return all users from the database.
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const findAll = (req, res, next) => {
  findAllUsers((error, data) => {
    if (error) {
      return next(
        createCustomError("Error occurred while fetching all the Users.", 404)
      );
    }
    if (!data) {
      return res.status(404).send({
        message: "no data found",
      });
    }
    const response = {
      count: data.length,
      Users: data.map((user) => {
        return {
          name: user.name,
          age: user.age,
          address: user.address,
          phone: user.phone,
          email: user.email,
          password: user.password,
          _id: user.id,
          request: {
            type: "GET",
            url: "http://localhost:3000/users/" + user._id,
          },
        };
      }),
    };
    logger.info("responded with all notes");
    return res.status(200).json(response);
  });
};

/**
 * @description handles request response for finding a single user with a userId
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const findOne = (req, res, next) => {
  let id = req.params.userId;
  findUser(id, (error, data) => {
    if (error) {
      return next(
        createCustomError(
          `Error occured while fetching user data with id ${id}`,
          404
        )
      );
    }
    if (!data) {
      return res.status(404).send({
        message: "no data found",
      });
    }
    logger.info(`responded with the details of user ${data._id}`)
    res.status(200).send({ User: data });
  });
};

/**
 * @description handles request response for updating a user
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const update = (req, res, next) => {
  let userDetails = {
    id: req.params.userId,
    phone: req.body.phone,
    email: req.body.email,
  };
  updateUser(userDetails, (error, data) => {
    if (error) {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id" + userDetails.id,
        });
      }
      return next(
        createCustomError("Error occurred while Updating the user.", 404)
      );
    }
    if (!data) {
      return res.status(500).send({
        message: "no data found",
      });
    }
    logger.info(`Updated the user ${data._id}`)
    res.status(200).send({ Message: "User updated successfully",User: data });
  });
};

/**
 * @description handles request response for deleting a user
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const deleteOne = (req, res, next) => {
  let id = req.params.userId;
  deleteById(id, (error, data) => {
    if (error) {
      return next(
        createCustomError(`could not delete the user with id ${id}`, 404)
      );
    }
    if (!data) {
      return res.status(404).send({
        message: "no data found",
      });
    }
    logger.info(`deleted the user ${data._id}`)
    res.status(200).send({ message: "User deleted successfully", User: data.name });
  });
};

/**
 * @description handles request response for forgot password route
 * @param {Object} req
 * @param {Object} res
 */
const forgotUserPassword = (req, res, next) => {
  let email = req.body.email;
  forgotPass(email)
    .then((data) => {
      console.log(data);
      return res.status(200).send(data);
    })
    .catch((err) => {
      return next(
        createCustomError("Not authorized to change the password", 500)
      );
    });
};

/**
 * @description handles request response for password reset
 * @param {Object} req
 * @param {Object} res
 */
const resetUserPassword = (req, res,next) => {
  let token = req.params.token;
  let password = req.body.password;

  resetPassword(token, password)
    .then((data) => {
      res.status(200).json({ message: "Password updated successfully", "Result:": data });
    })
    .catch((err) => {
      return next(
        createCustomError("Error while changing the password", 401)
      );
    });
};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  deleteOne,
  login,
  forgotUserPassword,
  resetUserPassword,
};
