import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import xDate from 'xdate';
import PartFormWrapper from '../wrappers/partForm/Index.jsx';
import { updatePartForm, resetFields, submitNewPart } from '../../state/actions.js';



export const NewPartForm = () => {
  const inputs = useSelector(state => state.form.inputs);
  const bikeId = useSelector(state => state.bikes.selectedBike);
  const dispatch = useDispatch();
 

  const handleSubmitNewPart = (e) => {
    e.preventDefault();
    formData = { ...inputs }
    formData.p_bike_id = bikeId;
    dispatch(submitNewPart(formData));
  };

  return (
    <>
      <PartFormWrapper handleSubmit={handleSubmitNewPart}/>
    </>
  );
};



export const EditPartForm = () => {
  const bikeId = useSelector(state => state.bikes.selectedBike);
  const partId = useSelector(state => state.parts.editingPart);
  const part = useSelector(state => state.parts.list[partId]);
  const dispatch = useDispatch();

  useEffect(() => {

  }, []);

  const handleSubmitEditedPart = (e) => {
    e.preventDefault();
    formData = { ...inputs }
    formData.p_bike_id = bikeId;
    formData.id = partId;
    console.log('submit formData:', formData)
    // dispatch(submitEditedPart(formData));
  };

  return(
    <>
      <PartForm submitAction={handleSubmitEditedPart} />
    </>
  );
};
