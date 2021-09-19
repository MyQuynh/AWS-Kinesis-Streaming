/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosError } from 'axios';
// eslint-disable-next-line import/no-cycle
import { ThunkLoadingState, KnownThunkError } from '../../app/store';
import {
  THUNK_ACTION_FULFILLED,
  THUNK_ACTION_INITIAL,
  THUNK_ACTION_PENDING,
  THUNK_ACTION_REJECTED,
} from '../../app/actions';
import { API_GATEWAY_IMAGE_URL, API_GATEWAY_URL } from '../../app/config';
import { getFileExtension } from '../../utils/file';

/* Upload Image S3 response */
interface UploadImageResponse {
  message?: string;
  key: string;
  uploadURL: string;
}

/* Hashtagger responses and data */
export interface HashtaggerResponseData extends Array<string> {}

export interface HashtaggerCaptionResponseData {
  hashtags: string[];
}

export interface HashtaggerURLResponseData
  extends HashtaggerCaptionResponseData {}
/* Type of initial state for Hashtagger features */
interface HashtaggerState {
  status: ThunkLoadingState;
  data: string[];
  error: null | object | string;
}

/* Initial hashtagger state */
const initialState: HashtaggerState = {
  status: THUNK_ACTION_INITIAL,
  data: [],
  error: null,
};

/**
 * Upload and store image to S3 bucket
 *
 * @param {File} image - Image file to upload
 */
const uploadImage = async (image: File): Promise<string> => {
  const extension = getFileExtension(image);
  // Request
  const response = await axios.post(`${API_GATEWAY_IMAGE_URL}/upload-image`, {
    extension,
  });
  // Parse response from upload API
  const { key, uploadURL }: UploadImageResponse = response.data;
  //  PUT image to S3 bucket
  await axios.put(uploadURL, image);
  return key;
};

/**
 * Upload Image to S3 for hashtag processing
 *
 * @param {File} file - Blob file input uploaded
 * @param {GetThunkAPI<{rejectedValue: KnownThunkError}>} thunkApi - Thunk's API used for returning rejected value on error
 */
export const fetchImageHashtags = createAsyncThunk<
  HashtaggerResponseData,
  File,
  {
    rejectValue: KnownThunkError;
  }
>('hashtagger/processImage', async (image: File, thunkApi) => {
  let response;
  try {
    const key = uploadImage(image); // Upload image to S3
    response = await axios.post(`${API_GATEWAY_URL}/predictImage`, {
      key,
    });
  } catch (error: unknown | Error | AxiosError) {
    // eslint-disable-next-line no-console
    console.log(error);
    if (axios.isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.response?.data as KnownThunkError);
    }
  }
  return response?.data as HashtaggerResponseData;
});

/**
 * Upload Caption to API Gateway for generating hashtags
 *
 * @param {string} caption - Caption input for processing purpose
 * @param {GetThunkAPI<{rejectedValue: KnownThunkError}>} thunkApi - Thunk's API used for returning rejected value on error
 */
export const fetchCaptionHashtags = createAsyncThunk<
  HashtaggerCaptionResponseData,
  string,
  {
    rejectValue: KnownThunkError;
  }
>('hashtagger/processCaption', async (caption: string, thunkApi) => {
  let response;
  try {
    // TODO: Remember to put in API body for Caption transfer and processing
    response = await axios.post(`${API_GATEWAY_URL}/predictText`, {
      text: caption,
    });
  } catch (error: unknown | Error | AxiosError) {
    // eslint-disable-next-line no-console
    console.log(error);
    if (axios.isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.response?.data as KnownThunkError);
    }
  }
  return response?.data as HashtaggerCaptionResponseData;
});

/**
 * Upload URL to API Gateway for generating hashtags
 *
 * @param {string} caption - Caption input for processing purpose
 * @param {GetThunkAPI<{rejectedValue: KnownThunkError}>} thunkApi - Thunk's API used for returning rejected value on error
 */
export const fetchURLHashtags = createAsyncThunk<
  HashtaggerURLResponseData,
  string,
  {
    rejectValue: KnownThunkError;
  }
>('hashtagger/processURL', async (url: string, thunkApi) => {
  let response;
  try {
    // TODO: Remember to put in API body for URL transfer and processing
    response = await axios.post(`${API_GATEWAY_URL}/predictTextUrl`, {
      text: url,
    });
  } catch (error: unknown | Error | AxiosError) {
    // eslint-disable-next-line no-console
    console.log(error);
    if (axios.isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.response?.data as KnownThunkError);
    }
  }
  return response?.data as HashtaggerURLResponseData;
});

const hashtaggerSlice = createSlice({
  name: 'hashtagger',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* Image section */
      .addCase(fetchImageHashtags.pending, (state) => {
        state.status = THUNK_ACTION_PENDING;
      })
      .addCase(fetchImageHashtags.fulfilled, (state, action) => {
        state.status = THUNK_ACTION_FULFILLED;
        state.data = action.payload;
      })
      .addCase(fetchImageHashtags.rejected, (state, action) => {
        state.status = THUNK_ACTION_REJECTED;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error;
        }
      })
      /* Caption section */
      .addCase(fetchCaptionHashtags.pending, (state) => {
        state.status = THUNK_ACTION_PENDING;
      })
      .addCase(fetchCaptionHashtags.fulfilled, (state, action) => {
        state.status = THUNK_ACTION_FULFILLED;
        state.data = action.payload.hashtags;
      })
      .addCase(fetchCaptionHashtags.rejected, (state, action) => {
        state.status = THUNK_ACTION_REJECTED;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error;
        }
      })
      /* URL section */
      .addCase(fetchURLHashtags.pending, (state) => {
        state.status = THUNK_ACTION_PENDING;
      })
      .addCase(fetchURLHashtags.fulfilled, (state, action) => {
        state.status = THUNK_ACTION_FULFILLED;
        state.data = action.payload.hashtags;
      })
      .addCase(fetchURLHashtags.rejected, (state, action) => {
        state.status = THUNK_ACTION_REJECTED;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error;
        }
      });
  },
});

export default hashtaggerSlice.reducer;
