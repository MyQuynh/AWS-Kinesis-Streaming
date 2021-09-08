import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Header from './Header';

function App() {
  return (
    <>
      <ChakraProvider>
        <Header />
      </ChakraProvider>
    </>
  );
}

export default App;
