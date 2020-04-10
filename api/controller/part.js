const { insert, update } = require('../db.js');

const part = {
  post: async (req, res) => {
    await insert('parts')
    res.sendStatus(200);
  }
};

module.exports = part;