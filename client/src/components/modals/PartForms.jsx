import React, { useEffect } from 'react';
import PartForm from '../wrappers/PartFormWrapper.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { submitNewPart, submitEditedPart, setFormForEdit, validateField, validateForm, updateReqs } from '../../state/actions.js';



export const NewPartForm = () => {
  const bikeId = useSelector(state => state.bikes.selectedBike);
  const dispatch = useDispatch();

  const submitAction = (inputs, distUnit) => {
    inputs.p_bike_id = bikeId;
    if (inputs.tracking_method === 'default') {
      // define lifespan_dist/time
    }
    dispatch(submitNewPart(inputs, distUnit));
  };

  return (
    <>
      <PartForm submitAction={submitAction}/>
    </>
  );
};



export const EditPartForm = () => {
  const partId = useSelector(state => state.parts.editingPart);
  const part = useSelector(state => state.parts.list[partId]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFormForEdit(part));
    dispatch(updateReqs())
    dispatch(validateField());
    dispatch(validateForm());
    return () => {
      // reset editingPart
    }
  });

  const submitAction = (inputs, distUnit) => {
    inputs.part_id = partId;
    console.log('inputs in edit-form: ', inputs, distUnit)
    dispatch(submitEditedPart(inputs, distUnit));
  };

  return(
    <>
      <PartForm submitAction={submitAction} />
    </>
  );
};
