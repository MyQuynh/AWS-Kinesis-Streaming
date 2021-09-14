import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import HeadBanner from '../../components/HeadBanner';
import ContentSection from './ContentSection';
import InputImage from './InputImage';
import type { InputFormImageProps } from './InputImage';
import GenerateButton from './GenerateButton';
import ErrorMessageForm from './ErrorMessageForm';
import HashtaggerBanner from './HashtaggerBanner';

// Yup's file validation schema
const fileValidationSchema = yup.object({
  file: yup
    .mixed()
    .required('You need to provide a file!')
    .test(
      'fileSize',
      'The image file is too large',
      (value: FileList) => value && value[0].size <= 1024 * 1024 * 20
    )
    .test(
      'fileType',
      'Only jpeg, png file extensions are supported',
      (value: FileList) =>
        value &&
        (value[0].type === 'image/jpeg' || value[0].type === 'image/png')
    ),
});

// eslint-disable-next-line arrow-body-style
const HashtaggerImagePage: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InputFormImageProps>({
    defaultValues: undefined,
    mode: 'onChange',
    resolver: yupResolver(fileValidationSchema),
  });

  const submitImageHandler: SubmitHandler<InputFormImageProps> = (data) => {
    console.log('++ Submitted File ++');
    console.log(data.file[0]);
  };

  return (
    <>
      <HashtaggerBanner />
      <ContentSection>
        {/* File upload form */}
        <form onSubmit={handleSubmit(submitImageHandler)}>
          <InputImage
            formProps={{
              name: 'file',
              control,
              defaultValue: undefined,
            }}
            multiple={false}
            accept="image/*"
          />
          {(errors.file?.type === 'required' ||
            errors.file?.type === 'fileSize' ||
            errors.file?.type === 'fileType') && (
            <ErrorMessageForm message={errors.file?.message} />
          )}
          <GenerateButton pl={3} disabled={!!errors.file} />
        </form>
      </ContentSection>
    </>
  );
};

export default HashtaggerImagePage;
