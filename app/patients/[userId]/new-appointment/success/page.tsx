import Image from "next/image";
import Link from "next/link";
import { FaUserMd } from "react-icons/fa"; // Importing the doctor icon
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils";
import { getAppointmentById } from "@/lib/actions/appointmet.actions";

const RequestSuccess = async ({
  searchParams,
  params: { userId },
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointments = await getAppointmentById(appointmentId);

  if (!appointments) {
    return <div>Appointment not found</div>;
  }

  const doctor = appointments.primaryPhysician;

  return (
    <div className="flex h-screen max-h-screen px-[5%] bg-gray-800 text-white">
      <div className="success-img flex flex-col items-center w-full">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center mt-8">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center text-3xl text-pink-500">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p className="text-lg">We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <section className="request-details mt-8 p-4 bg-gray-700 rounded-lg">
          <p className="text-xl mb-4">Requested appointment details: </p>
          <div className="flex items-center gap-3 mb-4">
            <FaUserMd className="text-3xl text-pink-500" /> {/* Doctor icon */}
            <p className="whitespace-nowrap text-xl">Dr. {doctor}</p>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p className="text-lg">
              {formatDateTime(appointments.schedule).dateTime}
            </p>
          </div>
        </section>

        <Button
          variant="outline"
          className="shad-primary-btn mt-6 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-gray-800"
          asChild
        >
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        <p className="copyright mt-8">© 2024 CarePluse</p>
      </div>
    </div>
  );
};

export default RequestSuccess;
