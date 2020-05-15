import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import wearCalc from '../helpers/wearCalc.js';
import { sortByWear } from '../helpers/sortParts.js';



export const useMetricOptions = (partId) => {
  let distUnit = useSelector(state => state.user.measure_pref);
  let part = useSelector(state => state.parts.list)[partId];
  return (wearCalc(part, distUnit));
};


export const usePartSort = (bike) => {
  const [orderedPartIds, setOrderedParts] = useState([])
  const allParts = useSelector(state => state.parts.list);

  useEffect(() => {
    if (bike && allParts) {
      let ordered = sortByWear(_.pick(allParts, bike.parts));
      setOrderedParts(ordered);
    }
  }, [bike, allParts]);

  return orderedPartIds;
};

