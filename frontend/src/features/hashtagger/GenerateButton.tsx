import React from 'react';
import { Button, Text, Icon } from '@chakra-ui/react';
import { FaArrowAltCircleRight } from 'react-icons/fa';

// eslint-disable-next-line arrow-body-style
const GenerateButton: React.FC = () => {
  return (
    <>
      <Button
        colorScheme="brand"
        w="100%"
        mt={2}
        _hover={{ backgroundColor: 'brand.400' }}
        rounded="none"
        type="submit"
      >
        <Icon color="#00000" as={FaArrowAltCircleRight} w={19} h={20} />
        <Text fontSize={14} color="#ffffff" fontWeight={600} ml={2}>
          Generate Hashtags!
        </Text>
      </Button>
    </>
  );
};

export default GenerateButton;
