/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import type { ThunkLoadingState, KnownThunkError } from '../../app/store';
import { API_GATEWAY_URL } from '../../app/config';
import {
  THUNK_ACTION_FULFILLED,
  THUNK_ACTION_INITIAL,
  THUNK_ACTION_PENDING,
  THUNK_ACTION_REJECTED,
} from '../../app/actions';

export interface WiseInsightsData {
  text: string;
  value: number;
}

interface WiseInsightsResponseData extends Array<WiseInsightsData> {}

interface WiseInsightsState {
  status: ThunkLoadingState;
  data: WiseInsightsData[];
  error: null | object | string;
}

const initialState: WiseInsightsState = {
  status: THUNK_ACTION_INITIAL,
  data: [],
  error: null,
};

export const fetchTwitterHashtags = createAsyncThunk<
  WiseInsightsResponseData,
  unknown,
  {
    rejectValue: KnownThunkError;
  }
>('wiseInsights/fetchTwitterHashtags', async (_, thunkApi) => {
  let response;
  try {
    response = await axios.get(`${API_GATEWAY_URL}/worldcloud`);
  } catch (error: unknown | Error | AxiosError) {
    console.log(error); // LOG Thunk ERROR
    if (axios.isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.response?.data as KnownThunkError);
    }
  }
  return response?.data as WiseInsightsResponseData;
});

const wiseInsightsSlice = createSlice({
  name: 'wiseInsights',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTwitterHashtags.pending, (state) => {
      state.status = THUNK_ACTION_PENDING;
    });
    builder.addCase(fetchTwitterHashtags.fulfilled, (state, action) => {
      state.status = THUNK_ACTION_FULFILLED;
      state.data = action.payload;
    });
    builder.addCase(fetchTwitterHashtags.rejected, (state, action) => {
      state.status = THUNK_ACTION_REJECTED;
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error;
      }
    });
  },
});

export default wiseInsightsSlice.reducer;
