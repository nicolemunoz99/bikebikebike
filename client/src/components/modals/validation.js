
export const isValid = {
  type: (val) => !!val, 
  custom_type: (val) => !!val,
  p_brand: () => true,
  p_model: () => true,
  tracking_method: (val) => !!val,
  usage_metric: (val) => !!val,
  init_wear_method: (val) => !!val, 
  p_dist_current: (val) => !!val && val >= 0,
  p_time_current: (val) => !!val && val >= 0, 
  new_date: (val) => !!val && val <= Date.now(),
  lifespan_dist: (val) => !!val && val >= 0, 
  lifespan_time: (val) => !!val && val >= 0
};

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