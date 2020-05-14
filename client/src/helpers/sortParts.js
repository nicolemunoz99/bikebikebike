import wearCalc from './wearCalc.js';
import _ from 'lodash';

export const sortByWear = (parts) => {
  let partIds = Object.keys(parts);
  
  // sort wear metrics for each part
  let currentWear = {};
  partIds.forEach((id) => {
    currentWear[id] = _.orderBy(wearCalc(parts[id]), [(metric) => metric.wear], ['desc']);
  });
  
  // return partIds ordered by decreasing max-wear
  return _.orderBy(partIds, [ (id) => currentWear[id][0].wear ], ['desc']);
};
