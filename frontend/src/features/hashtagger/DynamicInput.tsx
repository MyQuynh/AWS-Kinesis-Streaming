import React from 'react';
import InputCaption from './InputCaption';
import InputImage from './InputImage';
import InputURL from './InputURL';
import type { SectionProps } from './Section';

interface DynamicInputProps extends SectionProps {}

// eslint-disable-next-line consistent-return
const DynamicInput: React.FC<DynamicInputProps> = ({ type }) => {
  switch (type) {
    case 'caption':
      return (
        <>
          <InputCaption />
        </>
      );
    case 'image':
      return (
        <>
          <InputImage />
        </>
      );
    case 'url':
      return (
        <>
          <InputURL />
        </>
      );
    default:
      break;
  }
  return <></>;
};

export default DynamicInput;
