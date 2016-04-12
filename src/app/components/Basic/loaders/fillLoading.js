import React from 'react';
import loading from 'react-avenger/loading';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export default loading({
  wrapper: <div style={{ width: '100%', height: '100%', position: 'relative' }} />,
  loader: <LoadingSpinner />
});
