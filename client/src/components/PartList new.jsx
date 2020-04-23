import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams} from 'react-router';
import { getUserData } from '../state/actions.js';
import { Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import PageWrapper from './wrappers/PageWrapper.jsx';
import WearMeter from './WearMeter.jsx';
import PartMetricTable from './PartDetails.jsx';
import { capFirst } from '../utils.js';
import { setSelectedBike, resetSelectedBike, resetSelectedPart, showNewPartForm, showEditPartForm, setSelectedPart }from '../state/actions.js';

const PartList = () => {
  const bikeId = useParams().bikeId;
  const bike = useSelector(state => state.bikes.list[bikeId]);
  const { id } = useSelector(state => state.user);
  const { list: allParts, selectedPart } = useSelector(state => state.parts);
  const distUnit = useSelector(state => state.user.measure_pref);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSelectedBike(bikeId));
    if (!id) dispatch(getUserData());
    return () => {
      dispatch(resetSelectedBike());
      dispatch(resetSelectedPart());
    };
  }, []);
  
  return (
  <>
    <PageWrapper title={capFirst(bike.name)}>



    </PageWrapper>
  </>
  );
};

export default PartList;