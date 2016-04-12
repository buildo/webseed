import React from 'react';
import loading from 'react-avenger/loading';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export default loading({
  wrapper: <div style={{ position: 'relative', height: 500, width: 900 }} />,
  loader: <LoadingSpinner />
});
