import React from 'react';
import PropTypes from 'prop-types';

function FetchingError({ error }) {
  return (
    <div>{error}</div>
  );
}

FetchingError.propTypes = {
  error: PropTypes.string.isRequired,
};

export default FetchingError;
