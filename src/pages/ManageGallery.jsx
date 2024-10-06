import { Edit, Trash2, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { domain } from '../backendtokens';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const itemsPerPage = 6; // Number of items per page

const ManageGallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const url = domain + "v1/gallery/get";

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        setGalleryItems(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleAddNew = () => {
    setIsEditing(false);
    setCurrentItem(null);
    setModalOpen(true);
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setCurrentItem(item);
    setNewTitle(item.Tittle);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    axios.delete(`${domain}v1/gallery/delete/${id}`)
      .then((response) => {
        setGalleryItems(galleryItems.filter(item => item._id !== id));
        toast.success("Gallery item deleted successfully");
      })
      .catch((error) => {
        toast.error("Failed to delete gallery item");
      });
  };

  const handleFormSubmit = () => {
    const formData = new FormData();
    formData.append('Tittle', newTitle);
    if (newImage) {
      formData.append('FilePath', newImage); // 'File' should match the key used in backend multer middleware
    }

    const requestUrl = isEditing ? `${domain}v1/gallery/update/${currentItem._id}` : `${domain}v1/gallery/set`;
    const requestMethod = isEditing ? axios.put : axios.post;

    requestMethod(requestUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        if (isEditing) {
          setGalleryItems(galleryItems.map(item => item._id === currentItem._id ? response.data.data : item));
          toast.success("Gallery item updated successfully");
        } else {
          setGalleryItems([...galleryItems, response.data.data]);
          toast.success("Gallery item added successfully");
        }
        setModalOpen(false);
        resetForm();
      })
      .catch((error) => {
        toast.error(isEditing ? "Failed to update gallery item" : "Failed to add gallery item");
      });
  };

  const resetForm = () => {
    setNewImage(null);
    setNewTitle('');
    setCurrentItem(null);
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(galleryItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = galleryItems.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-[#F4F4F4] p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#001F3F]">Manage Gallery</h1>
        <button
          className="bg-[#00A8FF] text-white py-2 px-4 rounded-lg flex items-center shadow-md hover:bg-[#007ACC]"
          onClick={handleAddNew}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Item
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentItems.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
            <img
              src={item.FilePath}
              alt={item.Tittle}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold text-[#001F3F] mb-2">{item.Tittle}</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(item)}
                className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
              >
                <Edit className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`py-2 px-4 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:bg-blue-100'}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Gallery Item" : "Add New Gallery Item"}
            </h2>
            <input
              type="text"
              placeholder="Enter Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <div className="flex justify-end space-x-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                onClick={handleFormSubmit}
              >
                {isEditing ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ToastContainer must be included somewhere in your JSX */}
      <ToastContainer />
    </div>
  );
};

export default ManageGallery;
