var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/acronym', function(req, res, next) {
  var page = req.query.page;
  var limit = req.query.limit;
  var search = req.query.search;
  res.render('acronym', {lim: limit, srch: search});
});

module.exports = router;
