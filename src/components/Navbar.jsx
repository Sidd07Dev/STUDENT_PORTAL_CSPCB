'use client';

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, User, GraduationCap, ClipboardList, LogOut, Menu, FileText } from 'lucide-react';
import styled, { keyframes } from 'styled-components';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: 'Dashboard', to: '/', icon: <Home className="mr-2 h-5 w-5" /> },
    { name: 'Courses', to: '/courses', icon: <ClipboardList className="mr-2 h-5 w-5" /> },
    { name: 'Results', to: '/results', icon: <ClipboardList className="mr-2 h-5 w-5" /> },
    { name: 'Questions', to: '/questions', icon: <FileText className="mr-2 h-5 w-5" /> },
    { name: 'Profile', to: '/profile', icon: <User className="mr-2 h-5 w-5" /> },
    { name: 'Attendance', to: '/attendance', icon: <User className="mr-2 h-5 w-5" /> },
  ];

  return (
    <NavHub>
      <BinaryBackground />
      <SignalLine />
      <NavContainer>
        <LogoContainer>
          <LogoImg
            src="https://res.cloudinary.com/codebysidd/image/upload/v1726199679/PrevQue/ikuol4bmcxnmxuvxf5jj.jpg"
            alt="Logo"
          />
        </LogoContainer>

        {/* Desktop Menu */}
        <DesktopMenu>
          {menuItems.map((item) => (
            <NavItem key={item.name}>
              <StyledNavLink
                to={item.to}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {item.icon}
                <span>{item.name}</span>
              </StyledNavLink>
            </NavItem>
          ))}
          <LogoutButton>
            <LogOut className="mr-2 h-5 w-5" /> Logout
          </LogoutButton>
        </DesktopMenu>

        {/* Mobile Menu Toggle */}
        <MobileToggle onClick={toggleMenu}>
          <Menu className="h-6 w-6" />
        </MobileToggle>

        {/* Mobile Menu */}
        <MobileMenu isOpen={isOpen}>
          <MobileMenuContent>
            {menuItems.map((item) => (
              <MobileNavItem key={item.name}>
                <StyledNavLink
                  to={item.to}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                  onClick={toggleMenu}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </StyledNavLink>
              </MobileNavItem>
            ))}
            <MobileLogoutButton onClick={toggleMenu}>
              <LogOut className="mr-2 h-5 w-5" /> Logout
            </MobileLogoutButton>
          </MobileMenuContent>
        </MobileMenu>
      </NavContainer>
    </NavHub>
  );
};

// Animations
const glitch = keyframes`
  0% { transform: translate(0); opacity: 1; }
  20% { transform: translate(-2px, 2px); opacity: 0.8; }
  40% { transform: translate(2px, -2px); opacity: 0.9; }
  60% { transform: translate(-2px, 0); opacity: 0.8; }
  80% { transform: translate(2px, 2px); opacity: 0.9; }
  100% { transform: translate(0); opacity: 1; }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(0, 255, 204, 0.5); }
  50% { box-shadow: 0 0 15px rgba(0, 255, 204, 0.8); }
  100% { box-shadow: 0 0 5px rgba(0, 255, 204, 0.5); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const binaryFlow = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const signalFlow = keyframes`
  0% { left: -100%; }
  100% { left: 100%; }
`;

const typing = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

// Styled Components
const NavHub = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(135deg, #1e1e2f 0%, #2a2a4a 100%);
  box-shadow: 0 0 15px rgba(0, 255, 204, 0.3);
  z-index: 1000;
`;

const BinaryBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;

  &::before {
    content: "0101 1010 0011 1100";
    position: absolute;
    top: -100%;
    left: 10%;
    font-family: "Courier New", Courier, monospace;
    font-size: 1rem;
    color: rgba(0, 255, 204, 0.2);
    animation: ${binaryFlow} 10s linear infinite;
  }

  &::after {
    content: "1100 0011 1010 0101";
    position: absolute;
    top: -100%;
    right: 10%;
    font-family: "Courier New", Courier, monospace;
    font-size: 1rem;
    color: rgba(255, 0, 122, 0.2);
    animation: ${binaryFlow} 12s linear infinite;
  }
`;

const SignalLine = styled.div`
  position: absolute;
  top: 0;
  left: -100%;
  width: 50px;
  height: 2px;
  background: linear-gradient(to right, transparent, #00ffcc, transparent);
  animation: ${signalFlow} 5s linear infinite;
`;

const NavContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;

  @media (min-width: 768px) {
    padding: 1rem 2rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  height: 40px;
  border-radius: 8px;
  border: 2px solid #00ffcc;
  box-shadow: 0 0 10px rgba(0, 255, 204, 0.5);
  animation: ${pulse} 2s infinite;

  @media (min-width: 768px) {
    height: 48px;
  }
`;

const DesktopMenu = styled.div`
  display: none;
  gap: 1rem;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const NavItem = styled.div`
  font-family: "Courier New", Courier, monospace;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #00ffcc;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: #e0e0e0;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 0 5px rgba(0, 255, 204, 0.3);
  overflow: hidden;
  white-space: nowrap;

  &.active {
    background: linear-gradient(to right, #ff007a, #00ffcc);
    color: #ffffff;
    box-shadow: 0 0 15px rgba(255, 0, 122, 0.7);
    animation: ${glitch} 2s infinite;
  }

  &:hover:not(.active) {
    background: rgba(0, 255, 204, 0.2);
    box-shadow: 0 0 15px rgba(0, 255, 204, 0.7);
  }

  span {
    display: inline-block;
    animation: ${typing} 1s steps(20) forwards;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #ff007a;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-family: "Courier New", Courier, monospace;
  font-size: 1rem;
  font-weight: 600;
  color: #e0e0e0;
  transition: all 0.3s ease;
  box-shadow: 0 0 5px rgba(255, 0, 122, 0.3);

  &:hover {
    background: rgba(255, 0, 122, 0.2);
    box-shadow: 0 0 15px rgba(255, 0, 122, 0.7);
  }
`;

const MobileToggle = styled.button`
  background: none;
  border: none;
  color: #00ffcc;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;

  @media (min-width: 768px) {
    display: none;
  }

  &:hover {
    color: #ff007a;
    box-shadow: 0 0 10px rgba(255, 0, 122, 0.5);
  }
`;

const MobileMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: rgba(30, 30, 47, 0.95);
  border-top: 2px solid #00ffcc;
  box-shadow: 0 0 15px rgba(0, 255, 204, 0.3);
  backdrop-filter: blur(10px);
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-100%)')};
  transition: transform 0.3s ease-in-out;
  z-index: 999;

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMenuContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MobileNavItem = styled.div`
  font-family: "Courier New", Courier, monospace;
`;

const MobileLogoutButton = styled.button`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #ff007a;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-family: "Courier New", Courier, monospace;
  font-size: 1rem;
  font-weight: 600;
  color: #e0e0e0;
  transition: all 0.3s ease;
  box-shadow: 0 0 5px rgba(255, 0, 122, 0.3);

  &:hover {
    background: rgba(255, 0, 122, 0.2);
    box-shadow: 0 0 15px rgba(255, 0, 122, 0.7);
  }
`;

export default Navbar;