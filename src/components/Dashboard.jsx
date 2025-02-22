import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { Button } from "@/components/ui/button"; // Adjust if using ShadCN UI
import dayjs from "dayjs";


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
  const data = [
    { title: "Total Attendance", value: 120, color: "bg-green-500", icon: "CheckCircle" },
    { title: "Total Absent", value: 10, color: "bg-red-500", icon: "XCircle" },
    { title: "Total Conducted", value: 130, color: "bg-blue-500", icon: "ClipboardList" },
    { title: "Remaining", value: 5, color: "bg-yellow-500", icon: "Hourglass" },
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginTime, setLoginTime] = useState("");
  const [logoutTime, setLogoutTime] = useState("");
  const [userImage, setUserImage] = useState("");
  const [userImageOut, setUserImageOut] = useState("");
  const [userLocation, setUserLocation] = useState({ lat: '', long: '' });

  useEffect(() => {
    const storedDate = localStorage.getItem("attendanceDate");
    const currentDate = dayjs().format("YYYY-MM-DD");

    if (storedDate !== currentDate) {
      // New day, reset data
      localStorage.removeItem("loginTime");
      localStorage.removeItem("logoutTime");
      localStorage.removeItem("userImage");
      localStorage.removeItem("userLocation");
      localStorage.setItem("attendanceDate", currentDate);
    } else {
      // Retrieve stored data
      setLoginTime(localStorage.getItem("loginTime"));
      setLogoutTime(localStorage.getItem("logoutTime"));
      setUserImage(localStorage.getItem("userImage"));
      setUserImageOut(localStorage.getItem("userImageOut"));
      const storedLocation = localStorage.getItem("userLocation");
      if (storedLocation) setUserLocation(JSON.parse(storedLocation));
      setIsLoggedIn(!!localStorage.getItem("loginTime"));
    }
  }, []);
  const captureImage = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement("video");
      video.srcObject = stream;
      document.body.appendChild(video);
      video.play();
  
      // Wait for video feed to load
      await new Promise((res) => setTimeout(res, 1000));
  
      let faceDetected = false;
      while (!faceDetected) {
        faceDetected = await detectFace(video);
        await new Promise((res) => setTimeout(res, 500)); // Check every 500ms
      }
  
      // Capture image when face detected
      const canvas = document.createElement("canvas");
      canvas.width = 320;
      canvas.height = 240;
      const ctx = canvas.getContext("2d");
  
      if (ctx) {
        ctx.drawImage(video, 0, 0, 320, 240);
        stream.getTracks().forEach((track) => track.stop()); // Stop camera
        video.remove(); // Remove video element from DOM
        return canvas.toDataURL("image/png");
      }
  
      return null;
    } catch {
      return null;
    }
  };
  
  // Function to check if a face-like structure is present in the frame
  const detectFace = async (video) => {
    const canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 240;
    const ctx = canvas.getContext("2d");
  
    if (!ctx) return false;
  
    ctx.drawImage(video, 0, 0, 320, 240);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
  
    let skinPixels = 0;
    let totalPixels = pixels.length / 4;
  
    // Loop through pixels to check skin-tone-like colors
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
  
      // Check if the pixel color falls in the skin-tone range
      if (r > 95 && g > 40 && g < 100 && b < 150 && Math.abs(r - g) > 15) {
        skinPixels++;
      }
    }
  
    // If enough skin-tone pixels are detected, assume a face is present
    return skinPixels / totalPixels > 0.05;
  };
  
  

  // Get User Location
  const getUserLocation = () =>
    new Promise((resolve) => {
      navigator.geolocation?.getCurrentPosition(
        ({ coords }) => resolve({ lat: coords.latitude, long: coords.longitude }),
        () => resolve(null)
      );
    });
  

  // Handle Login
  const handleLogin = async () => {
    const time = dayjs().format("HH:mm:ss");
    const image = await captureImage();
    const location = await getUserLocation();

    setIsLoggedIn(true);
    setLoginTime(time);
    setUserImage(image);
    setUserLocation(location);

    localStorage.setItem("loginTime", time);
    if (image) localStorage.setItem("userImage", image);
    if (location) localStorage.setItem("userLocation", JSON.stringify(location));
  };

  // Handle Logout
  const handleLogout = async () => {
    const time = dayjs().format("HH:mm:ss");
    const image = await captureImage();
    const location = await getUserLocation();

    setIsLoggedIn(true);
    setLogoutTime(time);
    setUserImageOut(image);
    setUserLocation(location);

    localStorage.setItem("logoutTime", time);
    if (image) localStorage.setItem("userImageOut", image);
    if (location) localStorage.setItem("userLocation", JSON.stringify(location));
  };

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
      <div className="w-full max-w-lg p-6 mt-8 bg-white text-gray-800 rounded-3xl shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out relative group overflow-hidden">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96 text-center border border-gray-200 w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Attendance System</h1>

        {!isLoggedIn ? (
          <button onClick={handleLogin} className="bg-green-500 hover:bg-green-600 text-white w-full py-3 rounded-lg">
            Login
          </button>
        ) : (
          <div className="space-y-4">
            <p className="text-lg font-semibold text-gray-700">
              Login Time: <span className="font-bold">{loginTime}</span>
            </p>
            {!logoutTime ? (
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white w-full py-3 rounded-lg">
                Logout
              </button>
            ) : (
              <p className="text-lg font-semibold text-gray-700">
                Logout Time: <span className="font-bold">{logoutTime}</span>
              </p>
            )}
          </div>
        )}

        {/* Display User Image */}
        {userImage && (
  <div className="mt-4 flex w-full justify-center space-x-4">
    <div className="text-center">
      <p className="text-sm text-gray-600 font-semibold">Login</p>
      <img src={userImage} alt="LogIn" className="w-32 h-32 rounded-lg border border-gray-300 mt-2" />
    </div>
    <div className="text-center">
      <p className="text-sm text-gray-600 font-semibold">Logout</p>
      <img src={userImageOut} alt="LogOut" className="w-32 h-32 rounded-lg border border-gray-300 mt-2" />
    </div>
  </div>
)}

        {/* Display User Location */}
        {userLocation && (
          <div className="mt-4 text-sm text-gray-600">
            <h2 className="font-semibold text-gray-700">Location:</h2>
            <p>Latitude: {userLocation.lat}</p>
            <p>Longitude: {userLocation.long}</p>
          </div>
        )}
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

      <div className="w-full max-w-lg:1/2 p-6 mt-8 bg-white text-gray-800 rounded-3xl shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out relative group overflow-hidden">
      <div className='absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-70 group-hover:opacity-100 transition-opacity duration-500 z-0'></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 bg-white shadow-lg rounded-2xl border border-gray-200 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className={`w-14 h-14 flex items-center justify-center ${item.color} text-white rounded-full shadow-md`}>
              <i className={`lucide lucide-${item.icon} text-2xl`}></i>
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mt-4">{item.title}</h2>
            <p className="text-3xl font-bold text-gray-900 mt-2">{item.value}</p>
          </div>
        ))}
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
