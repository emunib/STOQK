var express = require('express');
var router = express.Router();
var data = require('../data/data.json');

/* GET english translation listing. Redirect to Chapter 1.*/
router.get('/', function (req, res, next) {
    res.redirect('/english/1');
});

/* GET english translation listing for particular chapter.*/
router.get('/:num', function (req, res, next) {
    var c_id = req.params.num;
    var f_id = 1;
    var t_id = 1;

    res.render('index', {
        title: 'Split Translation of the Holy Quran',
        name: 'english',
        img_paths: data[c_id].filter(x => x.id >= f_id && x.id <= t_id).map(x => x.path),
        chapter_options:
            Object.keys(data).map(x => ({id: '/english/' + x, text: x})),
        verse_options: data[c_id].map(x => ({id: x.id, text: x.id})),
        c_index: c_id - 1,
        f_index: f_id - 1,
        t_index: t_id - 1
    });
});

module.exports = router;
