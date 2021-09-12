import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import HashtaggerBanner from './HashtaggerBanner';
import ContentSection from './ContentSection';
import InputImage from './InputImage';
import type { InputFormValueProps } from './InputImage';
import GenerateButton from './GenerateButton';

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
  } = useForm<InputFormValueProps>({
    defaultValues: undefined,
    mode: 'onSubmit',
    resolver: yupResolver(fileValidationSchema),
  });

  const submitImageHandler: SubmitHandler<InputFormValueProps> = (data) => {
    console.log('++ Submitted File ++');
    console.log(data.file[0]);
  };

  return (
    <>
      <HashtaggerBanner />
      <ContentSection>
        <form onSubmit={handleSubmit(submitImageHandler)}>
          <InputImage
            formProps={{
              name: 'file',
              control,
              defaultValue: undefined,
            }}
            multiple={false}
          />
          <GenerateButton />
          {errors.file?.type === 'required' && <p>{errors.file.message}</p>}
          {errors.file?.type === 'fileSize' && <p>{errors.file.message}</p>}
          {errors.file?.type === 'fileType' && <p>{errors.file.message}</p>}
        </form>
      </ContentSection>
    </>
  );
};

export default HashtaggerImagePage;
