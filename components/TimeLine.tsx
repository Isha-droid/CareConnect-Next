import React from 'react';
import { FaCheck, FaFileMedical, FaPersonBooth } from 'react-icons/fa';
import { BiGlobe } from 'react-icons/bi'; // Keeping BiGlobe as it's not available in Fa icons

const Timeline = () => {
  return (
    <section className="bg-gray-900 py-20" id="timeline">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10 text-white">Our Timeline</h2>

        {/* Timeline Events */}
        <div className="flex flex-col space-y-10">
          {/* Timeline Event 1 */}
          <div className="flex flex-row-reverse md:flex-row space-x-4">
            <div className="md:w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg text-white">
              <h3 className="text-2xl mb-4 text-pink-500">Get the vaccine</h3>
              <p className="text-lg">Donec facilisis urna dui, a dignissim mauris pretium a. Quisque quis libero fermentum, tempus felis eu, consequat nibh.</p>
            </div>
            <div className="flex items-center justify-center w-12 md:w-24">
              <FaCheck className="text-4xl text-pink-500" />
            </div>
            <div className="flex flex-col justify-center">
              <time className="text-lg text-gray-300">2021-07-31 Saturday</time>
            </div>
          </div>

          {/* Timeline Event 2 */}
          <div className="flex md:flex-row-reverse space-x-4">
            <div className="md:w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg text-white">
              <h3 className="text-2xl mb-4 text-pink-500">Consulting your health</h3>
              <p className="text-lg">You are fully permitted to use this template for your commercial or personal website. You are not permitted to redistribute the template ZIP file for a download purpose on any other <a href="https://www.google.com/search?q=free+css" target="_blank" className="text-pink-500 hover:underline">Free CSS collection</a> website.</p>
            </div>
            <div className="flex items-center justify-center w-12 md:w-24">
              <FaPersonBooth className="text-4xl text-pink-500" />
            </div>
            <div className="flex flex-col justify-center">
              <time className="text-lg text-gray-300">2021-07-15 Thursday</time>
            </div>
          </div>

          {/* Timeline Event 3 */}
          <div className="flex flex-row-reverse md:flex-row space-x-4">
            <div className="md:w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg text-white">
              <h3 className="text-2xl mb-4 text-pink-500">Certified Nurses</h3>
              <p className="text-lg">Phasellus eleifend, urna interdum congue viverra, arcu neque ultrices ligula, id pulvinar nisi nibh et lacus. Vivamus gravida, ipsum non euismod tincidunt, sapien elit fermentum mi, quis iaculis enim ligula at arcu.</p>
            </div>
            <div className="flex items-center justify-center w-12 md:w-24">
              <FaFileMedical className="text-4xl text-pink-500" />
            </div>
            <div className="flex flex-col justify-center">
              <time className="text-lg text-gray-300">2021-06-28 Monday</time>
            </div>
          </div>

          {/* Timeline Event 4 */}
          <div className="flex md:flex-row-reverse space-x-4">
            <div className="md:w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg text-white">
              <h3 className="text-2xl mb-4 text-pink-500">Covid-19 Hospitals</h3>
              <p className="text-lg">Fusce vestibulum euismod nulla sed ultrices. Praesent rutrum nulla vel sapien euismod, quis tempus dui placerat.</p>
              <p className="text-lg">Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas faucibus mollis interdum. Donec ullamcorper nulla non metus auctor fringilla</p>
            </div>
            <div className="flex items-center justify-center w-12 md:w-24">
              <BiGlobe className="text-4xl text-pink-500" />
            </div>
            <div className="flex flex-col justify-center">
              <time className="text-lg text-gray-300">2021-05-30 Sunday</time>
            </div>
          </div>

          {/* Timeline Event 5 */}
          <div className="flex flex-row-reverse md:flex-row space-x-4">
            <div className="md:w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg text-white">
              <h3 className="text-2xl mb-4 text-pink-500">Freelance Nursing</h3>
              <p className="text-lg">If you need a working contact form that submits email to your inbox, please <a rel="nofollow" href="https://templatemo.com/contact" target="_parent" className="text-pink-500 hover:underline">visit our contact page</a> for more information.</p>
            </div>
            <div className="flex items-center justify-center w-12 md:w-24">
              <FaPersonBooth className="text-4xl text-pink-500" />
            </div>
            <div className="flex flex-col justify-center">
              <time className="text-lg text-gray-300">2021-05-18 Tuesday</time>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Timeline;
