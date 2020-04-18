const { insert, update } = require('../db.js');
const { convertToDbUnits } = require('./convertUnits.js');
const xDate = require('xdate');
const { calcUsageSinceDate }  = require('./stravaApi.js').get;

const part = {
  post: async (req, res) => {
    let { access_token } = req.body.permissions;
    let newPart = convertToDbUnits(req.body.data, req.query.distUnit);
    newPart.p_date_added = xDate().getTime();
    newPart.p_status = 'active';
    if (newPart.tracking_method === 'default') {
      newPart.p_dist_current = 0;
      newPart.p_time_current = 0;
    }

    if (newPart.new_at_add === 'n') {
      let bikeId = newPart.p_bike_id
      let totUse = await calcUsageSinceDate(access_token, newPart.new_date, bikeId);
      if (Object.keys(totUse).length === 0) {
        newPart.p_dist_current = 0;
        newPart.p_time_current = 0;
      } else {
        newPart.p_dist_current = totUse[bikeId].distSinceDate;
        newPart.p_time_current = totUse[bikeId].timeSinceDate;
      }
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