import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import xDate from 'xdate';

const useMetricOptions = (partId=null) => {
  // if (partId === null) return wearOptions;
  let [metrics, setMetrics] = useState([]);
  let distUnit = useSelector(state => state.user.measure_pref);
  let part = useSelector(state => state.parts.list[partId]);

  useEffect(() => {
    let newMetrics = [];
    Object.keys(wearOptions).forEach((option) => {
      if (part[`use_metric_${option}`]) {
        newMetrics.push(wearOptions[option]);
      }
    });

    setMetrics(newMetrics);
  }, [partId]);

  let serviceDate = part.last_service_date || part.new_date;
  let lifespanInDays = xDate(serviceDate).diffDays(xDate(part.lifespan_date));


  let wearOptions = {
    'dist': {
      metric: `Distance`, // formerly subText
      optionLabel: 'Distance', // formerly undefined (was key name)
      // field: 'use_metric_dist', // deleted
      value: 'dist',
      fieldType: 'number', // new
      lifespan: `${Math.round(part.lifespan_dist)} ${distUnit}`,
      current: `${part.p_dist_current} ${distUnit}`,
      wear: Number(part.p_dist_current) / Number(part.lifespan_dist) < 1 ? Number(part.p_dist_current) / Number(part.lifespan_dist) : 1
    },

    'time': {
      metric: 'Ride time',
      optionLabel: 'Ride time',
      value: 'time',
      fieldType: 'number',
      lifespan: `${Math.round(part.lifespan_time)} hr`,
      current: `${part.p_time_current} hr`,
      wear: Number(part.p_time_current) / Number(part.lifespan_time) < 1 ? Number(part.p_time_current) / Number(part.lifespan_time) : 1
    },

    'date': {
      metric: 'Date',
      optionLabel: 'Date',
      value: 'date',
      fieldType: 'date',
      lifespan: `${part.lifespan_date} (${Math.round(lifespanInDays)} d)`,
      current: `${Math.round(xDate(serviceDate).diffDays(xDate()))} d`,
      wear: xDate(serviceDate).diffDays(xDate()) / lifespanInDays < 1 ? xDate(serviceDate).diffDays(xDate()) / lifespanInDays : 1
    }
  };

  return metrics;

};

export default useMetricOptions;