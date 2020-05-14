
export const wearOptions = (distUnit) => {

  let options = {
    'dist': {
      text: `Distance ${distUnit}`,
      optionLabel: 'Distance',
      value: 'dist',
      fieldType: 'number'
    },

    'time': {
      text: 'Ride time (hr)',
      optionLabel: 'Ride time',
      value: 'time',
      fieldType: 'number'
    },

    'date': {
      text: 'Date to be notified',
      optionLabel: 'Date',
      value: 'date',
      fieldType: 'date'
    }
  };

  return _.values(options);
};