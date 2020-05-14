import _ from 'lodash';
import { useMetricOptions } from './useMetricOptions.js';

const usePartOrder = (partIds=[], order='default') => {
  
  let metrics = {};
  partIds.forEach(id => {
    let sortedMetrics = _.orderBy(useMetricOptions(id), [(metric) => metric.wear], ['desc']);
    metrics[id] = sortedMetrics
  });

  let orderedPartIds = [ ...partIds ];


  orderedPartIds = _.orderBy(orderedPartIds, [ (id) => metrics[id][0].wear ], ['desc'])

  return orderedPartIds;
};

export default usePartOrder;