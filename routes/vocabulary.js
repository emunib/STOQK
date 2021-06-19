var express = require('express');
var router = express.Router();

/* GET vocabulary listing. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Split Translation of the Holy Quran',
        name: 'vocabulary',
        img_paths: []
    });
});

module.exports = router;
