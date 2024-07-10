"use client"
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
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image src="/assets/icons/logo-full.svg" height={1000} width={1000} alt="careplus" className="mb-12 h-10 w-fit" />
        </div>
      </section>

      <RegisterForm user={user} />
    </div>
  );
};

export default Register;
