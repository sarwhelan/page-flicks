var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var router = express.Router();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;
const cors = require('cors');
app.use(cors());

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Cutiepatotie11!',
  database: 'sys',
  multipleStatements: true
});

router.route('/login?:query')
  .get(function(req, res) {
    var email = req.query.username;
    console.log(email);
    console.log("connection state: " + connection.state);

    connection.connect((err) => {
      if (err)
        return console.log("error connecting to database");
      else return console.log("connected to database");
    });

    var sql = "CALL login('" + email + "')";

    connection.query(sql, (err, response) => {
      if (err)
        return console.log(err);
      console.log("logged in! all gouda!\n");
      return res.json({response: response});
    })

  });

router.route('/search?:query')
  .get(function(req, res) {
    var authorName = req.query.key;
    var sql = "CALL searchByAuthor('" + authorName + "')";
    connection.query(sql, (err, books) => {
      if (err)
        return res.json({response: "error"});

      console.log("got books by author\n");
      return res.send(books);
    })
  })

router.route('/topReaders')
  .get(function(req, res) {
    connection.query('CALL leaderboard()', (err, rows) => {
      if (err)
        return res.json({response: "error"});
      console.log("got leaderboard\n");
      return res.json(rows);
    })
  })

router.route('/loadWishList?:query')
  .get(function(req, res) {
    var email = req.query.user;
    var sql = "CALL wishlist('" + email + "')";
    connection.query(sql, (err, books) => {
      if (err)
        return res.json({response: "error"});
      console.log("got wishlist\n");
      console.log(": " + books[0][0].authorName);
      return res.json(books);
    })
  })

router.route('/downloadFromWishlist?:query')
  .get(function(req, res) {
    var email = req.query.user;
    var bookName = req.query.bookTitle;

    console.log('book: ' + bookName);

    var sql = "CALL downloadBook('" + bookName + "','" + email + "')";
    connection.query(sql, (err, response) => {
      if (err)
        return res.json({response: "error"})
      console.log("putting book into downloads\n");
      return res.json(response);
    })
  })

router.route('/recommendedBooks?:query')
  .get(function(req, res) {
    var email = req.query.user;
    console.log("user: " + email);
    var sql = "CALL recommendations('" + email + "')";
    connection.query(sql, (err, recs) => {
      if (err)
        return res.json({response: "error"})
      console.log("got recommendations\n");
      return res.json(recs);
    })
  })

router.route('/updatePayment')
  .post(function(req, res) {
    var email = req.body.email;
    var creditCardNum = req.body.creditCardNum;
    var sql = "CALL updatePaymentInformation('" + email + "','" + creditCardNum + "')";
    connection.query(sql, (err, response) => {
      if (err)
        return console.log(err);
      console.log("updating payment info\n");
      return res.json({response: "success"});
    })

  })

router.route('/close')
  .delete(function(req, res) {
    connection.end((err) => {
      console.log("bye");
      return res.json({response: "terminated"});
      // terminates gracefully
    })
  })

app.use('/api', router);
app.listen(port);
console.log("up and runnin'!");
