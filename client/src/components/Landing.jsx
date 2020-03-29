import React from 'react';
import CustomNavLink from './buildingBlocks/CustomNavLink.jsx';

const Landing = () => {

  return (
    <div>
      Landing
        <CustomNavLink to='/login' className="">
          Link: Login/Signup
        </CustomNavLink>
    </div>
  )
};

export default Landing;