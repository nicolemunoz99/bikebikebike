import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const CustomNavLink = ({ history, to, modal=false, onClick, tag: Tag, staticContext, className, ...rest }) => {
  
  // props specific to links in NavBar
  let navLinkProps = {};
  if (Tag === Nav.Link) {
    navLinkProps = {
      active: history.location.pathname === to ? true : false,
      eventKey: to
    };
  }
  

  return (

  <Tag
      {...rest}
      onClick={(event) => {
          onClick(event);
          history.push(to)
      }}
      className={`pointer ${className}`}

      { ...navLinkProps }
  />
)};


CustomNavLink.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node.isRequired,
  history: PropTypes.shape({
      push: PropTypes.func.isRequired
  }).isRequired,
  onClick: PropTypes.func
};

CustomNavLink.defaultProps = {
  onClick: () => {},
  tag: 'div',
  to: '/'
};


export default withRouter(CustomNavLink);