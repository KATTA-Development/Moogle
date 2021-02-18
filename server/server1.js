const express = require('express');
const PORT = 3000;
const app = express();
const path = require('path');
const apiRouter = require('./routes/api');
const usersController = require('./controllers/usersController')

/**
* Set our Express view engine as ejs.
* This means whenever we call res.render, ejs will be used to compile the template.
* ejs templates are located in the client/ directory
*/
app.set('view engine', 'ejs');
app.set('views', './server/views');

/* Initialize app/express */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* MIGHT NEED TO CHANGE PATH HERE (85% sure)
user will be sent to the login page

Serve initial static index.html front page */
// app.use(express.static(path.resolve(__dirname, '../build')));


/**
* --- Express Routes ---
* Express will attempt to match these routes in the order they are declared here.
* If a route handler / middleware handles a request and sends a response without
* calling `next()`, then none of the route handlers after that route will run!
* This can be very useful for adding authorization to certain routes...
*/

/**
* root
*/
// app.get('/', (req, res) => {

//   /**
//   * Since we set `ejs` to be the view engine above, `res.render` will parse the
//   * template page we pass it (in this case 'client/secret.ejs') as ejs and produce
//   * a string of proper HTML which will be sent to the client!
//   */
//   res.render('./../client/index');

// });


/*********** SIGN UP BEG **************/
// create an endpoint where user signs up
app.get('/', (req, res) => {
  // send to ejs file where user will be prompted to give username & pwd
  console.log('Getting response');
  res.render('./server/views/signup', {error: null});
})

// verify successful sign up?
// add to db T_T
// app.post('/signup', 
//   usersController.createUser,
//   (req, res) => {
//     res.render('./views/login', {error: null});
//   }
// )

/********  SIGN UP END ***********/

// create an endpoint where user logs in
// app.get('/login', (req, res) => {
//   res.render('./views/login', {error: null});
// })


/* Define route handlers */
// app.use('/api', apiRouter);

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/* Start server */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
