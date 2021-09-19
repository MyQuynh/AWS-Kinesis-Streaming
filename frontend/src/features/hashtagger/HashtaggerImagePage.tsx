import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Text } from '@chakra-ui/react';
import ContentSection from './ContentSection';
import InputImage from './InputImage';
import type { InputFormImageProps } from './InputImage';
import GenerateButton from './GenerateButton';
import ErrorMessageForm from './ErrorMessageForm';
import HashtaggerBanner from './HashtaggerBanner';
import { fetchImageHashtags } from './hashtaggerSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ResultSection from './ResultSection';
import { THUNK_ACTION_PENDING } from '../../app/actions';

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
  // Retrieve state data for hashtags
  const hashtagger = useAppSelector((state) => state.hashtagger);
  const dispatch = useAppDispatch();
  // Declare react-hook-form hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InputFormImageProps>({
    defaultValues: undefined,
    mode: 'onChange',
    resolver: yupResolver(fileValidationSchema),
  });
  // Submit handler for image
  const submitImageHandler: SubmitHandler<InputFormImageProps> = (data) => {
    // setIsSubmit(true);
    console.log('Image submitted!');
    const file = data.file[0]; // Retrieve first selected file
    dispatch(fetchImageHashtags(file));
  };

  return (
    <>
      <HashtaggerBanner />
      {/* Content section */}
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
          <GenerateButton
            pl={3}
            disabled={!!errors.file}
            isLoading={hashtagger.status === THUNK_ACTION_PENDING}
          />
        </form>
        {/* Result section */}
        {
          {
            idle: <></>,
            pending: <></>,
            fulfilled: (
              <Box mt={3}>
                <ResultSection hashtags={hashtagger.data} />
              </Box>
            ),
            rejected: (
              <Box mt={3}>
                <Text color="red.400">ERROR! {hashtagger.error}</Text>
                <Text color="#b9b9b9">
                  Cannot generate hashtags for the current image. Please try
                  again!
                </Text>
              </Box>
            ),
          }[hashtagger.status]
        }
      </ContentSection>
    </>
  );
};

export default HashtaggerImagePage;
