'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import styled, { keyframes } from 'styled-components';

// Weather Icon Mapping
const getWeatherIcon = (weatherCode) => {
  const icons = {
    0: '☀️', 1: '🌤️', 2: '🌥️', 3: '☁️', 45: '🌫️', 48: '🌫️', 51: '🌧️', 53: '🌧️',
    61: '🌧️', 63: '🌧️', 80: '🌧️', 81: '🌧️', 82: '🌧️', 95: '⛈️', 96: '⛈️', 99: '⛈️',
  };
  return icons[weatherCode] || '❓';
};

const Dashboard = ({ Data }) => {
  const { Name: name, ProfileImage: profileImage, Email: email, DOA, CollegeRollNo, Gender } = Data;

  // Weather State
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(null);

  // Attendance State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginTime, setLoginTime] = useState('');
  const [logoutTime, setLogoutTime] = useState('');
  const [userImage, setUserImage] = useState('');
  const [userImageOut, setUserImageOut] = useState('');
  const [userLocation, setUserLocation] = useState({ lat: '', long: '' });

  // Static Data for Stats
  const statsData = [
    { title: 'Total Attendance', value: 120, color: '#00ffcc', icon: '✓' },
    { title: 'Total Absent', value: 10, color: '#ff007a', icon: '✗' },
    { title: 'Total Conducted', value: 130, color: '#00ccff', icon: '📋' },
    { title: 'Remaining', value: 5, color: '#ffcc00', icon: '⏳' },
  ];

  // Weather Fetch
  useEffect(() => {
    const fetchWeather = async (latitude, longitude) => {
      try {
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        setWeather(response.data.current_weather);
        setWeatherLoading(false);
      } catch (error) {
        setWeatherError('Unable to fetch weather data.');
        setWeatherLoading(false);
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => fetchWeather(position.coords.latitude, position.coords.longitude),
          () => {
            setWeatherError('Unable to retrieve location.');
            setWeatherLoading(false);
          }
        );
      } else {
        setWeatherError('Geolocation not supported.');
        setWeatherLoading(false);
      }
    };

    getLocation();
  }, []);

  // Attendance Persistence
  useEffect(() => {
    const storedDate = localStorage.getItem('attendanceDate');
    const currentDate = dayjs().format('YYYY-MM-DD');

    if (storedDate !== currentDate) {
      localStorage.removeItem('loginTime');
      localStorage.removeItem('logoutTime');
      localStorage.removeItem('userImage');
      localStorage.removeItem('userImageOut');
      localStorage.removeItem('userLocation');
      localStorage.setItem('attendanceDate', currentDate);
    } else {
      setLoginTime(localStorage.getItem('loginTime') || '');
      setLogoutTime(localStorage.getItem('logoutTime') || '');
      setUserImage(localStorage.getItem('userImage') || '');
      setUserImageOut(localStorage.getItem('userImageOut') || '');
      const storedLocation = localStorage.getItem('userLocation');
      if (storedLocation) setUserLocation(JSON.parse(storedLocation));
      setIsLoggedIn(!!localStorage.getItem('loginTime'));
    }
  }, []);

  const captureImage = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      document.body.appendChild(video);
      video.play();

      await new Promise((res) => setTimeout(res, 1000));
      let faceDetected = false;
      while (!faceDetected) {
        faceDetected = await detectFace(video);
        await new Promise((res) => setTimeout(res, 500));
      }

      const canvas = document.createElement('canvas');
      canvas.width = 320;
      canvas.height = 240;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, 320, 240);
        stream.getTracks().forEach((track) => track.stop());
        video.remove();
        return canvas.toDataURL('image/png');
      }
      return null;
    } catch {
      return null;
    }
  };

  const detectFace = async (video) => {
    const canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 240;
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;

    ctx.drawImage(video, 0, 0, 320, 240);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let skinPixels = 0;
    let totalPixels = pixels.length / 4;

    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      if (r > 95 && g > 40 && g < 100 && b < 150 && Math.abs(r - g) > 15) skinPixels++;
    }
    return skinPixels / totalPixels > 0.05;
  };

  const getUserLocation = () =>
    new Promise((resolve) =>
      navigator.geolocation?.getCurrentPosition(
        ({ coords }) => resolve({ lat: coords.latitude, long: coords.longitude }),
        () => resolve(null)
      )
    );

  const handleLogin = async () => {
    const time = dayjs().format('HH:mm:ss');
    const image = await captureImage();
    const location = await getUserLocation();

    setIsLoggedIn(true);
    setLoginTime(time);
    setUserImage(image);
    setUserLocation(location);

    localStorage.setItem('loginTime', time);
    if (image) localStorage.setItem('userImage', image);
    if (location) localStorage.setItem('userLocation', JSON.stringify(location));
  };

  const handleLogout = async () => {
    const time = dayjs().format('HH:mm:ss');
    const image = await captureImage();
    const location = await getUserLocation();

    setIsLoggedIn(true);
    setLogoutTime(time);
    setUserImageOut(image);
    setUserLocation(location);

    localStorage.setItem('logoutTime', time);
    if (image) localStorage.setItem('userImageOut', image);
    if (location) localStorage.setItem('userLocation', JSON.stringify(location));
  };

  return (
    <CommandCenter>
      <BinaryBackground />
      <DashboardGrid>
        {/* Welcome Panel */}
        <Panel>
          <PanelTitle>Welcome, {name}!</PanelTitle>
          <ProfileCard>
            <ProfileImage src={profileImage} alt={`${name}'s profile`} />
            <ProfileText>Access granted to your command center.</ProfileText>
          </ProfileCard>
        </Panel>

        {/* User Details Panel */}
        <Panel>
          <PanelTitle>User Data</PanelTitle>
          <DataList>
            <DataItem><strong>Name:</strong> {name}</DataItem>
            <DataItem><strong>Email:</strong> {email}</DataItem>
            <DataItem><strong>Roll:</strong> {CollegeRollNo}</DataItem>
            <DataItem><strong>DOA:</strong> {new Date(DOA).toLocaleDateString()}</DataItem>
            <DataItem><strong>Gender:</strong> {Gender}</DataItem>
          </DataList>
        </Panel>

        {/* Attendance Panel */}
        <Panel>
          <PanelTitle>Temporal Interface</PanelTitle>
          <AttendanceCard>
            {!isLoggedIn ? (
              <ActionButton onClick={handleLogin} color="#00ffcc">Login</ActionButton>
            ) : (
              <>
                <DataText>Login: {loginTime || 'N/A'}</DataText>
                {!logoutTime ? (
                  <ActionButton onClick={handleLogout} color="#ff007a">Logout</ActionButton>
                ) : (
                  <DataText>Logout: {logoutTime}</DataText>
                )}
              </>
            )}
            {(userImage || userImageOut) && (
              <ImageContainer>
                {userImage && <CapturedImage src={userImage} alt="Login" label="Login" />}
                {userImageOut && <CapturedImage src={userImageOut} alt="Logout" label="Logout" />}
              </ImageContainer>
            )}
            {userLocation.lat && (
              <DataText>Location: {userLocation.lat}, {userLocation.long}</DataText>
            )}
          </AttendanceCard>
        </Panel>

        {/* Weather Panel */}
        <Panel>
          <PanelTitle>Climate Module</PanelTitle>
          <WeatherCard>
            {weatherLoading ? (
              <DataText>Loading...</DataText>
            ) : weatherError ? (
              <ErrorText>{weatherError}</ErrorText>
            ) : weather ? (
              <>
                <WeatherIcon>{getWeatherIcon(weather.weathercode)}</WeatherIcon>
                <DataText>Temp: {weather.temperature}°C</DataText>
                <DataText>Wind: {weather.windspeed} km/h</DataText>
              </>
            ) : (
              <ErrorText>No data available.</ErrorText>
            )}
          </WeatherCard>
        </Panel>

        {/* Stats Panel */}
        <Panel>
          <PanelTitle>System Metrics</PanelTitle>
          <StatsGrid>
            {statsData.map((item, index) => (
              <StatNode key={index} color={item.color}>
                <StatIcon>{item.icon}</StatIcon>
                <StatTitle>{item.title}</StatTitle>
                <StatValue>{item.value}</StatValue>
              </StatNode>
            ))}
          </StatsGrid>
        </Panel>

        {/* Quote Panel */}
        <Panel>
          <PanelTitle>Core Directive</PanelTitle>
          <QuoteCard>
            <QuoteText>
              "The future is coded by those who dare to innovate."
            </QuoteText>
            <QuoteAuthor>- Tech Visionary</QuoteAuthor>
          </QuoteCard>
        </Panel>
      </DashboardGrid>
    </CommandCenter>
  );
};

// Animations
const glitch = keyframes`/* Same as previous */`;
const glow = keyframes`/* Same as previous */`;
const pulse = keyframes`/* Same as previous */`;
const fadeIn = keyframes`/* Same as previous */`;
const binaryFlow = keyframes`/* Same as previous */`;
const scanLine = keyframes`/* Same as previous NoticeCard */`;

// Styled Components
const CommandCenter = styled.div`
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

const DashboardGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Panel = styled.div`
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
    transform: translateY(-5px);
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

const PanelTitle = styled.h3`
  font-family: "Courier New", Courier, monospace;
  font-size: 1.5rem;
  font-weight: 600;
  color: #ff007a;
  text-shadow: 0 0 5px rgba(255, 0, 122, 0.5);
  text-align: center;
  margin-bottom: 1.5rem;
  animation: ${glitch} 2s infinite;
`;

const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #00ffcc;
  box-shadow: 0 0 10px rgba(0, 255, 204, 0.5);
`;

const ProfileText = styled.p`
  font-family: "Courier New", Courier, monospace;
  font-size: 0.875rem;
  color: #e0e0e0;
  text-align: center;
`;

const DataList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DataItem = styled.div`
  font-family: "Courier New", Courier, monospace;
  font-size: 0.875rem;
  color: #b0b0e0;
`;

const AttendanceCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
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
    animation: ${glow} 1.5s infinite;
  }
`;

const DataText = styled.p`
  font-family: "Courier New", Courier, monospace;
  font-size: 0.875rem;
  color: #e0e0e0;
`;

const ImageContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
`;

const CapturedImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  border: 2px solid #00ffcc;
  box-shadow: 0 0 10px rgba(0, 255, 204, 0.5);

  &:before {
    content: "${({ label }) => label}";
    position: absolute;
    top: -1.5rem;
    left: 50%;
    transform: translateX(-50%);
    font-family: "Courier New", Courier, monospace;
    font-size: 0.75rem;
    color: #b0b0e0;
  }
`;

const WeatherCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const WeatherIcon = styled.div`
  font-size: 3rem;
  animation: ${pulse} 2s infinite;
`;

const ErrorText = styled.p`
  font-family: "Courier New", Courier, monospace;
  font-size: 0.875rem;
  color: #ff007a;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const StatNode = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid ${({ color }) => color};
  border-radius: 10px;
  padding: 1rem;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 0 15px ${({ color }) => `${color}80`};
    transform: scale(1.05);
  }
`;

const StatIcon = styled.div`
  font-size: 1.5rem;
  color: ${({ color }) => color};
  animation: ${pulse} 2s infinite;
`;

const StatTitle = styled.h4`
  font-family: "Courier New", Courier, monospace;
  font-size: 0.75rem;
  color: #e0e0e0;
  text-align: center;
`;

const StatValue = styled.div`
  font-family: "Courier New", Courier, monospace;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ color }) => color};
`;

const QuoteCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const QuoteText = styled.p`
  font-family: "Courier New", Courier, monospace;
  font-size: 1rem;
  color: #e0e0e0;
  font-style: italic;
  text-align: center;
`;

const QuoteAuthor = styled.p`
  font-family: "Courier New", Courier, monospace;
  font-size: 0.75rem;
  color: #b0b0e0;
  text-align: right;
`;

export default Dashboard;