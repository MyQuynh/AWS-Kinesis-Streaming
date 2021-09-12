/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactNode, useRef } from 'react';
import { Image, Text, Box, FormControl } from '@chakra-ui/react';
import { useController, UseControllerProps } from 'react-hook-form';
import PhotoOrange from '../../assets/photo-orange.png';
// 326 x 174

export interface InputFormValueProps {
  file: FileList;
}

interface InputImageProps {
  formProps: UseControllerProps<InputFormValueProps>;
  multiple?: boolean;
  accept?: string;
  children?: ReactNode;
}

const InputImage: React.FC<InputImageProps> = ({
  formProps,
  multiple,
  accept,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { field, fieldState } = useController(formProps);
  const handleClick = () => inputRef.current?.click();
  return (
    <>
      <Box textAlign="center">
        <FormControl>
          <input
            type="file"
            accept={accept}
            multiple={multiple}
            hidden
            ref={(e) => {
              field.ref(e);
              inputRef.current = e;
            }}
            onChange={(e) => {
              field.onChange(e.target.files);
            }}
          />
          <Image
            src={PhotoOrange}
            alt="image-upload"
            w={240}
            h={240}
            m="0 auto"
            display="block"
            onClick={handleClick}
            cursor="pointer"
          />
          <Text color="#b9b9b9" fontSize={14}>
            Click to upload your image here
          </Text>
        </FormControl>
      </Box>
    </>
  );
};

export default InputImage;
