const { Pool } = require('pg');
const PG_URI = 'postgres://pormceeh:RRvvyuXrfYH_cQNdkK4Pks0JrreSdqLT@ziggy.db.elephantsql.com:5432/pormceeh';

const pool = new Pool({
  connectionString: PG_URI
});

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};