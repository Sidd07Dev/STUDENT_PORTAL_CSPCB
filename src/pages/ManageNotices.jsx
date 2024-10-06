import { Edit, Trash2, Plus } from 'lucide-react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { domain } from '../backendtokens';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageNotices = () => {
  const [notices, setNoticeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [noticesPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [newNotice, setNewNotice] = useState({ title: '', file: null });

  const url = domain + 'v1/notice/get';

  useEffect(() => {
    fetchNotices();
  }, [currentPage]);

  const fetchNotices = () => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setNoticeData(response.data.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Error fetching notices');
        setLoading(false);
      });
  };

  const handleEdit = (notice) => {
    setEditingNotice(notice);
    setNewNotice({
      title: notice.Tittle,
      file: null,
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    axios
      .delete(`${domain}v1/notice/delete/${id}`)
      .then(() => {
        toast.success('Notice deleted successfully');
        fetchNotices();
      })
      .catch(() => toast.error('Error deleting notice'));
  };

  const handleAddNew = () => {
    setShowModal(true);
    setEditingNotice(null);
    setNewNotice({ title: '', file: null });
  };

  const handleSaveNewNotice = () => {
    const formData = new FormData();
    
    formData.append('Tittle', newNotice.title); 
    if (newNotice.file) {
      formData.append('FilePath', newNotice.file); 
    }

    const url = editingNotice
      ? `${domain}v1/notice/update/${editingNotice._id}`
      : `${domain}v1/notice/set`;

    const request = editingNotice
      ? axios.put(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      : axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

    request
      .then(() => {
        toast.success(
          editingNotice ? 'Notice updated successfully' : 'Notice added successfully'
        );
        setShowModal(false);
        fetchNotices();
      })
      .catch((error) => {
        toast.error('Error saving notice');
        console.error('API Error:', error);
      });
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleFileChange = (e) => {
    setNewNotice({ ...newNotice, file: e.target.files[0] });
  };

  const handleChangeTitle = (e) => {
    setNewNotice({ ...newNotice, title: e.target.value });
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice);
  const totalPages = Math.ceil(notices.length / noticesPerPage);

  return (
    <div className="min-h-screen bg-[#F4F4F4] p-6">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#001F3F]">Manage Notices</h1>
        <button
          className="bg-[#00A8FF] text-white py-2 px-4 rounded-lg flex items-center shadow-md hover:bg-[#007ACC]"
          onClick={handleAddNew}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Notice
        </button>
      </div>

      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg ">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left text-[#001F3F] font-semibold">
              <th className="p-4">Title</th>
              <th className="p-4">File Download</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentNotices.map((notice) => (
              <tr key={notice._id} className="border-t">
                <td className="p-4">{notice.Tittle}</td>
                <td className="p-4">
                  <a
                    href={notice.FilePath}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                </td>
                <td className="p-4">
                  {new Date(notice.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => handleEdit(notice)}
                    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 mx-2"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(notice._id)}
                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mt-4">
          <button
            className={`${
              currentPage === 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-[#00A8FF] hover:bg-[#007ACC]'
            } text-white py-2 px-4 rounded-lg shadow-md`}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-[#001F3F] font-bold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`${
              currentPage === totalPages
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-[#00A8FF] hover:bg-[#007ACC]'
            } text-white py-2 px-4 rounded-lg shadow-md`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editingNotice ? 'Edit Notice' : 'Add New Notice'}
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Notice Title
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={newNotice.title}
                onChange={handleChangeTitle}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Upload Notice File
              </label>
              <input
                type="file"
                className="w-full p-2 border rounded-lg"
                onChange={handleFileChange}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-4 hover:bg-gray-600"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-[#00A8FF] text-white py-2 px-4 rounded-lg hover:bg-[#007ACC]"
                onClick={handleSaveNewNotice}
              >
                {editingNotice ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNotices;
