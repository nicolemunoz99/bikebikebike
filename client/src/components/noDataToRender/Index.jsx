import React from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import { showNewPartForm} from '../../state/actions/partForm.js'



export const NoBikes = () => (
  <NoDataWrapper>
    <div className="">
      <p>Looks like you don't have any bikes in your Strava account.</p>
      <p>In order to track component usage, a bike needs to be able to be tied to your
        Strava activities. Right now, Strava's API doesn't have an endpoint for adding bikes. </p>
      <p>
        Go to <a href="http://strava.com" target="NONE">Strava</a> to add a bike.
      </p>
    </div>
  </NoDataWrapper>
);



export const NoParts = () => {
  const dispatch = useDispatch();
  return (
  <NoDataWrapper>
      <p className="text-center">Looks like this bikes doesn't have any parts</p>
      <Row className="justify-content-center">
        <Col xs={12} sm={6} md={4}>
          <Button bsPrefix='bbb-button' onClick={() => dispatch(showNewPartForm())}>Add</Button>
        </Col>
      </Row>
    </NoDataWrapper>
  )
}




const NoDataWrapper = ({ children }) => (
    <Row className="shadow bg-white panel p-4">
      <Col>
        {children}
      </Col>
    </Row>
  );
