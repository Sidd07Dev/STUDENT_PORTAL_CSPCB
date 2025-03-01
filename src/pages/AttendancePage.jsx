'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { domain } from '../backendtokens'; // Adjust path as needed
import styled, { keyframes } from 'styled-components';

const AttendancePage = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulated API endpoint; replace with your actual endpoint
  const fetchAttendance = async () => {
    try {
      setLoading(true);
    //   const response = await axios.get(`${domain}v1/attendance/getAll`); // Adjust endpoint
    //   setAttendanceData(response.data.data); // Assuming data structure: [{ date, inTime, outTime, status }]
    const staticData = [
        { date: "2023-10-01", inTime: "08:30", outTime: "17:00", status: "Present" },
        { date: "2023-10-01", inTime: "08:30", outTime: "17:00", status: "Present" },
        { date: "2023-10-01", inTime: "08:30", outTime: "17:00", status: "Present" },
  { date: "2023-10-01", inTime: "08:30", outTime: "17:00", status: "Present" },
  { date: "2023-10-02", inTime: null, outTime: null, status: "Absent" },
];
setAttendanceData(staticData);
      toast.success('Attendance data retrieved successfully');
    } catch (err) {
      setError('Failed to fetch attendance data');
      toast.error('Error fetching attendance data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  if (loading) {
    return (
      <TerminalSection>
        <BinaryBackground />
        <LoadingContainer>
          <LoadingOrb />
          <LoadingText>Accessing Attendance Records...</LoadingText>
        </LoadingContainer>
      </TerminalSection>
    );
  }

  if (error) {
    return (
      <TerminalSection>
        <BinaryBackground />
        <ErrorPanel>
          <ErrorTitle>Access Denied</ErrorTitle>
          <ErrorMessage>{error}</ErrorMessage>
        </ErrorPanel>
      </TerminalSection>
    );
  }

  return (
    <TerminalSection>
      <BinaryBackground />
      <TerminalContainer>
        <Header>
          <Title>Attendance Monitoring Terminal</Title>
          <Subtitle>Daily attendance records overview.</Subtitle>
        </Header>
        <AttendancePanel>
          <AttendanceTable>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>In Time</TableHead>
                <TableHead>Out Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceData.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                  <TableCell>{record.inTime || 'N/A'}</TableCell>
                  <TableCell>{record.outTime || 'N/A'}</TableCell>
                  <StatusCell status={record.status}>
                    <StatusIndicator status={record.status} />
                    {record.status}
                  </StatusCell>
                </TableRow>
              ))}
            </TableBody>
          </AttendanceTable>
        </AttendancePanel>
      </TerminalContainer>
    </TerminalSection>
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
const TerminalSection = styled.div`
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e1e2f 0%, #2a2a4a 100%);
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

const TerminalContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h2`
  font-family: "Courier New", Courier, monospace;
  font-size: 2.5rem;
  font-weight: bold;
  color: #00ffcc;
  text-shadow: 0 0 10px rgba(0, 255, 204, 0.5);
  animation: ${glitch} 2s infinite;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.p`
  font-family: "Courier New", Courier, monospace;
  font-size: 1rem;
  color: #b0b0e0;
  margin-top: 1rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  margin: 0 auto;
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

const AttendancePanel = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid #00ffcc;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 0 15px rgba(0, 255, 204, 0.3);
  backdrop-filter: blur(10px);
  animation: ${fadeIn} 1s ease-out;
`;

const AttendanceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background: rgba(0, 255, 204, 0.1);
  border-bottom: 2px solid #ff007a;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background: rgba(0, 255, 204, 0.1);
    box-shadow: 0 0 10px rgba(0, 255, 204, 0.5);
    transform: translateY(-2px);
  }

  &:after {
    content: '';
    position: absolute;
    top: -100%;
    left: 0;
    width: 100%;
    height: 1px;
    background: rgba(255, 0, 122, 0.3);
    animation: ${scanLine} 4s infinite linear;
  }
`;

const TableHead = styled.th`
  font-family: "Courier New", Courier, monospace;
  font-size: 1rem;
  font-weight: 600;
  color: #e0e0e0;
  padding: 1rem;
  text-align: left;
`;

const TableCell = styled.td`
  font-family: "Courier New", Courier, monospace;
  font-size: 0.875rem;
  color: #b0b0e0;
  padding: 1rem;
  border-bottom: 1px solid rgba(0, 255, 204, 0.2);
`;

const StatusCell = styled(TableCell)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatusIndicator = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ status }) => (status === 'Present' ? '#00ffcc' : '#ff007a')};
  box-shadow: 0 0 5px ${({ status }) => (status === 'Present' ? 'rgba(0, 255, 204, 0.5)' : 'rgba(255, 0, 122, 0.5)')};
  animation: ${pulse} 2s infinite;
`;

export default AttendancePage;