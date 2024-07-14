"use client"
import { useState, useEffect } from 'react';
import Image from "next/image";
import { getAuthUser, getPatientByEmail } from "@/lib/actions/patient.actions";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { IPatientRegister } from '../../../../models/PatientRegister';

const Appointment = ({ params: { userId } }: SearchParamProps) => {
  const [patient, setPatient] = useState<IPatientRegister | null>(null); // Ensure to specify the type here
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getAuthUser(userId);
        const patientData = await getPatientByEmail(user?.email);
        console.log(patientData.patient)
        setPatient(patientData.patient); // Assuming patientData structure is { message: string, patient?: IPatientRegister }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchData();
  }, [userId]); // Fetch data when userId changes

  if (loading) {
    return <p>Loading...</p>;
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

          {patient && (
            <AppointmentForm
              patientId={patient?._id} // Adjust according to your actual data structure
              userId={userId}
              type="create"
            />
          )}

          <p className="copyright py-12">© 2024 CarePluse</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Appointment;
