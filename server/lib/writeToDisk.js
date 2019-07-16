const fs = require('fs');

module.exports = function writeToDisk(data, filePath) {
  fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', err => {
    if (err) throw err;
    console.log(`Saved file: ${filePath}`);
  });
};
