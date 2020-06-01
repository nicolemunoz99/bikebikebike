const {convertToUserUnits} = require('../controller/convertUnits.js');
const xDate = require('xdate');

const defaultMetric = (req, res) => {

  let { distUnit } = req.query;

  const partInfo = {

    custom: {
      title: '-- Custom --'
    },
    
    chain: {
      title: 'Chain',
      metrics: [
        {lifespan_dist: 2 * 1609344}, // 2000 mi
        {lifespan_time: ''},
        {lifespan_date: ''},
        {use_metric_dist: true},
        {use_metric_time: false},
        {use_metric_date: false}
      ]
    },
  
    freehub: {
      title: 'Freehub',
      metrics: [
        {lifespan_dist: 1609344}, // 1000 mi
        {lifespan_time: ''},
        {lifespan_date: ''},
        {use_metric_dist: true},
        {use_metric_time: false},
        {use_metric_date: false}
      ]
    },
  
    fork: {
      title: 'Suspension fork',
      metrics: [
        {lifespan_time: 50 * 3600}, // 50 hrs
        {lifespan_date: xDate().addYears(1).getTime()}, // once a year
        {lifespan_dist: ''},
        {use_metric_time: true},
        {use_metric_date: true},
        {use_metric_dist: false}
      ]
    },
  
    shock: {
      title: 'Shock',
      metrics: [
        {lifespan_time: 50 * 3600}, // 50 hrs
        {lifespan_date: xDate().addYears(1).getTime()}, // once a year
        {lifespan_dist: ''},
        {use_metric_time: true},
        {use_metric_date: true},
        {use_metric_dist: false},
      ]
    },
  
    cassette: {
      title: 'Cassette',
      metrics: [
        {lifespan_dist: 6437376}, // 4000 mi
        {lifespan_time: ''},
        {lifespan_date: ''},
        {use_metric_dist: true},
        {use_metric_time: false},
        {use_metric_date: false}
      ]
    },
  
    brake_fluid: {
      title: 'Hydraulic brake',
      metrics: [
        {lifespan_date: xDate().addYears(1).getTime()}, // once a year
        {lifespan_dist: ''},
        {lifespan_time: ''},
        {use_metric_date: true},
        {use_metric_dist: false},
        {use_metric_time: false},
      ]
    },
  
    batt_derail_etap: {
      title: 'eTap battery (derailleur)',
      metrics: [
        {p_brand: 'SRAM'},
        {p_model: 'RED eTap'},
        {lifespan_time: 20 * 3600}, // 20 hrs
        {lifespan_dist: ''},
        {lifespan_date: ''},
        {use_metric_time: true},
        {use_metric_dist: false},
        {use_metric_date: false}
      ]
    },
  
    batt_drop_etap: {
      title: 'eTap battery (dropper)',
      metrics: [
        {p_brand: 'SRAM'},
        {p_model: 'RED eTap'},
        {lifespan_time: 40 * 3600}, // hrs
        {lifespan_dist: ''},
        {lifespan_date: ''},
        {use_metric_time: true},
        {use_metric_dist: false},
        {use_metric_date: false}
      ]
    },
  
    batt_derail_di2: {
      title: 'Di2 battery',
      metrics: [
        {p_brand: 'Shimano'},
        {p_model: 'Di2'},
        {lifespan_time: ''}, // hrs
        {lifespan_dist: 1000 * 1000}, // 1000 km
        {lifespan_date: ''},
        {use_metric_time: false},
        {use_metric_dist: true},
        {use_metric_date: false}
      ]
    }
  
  };

  res.send( convertToUserUnits(partInfo, distUnit) );
};


module.exports = defaultMetric;