import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
          {/* Left Section */}
          <div className="w-full md:w-1/2 lg:w-1/3 mb-8 md:mb-0">
            <h5 className="mb-4 text-pink-500">Opening Hours</h5>
            <ul className="list-disc list-inside text-gray-400">
              <li>Sunday: Closed</li>
              <hr className="my-3 border-gray-500" />
              <li>Monday - Friday: 8:00 AM - 3:30 PM</li>
              <hr className="my-3 border-gray-500" />
              <li>Saturday: 10:30 AM - 5:30 PM</li>
            </ul>
          </div>

          {/* Middle Section */}
          <div className="w-full md:w-1/2 lg:w-1/3 mb-8 md:mb-0 flex items-start space-x-4">
            <div>
              <a href="/?admin=true" className="text-pink-500 hover:text-white mr-4">
                Admin 
              </a>
            </div>
            <div className="text-gray-400 my-3">
              &copy; {new Date().getFullYear()} ConnectCare
            </div>
            <p className="text-gray-400 mt-2 my-3">
              123 Digital Art Street, Hadapsar, Pune
              <br />
              <a href="mailto:careconnect@gmail.com" className="text-pink-500 hover:text-white">
                careconnect@gmail.com
              </a>
            </p>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/3 flex justify-center md:justify-end">
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="social-icon-link">
                  <FaFacebook className="text-2xl hover:text-pink-500" />
                </a>
              </li>
              <li>
                <a href="#" className="social-icon-link">
                  <FaTwitter className="text-2xl hover:text-pink-500" />
                </a>
              </li>
              <li>
                <a href="#" className="social-icon-link">
                  <FaInstagram className="text-2xl hover:text-pink-500" />
                </a>
              </li>
              <li>
                <a href="#" className="social-icon-link">
                  <FaYoutube className="text-2xl hover:text-pink-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Horizontal Line */}
        <hr className="my-8 border-t-2 border-gray-600" />

        {/* Additional Information Section */}
      
      </div>
    </footer>
  );
};

export default Footer;
