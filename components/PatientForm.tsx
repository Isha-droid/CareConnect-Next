"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  age: z.number().min(0, { message: "Age must be a positive number" }),
  address: z.string().nonempty({ message: "Address is required" }),
});

type PatientFormValues = z.infer<typeof schema>;

const PatientForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<PatientFormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: PatientFormValues) => {
    console.log(data);
    console.log("form submitted")
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
        <input
          id="name"
          {...register("name")}
          className="mt-1 p-2 block w-full bg-gray-700 text-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="age" className="block text-sm font-medium text-gray-300">Age</label>
        <input
          id="age"
          type="number"
          {...register("age")}
          className="mt-1 p-2 block w-full bg-gray-700 text-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-300">Address</label>
        <input
          id="address"
          {...register("address")}
          className="mt-1 p-2 block w-full bg-gray-700 text-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </form>
  );
};

export default PatientForm;
