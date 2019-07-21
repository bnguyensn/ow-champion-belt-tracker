const log = require('../lib/log');

module.exports = function getChampion() {
  return [
    {},
    (req, res) => {
      const report = require('../data/report');

      res.send(report);
    },
  ];
};
