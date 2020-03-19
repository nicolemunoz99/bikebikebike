import React from 'react';
import CustomLink from './buildingBlocks/CustomLink.jsx';

const Landing = () => {

  return (
    <div>
      Landing
        <CustomLink to='/login' className="red">
          Link: Login/Signup
        </CustomLink>
    </div>
  )
};

export default Landing;