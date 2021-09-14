import React, { ReactNode, useRef, useState } from 'react';
import { Image, Text, Box, FormControl } from '@chakra-ui/react';
import { useController, UseControllerProps } from 'react-hook-form';
import PhotoOrange from '../../assets/photo-orange.png'; // 326 x 174

export interface InputFormImageProps {
  file: FileList;
}

interface InputImageProps {
  formProps: UseControllerProps<InputFormImageProps>;
  multiple?: boolean;
  accept?: string;
  children?: ReactNode;
}

/* Input image component for POST form */
const InputImage: React.FC<InputImageProps> = ({ formProps, accept }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { field, fieldState } = useController(formProps);
  const [thumbnail, setThumbnail] = useState<string>('');

  const handleClick = () => inputRef.current?.click();

  // Validate .jpeg .png extensions of file input
  const validateImageExtensions = (file: File): boolean => {
    const allowedExtensions = ['image/jpeg', 'image/png'];
    if (allowedExtensions.includes(file.type)) {
      return true;
    }
    return false;
  };

  // Handle thumbnail preview
  const handleThumbnail = (img: File) => {
    const previewURL = URL.createObjectURL(img);
    setThumbnail(previewURL);
  };

  return (
    <>
      <Box textAlign="center">
        <FormControl isInvalid={fieldState.invalid}>
          <input
            type="file"
            accept={accept}
            multiple={false}
            hidden
            ref={(e) => {
              // Reference to events of hook form and field
              field.ref(e);
              inputRef.current = e;
            }}
            onChange={(e) => {
              field.onChange(e.target.files);
              if (validateImageExtensions(e.target.files![0])) {
                handleThumbnail(e.target.files![0]);
              }
            }}
          />
          <Image
            src={thumbnail !== '' ? thumbnail : PhotoOrange}
            alt="image-upload"
            w={240}
            h={240}
            m="0 auto"
            display="block"
            onClick={handleClick}
            cursor="pointer"
          />
          {thumbnail !== '' ? (
            <></>
          ) : (
            <Text color="#b9b9b9" fontSize={14}>
              Click to upload your image here
            </Text>
          )}
        </FormControl>
      </Box>
    </>
  );
};

export default InputImage;
