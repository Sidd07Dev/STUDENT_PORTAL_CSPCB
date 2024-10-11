import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';  // Import useDispatch and useSelector
import { setUser } from '../features/auth/authSlice';  // Import setUser action
import { domain } from '../backendtokens';
import Dashboard from '../components/Dashboard'; // Import Dashboard component

const AccessDenied = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // Track errors
  const navigate = useNavigate();
  const dispatch = useDispatch();  // Initialize useDispatch
 // Get user from Redux state
 

  // Function to extract ID and Access Token from the URL
  const getIdAndTokenFromUrl = () => {
    const currentUrl = window.location.href;
    const urlSegments = currentUrl.split('/');
    const id = urlSegments[urlSegments.length - 2];  // Second last segment
    const accessToken = urlSegments[urlSegments.length - 1];  // Last segment

    // Basic checks to ensure accessToken looks like a JWT token
    const isValidAccessToken = accessToken && accessToken.split('.').length === 3;
    if (id && isValidAccessToken) {
      return { id, accessToken };
    }
    return null;
  };

  // Store the ID and access token in cookies using js-cookie
  const tokens = getIdAndTokenFromUrl();
  if (tokens) {
    Cookies.set('id', tokens.id);
    Cookies.set('accessToken', tokens.accessToken);
  }

  // Fetch user details from the backend
  useEffect(() => {
    const fetchUserDetails = async () => {
      const id = Cookies.get('id');
      const accessToken = Cookies.get('accessToken');
      
      try {
        const response = await axios.get(`${domain}v1/students/getCurrentStudents/${id}/${accessToken}`);
        const { data } = response;
        
        if (data.statusCode === 200) {
          dispatch(setUser(data.data));  // Ensure proper user data structure
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
  }, [dispatch],navigate);
  
  const user = useSelector((state) => state.auth.user); 

  console.log('User in ResultsPage:', user);

  if (loading) {
   return  <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="flex flex-col items-center space-y-4">
    {/* Spinning Loader */}
    <svg
      className="animate-spin h-12 w-12 text-blue-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M12 2v2m6.364.636l-1.414 1.414M22 12h-2m-.636 6.364l-1.414-1.414M12 22v-2m-6.364-.636l1.414-1.414M2 12h2m.636-6.364l1.414 1.414"
      />
    </svg>

    {/* Loading Text */}
    <p className="text-xl font-semibold text-gray-700 animate-pulse">
      Loading...
    </p>
  </div>
</div>
  // Show loading state
  }

  // Check if there's an error or user is not found
  if (error || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md text-center">
        <svg
          className="w-16 h-16 text-red-500 mx-auto mb-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-3-9v18m-7-5h14m-7-5v-4"
          />
        </svg>
    
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          {error || "Please login to continue"}
        </h2>
    
        <p className="text-gray-600 mb-6">
          You need to log in to access this page. If you already have an account, please sign in. If not, register with us.
        </p>
    
        <div className="space-y-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full w-full transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-6 rounded-full w-full transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </div>
      </div>
    </div>
    
    );
  }


  // Check if user is awaiting admin approval
  if (user.Status == 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-md text-center">
        <svg
          className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-bounce"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1 4h.01M12 18.5a2 2 0 100-4 2 2 0 000 4zm7-13h-1.34l-.56-1.34A2 2 0 0015.16 3h-6.32a2 2 0 00-1.88 1.16L6.34 5H5a2 2 0 00-2 2v11a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2z"
          />
        </svg>
    
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Pending Approval</h2>
    
        <p className="text-gray-600 mb-6">
         {user.Name} ,Your account is currently under review. Please wait for admin approval.
        </p>
    
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
          onClick={() => console.log('You clicked the button')}
        >
          Contact Support
        </button>
      </div>
    </div>
    
    );
  }

  // If the user is authenticated and approved, show the Dashboard
  return (
    <div className="">
      <Dashboard Data={user} />  {/* Pass the user data to the Dashboard */}
    </div>
  );
};

export default AccessDenied;
