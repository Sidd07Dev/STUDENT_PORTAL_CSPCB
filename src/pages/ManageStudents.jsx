import { Edit, Trash2, Plus, X, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { domain } from '../backendtokens/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]); // For search functionality
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false); // For modal state
  const [newStudent, setNewStudent] = useState({
    Name: '',
    CollegeRollNo: '',
    DOA: '',
    Gender: '',
    ProfileImage: ''
  });
  const [profileImageFile, setProfileImageFile] = useState(null); // To handle file upload
  const [editMode, setEditMode] = useState(false); // Edit mode flag
  const [editingStudentId, setEditingStudentId] = useState(null); // ID of the student being edited
  const [submitting, setSubmitting] = useState(false); // To handle form submission loader
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const studentsPerPage = 10; // Number of students to show per page
  const url = domain + "v1/students/get";

  // Fetch students data
  useEffect(() => {
    axios.get(url)
      .then((response) => {
        const fetchedData = response.data.data.flat(); // Flatten the data if it's nested
        setStudents(fetchedData);
        setFilteredStudents(fetchedData); // Initialize filtered students
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter students based on Name or College Roll No
    const filtered = students.filter(
      (student) =>
        student.Name.toLowerCase().includes(query) ||
        student.CollegeRollNo.toLowerCase().includes(query)
    );
    setFilteredStudents(filtered);
    setCurrentPage(1); // Reset to first page after search
  };

  const handleEdit = (student) => {
    setEditMode(true);
    setShowAddModal(true);
    setNewStudent({
      Name: student.Name,
      CollegeRollNo: student.CollegeRollNo,
      DOA: student.DOA,
      Gender: student.Gender,
      ProfileImage: student.ProfileImage,
    });
    setEditingStudentId(student._id); // Set the student ID to be edited
  };

  const handleDelete = async (id) => {
    setSubmitting(true); // Show loader
    try {
      await axios.delete(`${domain}v1/students/delete/${id}`);
      setStudents(students.filter(student => student._id !== id));
      setFilteredStudents(filteredStudents.filter(student => student._id !== id)); // Update filtered list
      toast.success('Student deleted successfully!');
    } catch (error) {
      toast.error('Error deleting student.');
    }
    setSubmitting(false); // Hide loader
  };

  const handleAddNew = () => {
    setShowAddModal(true); // Show the modal
    setEditMode(false); // Ensure we are not in edit mode
  };

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle form input change for new student
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input for profile image
  const handleImageChange = (e) => {
    setProfileImageFile(e.target.files[0]); // Store the file in state
  };

  // Handle form submission (Add and Edit)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); // Show loader

    const formData = new FormData();
    formData.append('Name', newStudent.Name);
    formData.append('CollegeRollNo', newStudent.CollegeRollNo);
    formData.append('DOA', newStudent.DOA);
    formData.append('Gender', newStudent.Gender);
    formData.append('ProfileImage', profileImageFile);

    try {
      if (editMode) {
        // Edit mode: Update student
        await axios.put(`${domain}v1/students/update/${editingStudentId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        const updatedStudents = students.map(student =>
          student._id === editingStudentId ? { ...student, ...newStudent } : student
        );
        setStudents(updatedStudents);
        setFilteredStudents(updatedStudents); // Update filtered list
        toast.success('Student updated successfully!');
      } else {
        // Add new student
        const response = await axios.post(`${domain}v1/students/set`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setStudents((prev) => [...prev, response.data.data]);
        setFilteredStudents((prev) => [...prev, response.data.data]); // Update filtered list
        toast.success('Student added successfully!');
      }

      setShowAddModal(false); // Close the modal
      setNewStudent({ Name: '', CollegeRollNo: '', DOA: '', Gender: '', ProfileImage: '' }); // Reset form
      setProfileImageFile(null); // Reset file input
    } catch (error) {
      toast.error('Error submitting form.');
    }
    setSubmitting(false); // Hide loader
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] p-6">
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Header with Search */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#001F3F]">Manage Students</h1>
        <div className="flex items-center space-x-4">
         
          <button
            className="bg-[#00A8FF] text-white py-2 px-4 rounded-lg flex items-center shadow-md hover:bg-[#007ACC]"
            onClick={handleAddNew}
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Student
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
           <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search by Name or Roll No"
              className="border rounded-lg px-4 py-2 w-full  border-gray-400 "
            />
            <Search className="absolute right-2 top-2 h-5 w-5 text-gray-500" />
          </div>
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left text-[#001F3F] font-semibold">
                  <th className="p-4">Image</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Roll No</th>
                  <th className="p-4">DOA</th>
                  <th className="p-4">Gender</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student) => (
                  <tr key={student._id} className="border-t">
                    <td className="p-4">
                      <img
                        src={student.ProfileImage}
                        alt={student.Name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    </td>
                    <td className="p-4">{student.Name}</td>
                    <td className="p-4">{student.CollegeRollNo}</td>
                    <td className="p-4">{new Date(student.DOA).toLocaleDateString()}</td>
                    <td className="p-4">{student.Gender}</td>
                    <td className="p-4 flex justify-center space-x-2">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleEdit(student)}
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(student._id)}
                        disabled={submitting} // Disable delete button while submitting
                      >
                        {submitting ? <span>Loading...</span> : <Trash2 className="h-5 w-5" />}
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
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Previous
              </button>
              <p className="text-sm">
                Page {currentPage} of {totalPages}
              </p>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">{editMode ? 'Edit Student' : 'Add New Student'}</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="Name"
                  value={newStudent.Name}
                  onChange={handleInputChange}
                  className="border rounded-lg px-4 py-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">College Roll No</label>
                <input
                  type="text"
                  name="CollegeRollNo"
                  value={newStudent.CollegeRollNo}
                  onChange={handleInputChange}
                  className="border rounded-lg px-4 py-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Date of Admission</label>
                <input
                  type="date"
                  name="DOA"
                  value={newStudent.DOA}
                  onChange={handleInputChange}
                  className="border rounded-lg px-4 py-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  name="Gender"
                  value={newStudent.Gender}
                  onChange={handleInputChange}
                  className="border rounded-lg px-4 py-2 w-full"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="border rounded-lg px-4 py-2 w-full"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting} // Disable button while submitting
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  {submitting ? 'Submitting...' : editMode ? 'Update Student' : 'Add Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStudents;
