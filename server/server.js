/* eslint-disable prettier/prettier */
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
app.set('views', './server/views')

/* Initialize app/express */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* MIGHT NEED TO CHANGE PATH HERE (85% sure)
user will be sent to the login page

// Serve initial static index.html front page */
app.use(express.static(path.resolve(__dirname, '../client')));
// app.use(express.static(path.resolve(__dirname, '../build')));


/*********** SIGN UP BEG **************/
// create an endpoint where user signs up



app.get('/signup', (req, res) => {
  res.render('signup', {error: null});
})

app.get('/', (req, res) => {
  // send to ejs file where user will be prompted to give username & pwd
  console.log('Getting response');
  res.redirect('/login')
})

// verify successful sign up?
// add to db T_T
app.post('/signup', 
  usersController.createUser,
  (req, res) => {
    res.render('login', {error: null});
  }
)

/********  SIGN UP END ***********/

// create an endpoint where user logs in
app.get('/login', (req, res) => {
  res.render('login', {error: null});
})

app.post('/login',
  usersController.verifyUser,
  (req, res) => {
    // res.sendStatus(200);
    res.status(200).sendFile(path.resolve(__dirname, "../client/index.html"));
  }
)

/* Define route handlers */
app.use('/api', apiRouter);

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
