import { Edit, Lock, Save } from 'lucide-react';
import { useState } from 'react';
import Modal from '../components/Modal';


const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    image: 'https://via.placeholder.com/150',
    college: 'University of Example',
    rollNumber: '123456',
    // Add more profile fields as needed
  });

  const [formData, setFormData] = useState({ ...profile });
  const [showModal, setShowModal] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setProfile({ ...formData });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = () => {
    console.log('Change password');
    // Implement change password functionality
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] p-6 flex flex-col items-center">
      {/* Profile Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl flex flex-col md:flex-row items-center md:items-start">
        <img
          src={profile.image}
          alt="Profile"
          className="w-32 h-32 object-cover rounded-full border-4 border-[#00A8FF] mb-4 md:mb-0"
        />
        <div className="flex flex-col md:ml-6 text-center md:text-left">
          <h1 className="text-3xl font-bold text-[#001F3F] mb-2">{profile.name}</h1>
          <p className="text-gray-600 mb-4">{profile.email}</p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#00A8FF] text-white py-2 px-4 rounded-lg flex items-center justify-center shadow-md hover:bg-[#007ACC] transition duration-300 ease-in-out"
          >
            <Edit className="h-5 w-5 mr-2" />
            Edit Profile
          </button>
          <button
            onClick={handlePasswordChange}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg flex items-center justify-center shadow-md hover:bg-gray-400 mt-2 transition duration-300 ease-in-out"
          >
            <Lock className="h-5 w-5 mr-2" />
            Change Password
          </button>
        </div>
      </div>

      {/* Modal for Editing Profile */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold text-[#001F3F] mb-4">Edit Profile</h2>
            <div className="flex items-center mb-4">
              <img
                src={formData.image}
                alt="Profile"
                className="w-24 h-24 object-cover rounded-full border-4 border-[#00A8FF] mr-4"
              />
              <input
                type="file"
                className="cursor-pointer"
                onChange={(e) => setFormData({ ...formData, image: URL.createObjectURL(e.target.files[0]) })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A8FF] transition duration-300 ease-in-out"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A8FF] transition duration-300 ease-in-out"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">College</label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A8FF] transition duration-300 ease-in-out"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Roll Number</label>
              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A8FF] transition duration-300 ease-in-out"
              />
            </div>
            <button
              onClick={handleEditToggle}
              className="bg-green-500 text-white py-2 px-4 rounded-lg flex items-center justify-center shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
            >
              <Save className="h-5 w-5 mr-2" />
              Save Changes
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Profile;
