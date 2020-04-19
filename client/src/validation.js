import xDate from 'xdate';

export const isValid = {
  type: (val) => !!val, 
  custom_type: (val) => !!val,
  p_brand: () => true, 
  p_model: () => true,
  tracking_method: (val) => !!val,
  new_at_add: (val) => !!val, 
  new_date: (yyyymmdd) => {
    if (!yyyymmdd) return false;
    let date = xDate(yyyymmdd, false).getTime();
    return date < xDate(false);
  },
  lifespan_dist: (val) => !!Number(val) && Number(val) >= 0, 
  lifespan_time: (val) => !!Number(val) && Number(val) >= 0, 
  lifespan_date: (yyyymmdd) => {
    if (!yyyymmdd) return false;
    let date = xDate(yyyymmdd, false).getTime();
    return date >= xDate(false);
  }
};

export const errMsgs = {
  type: 'Please select a part type.', 
  custom_type: 'Please specify.',
  p_brand: '',
  p_model: '',
  tracking_method: '',
  usage_metric_dist: '',
  usage_metric_time: '',
  usage_metric_date: '',
  new_at_add: '', 
  new_date: 'Select a valid date (before today).',
  lifespan_dist: `Indicate lifespan in terms of distance.`, 
  lifespan_time: `Indicate lifespan in terms of hours.`,
  lifespan_date: 'Select a valid date (after today).'
};