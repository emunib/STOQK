var express = require('express');
var router = express.Router();
var mydata = require('../data/dataUtilities');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect('/english');
});

module.exports = router;
