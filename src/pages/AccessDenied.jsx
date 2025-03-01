'use client';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../features/auth/authSlice';
import { domain } from '../backendtokens';
import Dashboard from '../components/Dashboard';
import styled, { keyframes } from 'styled-components';

const AccessDenied = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const getIdAndTokenFromUrl = () => {
    const currentUrl = window.location.href;
    const urlSegments = currentUrl.split('/');
    const id = urlSegments[urlSegments.length - 2];
    const accessToken = urlSegments[urlSegments.length - 1];
    const isValidAccessToken = accessToken && accessToken.split('.').length === 3;
    return id && isValidAccessToken ? { id, accessToken } : null;
  };

  const tokens = getIdAndTokenFromUrl();
  if (tokens) {
    Cookies.set('id', tokens.id);
    Cookies.set('accessToken', tokens.accessToken);
  }

  useEffect(() => {
    const fetchUserDetails = async () => {
      const id = Cookies.get('id');
      const accessToken = Cookies.get('accessToken');

      try {
        const response = await axios.get(`${domain}v1/students/getCurrentStudents/${id}/${accessToken}`);
        const { data } = response;

        if (data.statusCode === 200) {
          dispatch(setUser(data.data));
        } else {
          setError("User not found");
          toast.error("User not found. Please login.");
        }
      } catch (error) {
        setError("Failed to fetch user details");
        toast.error("Failed to fetch user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [dispatch, navigate]);

  if (loading) {
    return (
      <TerminalSection>
        <BinaryBackground />
        <LoadingContainer>
          <LoadingOrb />
          <LoadingText>Accessing...</LoadingText>
        </LoadingContainer>
      </TerminalSection>
    );
  }

  if (error || !user) {
    return (
      <TerminalSection>
        <BinaryBackground />
        <ErrorPanel>
          <ErrorTitle>Access Denied</ErrorTitle>
          <ErrorMessage>
            {error || "Authentication required. Please log in to proceed."}
          </ErrorMessage>
          <ButtonContainer>
            <ActionButton onClick={() => navigate('/login')} color="#00ffcc">
              Login
            </ActionButton>
            <ActionButton onClick={() => navigate('/register')} color="#ff007a">
              Register
            </ActionButton>
          </ButtonContainer>
        </ErrorPanel>
      </TerminalSection>
    );
  }

  if (user.Status === 0) {
    return (
      <TerminalSection>
        <BinaryBackground />
        <PendingPanel>
          <PendingTitle>Awaiting Clearance</PendingTitle>
          <PendingMessage>
            {user.Name}, your access is under review. Awaiting admin authorization.
          </PendingMessage>
          <ActionButton
            onClick={() => console.log('Contact Support clicked')}
            color="#ffcc00"
          >
            Contact Support
          </ActionButton>
        </PendingPanel>
      </TerminalSection>
    );
  }

  return (
    <DashboardContainer>
      <BinaryBackground />
      <Dashboard Data={user} />
    </DashboardContainer>
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

// Styled Components
const TerminalSection = styled.div`
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e1e2f 0%, #2a2a4a 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
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

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  animation: ${fadeIn} 1s ease-out;
  z-index: 1;
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
  z-index: 1;

  &:hover {
    box-shadow: 0 0 25px rgba(255, 0, 122, 0.7);
  }
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
  margin: 1rem 0 2rem;
`;

const PendingPanel = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid #ffcc00;
  border-radius: 15px;
  padding: 2rem;
  max-width: 480px;
  text-align: center;
  box-shadow: 0 0 15px rgba(255, 204, 0, 0.3);
  backdrop-filter: blur(10px);
  animation: ${fadeIn} 1s ease-out;
  z-index: 1;

  &:hover {
    box-shadow: 0 0 25px rgba(255, 204, 0, 0.7);
  }
`;

const PendingTitle = styled.h2`
  font-family: "Courier New", Courier, monospace;
  font-size: 2rem;
  font-weight: 600;
  color: #ffcc00;
  text-shadow: 0 0 5px rgba(255, 204, 0, 0.5);
  animation: ${pulse} 2s infinite;
`;

const PendingMessage = styled.p`
  font-family: "Courier New", Courier, monospace;
  font-size: 1rem;
  color: #e0e0e0;
  margin: 1rem 0 2rem;
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
  padding: 0.75rem 2rem;
  font-family: "Courier New", Courier, monospace;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px ${({ color }) => `${color}80`};

  &:hover {
    box-shadow: 0 0 20px ${({ color }) => `${color}CC`};
    transform: scale(1.05);
    animation: ${glow} 1.5s infinite;
  }
`;

const DashboardContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e1e2f 0%, #2a2a4a 100%);
  overflow: hidden;
`;

export default AccessDenied;