import React from 'react';
import { withRouter } from "react-router";
import { useSelector } from 'react-redux';
import PageWrapper from '../wrappers/PageWrapper.jsx';
import BikePanel from './BikePanel.jsx'



const BikeList = () => {
  const { dataWait } = useSelector(state => state.appControls.modal);
  const { bikes: bikeIds } = useSelector(state => state.user);

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
