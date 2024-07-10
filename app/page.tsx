import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from '../public/assets/icons/logo-full.svg';
import Link from 'next/link';
import './globals.css';
import PatientForm from "@/components/PatientForm";
export default function Home() {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white overflow-hidden">
      <aside className="w-full md:w-1/3 h-64 md:h-full relative">
        <Image src="/assets/images/onboarding-img.png" alt="Onboarding Image" layout="fill" objectFit="cover" className="w-full h-full" />
      </aside>

      <div className="flex flex-col w-full md:w-2/3 h-full p-6 md:p-10">
        <section className="flex flex-col items-center justify-center flex-1">
          <div className="max-w-md mx-auto text-center mb-6">
            <Image src={logo} alt="Logo" className="mx-auto" />
          </div>

          <div className="container mx-auto p-4 bg-gray-800 text-white rounded-lg shadow-lg w-full max-w-lg">
            <PatientForm />
          </div>
        </section>

        <footer className="text-center mt-6 md:mt-auto p-4 bg-gray-700 text-white w-full">
          <Link href="/?admin=true" className="text-white hover:underline">Admin</Link>
          <div className="mt-4">
            &copy; {new Date().getFullYear()}
          </div>
        </footer>
      </div>
    </div>
  );
}
