"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
};

export default function App() {
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-xl w-full"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2" htmlFor="firstName">
            First Name
          </label>
          <input
            {...register("firstName")}
            id="firstName"
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-pink-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2" htmlFor="lastName">
            Last Name
          </label>
          <input
            {...register("lastName")}
            id="lastName"
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-pink-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-400 text-sm mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            id="email"
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-pink-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
