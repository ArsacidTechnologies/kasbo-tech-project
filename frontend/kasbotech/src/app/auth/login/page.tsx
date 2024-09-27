"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

interface LoginDto {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  // Define the mutation for login
  const mutation = useMutation({
    mutationFn: async (loginData: LoginDto) => {
      const response = await fetch("https://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      return response.json() as Promise<LoginResponse>;
    },
    onSuccess: (data) => {
      // Store the JWT token
      localStorage.setItem("token", data.token);
      // Redirect to home page after successful login
      router.push("/");
    },
    onError: (error: unknown) => {
      console.error("Login failed:", error);
    },
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Call the mutation function with the form data
    mutation.mutate({ username, password });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleLogin}
          className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
        >
          <h1 className="mb-6 text-center text-2xl font-bold">Login</h1>

          {mutation.status === "error" && (
            <div className="relative mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
              {mutation.error instanceof Error
                ? mutation.error.message
                : "Login failed. Please try again."}
            </div>
          )}

          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className={`focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none ${
                mutation?.isPending ? "cursor-not-allowed opacity-50" : ""
              }`}
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.status === "pending" ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
