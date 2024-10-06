import { Edit, Trash, ToggleLeft, ToggleRight } from 'lucide-react';
import { useState } from 'react';

const ManageStaff = () => {
  const [staffData, setStaffData] = useState([
    {
      id: 1,
      name: 'Jane Smith',
      image: 'https://via.placeholder.com/100',
      designation: 'Professor',
      qualification: 'PhD in Computer Science',
      courseTeaching: 'Software Engineering',
      status: 'Active',
    },
    {
      id: 2,
      name: 'John Doe',
      image: 'https://via.placeholder.com/100',
      designation: 'Assistant Professor',
      qualification: 'MSc in Information Technology',
      courseTeaching: 'Database Systems',
      status: 'Inactive',
    },
  ]);

  const handleToggleStatus = (id) => {
    const updatedStaff = staffData.map((staff) =>
      staff.id === id ? { ...staff, status: staff.status === 'Active' ? 'Inactive' : 'Active' } : staff
    );
    setStaffData(updatedStaff);
  };

  const handleDelete = (id) => {
    setStaffData(staffData.filter((staff) => staff.id !== id));
  };

  const handleEdit = (id) => {
    console.log(`Edit staff with id: ${id}`);
    // Implement edit functionality
  };

  const handleAddNew = () => {
    console.log('Add new staff');
    // Implement add new staff functionality
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-[#001F3F]">Manage Staff</h1>
        <button
          onClick={handleAddNew}
          className="bg-[#00A8FF] text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#007ACC] transition duration-300"
        >
          Add New Staff
        </button>
      </div>

      <table className="w-full bg-white rounded-xl shadow-lg text-left table-auto">
        <thead className="bg-[#00A8FF] text-white">
          <tr>
            <th className="p-4">Staff Image</th>
            <th className="p-4">Staff Name</th>
            <th className="p-4">Designation</th>
            <th className="p-4">Qualification</th>
            <th className="p-4">Course Teaching</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffData.map((staff) => (
            <tr key={staff.id} className="border-t">
              <td className="p-4">
                <img
                  src={staff.image}
                  alt={staff.name}
                  className="w-16 h-16 object-cover rounded-full border-2 border-[#00A8FF]"
                />
              </td>
              <td className="p-4">{staff.name}</td>
              <td className="p-4">{staff.designation}</td>
              <td className="p-4">{staff.qualification}</td>
              <td className="p-4">{staff.courseTeaching}</td>
              <td className="p-4">
                <button
                  onClick={() => handleToggleStatus(staff.id)}
                  className="flex items-center space-x-2"
                >
                  {staff.status === 'Active' ? (
                    <ToggleRight className="text-green-500 h-6 w-6" />
                  ) : (
                    <ToggleLeft className="text-red-500 h-6 w-6" />
                  )}
                  <span className={staff.status === 'Active' ? 'text-green-500' : 'text-red-500'}>
                    {staff.status}
                  </span>
                </button>
              </td>
              <td className="p-4 flex justify-center space-x-4">
                <button
                  onClick={() => handleEdit(staff.id)}
                  className="text-blue-500 hover:text-blue-700 transition duration-300"
                >
                  <Edit className="h-6 w-6" />
                </button>
                <button
                  onClick={() => handleDelete(staff.id)}
                  className="text-red-500 hover:text-red-700 transition duration-300"
                >
                  <Trash className="h-6 w-6" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageStaff;
