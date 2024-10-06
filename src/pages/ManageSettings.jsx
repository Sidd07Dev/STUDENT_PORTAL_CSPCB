import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { domain } from '../backendtokens';

const ManageSettings = () => {
  const [pendingStudents, setPendingStudents] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const [currentPagePending, setCurrentPagePending] = useState(1);
  const itemsPerPage = 6; // Number of items per page for pagination

  useEffect(() => {
    // Fetch pending students from the backend
    const fetchPendingStudents = async () => {
      try {
        const response = await axios.get(`${domain}v1/students/getPending`);
        setPendingStudents(response.data.data);
      } catch (error) {
        console.error('Error fetching pending students:', error);
        toast.error('Failed to fetch pending students');
      }
    };

    fetchPendingStudents();
  }, []);

  // Handle pagination
  const totalPagesPending = Math.ceil(pendingStudents.length / itemsPerPage);
  const startIndexPending = (currentPagePending - 1) * itemsPerPage;
  const currentPending = pendingStudents.slice(startIndexPending, startIndexPending + itemsPerPage);

  const handleApprove = async (studentId) => {
    setLoading(true); // Set loading to true
    try {
      await axios.post(`${domain}v1/students/approve/${studentId}`);
      setPendingStudents(pendingStudents.filter(student => student._id !== studentId));
      toast.success('Student approved successfully');
    } catch (error) {
      console.error('Error approving student:', error);
      toast.error('Failed to approve student');
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleReject = async (studentId) => {
    setLoading(true); // Set loading to true
    try {
      await axios.post(`${domain}v1/students/reject/${studentId}`);
      setPendingStudents(pendingStudents.filter(student => student._id !== studentId));
      toast.success('Student rejected successfully');
    } catch (error) {
      console.error('Error rejecting student:', error);
      toast.error('Failed to reject student');
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] p-6">
      <ToastContainer /> {/* Add ToastContainer */}
      
      {/* Pending Students List */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-[#001F3F] mb-4">Pending Students</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {currentPending.map((student) => (
            <div
              key={student._id}
              className="flex flex-col items-center justify-center p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out bg-gray-100"
            >
              <img src={student.ProfileImage} alt={student.name} className="w-16 h-16 rounded-full mb-2" />
              <h3 className="text-lg font-bold text-[#001F3F]">{student.Name}</h3>
              <p className="text-sm text-gray-500">Roll No: {student.CollegeRollNo}</p>
              <p className="text-sm text-gray-500">DOA: {student.DOA}</p>
              <p className="text-sm text-gray-500">Gender: {student.Gender}</p>
             
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleApprove(student._id)}
                  className={`bg-green-500 text-white py-1 px-2 rounded-lg transition-colors duration-300 ${
                    loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-green-600'
                  }`}
                  disabled={loading}
                >
                  {loading ? 'Approving...' : 'Approve'}
                </button>
                <button
                  onClick={() => handleReject(student._id)}
                  className={`bg-red-500 text-white py-1 px-2 rounded-lg transition-colors duration-300 ${
                    loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-red-600'
                  }`}
                  disabled={loading}
                >
                  {loading ? 'Rejecting...' : 'Reject'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination for Pending Students */}
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={() => setCurrentPagePending(currentPagePending - 1)}
            disabled={currentPagePending === 1 || loading}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setCurrentPagePending(currentPagePending + 1)}
            disabled={currentPagePending === totalPagesPending || loading}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageSettings;
