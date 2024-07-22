"use client"
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const isAdminRoute = pathname === '/admin';

  return (
    <nav className="sticky top-0 bg-gray-900 py-4 shadow-lg">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <ul className="flex justify-center md:justify-start space-x-4">
          <li><Link href="/"><div className="text-pink-500 hover:text-pink-300 cursor-pointer py-2">Home</div></Link></li>
          {!isAdminRoute && (
            <>
              <li><Link href="/profile"><div className="text-gray-100 hover:text-pink-300 cursor-pointer py-2">View Profile</div></Link></li>
              <li><Link href="/appointment"><div className="text-gray-100 hover:text-pink-300 cursor-pointer py-2">Book Appointment</div></Link></li>
            </>
          )}
        </ul>
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              className="bg-gray-800 text-gray-100 border-pink-500 border-2 px-4 py-2 rounded-lg"
              placeholder="Search"
            />
            <button className="absolute top-0 right-0 mt-2 mr-2">
              <i className="fa fa-search text-gray-100"></i>
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
