var express = require('express');
var router = express.Router();

/* GET english translation listing. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Split Translation of the Holy Quran',
        name: 'english',
        img_paths: [
            'https://via.placeholder.com/500x1600?text=1',
            'https://via.placeholder.com/2000x500/808080?text=2',
            'https://via.placeholder.com/5000x1800?text=3',
            'https://via.placeholder.com/1000x800/808080?text=4',
            'https://via.placeholder.com/1500x800?text=5',
            'https://via.placeholder.com/200x500/808080?text=6',
            'https://via.placeholder.com/4000x600?text=7',
            'https://via.placeholder.com/8000x700/808080?text=8',
            'https://via.placeholder.com/500x1600?text=9',
            'https://via.placeholder.com/3000x800/808080?text=10',
            'https://via.placeholder.com/100x100?text=11'
        ]
    });
});

module.exports = router;
