"use client";

import React, { FC, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store"; // Assuming you have defined the RootState in redux/store

interface Candle {
  id: number;
  open: number;
  high: number;
  low: number;
  close: number;
  timestamp: string;
}

const CandleListServer: FC = () => {
  const candlesFromRedux = useSelector(
    (state: RootState) => state.candles.candles,
  );

  // Update the useQuery hook to the v5 object format
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["candles"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/candles`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch candles");
      }
      const candles: Candle[] = (await response.json()) as Candle[];
      return candles.slice(0, 200); // Limit to the last 200 candles
    },
  });

  // Use useEffect to trigger refetch when Redux state (candles) changes
  useEffect(() => {
    if (candlesFromRedux.length) {
      refetch()
        .then(() => {
          // successful
        })
        .catch((error) => {
          console.error("Error refetching candles:", error);
        });
    }
  }, [candlesFromRedux, refetch]);

  if (isLoading) {
    return <p>Loading candles...</p>;
  }

  if (isError) {
    return <p>Error loading candles.</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold">Last 200 Candles {data?.length}</h2>
      <ul className="divide-y divide-gray-200">
        {data?.map((candle) => (
          <li key={candle.id} className="py-2">
            <div className="grid grid-cols-5 gap-4">
              <span>Open: {candle.open}</span>
              <span>High: {candle.high}</span>
              <span>Low: {candle.low}</span>
              <span>Close: {candle.close}</span>
              <span>{new Date(candle.timestamp).toLocaleString()}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandleListServer;
