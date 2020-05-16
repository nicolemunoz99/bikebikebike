import React from 'react';
import ModalWrapper from '../wrappers/ModalWrapper.jsx';

export const DataWait = () => {

  return (
    <ModalWrapper cancelClose={true} modal="dataWait" title="Please wait">
      <div className="row align-items-center">
        <div className="col text-center">
          Please wait ...
        </div>
      </div>
    </ModalWrapper>
  );
};

export const Err = () => {

  return (
    <ModalWrapper title="Ooops" modal="err">
      <div className="row align-items-center">
        <div className="col text-center">
          There was an error.
        </div>
      </div>
    </ModalWrapper>
  );
};
