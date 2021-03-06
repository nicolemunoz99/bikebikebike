import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import CustomNavLink from './bits/CustomNavLink.jsx';
import { setAuthState2 } from '../state/actions/user.js';
import { destroySession } from '../state/actions/appControls.js'
import { Auth } from 'aws-amplify';
import _ from 'lodash';

const NavNav = () => {
  const { authState } = useSelector(state => state.user);
  const dispatch = useDispatch();

  let isLoggedIn = authState === 'signedIn';

  const handleLogout = async () => {
    try {
      dispatch(destroySession());
      await Auth.signOut();
    }
    catch (err) {
      console.log('Error signing out: ', err);
    }
  };

  return (
    <Navbar sticky="top" collapseOnSelect expand="sm">

      <Navbar.Brand>
        <span className="d-none d-sm-inline-block">{process.env.APP_NAME}</span>
        <span className="d-inline-block d-sm-none">
          <span className="material-icons mr-1">directions_bike</span>
          <span className="material-icons mr-1">directions_bike</span>
          <span className="material-icons mr-1">directions_bike</span>!
        </span>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />

      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">

          <CustomNavLink tag={Nav.Link} to="/">Home</CustomNavLink>
          <CustomNavLink tag={Nav.Link} to="/bikes">Bikes</CustomNavLink>
          <NavPartsByBikeDropdown />
        
        </Nav>

        <Nav>
          {isLoggedIn &&
            <CustomNavLink
              tag={Nav.Link}
              onClick={handleLogout}
              to={'/login'}
            >
              Log out
            </CustomNavLink>
          }

          {!isLoggedIn &&
            <>
              <CustomNavLink
                tag={Nav.Link}
                onClick={() => dispatch(setAuthState2('signIn'))}
                to="/login"
              >
                Log in
              </CustomNavLink>

              <CustomNavLink
                tag={Nav.Link}
                onClick={() => dispatch(setAuthState2('signUp'))}
                to="/signup"
              >
                Create account
              </CustomNavLink>
            </>
          }
        </Nav>

      </Navbar.Collapse>
    </Navbar>
  );
};


const NavPartsByBikeDropdown = () => {
  const bikes = useSelector(state => state.bikes.list);

  const bikeIds = Object.keys(bikes);

  return (
    <>
      {Object.keys(bikes).length > 0 && 
        <NavDropdown title="Parts" id="parts-dropdown">
          
          {bikeIds.map(id => (
            <CustomNavLink tag={NavDropdown.Item} to={`/bikes/${id}`} key={id} eventKey={id} >
              {_.upperFirst(bikes[id].name)}
            </CustomNavLink>)
          )

          }

          {/* <NavDropdown.Divider />

          <NavDropdown.Item disabled eventKey="parts-retired">Retired (future feature)</NavDropdown.Item> */}

        </NavDropdown>
      }
    </>
  );
};

export default NavNav;