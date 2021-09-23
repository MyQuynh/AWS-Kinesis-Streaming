import React from 'react';
import { Box, Input, FormControl } from '@chakra-ui/react';
import { useController, UseControllerProps } from 'react-hook-form';

export interface InputFormURLProps {
  url: string;
}

export interface InputURLProps {
  formProps: UseControllerProps<InputFormURLProps>;
}

const InputURL: React.FC<InputURLProps> = ({ formProps }) => {
  const { field, fieldState } = useController(formProps);

  return (
    <>
      <Box pl={3}>
        <FormControl isInvalid={fieldState.invalid}>
          <Input
            borderColor="brand.500"
            value={field.value}
            onChange={field.onChange}
            w="100%"
            placeholder="https://example.com/articles/how-big-data-impact-the-traditional-business"
            focusBorderColor="brand.400"
            _hover={{ borderColor: 'brand.400' }}
            rounded="none"
          />
        </FormControl>
      </Box>
    </>
  );
};

export default InputURL;
