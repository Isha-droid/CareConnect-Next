"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getAuthUser, getPatientByEmail } from "@/lib/actions/patient.actions";
import { IPatientRegister } from '../../../../models/PatientRegister';
import PatientProfile from '@/components/PatientProfile';

interface SearchParamProps {
  params: {
    userId: string;
  };
}

const ParentComponent = ({ params }: SearchParamProps) => {
  const { userId } = params;
  const [patient, setPatient] = useState<IPatientRegister | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const user = await getAuthUser(userId);
          if (user?.email) {
            const patientData = await getPatientByEmail(user.email);
            if (patientData?.patient) {
              setPatient(patientData.patient);
            } else {
              console.error('Patient data not found.');
            }
          } else {
            console.error('User email is undefined or null.');
          }
        } else {
          console.error('userId is undefined or null.');
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />
          <PatientProfile patient={patient} />
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default ParentComponent;
