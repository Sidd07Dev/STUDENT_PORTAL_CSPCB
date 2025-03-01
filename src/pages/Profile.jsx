'use client';

import React, { useState, useEffect } from 'react';
import { FaEdit, FaKey } from 'react-icons/fa';
import EditProfileModal from '../components/EditProfileModal';
import ChangePasswordModal from '../components/ChangePasswordModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import { domain } from '../backendtokens';
import styled, { keyframes } from 'styled-components';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const id = Cookies.get('id');
      const accessToken = Cookies.get('accessToken');
      try {
        const response = await axios.get(`${domain}v1/students/getCurrentStudents/${id}/${accessToken}`);
        const { data } = response;
        if (data.statusCode === 200) {
          setUserData(data.data);
          toast.success('User data accessed successfully');
        } else {
          setError('User not found');
          toast.error('User not found. Please login.');
        }
      } catch (error) {
        setError('Failed to fetch user details');
        toast.error(`Failed to fetch user details: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  const handleEditClick = () => setShowEditModal(true);
  const handlePasswordClick = () => setShowPasswordModal(true);

  if (loading) {
    return (
      <ConsoleSection>
        <BinaryBackground />
        <LoadingContainer>
          <LoadingOrb />
          <LoadingText>Accessing...</LoadingText>
        </LoadingContainer>
      </ConsoleSection>
    );
  }

  if (error) {
    return (
      <ConsoleSection>
        <BinaryBackground />
        <ErrorPanel>
          <ErrorTitle>Access Denied</ErrorTitle>
          <ErrorMessage>{error}</ErrorMessage>
        </ErrorPanel>
      </ConsoleSection>
    );
  }

  return (
    <ConsoleSection>
      <BinaryBackground />
      <ConsoleContainer>
        <ProfileCard>
          <AvatarContainer>
            <Avatar src={userData.ProfileImage} alt={userData.Name} />
          </AvatarContainer>
          <ProfileContent>
            <UserName>{userData.Name}</UserName>
            <DataList>
              <DataItem><strong>Roll No:</strong> {userData.CollegeRollNo}</DataItem>
              <DataItem><strong>Email:</strong> {userData.Email}</DataItem>
              <DataItem><strong>Gender:</strong> {userData.Gender}</DataItem>
              <DataItem><strong>DOA:</strong> {new Date(userData.DOA).toLocaleDateString()}</DataItem>
            </DataList>
            <ButtonContainer>
              <ActionButton onClick={handleEditClick} color="#00ffcc">
                <FaEdit className="mr-2" /> Edit Profile
              </ActionButton>
              <ActionButton onClick={handlePasswordClick} color="#ff007a">
                <FaKey className="mr-2" /> Change Password
              </ActionButton>
            </ButtonContainer>
          </ProfileContent>
        </ProfileCard>
        {showEditModal && <EditProfileModal user={userData} onClose={() => setShowEditModal(false)} />}
        {showPasswordModal && <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />}
      </ConsoleContainer>
      <ToastContainer />
    </ConsoleSection>
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

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const binaryFlow = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const scanLine = keyframes`
  0% { top: -100%; }
  100% { top: 100%; }
`;

// Styled Components
const ConsoleSection = styled.div`
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e1e2f 0%, #2a2a4a 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 1rem;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 6rem 2rem;
  }
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

const ConsoleContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const LoadingOrb = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 4px solid #00ffcc;
  border-top-color: #ff007a;
  animation: ${spin} 1s linear infinite, ${glow} 1.5s infinite;
`;

const LoadingText = styled.p`
  font-family: "Courier New", Courier, monospace;
  font-size: 1.5rem;
  color: #00ffcc;
  text-shadow: 0 0 5px rgba(0, 255, 204, 0.5);
  animation: ${pulse} 2s infinite;
`;

const ErrorPanel = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid #ff007a;
  border-radius: 15px;
  padding: 2rem;
  max-width: 480px;
  text-align: center;
  box-shadow: 0 0 15px rgba(255, 0, 122, 0.3);
  backdrop-filter: blur(10px);
  animation: ${fadeIn} 1s ease-out;
`;

const ErrorTitle = styled.h2`
  font-family: "Courier New", Courier, monospace;
  font-size: 2rem;
  font-weight: 600;
  color: #ff007a;
  text-shadow: 0 0 5px rgba(255, 0, 122, 0.5);
  animation: ${glitch} 2s infinite;
`;

const ErrorMessage = styled.p`
  font-family: "Courier New", Courier, monospace;
  font-size: 1rem;
  color: #e0e0e0;
  margin-top: 1rem;
`;

const ProfileCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid #00ffcc;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 0 15px rgba(0, 255, 204, 0.3);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  animation: ${fadeIn} 1s ease-out;
  position: relative;
  overflow: hidden;

  &:hover {
    box-shadow: 0 0 25px rgba(0, 255, 204, 0.7);
    transform: translateY(-5px) rotateX(5deg) rotateY(5deg) perspective(1000px);
  }

  &:after {
    content: '';
    position: absolute;
    top: -100%;
    left: 0;
    width: 100%;
    height: 2px;
    background: rgba(0, 255, 204, 0.5);
    animation: ${scanLine} 3s infinite linear;
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #ff007a;
  box-shadow: 0 0 15px rgba(255, 0, 122, 0.5);
  transition: all 0.3s ease;

  ${ProfileCard}:hover & {
    box-shadow: 0 0 25px rgba(255, 0, 122, 0.7);
  }
`;

const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: center;
`;

const UserName = styled.h2`
  font-family: "Courier New", Courier, monospace;
  font-size: 2rem;
  font-weight: 600;
  color: #e0e0e0;
  text-shadow: 0 0 5px rgba(0, 255, 204, 0.5);
  animation: ${glitch} 2s infinite;
`;

const DataList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DataItem = styled.p`
  font-family: "Courier New", Courier, monospace;
  font-size: 0.875rem;
  color: #b0b0e0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const ActionButton = styled.button`
  background: ${({ color }) => `linear-gradient(to right, ${color}, #1e1e2f)`};
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  font-family: "Courier New", Courier, monospace;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px ${({ color }) => `${color}80`};
  animation: ${pulse} 2s infinite;

  &:hover {
    box-shadow: 0 0 20px ${({ color }) => `${color}CC`};
    transform: scale(1.05);
    animation: none;
  }
`;

export default Profile;