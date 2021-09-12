/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosError } from 'axios';
import type { ThunkLoadingState } from '../../app/store';
import { API_GATEWAY_URL } from '../../app/config';

export interface KnownError {
  errorMessage: string;
}

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
 * @param {any} file - Blob file input uploaded
 * @param {GetThunkAPI<{rejectedValue: KnownError}>} thunkApi - Thunk's API used for returning rejected value on error
 */
export const fetchImageHashtags = createAsyncThunk<
  HashtaggerResponseData,
  any,
  {
    rejectValue: KnownError;
  }
>('hashtagger/uploadPhoto', async (file, thunkApi) => {
  let response;
  try {
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
      });
  },
});

export default hashtaggerSlice.reducer;
