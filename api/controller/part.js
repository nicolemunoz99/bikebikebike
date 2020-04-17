const { insert, update } = require('../db.js');
const { convertToDbUnits } = require('./convertUnits.js');
const xDate = require('xdate');

const part = {
  post: async (req, res) => {
    delete req.body.permissions;
    let newPart = convertToDbUnits(req.body, req.query.distUnit);
    newPart.p_date_added = xDate().getTime();
    newPart.p_status = 'active';
    if (newPart.tracking_method === 'default') {
      newPart.p_dist_current = 0;
      newPart.p_time_current = 0;
    }
    console.log('newPart to insert', newPart)
    await insert('parts', newPart);
    res.sendStatus(200);
  },

  put: async (req, res) => {
    delete req.body.permissions;
    let editedPart = convertToDbUnits(req.body, req.query.distUnit);
    await update('parts', {
      whereVar: {part_id: req.body.part_id},
      updateVars: editedPart
    });
    res.sendStatus(200);
  }
};

module.exports = part;