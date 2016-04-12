import React from 'react';
import loading from 'react-avenger/loading';
import { FlexView } from 'Basic';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export default loading({
  wrapper: <FlexView grow style={{ position: 'relative' }} />,
  loader: <LoadingSpinner size='small' />
});
