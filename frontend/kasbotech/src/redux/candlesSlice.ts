import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
}

interface CandlesState {
  candles: Candle[];
}

const initialState: CandlesState = {
  candles: [],
};

const candlesSlice = createSlice({
  name: 'candles',
  initialState,
  reducers: {
    addCandle: (state, action: PayloadAction<Candle>) => {
      state.candles.push(action.payload);
    },
  },
});

export const { addCandle } = candlesSlice.actions;
export default candlesSlice.reducer;
