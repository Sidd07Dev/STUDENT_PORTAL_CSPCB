import { Edit, Trash2, Plus } from 'lucide-react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { domain } from '../backendtokens';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageAlumni = () => {
  const [alumniData, setAlumniData] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]); // For filtered data
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [alumniPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [alumnusToEdit, setAlumnusToEdit] = useState(null);
  const [newAlumnus, setNewAlumnus] = useState({ Name: '', EducationYear: '', CompanyName: '', Designation: '', ProfileImage: null, CompanyLogo: null });
  const [searchQuery, setSearchQuery] = useState(''); // Search state

  const url = domain + 'v1/alumni/get';

  useEffect(() => {
    fetchAlumni();
  }, [currentPage]);

  useEffect(() => {
    // Filter alumni whenever the search query changes
    handleSearch();
  }, [searchQuery, alumniData]);

  const fetchAlumni = () => {
    setLoading(true);
    axios.get(url)
      .then((response) => {
        setAlumniData(response.data.data);
        setFilteredAlumni(response.data.data); // Initialize filtered data
        setLoading(false);
      })
      .catch((error) => {
        toast.error('Error fetching alumni data');
        setLoading(false);
      });
  };

  // Add new alumni
  const handleSaveNewAlumnus = () => {
    const formData = new FormData();
    formData.append('Name', newAlumnus.Name);
    formData.append('EducationYear', newAlumnus.EducationYear);
    formData.append('CompanyName', newAlumnus.CompanyName);
    formData.append('Designation', newAlumnus.Designation);
    formData.append('ProfileImage', newAlumnus.ProfilePhoto);
    formData.append('CompanyLogo', newAlumnus.CompanyLogo);

    const apiEndpoint = editMode ? `${domain}v1/alumni/update/${alumnusToEdit._id}` : `${domain}v1/alumni/set`;
    const apiMethod = editMode ? axios.put : axios.post;

    apiMethod(apiEndpoint, formData)
      .then(() => {
        toast.success(editMode ? 'Alumnus updated successfully' : 'Alumnus added successfully');
        setShowModal(false);
        fetchAlumni();
      })
      .catch(() => toast.error('Error saving alumni data'));
  };

  // Edit alumni
  const handleEdit = (alumnus) => {
    setAlumnusToEdit(alumnus);
    setNewAlumnus({
      Name: alumnus.Name,
      EducationYear: alumnus.EducationYear,
      CompanyName: alumnus.CompanyName,
      Designation: alumnus.Designation,
      ProfileImage: alumnus.ProfileImage, // Set existing image URL
      CompanyLogo: alumnus.CompanyLogo,   // Set existing company logo URL
    });
    setEditMode(true);
    setShowModal(true);
  };

  // Delete alumni
  const handleDelete = (id) => {
    axios.delete(`${domain}v1/alumni/delete/${id}`)
      .then(() => {
        toast.success('Alumnus deleted successfully');
        fetchAlumni();
      })
      .catch(() => toast.error('Error deleting alumni'));
  };

  // File and input change handlers
  const handleFileChange = (e, type) => {
    setNewAlumnus({ ...newAlumnus, [type]: e.target.files[0] });
  };

  const handleChange = (e) => {
    setNewAlumnus({ ...newAlumnus, [e.target.name]: e.target.value });
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredAlumni.length / alumniPerPage)) setCurrentPage(currentPage + 1);
  };

  const handleSearch = () => {
    // Filter alumni by name or roll number (assuming roll number is included in the alumni data)
    const filtered = alumniData.filter(alumnus =>
      alumnus.Name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      alumnus.RollNo?.toString().includes(searchQuery)  // If roll number is part of alumni data
    );
    setFilteredAlumni(filtered);
  };

  const indexOfLastAlumni = currentPage * alumniPerPage;
  const indexOfFirstAlumni = indexOfLastAlumni - alumniPerPage;
  const currentAlumni = filteredAlumni.slice(indexOfFirstAlumni, indexOfLastAlumni);

  const totalPages = Math.ceil(filteredAlumni.length / alumniPerPage);

  return (
    <div className="min-h-screen bg-[#F4F4F4] p-6">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#001F3F]">Manage Alumni</h1>
        <button
          className="bg-[#00A8FF] text-white py-2 px-4 rounded-lg flex items-center shadow-md hover:bg-[#007ACC]"
          onClick={() => { setEditMode(false); setShowModal(true); }}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Alumni
        </button>
      </div>

      {/* Search Field */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Name or Roll Number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-400 rounded-lg px-4 py-2 w-full"
        />
      </div>

      {/* Alumni Table */}
      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left text-[#001F3F] font-semibold">
              <th className="p-4">Profile Photo</th>
              <th className="p-4">Name</th>
              <th className="p-4">Education Year</th>
              <th className="p-4">Company Name</th>
              <th className="p-4">Company Logo</th>
              <th className="p-4">Designation</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentAlumni.map((alumnus) => (
              <tr key={alumnus._id} className="border-t">
                <td className="p-4">
                  <img
                    src={alumnus.ProfileImage}
                    alt={alumnus.Name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </td>
                <td className="p-4">{alumnus.Name}</td>
                <td className="p-4">{alumnus.EducationYear}</td>
                <td className="p-4">{alumnus.CompanyName}</td>
                <td className="p-4">
                  <img
                    src={alumnus.CompanyLogo}
                    alt={alumnus.CompanyName}
                    className="h-12 w-12 object-contain"
                  />
                </td>
                <td className="p-4">{alumnus.Designation}</td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => handleEdit(alumnus)}
                    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 mx-2"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(alumnus._id)}
                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePreviousPage}
            className={`${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
            } bg-[#00A8FF] text-white py-2 px-4 rounded-lg hover:bg-[#007ACC]`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
          <button
            onClick={handleNextPage}
            className={`${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
            } bg-[#00A8FF] text-white py-2 px-4 rounded-lg hover:bg-[#007ACC]`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal for adding/editing alumni */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-2xl font-semibold mb-4">
              {editMode ? 'Edit Alumnus' : 'Add New Alumnus'}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="Name"
                  value={newAlumnus.Name}
                  onChange={handleChange}
                  className="border border-gray-400 rounded-lg px-4 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Education Year</label>
                <input
                  type="text"
                  name="EducationYear"
                  value={newAlumnus.EducationYear}
                  onChange={handleChange}
                  className="border border-gray-400 rounded-lg px-4 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Company Name</label>
                <input
                  type="text"
                  name="CompanyName"
                  value={newAlumnus.CompanyName}
                  onChange={handleChange}
                  className="border border-gray-400 rounded-lg px-4 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Designation</label>
                <input
                  type="text"
                  name="Designation"
                  value={newAlumnus.Designation}
                  onChange={handleChange}
                  className="border border-gray-400 rounded-lg px-4 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Profile Photo</label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, 'ProfileImage')}
                  className="border border-gray-400 rounded-lg px-4 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Company Logo</label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, 'CompanyLogo')}
                  className="border border-gray-400 rounded-lg px-4 py-2 w-full"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveNewAlumnus}
                  className="bg-[#00A8FF] text-white py-2 px-4 rounded-lg hover:bg-[#007ACC]"
                >
                  {editMode ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAlumni;
