import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import CustomNavLink from './bits/CustomNavLink.jsx';
import { setAuthState2 } from '../state/actions/user.js';
import { Auth } from 'aws-amplify';

const NavNav = () => {
  const { authState } = useSelector(state => state.user);
  const dispatch = useDispatch();

  let isLoggedIn = authState === 'signedIn';

  const handleLogout = async () => {
    try {
      await Auth.signOut();
    }
    catch (err) {
      console.log('Error signing out: ', err);
    }
  };

  return (
    <Navbar sticky="top" collapseOnSelect expand="sm">
      
      <Navbar.Brand>BikeBikeBike</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">

          <CustomNavLink tag={Nav.Link} to="/">Home</CustomNavLink>
          <CustomNavLink tag={Nav.Link} to="/bikes">Bikes</CustomNavLink>

        </Nav>

        <Nav>
          { isLoggedIn && 
            <CustomNavLink
              tag={Nav.Link} 
              onClick={handleLogout}
              to={'/login'}
            >
                Log out
            
            </CustomNavLink> }

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

export default NavNav;