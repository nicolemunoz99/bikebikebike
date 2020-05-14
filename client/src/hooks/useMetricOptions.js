import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import xDate from 'xdate';
import _ from 'lodash';
import { wearOptions } from '../helpers/staticData.js';
import wearCalc from '../helpers/wearCalc.js';

export const useMetricOptions = (partId) => {
  let distUnit = useSelector(state => state.user.measure_pref);
  let part = useSelector(state => state.parts.list)[partId];
  return (wearCalc(part, distUnit));
};

// export const usePartSort = (partIds) => {
//   let distUnit = useSelector(state => state.user.measure_pref);
//   let parts = useSelector(state => state.parts.list);

//   // within each part, order by wearMetric
//   let sortedWearMetrics = partIds.map((id) => {
//     return _.orderBy(wearCalc(parts[id], distUnit), [(metric) => metric.wear], ['desc']);
//   });

//   // between parts, order by max wearMetric
//   let sortedParts = 

//   // return sortedPartIds
// }

export const usePartSort = (bikeId) => {
  let partIds = useSelector(state => state.bikes.list)[bikeId].parts;
  let parts = useSelector(state => state.parts.list);
  console.log('partIds', partIds)
  console.log('bikeId', bikeId)
  // sort wear metrics for each part
  let currentWear = {};
  partIds.forEach((id) => {
    currentWear[id] = _.orderBy(wearCalc(parts[id]), [(metric) => metric.wear], ['desc']);
  });

  // return partIds ordered by decreasing wear
  return _.orderBy(partIds, [ (id) => currentWear[id][0] ], ['desc']);


}





