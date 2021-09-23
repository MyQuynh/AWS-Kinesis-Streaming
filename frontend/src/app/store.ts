import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/example/counterSlice';
// eslint-disable-next-line import/no-cycle
import hashtaggerReducer from '../features/hashtagger/hashtaggerSlice';
import wiseInsightsReducer from '../features/wise-insights/wiseInsightsSlice';

/* Main Redux Global Store configurations */
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    hashtagger: hashtaggerReducer,
    wiseInsights: wiseInsightsReducer,
  },
});

/* Types for Hook and Thunk */
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

/* Type for Thunk async actions */
export type ThunkLoadingState = 'idle' | 'pending' | 'fulfilled' | 'rejected';

/* Error message type */
export interface KnownThunkError {
  message: string;
}
