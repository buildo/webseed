import React from 'react';
import loading from 'react-avenger/loading';
import { FlexView } from 'Basic';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export default loading({
  wrapper: <FlexView hAlignContent='center' vAlignContent='center' style={{ width: '100%', height: '100%', position: 'relative' }} />,
  loader: <LoadingSpinner />
});
