import React from 'react';
import { Image, Box } from '@chakra-ui/react';
import NotFoundPicture from '../../assets/404error.png';

// eslint-disable-next-line arrow-body-style
const NotFoundPage: React.FC = () => {
  return (
    <>
      <Image
        src={NotFoundPicture}
        w="50%"
        h="800px"
        display="block"
        ml="auto"
        mr="auto"
      />
    </>
  );
};

export default NotFoundPage;
