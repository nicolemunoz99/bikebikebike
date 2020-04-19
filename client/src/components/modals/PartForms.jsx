import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import xDate from 'xdate';
import PartFormWrapper from '../wrappers/partForm/Index.jsx';
import { updatePartForm, resetFields, formInput, submitNewPart } from '../../state/actions.js';



export const NewPartForm = () => {
  const inputs = useSelector(state => state.form.inputs);
  const bikeId = useSelector(state => state.bikes.selectedBike);
  const dispatch = useDispatch();

  useEffect(() => {

    if (inputs.tracking_method === 'custom') {
      dispatch(updatePartForm([{ new_date: '' }, {new_at_add: ''}]));
    }

    if (inputs.tracking_method === 'default') {
      dispatch(resetFields(['new_date', 'new_at_add']));
      dispatch(updatePartForm( [
        {new_at_add: 'y'}
      ]));
    }
  }, [inputs.tracking_method]);

  useEffect(() => {
    if (inputs.new_at_add === 'y') {
      dispatch(updatePartForm( [
        {new_date: xDate(false).toString('yyyy-MM-dd')}
      ]));
    }
    if (inputs.new_at_add === 'n') {
      dispatch(updatePartForm([{ new_date: '' }]))
    }
  }, [inputs.new_at_add]);


  const handleSubmitNewPart = (e) => {
    e.preventDefault();
    inputs.p_bike_id = bikeId;
    dispatch(submitNewPart(inputs));
  };

  return (
    <>
      <PartFormWrapper handleSubmit={handleSubmitNewPart}/>
    </>
  );
};



// export const EditPartForm = () => {
//   const partId = useSelector(state => state.parts.editingPart);
//   const part = useSelector(state => state.parts.list[partId]);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(setFormForEdit(part));
//     dispatch(updateReqs())
//     dispatch(validateField());
//     dispatch(validateForm());
//     return () => {
//       // reset editingPart
//     }
//   });

//   const submitAction = (inputs, distUnit) => {
//     inputs.id = partId;
//     // TODO: submitEditedPart
//   };

//   return(
//     <>
//       <PartForm submitAction={submitAction} />
//     </>
//   );
// };
