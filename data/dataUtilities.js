var glob = require("glob");
var path = require("path");

var langs = ['english', 'urdu'];
var src = 'public/img/main';
var pattern = '**/*.png';
var data = {};

function load() {
    for (const lang of langs) {
        var imgPath = path.join(src, lang, pattern);
        data[lang] = {};

        for (let p of glob.sync(imgPath)) {
            var imgName = path.parse(p).name;
            var chapter = imgName.split('V')[0].substr(1);
            var verse = parseInt(imgName.split('V')[1]);

            var verseObj = {id: verse, path: path.join('/', 'img', 'main')};

            if (!data[lang][chapter]) {
                data[lang][chapter] = [verseObj];
            } else {
                data[lang][chapter].push(verseObj);
            }
        }
    }
}

function imgPaths(lang, chapter, from, to) {
    return data[lang][chapter].filter(x => x.id >= from && x.id <= to).map(x => {
        return path.join(x.path, lang, 'C' + chapter + 'V' + x.id + '.png');
    });
}

function chapters(lang) {
    return Object.keys(data[lang]).map(x => ({id: x, path: '/' + lang + '/' + x, text: x})).sort((x, y) => x.id - y.id);
}

function verses(lang, chapter) {
    return data[lang][chapter].map(x => ({id: x.id, text: x.id})).sort((x, y) => x.id - y.id);
}

exports.load = load;
exports.imgPaths = imgPaths;
exports.chapters = chapters;
exports.verses = verses;