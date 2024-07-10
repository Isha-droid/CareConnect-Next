"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "@/lib/actions/patient.actions";
import { toast } from 'react-hot-toast';


const schema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
});

type FormValues = z.infer<typeof schema>;

// async function createUser(data: { firstName: string; email: string; phone: string }) {
//   // Simulate async API call or database operation
//   // Replace this with actual logic to create user
//   return { $id: "generated-id" }; // Simulated user object with an ID
// }

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    try {
      const email=data.email;
      const name=data.firstName;
      const phone="+91"+data.phone;



      const user = await createUser({name,email,phone});
      toast.success('user registered successfully!'); // Displays a success message

      
      router.push(`/patients/${user.$id}/register`);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

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
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="tel"
            {...register("phone")}
            id="phone"
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-pink-500"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
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
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
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
