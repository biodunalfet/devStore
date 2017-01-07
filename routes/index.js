var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var query = req.query.q;

  if (!query){
    query = "Placeholder";
  }

  res.render('index', { title: query });
});

module.exports = router;
