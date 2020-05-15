import wearCalc from './wearCalc.js';
import _ from 'lodash';


// 'parts' parameter: an object of parts by id to sort
export const sortByWear = (parts) => {
  let partIds = Object.keys(parts);
  
  // sort wear metrics for each part
  let currentWear = {};
  partIds.forEach((id) => { currentWear[id] = sortMetrics(parts[id]) } );
  
  // return partIds ordered by decreasing max-wear
  return _.orderBy(partIds, [ (id) => currentWear[id][0].wear ], ['desc']);
};



export const sortMetrics = (part) => {
  return _.orderBy(wearCalc(part), [(metric) => metric.wear], ['desc']);
}