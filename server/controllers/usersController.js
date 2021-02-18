// make SQL database so we can store username, pwd, and email 
const db = require('../models/userModel');

const userController = {};

userController.createUser = (req, res, next) => {
  // const {username, password, email} = req.body;
  // console.log('req body', req.body);
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  // empty result = not in db

  // params has to be in an array
  const params = [username, password, email];
  // console.log('params', params);

  // logic for if user inputted missing fields
  if (!username || !password || !email){
    return next('Missing username, password, and/or email in userController.createUser');
  }
  
  // query string
  // INSERT INTO table_name (column1, column2, column3, ...)
  // VALUES (value1, value2, value3, ...); 
  const queryString = 'INSERT INTO users_table (username, password, email) VALUES ($1, $2, $3)';

  db.query(queryString, params)
    .then((data) => {
      // console.log(data.rows[0]);
      return next();
    })
    .catch(() => {
      return next({
        log: 'error inserting username, password, email',
        message: {
          err: 'userController.createUser: ERROR: Check server logs for details'
        }
      });
    });
}

userController.verifyUser = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  // params has to be in an array
  const params = [username, password];

  const queryString = 'SELECT username, password FROM users_table WHERE username = $1 AND password = $2 LIMIT 1';
  
  // console.log('i\'m in the verify user controller')
  db.query(queryString, params)
    .then((data) => {
      // console.log('checking user inputs with database')
      if (data.rows[0] !== undefined){
        return next();
      }
      res.redirect('signup');
    })
    .catch(() => {
      return next({
        log: 'error inserting username, password, email',
        message: {
          err: 'userController.createUser: ERROR: Check server logs for details'
        }
      });
    });
}


module.exports = userController;