import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/example/counterSlice';
import hashtaggerReducer from '../features/hashtagger/hashtaggerSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    hashtagger: hashtaggerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type ThunkLoadingState = 'loading' | 'idle' | 'failed';
