import React from "react";
import { FaVideo, FaUsers, FaCalendarCheck } from "react-icons/fa";

const FeaturesSectionWebinar = () => {
  return (
    <>
      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#18181b]">
            Why Choose Our Webinars?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#7357FF] text-white rounded-full p-5 mb-4 text-4xl shadow-lg">
                <FaVideo />
              </div>
              <h3 className="font-semibold text-xl mb-2">HD Video & Audio</h3>
              <p className="text-gray-600">
                Deliver crystal-clear presentations and discussions with
                studio-quality streaming.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#a78bfa] text-white rounded-full p-5 mb-4 text-4xl shadow-lg">
                <FaUsers />
              </div>
              <h3 className="font-semibold text-xl mb-2">
                Unlimited Attendees
              </h3>
              <p className="text-gray-600">
                Scale your webinars to thousands without worrying about capacity
                or lag.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#18181b] text-white rounded-full p-5 mb-4 text-4xl shadow-lg">
                <FaCalendarCheck />
              </div>
              <h3 className="font-semibold text-xl mb-2">Easy Scheduling</h3>
              <p className="text-gray-600">
                Set up, schedule, and manage your webinars with just a few
                clicks.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesSectionWebinar;
