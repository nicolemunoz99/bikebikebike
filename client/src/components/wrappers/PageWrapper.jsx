import React from 'react';

const PageWrapper = ({ children, title }) => {
  return (
    <div className="container-md my-5">
      <div className="row no-gutters justify-content-center">

        <div className="col-sm-10 col-md-8 col-xl-6">
          <div className="page-title">{title}</div>
        </div>
      </div>

      <div className="w-100"></div>

      <div className="row justify-content-center">
        <div className="col-sm-10 col-md-8 col-xl-6">

          {children}

        </div>
      </div>
    </div>
  )
};

export default PageWrapper;