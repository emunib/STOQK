var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Split Translation of the Holy Quran', img_paths: ['https://picsum.photos/900/300','https://picsum.photos/200/900','https://picsum.photos/200/300']});
});

module.exports = router;
