import React, { useState ,useEffect} from 'react';
import { FaEdit, FaKey } from 'react-icons/fa';
import EditProfileModal from '../components/EditProfileModal';
import ChangePasswordModal from '../components/ChangePasswordModal';
import { ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import axios from 'axios';
import { domain } from '../backendtokens';



const Profile = () => {
const [userData,setUserData] = useState({});
const [Loading,setLoading] = useState(true);
const [error, setError] = useState(null); 
  useEffect(() => {
    const fetchUserDetails = async () => {
      const id = Cookies.get('id');
      const accessToken = Cookies.get('accessToken');
      
      try {
        const response = await axios.get(`${domain}v1/students/getCurrentStudents/${id}/${accessToken}`);
        const { data } = response;
        
        if (data.statusCode === 200) {
          console.log(data);
          
          setUserData(data.data)  // Ensure proper user data structure
        } else {
          setError("User not found");
          toast.error("User not found. Please login.");
        }
      } catch (error) {
        setError("Failed to fetch user details");
        toast.error("Failed to fetch user details."+error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserDetails();
  }, []);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleEditClick = () => setShowEditModal(true);
  const handlePasswordClick = () => setShowPasswordModal(true);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 p-10">
        <ToastContainer />
      <div className="bg-white bg-opacity-30 backdrop-blur-lg shadow-2xl rounded-2xl p-6 w-96 relative border border-opacity-30 border-white">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-4 border-gradient-to-r from-purple-400 to-blue-400 p-1">
            <img src={userData.ProfileImage} alt={userData.Name} className="w-full h-full object-cover rounded-full" />
          </div>
          <h2 className="text-3xl font-extrabold text-white">{userData.Name}</h2>
          <p className="text-gray-300 mt-2">Roll No: {userData.CollegeRollNo}</p>
          <p className="text-gray-300">Email: {userData.Email}</p>
          <p className="text-gray-300">Gender: {userData.Gender}</p>
          <p className="text-gray-300">DOA: {new Date(userData.DOA).toLocaleDateString()}</p>

          {/* Edit & Change Password Icons */}
          <div className="flex justify-center mt-6 space-x-4">
            <button 
              onClick={handleEditClick} 
              className="flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2 rounded-full shadow-lg hover:scale-105 transition transform duration-300 ease-in-out"
            >
              <FaEdit className="mr-2" /> Edit Profile
            </button>
            <button 
              onClick={handlePasswordClick} 
              className="flex items-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-5 py-2 rounded-full shadow-lg hover:scale-105 transition transform duration-300 ease-in-out"
            >
              <FaKey className="mr-2" /> Change Password
            </button>
          </div>
        </div>

        {/* Modals */}
        {showEditModal && (
          <EditProfileModal user={userData} onClose={() => setShowEditModal(false)} />
        )}
        {showPasswordModal && (
          <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
        )}
       
      </div>
    </div>
  );
};

export default Profile;
