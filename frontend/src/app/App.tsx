/* eslint-disable arrow-body-style */
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Header from './Header';

const App = () => {
  return (
    <>
      <ChakraProvider>
        <Header bgColor="#ff6700" color="white" />
      </ChakraProvider>
    </>
  );
};

export default App;
