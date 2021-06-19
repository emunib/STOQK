var express = require('express');
var router = express.Router();

/* GET urdu translation listing. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Split Translation of the Holy Quran',
        name: 'urdu',
        img_paths: []
    });
});

module.exports = router;
