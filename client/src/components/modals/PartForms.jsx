import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PartFormWrapper } from '../wrappers/partForm/Index.jsx';
import { 
  updatePartForm, 
  updateEditPartForm, 
  submitNewPart, 
  submitEditedPart, 
  showEditPartForm, 
  resetForm 
} from '../../state/actions/partForm.js';

import { resetEditingPart } from '../../state/actions/parts.js';



export const NewPartForm = () => {
  const inputs = useSelector(state => state.form.inputs);
  const bikeId = useSelector(state => state.bikes.selectedBike);
  const dispatch = useDispatch();
 

  const handleSubmitNewPart = (e) => {
    e.preventDefault();
    let formData = { ...inputs }
    formData.p_bike_id = bikeId;
    dispatch(submitNewPart(formData));
  };

  return (
    <>
      <PartFormWrapper
        handleSubmit={handleSubmitNewPart} 
        updatePartForm={updatePartForm}
        reset={()=>dispatch(resetForm())}
        title='New Component'
        modal='newPartForm'
      />
    </>
  );
};



export const EditPartForm = () => {
  const inputs = useSelector(state => state.form.inputs);
  const dispatch = useDispatch();

  useEffect(() =>{
    return (() => {
      dispatch(resetEditingPart());
    });
  }, []);


  const handleSubmitEditedPart = (e) => {
    e.preventDefault();
    dispatch(submitEditedPart(inputs));
  };

  return(
    <>
      <PartFormWrapper 
        handleSubmit={handleSubmitEditedPart} 
        updatePartForm={updateEditPartForm}
        reset={()=>{dispatch(resetForm()); dispatch(showEditPartForm())}}
        title='Edit Component'
        submitLabel='Update' 
        modal='editPartForm'
      />
    </>
  );
};
