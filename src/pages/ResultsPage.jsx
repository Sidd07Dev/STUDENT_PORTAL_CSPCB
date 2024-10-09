import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { domain } from '../backendtokens'; // Adjust this import based on your file structure

const ResultsPage = () => {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  
  // Get user ID from cookies
  const userId = Cookies.get('id');

  // Fetch results from the backend
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${domain}v1/students/getResults/${userId}`);
        const { data } = response;

        if (data.statusCode === 200) {
          setResults(data.data); // Assuming data.data contains the results
        } else {
          setError("Results not found");
          toast.error("Results not found.");
        }
      } catch (error) {
        setError("Failed to fetch results");
        toast.error("Failed to fetch results.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchResults();
    } else {
      setError("User ID not found in cookies.");
      setLoading(false);
    }
  }, [userId]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center space-y-4">
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
          <p className="text-xl font-semibold text-gray-700 animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
          <h2 className="text-3xl font-semibold text-red-500 mb-4">{error}</h2>
          <p className="text-gray-600 mb-6">Please try again later or contact support.</p>
        </div>
      </div>
    );
  }

  // Results display
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Results</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        {results ? (
          <div>
            {results.map((result, index) => (
              <div key={index} className="border-b py-2">
                <h2 className="font-semibold">{result.subject}</h2>
                <p>CGPA: {result.cgpa}</p>
                <p>Marks: {result.marks.join(", ")}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No results available.</p>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
