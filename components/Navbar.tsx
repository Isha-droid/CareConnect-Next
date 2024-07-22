"use client"
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const isAdminRoute = pathname === '/admin';

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setId(userId);
    if (pathname === '/profile' && !userId) {
      router.push('/login'); // Redirect to login if userId is not found
    } else if (pathname === '/profile' && userId) {
      router.push(`/patients/${userId}/view_profile`);
    }
  }, [pathname, router]);

  return (
    <nav className="sticky top-0 bg-gray-900 py-4 shadow-lg z-50">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <div className="text-pink-500 hover:text-pink-300 cursor-pointer py-2 text-lg font-semibold">
              Home
            </div>
          </Link>
          {!isAdminRoute && (
            <>
              <Link href={id ? `/patients/${id}/view_profile` : '/patients/patient-login'}>
                <div className="text-gray-100 hover:text-pink-300 cursor-pointer py-2">
                  View Profile
                </div>
              </Link>
              <Link href={id ? `/patients/${id}/new-appointment` : '/patients/patient-login'}>
                <div className="text-gray-100 hover:text-pink-300 cursor-pointer py-2">
                  Book Appointment
                </div>
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="relative">
            <input
              type="text"
              className="bg-gray-800 text-gray-100 border-pink-500 border-2 px-4 py-2 rounded-lg placeholder-gray-500 focus:outline-none focus:border-pink-400"
              placeholder="Search"
            />
            <button className="absolute top-0 right-0 mt-2 mr-2 text-gray-100">
              <i className="fa fa-search"></i>
            </button>
          </div>
          {isAdminRoute && (
            <p className="text-pink-500">Hello, Admin</p>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
