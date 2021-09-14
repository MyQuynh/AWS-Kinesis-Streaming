/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosError } from 'axios';
import type { ThunkLoadingState } from '../../app/store';
import { API_GATEWAY_URL } from '../../app/config';

export interface KnownError {
  errorMessage: string;
}

/* Hashtagger responses and data */
export interface HashtaggerResponseData {
  hashtags: string[];
}

export interface HashtaggerState {
  status: ThunkLoadingState;
  data: string[];
  error: null | object | string;
}

const initialState: HashtaggerState = {
  status: 'idle',
  data: [],
  error: null,
};

/**
 * Upload images to S3 for hashtag processing
 * @param {File} file - Blob file input uploaded
 * @param {GetThunkAPI<{rejectedValue: KnownError}>} thunkApi - Thunk's API used for returning rejected value on error
 */
export const fetchImageHashtags = createAsyncThunk<
  HashtaggerResponseData,
  File,
  {
    rejectValue: KnownError;
  }
>('hashtagger/uploadPhoto', async (file: File, thunkApi) => {
  let response;
  try {
    // TODO: Remember to put in API body for File transfer
    response = await axios.post(`${API_GATEWAY_URL}/process-photos`);
  } catch (error: unknown | Error | AxiosError) {
    // eslint-disable-next-line no-console
    console.log(error);
    if (axios.isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.response?.data as KnownError);
    }
  }
  return response?.data as HashtaggerResponseData;
});

/**
 * Upload Caption to API Gateway for generating hashtags
 * @param {string} caption - Caption input for processing purpose
 * @param {GetThunkAPI<{rejectedValue: KnownError}>} thunkApi - Thunk's API used for returning rejected value on error
 */
export const fetchCaptionHashtags = createAsyncThunk<
  HashtaggerResponseData,
  string,
  {
    rejectValue: KnownError;
  }
>('hashtagger/uploadCaption', async (caption: string, thunkApi) => {
  let response;
  try {
    // TODO: Remember to put in API body for Caption transfer and processing
    response = await axios.post(`${API_GATEWAY_URL}/process-photos`);
  } catch (error: unknown | Error | AxiosError) {
    // eslint-disable-next-line no-console
    console.log(error);
    if (axios.isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.response?.data as KnownError);
    }
  }
  return response?.data as HashtaggerResponseData;
});

const hashtaggerSlice = createSlice({
  name: 'hashtagger',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImageHashtags.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchImageHashtags.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload.hashtags;
      })
      .addCase(fetchImageHashtags.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error;
        }
      })
      .addCase(fetchCaptionHashtags.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCaptionHashtags.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload.hashtags;
      })
      .addCase(fetchCaptionHashtags.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error;
        }
      });
  },
});

export default hashtaggerSlice.reducer;
