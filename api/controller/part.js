const { insert, update } = require('../db.js');
const { convertToDbUnits } = require('./convertUnits.js');

const part = {
  post: async (req, res) => {
    console.log('req.body', req.body)
    delete req.body.permissions;
    let newPart = convertToDbUnits(req.body, req.query.distUnit);
    newPart.p_date_added = Date.now();
    newPart.p_status = 'active';
    newPart.new_date = newPart.init_wear_method === 'new' ? Date.now() : newPart.new_date;
    console.log('converted units, req.body: ', newPart)
    await insert('parts', newPart);
    res.sendStatus(200);
  }
};

module.exports = part;