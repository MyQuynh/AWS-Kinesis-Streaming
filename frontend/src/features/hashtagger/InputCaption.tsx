import React, { ChangeEvent, useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { Box, FormControl, Textarea } from '@chakra-ui/react';
import useDebounce from '../../utils/debounce';
import GenerateButton from './GenerateButton';

export interface InputFormCaptionProps {
  caption: string;
}

export interface InputCaptionProps {
  formProps: UseControllerProps<InputFormCaptionProps>;
}

const InputCaption: React.FC<InputCaptionProps> = ({ formProps }) => {
  const { field, fieldState } = useController(formProps);

  return (
    <>
      <Box pl={3}>
        <FormControl isInvalid={fieldState.invalid}>
          <Textarea
            borderColor="brand.500"
            value={field.value}
            onChange={field.onChange}
            w="100%"
            h="200px"
            placeholder="How do you feel today?"
            focusBorderColor="brand.400"
            _hover={{ borderColor: 'brand.400' }}
            resize="none"
            rounded="none"
          />
        </FormControl>
      </Box>
    </>
  );
};

export default InputCaption;
