/* eslint-disable arrow-body-style */
import React from 'react';
import '@fontsource/poppins';
import { BrowserRouter, Route, RouteProps } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';
import routes from '../routes';

// Declarative theme of Chakra UI
const theme = extendTheme({
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
  },
  colors: {
    brand: {
      200: '#ffc2a1',
      300: '#ffB38A',
      400: '#ff9248',
      500: '#ff6700',
    },
  },
});

const App = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Header bgColor="#ff6700" color="#ffffff" />
          {routes.map((route: RouteProps) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Route key={route.path?.toString()} {...route} />
          ))}
          <Footer />
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
};

export default App;
