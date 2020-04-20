const xDate = require('xdate');
const { convertToUserUnits } = require('./convertUnits.js');

const defaultMetric = (req, res) => {
  
  let { partType, distUnit} = req.query;
  
  const metrics = {
    chain: [
      {lifespan_dist: 2 * 1609344}, // 2000 mi
      {use_metric_dist: true}
    ],
    freehub: [
      {lifespan_dist: 1609344}, // 1000 mi
      {use_metric_dist: true}
    ],
    fork: [
      {lifespan_time: 50 * 3600}, // 50 hrs
      {lifespan_date: xDate().addYears(1).getTime()}, // once a year
      {use_metric_time: true},
      {use_metric_date: true}
    ],
    shock: [
      {lifespan_time: 50 * 3600}, // 50 hrs
      {lifespan_date: xDate().addYears(1).getTime()}, // once a year
      {use_metric_time: true},
      {use_metric_date: true}
    ],
    cassette: [
      {lifespan_dist: 6437376}, // 4000 mi
      {use_metric_dist: true}
    ],
    brake_fluid: [
      {lifespan_date: xDate().addYears(1).getTime()}, // once a year
      {use_metric_date: true}
    ],
    battery_derail: [
      {lifepsan_time: 20 * 3600}, // 20 hrs
      {use_metric_time: true}
    ],
    battery_dropper: [
      {lifespan_time: 40 *3600}, // hrs
      {use_metric_time: true}
    ]
  };
  let metric = convertToUserUnits(metrics[partType], distUnit)
  console.log('converted default metric: ', metric)
  res.send( metric );
};

module.exports = defaultMetric;