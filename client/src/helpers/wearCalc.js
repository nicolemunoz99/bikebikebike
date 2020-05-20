import xDate from 'xdate';

const wearCalc = (part, distUnit='') => {
  let serviceDate = part.last_date_serviced || part.new_date;
  let lifespanInDays = xDate(serviceDate).diffDays(xDate(part.lifespan_date));
  
  let wear = {
    'dist': {
      value: 'dist',
      optionLabel: 'Distance',
      lifespan: `${Math.round(part.lifespan_dist)} ${distUnit}`,
      current: `${part.p_dist_current} ${distUnit}`,
      wear: Number(part.p_dist_current) / Number(part.lifespan_dist) < 1 ? Number(part.p_dist_current) / Number(part.lifespan_dist) : 1
    },

    'time': {
      value: 'time',
      optionLabel: 'Ride time',
      lifespan: `${Math.round(part.lifespan_time)} hr`,
      current: `${part.p_time_current} hr`,
      wear: Number(part.p_time_current) / Number(part.lifespan_time) < 1 ? Number(part.p_time_current) / Number(part.lifespan_time) : 1
    },

    'date': {
      value: 'date',
      optionLabel: 'Date',
      lifespan: `${part.lifespan_date} (${Math.round(lifespanInDays)} d)`,
      current: `${Math.round(xDate(serviceDate).diffDays(xDate()))} d`,
      wear: xDate(serviceDate).diffDays(xDate()) / lifespanInDays < 1 ? xDate(serviceDate).diffDays(xDate()) / lifespanInDays : 1
    }
  };

  let relevantMetrics = [];
  Object.keys(wear).forEach((option) => {
    if (part[`use_metric_${option}`]) {
      relevantMetrics.push(wear[option]);
    }
  });

  return relevantMetrics;
}

export default wearCalc;