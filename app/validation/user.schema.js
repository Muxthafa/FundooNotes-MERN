/* ************************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 * 
 * @description     : creation of validation schema using joi                
 * 
 * @file            : user.schema.js
 * @author          : Mohammad Musthafa
 * @version         : 1.0
 * @since           : 7-Oct-2021
 * 
 **************************************************************************/

const joi = require("@hapi/joi");

/*
 *creates a schema object for user validation
 *defines constraints for user data
 */
const userSchema = joi.object({
  firstName: joi.string().min(3).max(30).required(),
  lastName: joi.string().min(3).max(30).required(),
  address: joi.string(),
  phone: joi.number().integer().min(1000000000).max(9999999999),
  email: joi.string().email().required(),
  password: joi.string().required().min(3).max(15),
});

module.exports = { userSchema };
