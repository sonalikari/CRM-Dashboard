import { FiBell, FiUser } from "react-icons/fi";

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-end items-center sticky top-0 w-full z-[50]">
      {/* Notification & Profile */}
      <div className="flex items-center space-x-4">
        <button className="relative text-gray-600 hover:text-blue-600">
          <FiBell size={24} />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            3
          </span>
        </button>

        <button className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition">
          <FiUser size={20} />
          <span className="hidden sm:block">Admin</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
