import React, { ChangeEvent, useState } from 'react';
import { Box, Textarea, Input } from '@chakra-ui/react';
import GenerateButton from './GenerateButton';

const InputURL: React.FC = () => {
  const [URL, setURL] = useState('');
  const URLHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const inputURLValue = e.currentTarget.value;
    setURL(inputURLValue);
  };

  return (
    <>
      <Box pl={3}>
        <Input
          borderColor="brand.500"
          value={URL}
          onChange={URLHandler}
          w="100%"
          placeholder="https://example.com/articles/how-big-data-impact-the-traditional-business"
          focusBorderColor="brand.400"
          _hover={{ borderColor: 'brand.400' }}
          rounded="none"
        />
        <GenerateButton />
      </Box>
    </>
  );
};

export default InputURL;
