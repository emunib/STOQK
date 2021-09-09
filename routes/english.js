var express = require('express');
var router = express.Router();
var data = require('../data/dataUtilities');

/* GET english translation listing. Redirect to chapter 1, verse 1.*/
router.get('/', function (req, res, next) {
    res.redirect('/english/1');
});

// TODO validate parameters, see https://www.digitalocean.com/community/tutorials/use-expressjs-to-get-url-and-post-parameters#step-4-%E2%80%93-using-param-with-route-handlers
/* GET english translation listing for particular chapter and verses.*/
router.get('/:chapter/:from?/:to?', function (req, res, next) {
    var c_id = req.params.chapter;
    var f_id = req.params.from;
    var t_id = req.params.to;

    // if no from provided, default to verse 1
    if (!f_id) {
        f_id = 1;
        t_id = 1;
    } else if (!t_id) { // if from is provided but not to then used from verse value
        t_id = f_id;
    }

    res.render('index', {
        title: 'Split Translation of the Holy Quran',
        name: 'english',
        img_paths: data.imgPaths('english', c_id, f_id, t_id),
        chapter_options: data.chapters('english'),
        verse_options: data.verses('english', c_id),
        c_index: c_id - 1,
        f_index: f_id - 1,
        t_index: t_id - 1
    });
});

router.post('/', function (req, res) {
    var cId = req.body.chapter;
    var fId = req.body.from;
    var tId = req.body.to;

    var path = '/english/' + cId + '/' + fId;
    if (tId !== fId) {
        path += '/' + tId;
    }
    res.redirect(path);
});

module.exports = router;
