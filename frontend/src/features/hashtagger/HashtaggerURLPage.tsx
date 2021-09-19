import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Box, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import ContentSection from './ContentSection';
import InputURL, { InputFormURLProps } from './InputURL';
import GenerateButton from './GenerateButton';
import ErrorMessageForm from './ErrorMessageForm';
import HashtaggerBanner from './HashtaggerBanner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchURLHashtags } from './hashtaggerSlice';
import ResultSection from './ResultSection';

export const isValidUrl = (url: string) => {
  try {
    // eslint-disable-next-line no-new
    new URL(url);
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
};

const urlValidationSchema = yup.object({
  url: yup
    .string()
    .test('is-url-valid', 'URL is not valid', (value) =>
      isValidUrl(value as string)
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

  const hashtagger = useAppSelector((state) => state.hashtagger);
  const dispatch = useAppDispatch();

  const submitURLHandler: SubmitHandler<InputFormURLProps> = (data) => {
    console.log(data);
    dispatch(fetchURLHashtags(data.url));
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
            errors.url?.type === 'is-url-valid') && (
            <ErrorMessageForm message={errors.url?.message} />
          )}
          <GenerateButton
            ml={3}
            w="98.799%"
            disabled={!!errors.url}
            isLoading={hashtagger.status === 'pending'}
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
                  Cannot generate hashtags for the current URL. Please try
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

export default HashtaggerURLPage;
