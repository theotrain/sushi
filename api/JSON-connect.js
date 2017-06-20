var path = require('path'),
    fs = require('fs'),
    file_path = path.resolve(path.dirname(__dirname), 'data/dishes.json');

module.exports = {
  __readFile: function() {
    return JSON.parse(fs.readFileSync(file_path, 'utf8'));
  },

  get: function() {
    return this.__readFile();
  }

};