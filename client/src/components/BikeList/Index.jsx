import React, { useEffect } from 'react';
import { withRouter } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../state/actions/user.js';
import PageWrapper from '../wrappers/PageWrapper.jsx';
import BikePanel from './BikePanel.jsx'



const BikeList = () => {
  const { dataWait } = useSelector(state => state.appControls.modal);
  const { id, bikes: bikeIds } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) dispatch(getUserData());
  }, []);


  return (

    <PageWrapper title="Bikes">
    { !dataWait &&
      <div className="mt-3">
      
        {bikeIds.map((id) => {
            return <BikePanel key={id} bikeId={id} />
        })}
      </div>
    }
    </PageWrapper>

  )
};

export default withRouter(BikeList);
