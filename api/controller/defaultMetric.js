const xDate = require('xdate');
const { convertToUserUnits } = require('./convertUnits.js');

const defaultMetric = (req, res) => {
  
  let { partType, distUnit} = req.query;
  
  const metrics = {
    chain: [
      {lifespan_dist: 2 * 1609344}, // 2000 mi
      {lifespan_time: ''},
      {lifespan_date: ''},
      {use_metric_dist: true},
      {use_metric_time: false},
      {use_metric_date: false}
    ],
    freehub: [
      {lifespan_dist: 1609344}, // 1000 mi
      {lifespan_time: ''},
      {lifespan_date: ''},
      {use_metric_dist: true},
      {use_metric_time: false},
      {use_metric_date: false}
    ],
    fork: [
      {lifespan_time: 50 * 3600}, // 50 hrs
      {lifespan_date: xDate().addYears(1).getTime()}, // once a year
      {lifespan_dist: ''},
      {use_metric_time: true},
      {use_metric_date: true},
      {use_metric_dist: false}
    ],
    shock: [
      {lifespan_time: 50 * 3600}, // 50 hrs
      {lifespan_date: xDate().addYears(1).getTime()}, // once a year
      {lifespan_dist: ''},
      {use_metric_time: true},
      {use_metric_date: true},
      {use_metric_dist: false},
    ],
    cassette: [
      {lifespan_dist: 6437376}, // 4000 mi
      {lifespan_time: ''},
      {lifespan_date: ''},
      {use_metric_dist: true},
      {use_metric_time: false},
      {use_metric_date: false}
    ],
    brake_fluid: [
      {lifespan_date: xDate().addYears(1).getTime()}, // once a year
      {lifespan_dist: ''},
      {lifespan_time: ''},
      {use_metric_date: true},
      {use_metric_dist: false},
      {use_metric_time: false},
    ],
    battery_derail: [
      {lifepsan_time: 20 * 3600}, // 20 hrs
      {lifespan_dist: ''},
      {lifespan_date: ''},
      {use_metric_time: true},
      {use_metric_dist: false},
      {use_metric_date: false}
    ],
    battery_dropper: [
      {lifespan_time: 40 *3600}, // hrs
      {lifespan_dist: ''},
      {lifespan_date: ''},
      {use_metric_time: true},
      {use_metric_dist: false},
      {use_metric_date: false}
    ]
  };
  console.log('metrics[partType]', metrics[partType])
  let metric = convertToUserUnits(metrics[partType], distUnit)
  console.log('converted metric: ', metric)
  res.send( metric );
};

module.exports = defaultMetric;