import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Function to map weather codes to icons
const getWeatherIcon = (weatherCode) => {
  const icons = {
    0: '☀️', // Clear sky
    1: '🌤️', // Mainly clear
    2: '🌥️', // Partly cloudy
    3: '☁️', // Overcast
    45: '🌫️', // Fog
    48: '🌫️', // Fog
    51: '🌧️', // Drizzle
    53: '🌧️', // Drizzle
    61: '🌧️', // Rain
    63: '🌧️', // Rain
    80: '🌧️', // Showers
    81: '🌧️', // Showers
    82: '🌧️', // Heavy showers
    95: '⛈️', // Thunderstorms
    96: '⛈️', // Thunderstorms
    99: '⛈️', // Thunderstorms
  };

  return icons[weatherCode] || '❓'; // Default icon if weather code is not found
};

const Dashboard = ({ Data }) => {
  const { Name: name, ProfileImage: profileImage, Email: email, DOA, CollegeRollNo, Gender } = Data;

  // State to store weather data
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch weather data
    const fetchWeather = async (latitude, longitude) => {
      try {
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        setWeather(response.data.current_weather);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Unable to fetch weather data. Please try again later.');
        setLoading(false);
      }
    };

    // Get user's location
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
          },
          (error) => {
            console.error('Error getting location:', error);
            setError('Unable to retrieve your location. Please check your settings.');
            setLoading(false);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white flex flex-col justify-center items-center">
      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 w-full max-w-6xl">
        
        {/* Welcome Card */}
        <div className="w-full lg:w-1/2 p-8 bg-white text-gray-800 rounded-3xl shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-70 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
          <div className="relative z-10 flex flex-col items-center space-y-4">
            {/* User Profile Image */}
            <div className="w-28 h-28 rounded-full overflow-hidden shadow-lg">
              <img
                src={profileImage}
                alt={`${name}'s profile`}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Welcome Message */}
            <div className="text-center">
              <h2 className="text-3xl font-extrabold">Welcome, {name}!</h2>
              <p className="text-white mt-2">We're glad to have you here.</p>
            </div>
          </div>
        </div>

        {/* User Details Card */}
        <div className="w-full lg:w-1/2 p-6 bg-white text-gray-800 rounded-3xl shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-70 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-center mb-4">Your Profile Details</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Name:</span>
                <span>{name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Email:</span>
                <span>{email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">College Roll:</span>
                <span>{CollegeRollNo}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">DOA:</span>
                <span>{new Date(DOA).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Gender:</span>
                <span>{Gender}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Widget */}
      <div className="w-full max-w-lg p-6 mt-8 bg-white text-gray-800 rounded-3xl shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out relative group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-green-500 opacity-70 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
        <div className="relative z-10 text-center">
          <h3 className="text-2xl font-bold mb-4">Current Weather</h3>
          {loading ? (
            <p>Loading weather data...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : weather ? (
            <div className="space-y-2">
              <div className="text-5xl">{getWeatherIcon(weather.weathercode)}</div>
              <p>Temperature: {weather.temperature}°C</p>
              <p>Wind Speed: {weather.windspeed} km/h</p>
              <p>Humidity: {weather.humidity} %</p>
            </div>
          ) : (
            <p>Unable to fetch weather data.</p>
          )}
        </div>
      </div>

      {/* Inspirational Quote */}
      <div className="w-full max-w-lg p-6 mt-8 bg-white text-gray-800 rounded-3xl shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out relative group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-green-500 opacity-70 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
        <div className="relative z-10 text-center">
          <p className="italic font-semibold text-xl text-gray-700 group-hover:text-white transition-colors duration-300">
            "The future belongs to those who believe in the beauty of their dreams."
          </p>
          <p className="mt-4 text-right text-sm text-gray-500 group-hover:text-gray-200">- Eleanor Roosevelt</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
