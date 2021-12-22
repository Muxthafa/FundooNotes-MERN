/* ************************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 * 
 * @description     : creates the server               
 * 
 * @file            : index.js
 * @author          : Mohammad Musthafa
 * @version         : 1.0
 * @since           : 7-Oct-2021
 * 
 **************************************************************************/

const express = require("express");
const app = express();
const path = require('path');

const routesNote = require("./app/routes/note.routes.js");
const routesUser = require("./app/routes/user.routes.js");
const routesLabel = require("./app/routes/label.routes.js");
const errorHandler = require("./app/middleware/error.middleware.js");
const {createCustomError} = require('./app/error-handler/custom-error')
const dbConnect = require("./config/db/db.connect.js")

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');  //swagger integration
const cors = require('cors')

require('dotenv').config()

app.use(
  cors({
    origin: "https://fundoonotes-mern.herokuapp.com"
  })
)
const PORT = process.env.PORT || 8080;

app.use(express.static(path.resolve(__dirname, './fundoo-notes/build')));

//middleware function to parse incoming post requests
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(express.static('uploads'))

//swagger ui for documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//all requests starting with notes in the URL are handled by routes
app.use("/notes", routesNote);

//all requests starting with users in the URL are handled by routes
app.use("/users", routesUser);

//all requests starting with label in the URL are handled by routes
app.use("/labels", routesLabel);

//all requests apart from /notes handled here
app.all('*',(req,res,next)=>{
  next(createCustomError(`Requested URL route ${req.url} is not found`,404))
})

//express middleware global error handler
app.use(errorHandler)

//server creation with port number 3000
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  dbConnect()
});

module.exports = app //for the testing
