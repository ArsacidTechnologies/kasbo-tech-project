"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function CandleList() {
  const candles = useSelector((state: RootState) => state.candles.candles);

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold">New Submitted Candles</h2>
      <ul>
        {candles.map((candle, index) => (
          <li key={index} className="py-2">
            Open: {candle.open}, High: {candle.high}, Low: {candle.low}, Close:{" "}
            {candle.close}
          </li>
        ))}
      </ul>
    </div>
  );
}
