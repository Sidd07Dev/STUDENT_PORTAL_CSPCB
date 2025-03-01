'use client';

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChevronDown, ChevronUp, CheckCircle, Download, FileText } from 'lucide-react';
import axios from 'axios';
import { domain } from '../backendtokens';
import styled, { keyframes } from 'styled-components';

const QuestionPapers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const url = `${domain}v1/questions/get`;

  const fetchPapers = () => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setData(response.data.data);
        toast.success('Archive accessed successfully', { icon: <CheckCircle size={20} className="text-green-500" /> });
        setLoading(false);
      })
      .catch(() => {
        toast.error('Error accessing archive');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setSelectedSemester(null);
    setIsDropdownOpen(false);
    toast.success(`Year ${year} selected`, { icon: <CheckCircle size={20} className="text-green-500" /> });
  };

  const handleSemesterChange = (semester) => {
    setSelectedSemester(semester);
    toast.success(`Semester ${semester} selected`, { icon: <CheckCircle size={20} className="text-green-500" /> });
  };

  const handleDownload = async (filePath, paperName) => {
    try {
      if (filePath.startsWith('http://')) filePath = filePath.replace('http://', 'https://');
      toast.info(`Downloading: ${paperName}`, { icon: <Download size={20} className="text-blue-500" /> });

      const response = await fetch(filePath);
      if (!response.ok) throw new Error('Failed to download file');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = paperName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error('Error downloading file');
    }
  };

  const uniqueYears = [...new Set(data.map((paper) => paper.year))];
  const uniqueSemesters = selectedYear
    ? [...new Set(data.filter((paper) => paper.year === selectedYear).map((paper) => paper.semester))]
    : [];

  if (loading) {
    return (
      <TerminalSection>
        <BinaryBackground />
        <LoadingContainer>
          <LoadingOrb />
          <LoadingText>Accessing Archive...</LoadingText>
        </LoadingContainer>
      </TerminalSection>
    );
  }

  return (
    <TerminalSection>
      <BinaryBackground />
      <TerminalContainer>
        <Header>
          <Title>Question Paper Archive Terminal</Title>
          <Subtitle>Retrieve previous examination data.</Subtitle>
        </Header>

        {/* Year Selection Dropdown */}
        <DropdownPanel>
          <DropdownButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            {selectedYear ? `Year: ${selectedYear}` : 'Select Year'}
            {isDropdownOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </DropdownButton>
          {isDropdownOpen && (
            <DropdownList>
              {uniqueYears.map((year) => (
                <DropdownItem key={year} onClick={() => handleYearChange(year)}>
                  {year}
                </DropdownItem>
              ))}
            </DropdownList>
          )}
        </DropdownPanel>

        {/* Semester Selection */}
        {selectedYear && (
          <SemesterPanel>
            <SemesterTitle>Select Semester:</SemesterTitle>
            <SemesterGrid>
              {uniqueSemesters.map((semester) => (
                <SemesterButton
                  key={semester}
                  active={selectedSemester === semester}
                  onClick={() => handleSemesterChange(semester)}
                >
                  Semester {semester}
                </SemesterButton>
              ))}
            </SemesterGrid>
          </SemesterPanel>
        )}

        {/* Question Papers List */}
        {selectedSemester && (
          <PapersPanel>
            <PapersTitle>Available Papers:</PapersTitle>
            <PapersGrid>
              {data
                .filter((paper) => paper.year === selectedYear && paper.semester === selectedSemester)
                .map((paper, index) => (
                  <PaperCard key={index}>
                    <CardContent>
                      <PaperTitle>
                        <FileText className="mr-2 h-5 w-5" />
                        {paper.title}
                      </PaperTitle>
                      <DownloadButton onClick={() => handleDownload(paper.filePath, paper.title)}>
                        <Download size={20} />
                        Download
                      </DownloadButton>
                    </CardContent>
                  </PaperCard>
                ))}
            </PapersGrid>
          </PapersPanel>
        )}
      </TerminalContainer>
      <ToastContainer />
    </TerminalSection>
  );
};

// Animations
const glitch = keyframes`/* Same as previous */`;
const glow = keyframes`/* Same as previous */`;
const pulse = keyframes`/* Same as previous */`;
const fadeIn = keyframes`/* Same as previous */`;
const binaryFlow = keyframes`/* Same as previous */`;
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
const scanLine = keyframes`/* Same as previous */`;

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

const BinaryBackground = styled.div`/* Same as previous */`;

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

const Title = styled.h4`
  font-family: "Courier New", Courier, monospace;
  font-size: 2rem;
  font-weight: bold;
  color: #00ffcc;
  text-shadow: 0 0 10px rgba(0, 255, 204, 0.5);
  animation: ${glitch} 2s infinite;

  @media (min-width: 768px) {
    font-size: 2.5rem;
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

const DropdownPanel = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const DropdownButton = styled.button`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #00ffcc;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  font-family: "Courier New", Courier, monospace;
  font-size: 1rem;
  color: #e0e0e0;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 255, 204, 0.3);

  &:hover, &:focus {
    box-shadow: 0 0 20px rgba(0, 255, 204, 0.7);
    border-color: #ff007a;
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid #00ffcc;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  animation: ${fadeIn} 0.3s ease-out;
`;

const DropdownItem = styled.li`
  padding: 0.75rem 1.5rem;
  font-family: "Courier New", Courier, monospace;
  font-size: 1rem;
  color: #b0b0e0;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 204, 0.1);
    color: #00ffcc;
  }
`;

const SemesterPanel = styled.div`
  margin-bottom: 3rem;
`;

const SemesterTitle = styled.h3`
  font-family: "Courier New", Courier, monospace;
  font-size: 1.5rem;
  font-weight: 600;
  color: #ff007a;
  text-shadow: 0 0 5px rgba(255, 0, 122, 0.5);
  text-align: center;
  margin-bottom: 1.5rem;
`;

const SemesterGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

const SemesterButton = styled.button`
  background: ${({ active }) => (active ? '#ff007a' : 'rgba(255, 255, 255, 0.1)')};
  border: 2px solid #00ffcc;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-family: "Courier New", Courier, monospace;
  font-size: 1rem;
  color: ${({ active }) => (active ? '#ffffff' : '#e0e0e0')};
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 255, 204, 0.3);
  animation: ${pulse} 2s infinite;

  &:hover:not(:disabled) {
    background: #00ffcc;
    color: #1e1e2f;
    box-shadow: 0 0 20px rgba(0, 255, 204, 0.7);
    animation: none;
  }
`;

const PapersPanel = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid #00ffcc;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 0 15px rgba(0, 255, 204, 0.3);
  animation: ${fadeIn} 1s ease-out;
`;

const PapersTitle = styled.h3`
  font-family: "Courier New", Courier, monospace;
  font-size: 1.5rem;
  font-weight: 600;
  color: #ff007a;
  text-shadow: 0 0 5px rgba(255, 0, 122, 0.5);
  text-align: center;
  margin-bottom: 1.5rem;
`;

const PapersGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const PaperCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #ff007a;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 0 10px rgba(255, 0, 122, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    box-shadow: 0 0 20px rgba(255, 0, 122, 0.7);
    transform: translateY(-5px) rotateX(5deg) rotateY(5deg) perspective(1000px);
  }

  &:after {
    content: '';
    position: absolute;
    top: -100%;
    left: 0;
    width: 100%;
    height: 2px;
    background: rgba(255, 0, 122, 0.5);
    animation: ${scanLine} 3s infinite linear;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const PaperTitle = styled.h4`
  font-family: "Courier New", Courier, monospace;
  font-size: 1.25rem;
  font-weight: 600;
  color: #e0e0e0;
  display: flex;
  align-items: center;
  text-align: center;
`;

const DownloadButton = styled.button`
  background: linear-gradient(to right, #ff007a, #00ffcc);
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
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(255, 0, 122, 0.5);
  animation: ${pulse} 2s infinite;

  &:hover {
    box-shadow: 0 0 20px rgba(0, 255, 204, 0.7);
    transform: scale(1.05);
  }
`;

export default QuestionPapers;