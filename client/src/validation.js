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
    let [year, mo, day] = yyyymmdd.split('-')
    let date = xDate(Number(year), Number(mo-1), Number(day), false).getTime();
    return date <= xDate(false);
  },
  lifespan_dist: (val) => !!Number(val) && Number(val) >= 0, 
  lifespan_time: (val) => !!Number(val) && Number(val) >= 0, 
  lifespan_date: (yyyymmdd) => {
    if (!yyyymmdd) return false;
    let [year, mo, day] = yyyymmdd.split('-')
    let date = xDate(Number(year), Number(mo-1), Number(day), false).getTime();
    return date >= xDate(false);
  }
}

export const errMsgs = {
  type: 'Please select a part type.', 
  custom_type: 'Please specify.',
  p_brand: '',
  p_model: '',
  tracking_method: '',
  usage_metric: '',
  init_wear_method: `Select how you want to determine current wear.`, 
  p_dist_current: `Specify distance.`, 
  p_time_current: `Specify hours.`, 
  new_date: `Specify a valid date.`,
  lifespan_dist: `Indicate lifespan in terms of distance.`, 
  lifespan_time: `Indicate lifespan in terms of hours.`
};