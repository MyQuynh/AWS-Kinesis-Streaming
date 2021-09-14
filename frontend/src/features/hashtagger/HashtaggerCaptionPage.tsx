import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import HeadBanner from '../../components/HeadBanner';
import ContentSection from './ContentSection';
import InputCaption, { InputFormCaptionProps } from './InputCaption';
import GenerateButton from './GenerateButton';
import ErrorMessageForm from './ErrorMessageForm';
import HashtaggerBanner from './HashtaggerBanner';

// Yup validation schema for form fields
const captionValidationSchema = yup.object({
  caption: yup
    .string()
    .required('The caption must not be empty!')
    .min(25, 'The caption must not be too short! (minimum 25 characters)'),
});

// eslint-disable-next-line arrow-body-style
const HashtaggerCaptionPage: React.FC = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<InputFormCaptionProps>({
    defaultValues: {
      caption: '',
    },
    mode: 'onChange',
    resolver: yupResolver(captionValidationSchema),
  });

  const submitCaptionHandler: SubmitHandler<InputFormCaptionProps> = (data) => {
    // Log data for TEST only!
    console.log(data);
  };

  return (
    <>
      <HashtaggerBanner />
      <ContentSection>
        {/* Caption submission form */}
        <form onSubmit={handleSubmit(submitCaptionHandler)}>
          <InputCaption
            formProps={{
              name: 'caption',
              control,
              defaultValue: '',
            }}
          />
          {/* Error prompts on form */}
          {(errors.caption?.type === 'required' ||
            errors.caption?.type === 'min') && (
            <ErrorMessageForm message={errors.caption?.message} />
          )}
          <GenerateButton ml={3} w="98.799%" disabled={!!errors.caption} />
        </form>
      </ContentSection>
    </>
  );
};

export default HashtaggerCaptionPage;
