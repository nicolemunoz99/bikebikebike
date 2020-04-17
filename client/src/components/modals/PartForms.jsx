import React, { useEffect } from 'react';
import PartFormWrapper from '../wrappers/partForm/Index.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { submitNewPart, setFormForEdit, validateField, validateForm, updateReqs } from '../../state/actions.js';



export const NewPartForm = () => {
  const bikeId = useSelector(state => state.bikes.selectedBike);
  const dispatch = useDispatch();

  const handleSubmitNewPart = (inputs, distUnit) => {
    inputs.p_bike_id = bikeId;
    dispatch(submitNewPart(inputs, distUnit));
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
