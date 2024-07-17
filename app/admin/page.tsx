import { StatCard } from "@/components/StatCard";
import { getRecentAppointments } from "@/lib/actions/appointmet.actions";
import Image from "next/image";
import Link from "next/link";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/dataTable";
const AdminPage = async () => {
//   const appointments = await getRecentAppointmentList();
const appointments= await getRecentAppointments();

  return (
    <div className="bg-gray-800 text-white mx-auto flex max-w-7xl flex-col space-y-14 p-6">
      <header className="flex items-center justify-between p-4 bg-gray-900 rounded-md shadow-md">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>
        <p className="text-pink-500 text-2xl font-semibold">Admin Dashboard</p>
      </header>

      <main className="flex flex-col space-y-14">
        <section className="space-y-4">
          <h1 className="text-4xl font-bold text-pink-500">Welcome 👋</h1>
          <p className="text-gray-400">Start the day with managing new appointments</p>
        </section>

        <section className="flex space-x-4">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
            className="bg-gray-700 text-pink-500 p-4 rounded-md shadow-md"
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
            className="bg-gray-700 text-pink-500 p-4 rounded-md shadow-md"
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
            className="bg-gray-700 text-pink-500 p-4 rounded-md shadow-md"
          />
        </section>

        <div className="bg-gray-700 rounded-md shadow-md p-4">
          <DataTable columns={columns} data={appointments.documents} />
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
