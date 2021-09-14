import React from 'react';
import { Dictionary } from '@reduxjs/toolkit';
import { FieldError } from 'react-hook-form';
import { Flex, Icon, Text } from '@chakra-ui/react';
import { BiError } from 'react-icons/bi';

interface ErrorMessageFormProps {
  message: string | undefined;
}

const ErrorMessageForm: React.FC<ErrorMessageFormProps> = ({ message }) => (
  <>
    <Flex flexDirection="row" mt={1} ml={2}>
      <Icon as={BiError} w="20px" h="20px" color="red.400" />
      <Text fontSize={16}>{message}</Text>
    </Flex>
  </>
);

export default ErrorMessageForm;
