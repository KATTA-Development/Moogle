const db = require('../models/movieModels');
var axios = require("axios");
const savedMovieController = {};



// This makes a GET fetch to RapidAPI's IMDb Alternative API and grabs an array of objects containing
// Title, Year, and imdbID (unused: Type) (case sensitive). Pass this onto the next middleware back in api.js.
savedMovieController.findTitleAndId = (req, res, next) => {
  const options = {
    method: 'GET',
    url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
    params: {s: `${req.params.title}`, page: '1-2', r: 'json'},
    headers: {
      'x-rapidapi-key': '081dbdf260msh363bc0cda44327ep16cc20jsnbd0bdd18459b',
      'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
    }
  };
  
  axios.request(options)
    .then(response => {
      if (!response.data.Search) res.locals.searchResults = {};
      else res.locals.searchResults = response.data.Search;
      return next();
    })
    .catch(err => {
      console.error(err);
      return next(err);
    });
};


// This makes a GET fetch to RapidAPI's IMDb Alternative API with a specific imdbId 
// and returns a large list of various movie details
savedMovieController.selectTitle = (req, res, next) => {
  const options = {
    method: 'GET',
    url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
    params: {i: `${req.params.imdbid}`, r: 'json'},
    headers: {
      'x-rapidapi-key': '081dbdf260msh363bc0cda44327ep16cc20jsnbd0bdd18459b',
      'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
    }
  };

  axios.request(options)
    .then(response => {
      // console.log(response.data);
      res.locals.filmDetails = response.data;
      return next();
    })
    .catch(err => {
      console.error(err);
      return next(err);
    });
};



// This makes a GET fetch to RapidAPI's IMDb API with the same imdbId as the previous mw 
// and adds the youtube link for a movie trailer to the response
savedMovieController.getTrailer = (req, res, next) => {
  const options = {
    method: 'GET',
    url: 'https://movies-tvshows-data-imdb.p.rapidapi.com/',
    params: {type: 'get-movie-details', imdb: `${req.params.imdbid}`},
    headers: {
      'x-rapidapi-key': '081dbdf260msh363bc0cda44327ep16cc20jsnbd0bdd18459b',
      'x-rapidapi-host': 'movies-tvshows-data-imdb.p.rapidapi.com'
    }
  };
  
  axios.request(options)
    .then(response => {
      // console.log(response.data);
      res.locals.filmDetails.trailer = `youtube.com/embed/${response.data.youtube_trailer_key}`;
      return next();
    })
    .catch(err => {
      console.error(err);
      return next(err);
    });
};



// This makes a query to our PostgreSQL database, 
// checking for the row data for the provided imdb_id
savedMovieController.checkSql = (req, res, next) => {
  const value = [ req.params.imdbid ]; // double check against actual provided params
  const sqlQuery = `SELECT film_id FROM savedmovies WHERE imdb_film_id = $1`;

  db.query(sqlQuery, value)
    .then(response => {
      console.log('Check for this value: ', response.rows);
      if (response.rows[0]) {
        res.locals.checkedQuery = true;
        return next();        
      }
      else {
        res.locals.checkedQuery = false;
        return next();
      }
    })
    .catch(err => {
      console.error(err);
      return next(err);
    })
};



// This makes a POST fetch to our PostgreSQL database, storing most of the data 
// retrieved from the GET request for the selected film
savedMovieController.savedFilm = (req, res, next) => {
  const {
    imdbID, Title, Released, Rated, Runtime,
    Genre, Director, Writer, Actors, Plot, Language, Country, 
    Poster, imdbRating, imdRating, rtRating, mcRating, 
    BoxOffice, movienite_user_rating, trailer
  } = req.body;
  // const imdRating = req.body.Ratings[0].Value;
  // const rtRating = req.body.Ratings[1].Value;
  // const mcRating = req.body.Ratings[2].Value;

  // USE THESE WHEN TESTING DUMMY DATA FROM POSTMAN
  // const imdRating = req.body.imdRating;
  // const rtRating = req.body.rtRating;
  // const mcRating = req.body.mcRating;


  const values = [
    imdbID, Title, Released, Rated, Runtime,
    Genre, Director, Writer, Actors, Plot, Language, Country, 
    Poster, imdbRating, imdRating, rtRating, mcRating, 
    BoxOffice, movienite_user_rating, trailer
  ];

  const sqlQuery = `
    INSERT INTO savedmovies ( imdb_film_id, title, release_date, 
                mpaa_rating, runtime, genre, director, writer, actors, 
                plot, language, country, poster, imdb_score, imd_score, rt_score, 
                mc_score, box_office, movienite_user_rating, trailer_link )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
            $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
  `;

  db.query(sqlQuery, values)
    .then(response => {
      res.locals.savedFilm = response.rows[0];
      return next();
    })
    .catch(err => {
      console.error(err);
      return next(err);
    });
};



// This makes a DELETE fetch to our PostgreSQL database, deleting the row data 
// for the provided imdb_id
savedMovieController.deleteFilm = (req, res, next) => {
  const value = [ req.params.imdbid ];
  const sqlQuery = `DELETE FROM savedmovies WHERE imdb_film_id = $1`;

  db.query(sqlQuery, value)
    .then(response => {
      res.locals.deletedFilm = `Data for imdb_film_id = ${value} successfully deleted.`;
      return next();
    })
    .catch(err => {
      console.error(err);
      return next(err);
    })
};



savedMovieController.getAllSaved = (req, res, next) => {
  // TWO DIFFERENT QUERY METHODS BELOW, SELECT ONE ONLY
  // const sqlQuery = `SELECT * FROM savedmovies`;
  const sqlQuery = 'SELECT imdb_film_id, title, release_date, poster FROM savedmovies'; 

  db.query(sqlQuery)
    .then(response => {
      // console.log(response);
      res.locals.allSaved = response.rows;
      return next();   
    })
    .catch(err => {
      console.error(err);
      return next(err);
    })
};


module.exports = savedMovieController;
