var express = require('express');
var router = express.Router();

/* GET english translation listing. Redirect to Chapter 1.*/
router.get('/', function (req, res, next) {
    res.redirect('/english/1');
});

/* GET english translation listing for particular chapter.*/
router.get('/:num', function (req, res, next) {
    var id = req.params.num;
    res.render('index', {
        title: 'Split Translation of the Holy Quran',
        name: 'english',
        img_paths: [    // mock data
            'https://via.placeholder.com/500x1600?text=1' + ' - Ch. ' + id,
            'https://via.placeholder.com/2000x500/808080?text=2' + ' - Ch. ' + id,
            'https://via.placeholder.com/5000x1800?text=3' + ' - Ch. ' + id,
            'https://via.placeholder.com/1000x800/808080?text=4' + ' - Ch. ' + id,
            'https://via.placeholder.com/1500x800?text=5' + ' - Ch. ' + id,
            'https://via.placeholder.com/200x500/808080?text=6' + ' - Ch. ' + id,
            'https://via.placeholder.com/4000x600?text=7' + ' - Ch. ' + id,
            'https://via.placeholder.com/8000x700/808080?text=8' + ' - Ch. ' + id,
            'https://via.placeholder.com/500x1600?text=9' + ' - Ch. ' + id,
            'https://via.placeholder.com/3000x800/808080?text=10' + ' - Ch. ' + id,
            'https://via.placeholder.com/100x100?text=11' + ' - Ch.' + id
        ],
        options: [  // chapter select options and hrefs
            {val: '/english/1', text: 'Chapter 1'},
            {val: '/english/2', text: 'Chapter 2'},
            {val: '/english/3', text: 'Chapter 3'},
            {val: '/english/4', text: 'Chapter 4'},
            {val: '/english/5', text: 'Chapter 5'},
            {val: '/english/6', text: 'Chapter 6'},
            {val: '/english/7', text: 'Chapter 7'},
            {val: '/english/8', text: 'Chapter 8'},
            {val: '/english/9', text: 'Chapter 9'},
            {val: '/english/10', text: 'Chapter 10'},
            {val: '/english/11', text: 'Chapter 11'},
            {val: '/english/12', text: 'Chapter 12'},
            {val: '/english/13', text: 'Chapter 13'},
            {val: '/english/14', text: 'Chapter 14'}
        ],
        selected: id - 1
    });
});

module.exports = router;
