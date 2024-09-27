import { configureStore } from '@reduxjs/toolkit';
import candlesReducer from './candlesSlice';

const store = configureStore({
  reducer: {
    candles: candlesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
