import React from 'react';

const Page = ({ children, title }) => {
  return (
    <div className="container-md my-5">
      <div className="row  no-gutters justify-content-center">

        <div className="col-sm-10 col-md-8 col-lg-6 display-4">
          <div className="display-4 mb-3">{title}</div>
        </div>
      </div>
      <div className="w-100"></div>
      <div className="row justify-content-center">
        {children}
      </div>

    </div>
  )
};

export default Page;