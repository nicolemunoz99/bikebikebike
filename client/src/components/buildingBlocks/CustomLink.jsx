import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const CustomLink = ({ history, to, onClick, tag: Tag, staticContext, className, ...rest }) => (
  <Tag
      {...rest}
      onClick={(event) => {
          onClick(event);
          history.push(to)
      }}
      className={`pointer ${className}`}
  />
);


CustomLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  history: PropTypes.shape({
      push: PropTypes.func.isRequired
  }).isRequired,
  onClick: PropTypes.func
};

CustomLink.defaultProps = {
  onClick: () => {},
  tag: 'div'
};


export default withRouter(CustomLink);