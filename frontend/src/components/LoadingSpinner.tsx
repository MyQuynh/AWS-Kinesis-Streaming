import React from 'react';
import { Spinner } from '@chakra-ui/react';

// eslint-disable-next-line arrow-body-style
const LoadingSpinner: React.FC = () => {
  return (
    <>
      <Spinner size="xl" color="brand.500" />
    </>
  );
};

export default LoadingSpinner;
