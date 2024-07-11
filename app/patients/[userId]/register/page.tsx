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
  console.log(user);

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-900">
      <div className="flex flex-col items-center w-3/4 max-w-4xl p-6 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <Image src="/assets/icons/logo-full.svg" height={1000} width={1000} alt="careplus" className="h-10 w-auto mb-12" />
        <RegisterForm user={user} />
      </div>
    </div>
  );
};

export default Register;
