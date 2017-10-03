var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'plantlife',
  database : 'Occa'
});
 
connection.connect();
 
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });






// SELECT * FROM Places WHERE
//     (lat => center_lat - range AND lat <= center_lat + range) AND (lng >= center_lng - range AND lng <= center_lng + range)