import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import xDate from 'xdate';
import _ from 'lodash';

const useMetricOptions = (partId=null) => {
  let [metrics, setMetrics] = useState([]);
  let distUnit = useSelector(state => state.user.measure_pref);
  let part = useSelector(state => state.parts.list[partId]) || {};

  useEffect(() => {
    let newMetrics = [];
    if (partId !== null) {
      Object.keys(wearOptions).forEach((option) => {
        if (part[`use_metric_${option}`]) {
          newMetrics.push(wearOptions[option]);
        }
      });
      setMetrics(newMetrics);
    }
  }, [part]);



  let serviceDate = part.last_service_date || part.new_date;
  let lifespanInDays = xDate(serviceDate).diffDays(xDate(part.lifespan_date));


  let wearOptions = {
    'dist': {
      text: `Distance ${distUnit}`, // formerly subText
      optionLabel: 'Distance', // formerly undefined (was key name)
      // field: 'use_metric_dist', // deleted
      value: 'dist',
      fieldType: 'number', // new
      lifespan: `${Math.round(part.lifespan_dist)} ${distUnit}`,
      current: `${part.p_dist_current} ${distUnit}`,
      wear: Number(part.p_dist_current) / Number(part.lifespan_dist) < 1 ? Number(part.p_dist_current) / Number(part.lifespan_dist) : 1
    },

    'time': {
      text: 'Ride time (hr)',
      optionLabel: 'Ride time',
      value: 'time',
      fieldType: 'number',
      lifespan: `${Math.round(part.lifespan_time)} hr`,
      current: `${part.p_time_current} hr`,
      wear: Number(part.p_time_current) / Number(part.lifespan_time) < 1 ? Number(part.p_time_current) / Number(part.lifespan_time) : 1
    },

    'date': {
      text: 'Date',
      optionLabel: 'Date',
      value: 'date',
      fieldType: 'date',
      lifespan: `${part.lifespan_date} (${Math.round(lifespanInDays)} d)`,
      current: `${Math.round(xDate(serviceDate).diffDays(xDate()))} d`,
      wear: xDate(serviceDate).diffDays(xDate()) / lifespanInDays < 1 ? xDate(serviceDate).diffDays(xDate()) / lifespanInDays : 1
    }
  };


  return partId !== null ? metrics : _.values(wearOptions);

};

export default useMetricOptions;