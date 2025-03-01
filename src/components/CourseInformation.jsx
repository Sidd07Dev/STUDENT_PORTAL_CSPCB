'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { Book, User, FileText } from 'lucide-react';
import styled, { keyframes } from 'styled-components';

const CourseInformation = ({ courses }) => {
  if (!courses || courses.length === 0) {
    return (
      <EmptyPanel>
        <BinaryBackground />
        <EmptyTitle>Course Data Terminal</EmptyTitle>
        <EmptyMessage>No course data available in the repository.</EmptyMessage>
      </EmptyPanel>
    );
  }

  // Grouping courses by semester
  const groupedCourses = courses.reduce((acc, course) => {
    const semester = course.semester || 'Unspecified';
    if (!acc[semester]) acc[semester] = [];
    acc[semester].push(course);
    return acc;
  }, {});

  return (
    <TerminalSection>
      <BinaryBackground />
      <TerminalContainer>
        <Header>
          <Title>Course Data Terminal</Title>
          <Subtitle>Access your academic modules and resources.</Subtitle>
        </Header>
        <SemesterGrid>
          {Object.keys(groupedCourses).map((semester) => (
            <SemesterPanel key={semester}>
              <SemesterTitle>{semester}</SemesterTitle>
              <CourseList>
                {groupedCourses[semester].map((course, index) => (
                  <CourseCard key={index}>
                    <CardImage src={course.instructorImage} alt={course.instructor} />
                    <CardContent>
                      <CourseTitle>
                        <Book className="mr-2 h-5 w-5" />
                        {course.title}
                      </CourseTitle>
                      <CourseDetail>
                        <User className="mr-2 h-4 w-4" />
                        {course.instructor}
                      </CourseDetail>
                      <CourseDetail><strong>Credits:</strong> {course.credits || 'N/A'}</CourseDetail>
                      {course.syllabus && (
                        <SyllabusLink href={course.syllabus} download>
                          <FileText className="mr-2 h-4 w-4" />
                          Syllabus
                        </SyllabusLink>
                      )}
                    </CardContent>
                  </CourseCard>
                ))}
              </CourseList>
            </SemesterPanel>
          ))}
        </SemesterGrid>
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

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const SemesterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SemesterPanel = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid #00ffcc;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 0 15px rgba(0, 255, 204, 0.3);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  animation: ${fadeIn} 1s ease-out;

  &:hover {
    box-shadow: 0 0 25px rgba(0, 255, 204, 0.7);
  }
`;

const SemesterTitle = styled.h3`
  font-family: "Courier New", Courier, monospace;
  font-size: 1.5rem;
  font-weight: 600;
  color: #ff007a;
  text-shadow: 0 0 5px rgba(255, 0, 122, 0.5);
  text-align: center;
  margin-bottom: 1.5rem;
  animation: ${glitch} 2s infinite;
`;

const CourseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CourseCard = styled.div`
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

const CardImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #00ffcc;
  box-shadow: 0 0 10px rgba(0, 255, 204, 0.5);
  margin: 0 auto 1rem;
  display: block;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CourseTitle = styled.h4`
  font-family: "Courier New", Courier, monospace;
  font-size: 1.25rem;
  font-weight: 600;
  color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CourseDetail = styled.p`
  font-family: "Courier New", Courier, monospace;
  font-size: 0.875rem;
  color: #b0b0e0;
  display: flex;
  align-items: center;
`;

const SyllabusLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, #ff007a, #00ffcc);
  color: #ffffff;
  padding: 0.5rem 1rem;
  font-family: "Courier New", Courier, monospace;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(255, 0, 122, 0.5);
  animation: ${pulse} 2s infinite;

  &:hover {
    box-shadow: 0 0 20px rgba(0, 255, 204, 0.7);
    transform: scale(1.05);
  }
`;

const EmptyPanel = styled.div`
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e1e2f 0%, #2a2a4a 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const EmptyTitle = styled.h2`
  font-family: "Courier New", Courier, monospace;
  font-size: 2rem;
  font-weight: 600;
  color: #00ffcc;
  text-shadow: 0 0 10px rgba(0, 255, 204, 0.5);
  animation: ${glitch} 2s infinite;
`;

const EmptyMessage = styled.p`
  font-family: "Courier New", Courier, monospace;
  font-size: 1rem;
  color: #b0b0e0;
  margin-top: 1rem;
`;

CourseInformation.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      instructor: PropTypes.string.isRequired,
      syllabus: PropTypes.string,
      instructorImage: PropTypes.string,
      semester: PropTypes.string,
      duration: PropTypes.string,
      credits: PropTypes.string,
    })
  ).isRequired,
};

export default CourseInformation;