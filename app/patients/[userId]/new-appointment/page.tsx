"use client";
import { useState, useEffect } from 'react';
import Image from "next/image";
import { getAuthUser, getPatientByEmail } from "@/lib/actions/patient.actions";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { IPatientRegister } from '../../../../models/PatientRegister';

interface SearchParamProps {
  params: {
    userId: string; // Adjust type according to your actual data
  };
}

const Appointment = ({ params: { userId } }: SearchParamProps) => {
  const [patient, setPatient] = useState<IPatientRegister | null>(null);
  const [loading, setLoading] = useState(true);

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
        setLoading(false); // Ensure setLoading(false) is called in all scenarios
      }
    };
  
    fetchData();
  }, [userId]);
  

  if (loading) {
    return <p>Loading...</p>;
  }

  // Ensure patient exists before rendering AppointmentForm
  const patientId = patient?._id || " "; // Default to empty string if patient._id is undefined

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            height={100}
            width={300}
            alt="patient"
            className="mb-4 h-10 w-auto"
          />

          {patient && (
            <AppointmentForm
              patientId={patientId} // Ensure patientId is a string
              userId={userId}
              type="cancel"
            />
          )}

          <p className="copyright py-4">© 2024 CarePlus</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={400}
        width={400}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Appointment;
