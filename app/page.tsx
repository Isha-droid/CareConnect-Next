import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from '../public/assets/icons/logo-full.svg';
import Link from 'next/link';
import './globals.css';
import PatientForm from "@/components/PatientForm";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white ">
      <header className="flex items-center justify-center py-4 bg-gray-800 shadow-md">
        <Image src={logo} alt="Logo" className="h-10" />
      </header>
      
      <main className="flex flex-col items-center justify-center flex-grow p-4">
        <div className="w-full max-w-2xl">
          <PatientForm />
        </div>
      </main>

      <footer className="flex items-center justify-center py-4 bg-gray-800 text-gray-400">
        <Link href="/?admin=true" className="text-gray-400 hover:underline mr-4">Admin</Link>
        <div>
          &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}
