var path = require('path'),
    express = require('express'),
    router = express.Router(),
    _ = require('underscore'),
    Dishes = require(path.resolve(path.dirname(__dirname), 'api/JSON-connect'));
// Dishes.get() is array of objects in json format

function getAlbums() {
  return JSON.parse(fs.readFileSync(file_path, 'utf8')).data;
}

router.route(['/', '/menu', '/menu/:id', '/checkout']).get(function(req, res) {
  res.render('index', {
    dishes: Dishes.get()
  });
});

module.exports = router;
