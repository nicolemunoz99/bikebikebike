import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { setModal } from '../../state/actions.js';
import { withRouter } from 'react-router-dom';

const CustomNavLink = ({ history, to, modal=false, onClick, tag: Tag, staticContext, className, ...rest }) => {
  const dispatch = useDispatch();
  

  return (

  <Tag
      {...rest}
      onClick={(event) => {
          if (modal) {
            dispatch(setModal(modal));
            return;
          }
          onClick(event);
          history.push(to)
      }}
      className={`pointer ${className}`}
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