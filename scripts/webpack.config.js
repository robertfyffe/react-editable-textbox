const fs = require('fs');
const path = require('path');
const defaultConfig = require('./defaultConfig');

const EXAMPLES_DIR = path.resolve(__dirname, '../examples');

const isDirectory = (dir) => fs.lstatSync(dir).isDirectory();

const buildEntries = () =>
  fs.readdirSync(EXAMPLES_DIR).reduce((entries, dir) => {
    if (dir === 'build') return entries;

    const isDraft = dir.charAt(0) === '_';

    if (!isDraft && isDirectory(path.join(EXAMPLES_DIR, dir))) {
      entries[dir] = path.join(EXAMPLES_DIR, dir, 'app.js');
    }

    return entries;
  }, {});

module.exports = {
  ...defaultConfig,
  entry: buildEntries(),
};
