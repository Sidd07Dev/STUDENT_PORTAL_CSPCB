import { useState } from 'react';
import { Home, Users, GraduationCap, Briefcase, ClipboardList, Image, LogOut, Settings, User, Menu } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#001F3F] text-[#F4F4F4] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              
            </div>
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {/* Dashboard */}
                <a
                  href="/"
                  className="flex items-center text-[#F4F4F4] hover:bg-[#00A8FF] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <Home className="mr-2 h-5 w-5" /> Dashboard
                </a>
                {/* Students */}
                <a
                  href="/students"
                  className="flex items-center text-[#F4F4F4] hover:bg-[#00A8FF] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <Users className="mr-2 h-5 w-5" /> Students
                </a>
                {/* Alumni */}
                <a
                  href="/alumni"
                  className="flex items-center text-[#F4F4F4] hover:bg-[#00A8FF] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <GraduationCap className="mr-2 h-5 w-5" /> Alumni
                </a>
                {/* Staff */}
                <a
                  href="/staff"
                  className="flex items-center text-[#F4F4F4] hover:bg-[#00A8FF] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <Briefcase className="mr-2 h-5 w-5" /> Staff
                </a>
                {/* Notice */}
                <a
                  href="/notice"
                  className="flex items-center text-[#F4F4F4] hover:bg-[#00A8FF] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <ClipboardList className="mr-2 h-5 w-5" /> Notice
                </a>
                {/* Gallery */}
                <a
                  href="/gallery"
                  className="flex items-center text-[#F4F4F4] hover:bg-[#00A8FF] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <Image className="mr-2 h-5 w-5" /> Gallery
                </a>
                {/* Profile */}
                <a
                  href="/profile"
                  className="flex items-center text-[#F4F4F4] hover:bg-[#00A8FF] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <User className="mr-2 h-5 w-5" /> Profile
                </a>
                {/* Settings */}
                <a
                  href="/settings"
                  className="flex items-center text-[#F4F4F4] hover:bg-[#00A8FF] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <Settings className="mr-2 h-5 w-5" /> Settings
                </a>
                <a
                  href="#"
                  className="flex items-center text-[#F4F4F4] hover:bg-[#00A8FF] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <Settings className="mr-2 h-5 w-5" /> Attendance
                </a>
              </div>
            </div>
          </div>
          {/* Hamburger Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="text-[#F4F4F4] hover:bg-[#00A8FF] focus:outline-none focus:bg-[#00A8FF] px-3 py-2 rounded-md"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="/dashboard"
            className="flex items-center text-[#F4F4F4] hover:bg-[#00A8FF] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            <Home className="mr-2 h-5 w-5" /> Dashboard
          </a>
          <a
            href="/students"
            className="flex items-center text-[#F4F4F4] hover:bg-[#00A8FF] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            <Users className="mr-2 h-5 w-5" /> Students
          </a>
          <a
            href="/alumni"
            className="flex items-center text-[#F4F4F4] hover:bg-[#00A8FF] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            <GraduationCap className="mr-2 h-5 w-5" /> Alumni
          </a>
          <a
            href="/staff"
            className="flex items-center text-[#F4F4F4] hover:bg-[#00A8FF] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            <Briefcase className="mr-2 h-5 w-5" /> Staff
          </a>
          <a
            href="/notice"
            className="flex items-center text-[#F4F4F4] hover:bg-[#00A8FF] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            <ClipboardList className="mr-2 h-5 w-5" /> Notice
          </a>
          <a
            href="/gallery"
            className="flex items-center text-[#F4F4F4] hover:bg-[#00A8FF] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            <Image className="mr-2 h-5 w-5" /> Gallery
          </a>
          <a
            href="/profile"
            className="flex items-center text-[#F4F4F4] hover:bg-[#00A8FF] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            <User className="mr-2 h-5 w-5" /> Profile
          </a>
          <a
            href="/settings"
            className="flex items-center text-[#F4F4F4] hover:bg-[#00A8FF] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            <Settings className="mr-2 h-5 w-5" /> Settings
          </a>
          <a
                  href="#"
                  className="flex items-center text-[#F4F4F4] hover:bg-[#00A8FF] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <Settings className="mr-2 h-5 w-5" /> Attendance
                </a>
        </div>
        {/* Logout button */}
        <div className="px-2 pb-3">
          <button className="flex items-center text-[#F4F4F4] hover:bg-[#00A8FF] hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            <LogOut className="mr-2 h-5 w-5" /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
