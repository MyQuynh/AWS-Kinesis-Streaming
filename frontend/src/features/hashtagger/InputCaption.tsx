import React, { ChangeEvent, useState } from 'react';
import { Box, Textarea } from '@chakra-ui/react';
import GenerateButton from './GenerateButton';

const InputCaption: React.FC = () => {
  const [caption, setCaption] = useState('');
  const captionHandler = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const inputCaptionValue = e.currentTarget.value;
    setCaption(inputCaptionValue);
  };

  return (
    <>
      <Box pl={3}>
        <Textarea
          borderColor="brand.500"
          value={caption}
          onChange={captionHandler}
          w="100%"
          h="200px"
          placeholder="How do you feel today?"
          focusBorderColor="brand.400"
          _hover={{ borderColor: 'brand.400' }}
          resize="none"
          rounded="none"
        />
        <GenerateButton />
      </Box>
    </>
  );
};

export default InputCaption;
