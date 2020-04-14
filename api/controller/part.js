const { insert, update } = require('../db.js');
const { convertToDbUnits } = require('./convertUnits.js');

const part = {
  post: async (req, res) => {
    delete req.body.permissions;
    let newPart = convertToDbUnits(req.body, req.query.distUnit);
    newPart.p_date_added = Date.now();
    newPart.p_status = 'active';
    newPart.new_date = newPart.init_wear_method === 'new' || newPart.tracking_method === 'default' ? Date.now() : newPart.new_date;
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