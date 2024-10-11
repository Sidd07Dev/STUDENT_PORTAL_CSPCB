import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { domain } from '../backendtokens';

const EditProfileModal = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    Name: user.Name,
    Email: user.Email,
    Gender: user.Gender,
    ProfileImage: user.ProfileImage,
    UniversityRollNo: user.UniversityRollNo,
    DOA: user.DOA, // Added DOA here
  });
  const [imagePreview, setImagePreview] = useState(user.ProfileImage);
  const [loading, setLoading] = useState(false);  // Loading state

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "ProfileImage" && files && files[0]) {
      const file = files[0];
      setFormData({ ...formData, ProfileImage: file });
      
      // Preview the image on the frontend
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Disable submit button and show loading

    try {
      const editingStudentId = user._id;  // Assuming you're using user ID for API endpoint
      const response = await axios.put(`${domain}v1/students/update/${editingStudentId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      // Success Notification
      toast.success('Profile updated successfully!');
      console.log("API Response:", response.data);

      onClose();  // Close modal after success
    } catch (error) {
      // Error Notification
      toast.error('Failed to update profile. Please try again.');
      console.error("API Error:", error);
    } finally {
      setLoading(false);  // Enable submit button after response
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Image Upload and Preview */}
          <div className="text-center mb-4">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-gray-300">
              <img 
                src={imagePreview} 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            </div>
            <input 
              type="file" 
              name="ProfileImage" 
              accept="image/*"
              onChange={handleChange} 
              className="mt-2 text-sm text-gray-500"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-600 mb-1">Name:</label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 mb-1">Email:</label>
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-600 mb-1">Gender:</label>
            <select
              name="Gender"
              value={formData.Gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* College Roll Number */}
          <div>
            <label className="block text-gray-600 mb-1">University Roll Number:</label>
            <input
              type="text"
              name="UniversityRollNo"
              value={formData.UniversityRollNo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Date of Admission */}
          <div>
            <label className="block text-gray-600 mb-1">Date of Admission:</label>
            <input
              type="date"
              name="DOA"
              value={formData.DOA}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all"
              disabled={loading}  // Disable when loading
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-purple-600 text-white px-4 py-2 rounded-lg transition-all ${loading ? 'bg-opacity-60' : 'hover:bg-purple-700'}`}
              disabled={loading}  // Disable submit button when loading
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
