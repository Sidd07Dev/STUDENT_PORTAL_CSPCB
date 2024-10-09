import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, GraduationCap, ClipboardList, LogOut, Menu } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    {
      name: 'Dashboard',
      to: '/',
      icon: <Home className="mr-2 h-5 w-5" />,
    },
    {
      name: 'Courses',
      to: '/courses',
      icon: <ClipboardList className="mr-2 h-5 w-5" />,
    },

  ];

  return (
    <nav className="bg-[#001F3F] text-[#F4F4F4] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="inline-flex items-center space-x-2">
                <span>
                  <img
                    src="https://res.cloudinary.com/codebysidd/image/upload/v1726199679/PrevQue/ikuol4bmcxnmxuvxf5jj.jpg"
                    alt=""
                    className="rounded-lg h-10"
                  />
                </span>
              </div>
            </div>
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center text-[#F4F4F4] hover:bg-[#00A8FF] hover:text-white px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-[#00A8FF] text-white' : ''}`
                    }
                  >
                    {item.icon}
                    {item.name}
                  </NavLink>
                ))}
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
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center text-[#F4F4F4] hover:bg-[#00A8FF] hover:text-white px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-[#00A8FF] text-white' : ''}`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
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
