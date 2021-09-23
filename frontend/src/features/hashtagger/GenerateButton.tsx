import React from 'react';
import { Button, Text, Icon } from '@chakra-ui/react';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import LoadingThreeDot from '../../components/LoadingThreeDot';

interface GenerateButtonProps {
  pl?: number | string;
  ml?: number | string;
  w?: number | string;
  disabled?: boolean;
  isLoading?: boolean;
}

// eslint-disable-next-line arrow-body-style
const GenerateButton: React.FC<GenerateButtonProps> = ({
  pl = 0,
  ml = 0,
  w = '100%',
  disabled = false,
  isLoading = false,
}) => (
  <>
    <Button
      colorScheme="brand"
      w={w}
      mt={2}
      _hover={{ backgroundColor: 'brand.400' }}
      _focus={{
        borderColor: 'brand.400',
      }}
      rounded="none"
      type="submit"
      pl={pl}
      ml={ml}
      disabled={disabled}
    >
      {isLoading ? (
        <>
          <LoadingThreeDot />
        </>
      ) : (
        <>
          <Icon color="#00000" as={FaArrowAltCircleRight} w={19} h={20} />
          <Text fontSize={14} color="#ffffff" fontWeight={600} ml={2}>
            Generate Hashtags!
          </Text>
        </>
      )}
    </Button>
  </>
);

export default GenerateButton;
