import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Flex, Text, Icon } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { BiError } from 'react-icons/bi';
import HeadBanner from '../../components/HeadBanner';
import ContentSection from './ContentSection';
import InputURL, { InputFormURLProps } from './InputURL';
import GenerateButton from './GenerateButton';
import ErrorMessageForm from './ErrorMessageForm';
import HashtaggerBanner from './HashtaggerBanner';

const urlValidationSchema = yup.object({
  url: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Please enter correct url!'
    )
    .required('Please enter the URL to a website'),
});

// eslint-disable-next-line arrow-body-style
const HashtaggerURLPage: React.FC = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<InputFormURLProps>({
    defaultValues: {
      url: '',
    },
    mode: 'onChange',
    resolver: yupResolver(urlValidationSchema),
  });

  const submitURLHandler: SubmitHandler<InputFormURLProps> = (data) => {
    console.log(data);
  };
  return (
    <>
      <HashtaggerBanner />
      <ContentSection>
        <form onSubmit={handleSubmit(submitURLHandler)}>
          <InputURL
            formProps={{
              name: 'url',
              control,
              defaultValue: '',
            }}
          />
          {/* Error prompts on form */}
          {(errors.url?.type === 'required' ||
            errors.url?.type === 'matches') && (
            <ErrorMessageForm message={errors.url?.message} />
          )}
          <GenerateButton ml={3} w="98.799%" disabled={!!errors.url} />
        </form>
      </ContentSection>
    </>
  );
};

export default HashtaggerURLPage;
