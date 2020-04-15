
const defaultLifespan = {
  chain: {
    p_lifespan_dist: 3218688, // 2000 mi
    p_lifespan_time: undefined,
    tracking_method: 'dist',
    service: false
  },
  freehub: {
    p_lifespan_dist: 1609344, // 1000 mi
    p_lifespan_time: undefined,
    tracking_method: 'dist',
    service: true
  },
  fork: {
    p_lifespan_dist: undefined,
    p_lifespan_time: 50, // hrs
    p_lifespan_date: 365*24, // once a year
    tracking_method: 'hours',
    service: true
  },
  shock: {
    p_lifespan_dist: 0,
    p_lifespan_time: 50, // hrs
    p_lifespan_date: 365*24, // once a year
    tracking_method: 'hours',
    service: true
  },
  cassette: {
    p_lifespan_dist: 6437376, // 4000 mi
    p_lifespan_time: undefined,
    tracking_method: 'dist',
    service: false
  },
  brake_fluid: {
    p_lifespan_dist: undefined,
    p_lifespan_time: undefined,
    p_lifespan_date: 365*24, // once a year
    tracking_method: 'date',
    service: false
  },
  battery_derail: {
    p_lifepsan_time: 20, // hrs
    tracking_method: 'time',
    service: true
  },
  battery_dropper: {
    p_lifespan_time: 40, // hrs
    tracking_method: 'time',
    service: true
  }
};

export default defaultLifespan;