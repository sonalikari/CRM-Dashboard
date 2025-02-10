import { useState } from "react";
import { Link } from "react-router-dom";
import { FiUsers, FiHome, FiMenu, FiX } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-[60] bg-blue-600 text-white p-3 rounded-md shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-72 p-5 transform transition-transform duration-300 shadow-lg z-[50] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative`}
      >
        {/* Sidebar Heading */}
        <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
          <MdDashboard size={28} className="text-blue-400" />
          <span>CRM Dashboard</span>
        </h2>
        {/* User Profile Section */}
        <div className="flex flex-col items-center my-6 border-b border-gray-700 pb-4">
          <img
            src="https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png"
            alt="User Avatar"
            className="w-20 h-20 rounded-full border-2 border-blue-400"
          />
          <h3 className="text-lg font-semibold mt-2">Sonali Kumari</h3>
          <p className="text-sm text-gray-400">sonali211103@gmail.com</p>
        </div>

        {/* Sidebar Navigation */}
        <ul className="space-y-4">
          <li>
            <Link
              to="/leads"
              className="flex items-center space-x-3 text-lg p-3 hover:bg-blue-600 rounded-md transition"
            >
              <FiUsers size={22} />
              <span>Leads</span>
            </Link>
          </li>
          <li>
            <Link
              to="/properties"
              className="flex items-center space-x-3 text-lg p-3 hover:bg-blue-600 rounded-md transition"
            >
              <FiHome size={22} />
              <span>Properties</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-[40] lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
