import React from 'react';
import CustomNavLink from './bits/CustomNavLink.jsx';
import PageWrapper from './wrappers/PageWrapper.jsx';
import { Row, Col } from 'react-bootstrap';

const Landing = () => {

  return (
    <PageWrapper title="Welcome">
      
      <Row>
        <Col>
          <p>
            BikeBikeBike! is born out of my tendency of ruining entire drivetrains by not replacing my chains 
            in a timely manner. By reading in your activity data from <a href="http://strava.com" target="NONE">
              Strava
            </a> this app goes beyond chains and lets you 
            track any component in your stable of bicycles.
          </p>
          <p>
            Strava allows you to add bikes to your profile and select which bike you use for each
            ride you do. BikeBikeBike! allows you add parts to each of the bikes you have in your Strava
            account and keeps a running tab of the distance and ride time incurred on each bike,
            and therefore, an each bike component.
          </p>
          <p>
            While you can add a narrow selection of parts to your bikes on Strava, BikeBikeBike! 
            is different in that you can:
          </p>
          <ul>
              <li>
                choose a default or define a custom specification for the life/service interval
                for your part;
              </li>
              <li>
                track usage by ride time, distance, or date;
              </li>
              <li>
                add custom parts beyond what Strava offers;
              </li>
              <li>
                back-date when a part was new and BikeBikeBike! will calculate your part's current
                wear (useful for user new to BBB but have tracking their bikes on Strava for a while); 
              </li>
              <li>
                quickly see the status of your parts with a visual indicator;
              </li>
              <li>
                keep a service log for certain non-consumable parts, as in the case of overhauling,
                replacing seals on a fork/sock or bleeding hydraulic brakes (in progress);
              </li>
              <li>
                move a part among your bikes (in progress);
              </li>
            </ul>

        </Col>

      </Row>

    </PageWrapper>
  )
};

export default Landing;