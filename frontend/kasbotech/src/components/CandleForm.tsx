"use client";

import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { addCandle } from "@/redux/candlesSlice";

interface CandleFormInputs {
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface ICandleResponse {
  id?: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  timestamp?: Date;
}

const CandleForm: FC = ({}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CandleFormInputs>();
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: async (formData: CandleFormInputs) => {
      const response = await fetch("https://localhost:5000/api/candles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit candle data");
      }
      const res: ICandleResponse = response.json() as ICandleResponse;
      return res;
    },
    onSuccess: (data, variables) => {
      reset(); // Reset form after successful submission
      dispatch(addCandle(variables)); // Add the candle to the Redux store
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
    },
  });

  const onSubmit = (data: CandleFormInputs) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid max-w-[400px] grid-cols-1 space-y-4"
    >
      <div>
        <label className="mb-2 block font-bold text-gray-300" htmlFor="open">
          Open Price
        </label>
        <Controller
          name="open"
          control={control}
          defaultValue={0}
          rules={{
            required: "Open price is required",
            min: {
              value: 0,
              message: "Open price must be a positive number",
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              step="0.01"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-800 shadow focus:outline-none"
            />
          )}
        />
        {errors.open && (
          <span className="text-red-500">{errors.open.message}</span>
        )}
      </div>

      <div>
        <label className="mb-2 block font-bold text-gray-300" htmlFor="high">
          High Price
        </label>
        <Controller
          name="high"
          control={control}
          defaultValue={0}
          rules={{
            required: "High price is required",
            min: {
              value: 0,
              message: "High price must be a positive number",
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              step="0.01"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-800 shadow focus:outline-none"
            />
          )}
        />
        {errors.high && (
          <span className="text-red-500">{errors.high.message}</span>
        )}
      </div>

      <div>
        <label className="mb-2 block font-bold text-gray-300" htmlFor="low">
          Low Price
        </label>
        <Controller
          name="low"
          control={control}
          defaultValue={0}
          rules={{
            required: "Low price is required",
            min: {
              value: 0,
              message: "Low price must be a positive number",
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              step="0.01"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-800 shadow focus:outline-none"
            />
          )}
        />
        {errors.low && (
          <span className="text-red-500">{errors.low.message}</span>
        )}
      </div>

      <div>
        <label className="mb-2 block font-bold text-gray-300" htmlFor="close">
          Close Price
        </label>
        <Controller
          name="close"
          control={control}
          defaultValue={0}
          rules={{
            required: "Close price is required",
            min: {
              value: 0,
              message: "Close price must be a positive number",
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              step="0.01"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-800 shadow focus:outline-none"
            />
          )}
        />
        {errors.close && (
          <span className="text-red-500">{errors.close.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Submitting..." : "Submit"}
      </button>

      {mutation.isError && (
        <div className="mt-4 text-red-500">
          An error occurred:{" "}
          {mutation.error instanceof Error && mutation.error.message}
        </div>
      )}

      {mutation.isSuccess && (
        <div className="mt-4 text-green-500">
          Candle data submitted successfully!
        </div>
      )}
    </form>
  );
};
export default CandleForm;
