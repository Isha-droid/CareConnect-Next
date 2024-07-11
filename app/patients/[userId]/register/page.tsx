"use client";
import RegisterForm from '@/components/forms/RegisterForm';
import { getUser } from '@/lib/actions/patient.actions';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Register = ({ params: { userId } }: SearchParamProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUser(userId);
      setUser(fetchedUser);
    };

    fetchUser();
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="relative min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 m-5">
        <Image src="/assets/icons/logo-full.svg" height={50} width={150} alt="careplus" className="p-2 rounded-lg shadow-lg" />
      </div>
      <div className="flex flex-col items-center w-full max-w-4xl p-6 space-y-6">
        <RegisterForm user={user} />
      </div>
    </div>
  );
};

export default Register;
