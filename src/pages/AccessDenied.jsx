import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';

const AccessDenied = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Ensure js-cookie is imported

// 1. Function to extract ID and Access Token from the URL
const getIdAndTokenFromUrl = () => {
  const currentUrl = window.location.href;

  // Extract the ID and token by splitting the URL by '/'
  const urlSegments = currentUrl.split('/');
  const id = urlSegments[urlSegments.length - 2]; // Second last segment
  const accessToken = urlSegments[urlSegments.length - 1];  // Last segment

  // Basic checks to ensure accessToken looks like a JWT token
  const isValidAccessToken = accessToken && accessToken.split('.').length === 3;

  if (id && isValidAccessToken) {
    return { id, accessToken };
  }

  return null;
};

// 2. Store the ID and access token in cookies using js-cookie
const storeIdAndAccessToken = ({ id, accessToken }) => {
  Cookies.set('id', id); // Store ID in cookies
  Cookies.set('accessToken', accessToken); // Store access token in cookies
};

// 3. Check and store the ID and access token when page loads
const tokens = getIdAndTokenFromUrl();
if (tokens) {
  storeIdAndAccessToken(tokens);
}

  // Simulate fetching user details from the backend
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        let id = Cookies.get('id');
       let  accessToken = Cookies.get('accessToken');

       
        
        const response = await axios.get(`http://localhost:8000/api/v1/students/getCurrentStudents/${id}/${accessToken}`);
      
      
        
        const data = response.data; // Access the response data
        //  const data = {
        //     "success": true,
        //     "user": {
        //       "Name": "John Doe",
        //       "Email": "johndoe@example.com",
        //       "status": 0
        //     }
        //   }
    
        
          
        if (data && data.statusCode==200) {
          setUser(data.data); // Set user details
        } else {
          setUser(null); // No user is logged in
        }
      } catch (error) {
        console.error("Error fetching user details", error);
        toast.error("Failed to fetch user details.");
      } finally {
        setLoading(false); // Stop loading after the fetch
      }
    };

    fetchUserDetails();
  }, []);

  // Handle the different states
  if (loading) {
    return <p>Loading...</p>; // Show loading indicator while fetching data
  }

  if (!user) {
    return (
      <div className="text-center p-10">
        <h1 className="text-3xl font-bold text-red-600">Please Login to Access the Dashboard</h1>
        <p className="text-gray-600 mt-4">It looks like you're not logged in. Please log in to continue.</p>
        <button
          onClick={() => navigate('/login')} // Redirect to login page
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (user.Status == 0) {
    return (
      <div className="text-center p-10">
        <h1 className="text-3xl font-bold text-yellow-500">Account Pending Approval</h1>
        <p className="text-gray-600 mt-4">Your account is under review. Please wait for the admin to approve your access.</p>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-green-600">Welcome, {user.Name}</h1>
      <p className="text-gray-600 mt-4">You are successfully logged in and your account is approved.</p>
      {/* Dashboard content can go here */}
    </div>
  );
};

export default AccessDenied;
