const defaultMetrics = {
  chain: [
    {lifespan_dist: 3218688}, // 2000 mi
    {use_metric_dist: true}
  ],
  freehub: [
    {lifespan_dist: 1609344}, // 1000 mi
    {use_metric_dist: true}
  ],
  fork: [
    {lifespan_time: 50}, // hrs
    {lifespan_date: 365*24}, // once a year
    {use_metric_time: true},
    {use_metric_date: true}
  ],
  shock: [
    {lifespan_time: 50}, // hrs
    {lifespan_date: 365*24}, // once a year
    {use_metric_time: true},
    {use_metric_date: true}
  ],
  cassette: [
    {lifespan_dist: 6437376}, // 4000 mi
    {use_metric_dist: true}
  ],
  brake_fluid: [
    {lifespan_date: 365*24}, // once a year
    {use_metric_date: true}
  ],
  battery_derail: [
    {lifepsan_time: 20}, // hrs
    {use_metric_time: true}
  ],
  battery_dropper: [
    {lifespan_time: 40}, // hrs
    {use_metric_time: true}
  ]
};

export default defaultMetrics;