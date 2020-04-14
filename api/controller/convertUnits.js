// converts all distances to user's measurement preference (miles or km)
// converts all times to hours
const _ = require('lodash');
const xDate = require('xdate');

exports.convertToUserUnits = (dataset) => {

  let distUnit = dataset.measure_pref;

  const findTargets = (collection) => { // keys containing 'dist', 'time', 'date'
    _.forEach(collection, (value, key) => {
      if (typeof value === 'object') {
        findTargets(value);
      } else {
        
        if (key.match(/dist/g)) { // dist in m (strava API default)
          collection[key] = (distUnit === 'km' ? value / 1000 : value / 1609.34).toFixed(1);
        }

        if (key.match(/time/g)) { // time in seconds (strava API default)
          collection[key] = (value / 3600).toFixed(1);
        }

        if (key.match(/date/g)) { // date in ms since Epoch
          if (key === 'last_login_date') collection[key] = xDate(value).toString('MMM dd, yyyy @ hh:mm');
          else collection[key] = xDate(value).toString('MMM dd, yyyy');
        }

      }
    });

  };
  findTargets(dataset);
  return dataset;
};



exports.convertToDbUnits = (data, distUnit) => {
    console.log('data before converting: ', data)
    _.forEach(data, (value, key) => {
      if (data[key] !== '') {
        if (key.match(/dist/g)) { // dist in m (strava API default)
          
            data[key] = (distUnit === 'km' ? value * 1000 : value * 1609.34).toFixed(2);
          
        }

        if (key.match(/time/g)) { // time in seconds (strava API default)
          data[key] = (value * 3600).toFixed(2);
        }

        if (key.match(/date/g)) { // date in ms since Epoch
          let [year, mo, day] = value.split('-');
          data[key] = data[key] ? xDate(year, mo, day).getTime() : data[key];
        }
      }
    });


  return data;
};




