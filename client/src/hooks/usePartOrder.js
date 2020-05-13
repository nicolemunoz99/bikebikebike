import useMetricOptions from './useMetricOptions.js';
import _ from 'lodash';


const usePartOrder = (partIds) => {
  
  let metrics = {};
  partIds.forEach((id) => {
    let partMetrics = useMetricOptions(id);
    metrics[id] = partMetrics.sort((a, b) => b.wear - a.wear)
  });

  let orderedPartIds = _.orderBy(partIds, [ (id) => metrics[id][0].wear ], ['desc']);

  return orderedPartIds;
};

export default usePartOrder;