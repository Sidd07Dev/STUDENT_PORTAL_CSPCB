import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChevronDown, ChevronUp, CheckCircle, Download, FileText, Calendar } from 'lucide-react';

// Updated flat data structure for question papers
const getQuestionPapers = () => {
  return [
    { year: 2023, semester: 1, name: 'Mathematics I', filePath: '/downloads/math1.pdf' },
    { year: 2023, semester: 1, name: 'Physics I', filePath: '/downloads/physics1.pdf' },
    { year: 2023, semester: 1, name: 'Chemistry I', filePath: '/downloads/chem1.pdf' },
    { year: 2023, semester: 1, name: 'Computer Science I', filePath: '/downloads/cs1.pdf' },
    { year: 2023, semester: 3, name: 'Mathematics II', filePath: '/downloads/math2.pdf' },
    { year: 2023, semester: 3, name: 'Physics II', filePath: '/downloads/physics2.pdf' },
    { year: 2023, semester: 3, name: 'Chemistry II', filePath: '/downloads/chem2.pdf' },
    { year: 2023, semester: 3, name: 'Computer Science II', filePath: '/downloads/cs2.pdf' },
    { year: 2023, semester: 4, name: 'Mathematics II', filePath: '/downloads/math2.pdf' },
    { year: 2023, semester: 4, name: 'Physics II', filePath: '/downloads/physics2.pdf' },
    { year: 2023, semester: 4, name: 'Chemistry II', filePath: '/downloads/chem2.pdf' },
    { year: 2023, semester: 4, name: 'Computer Science II', filePath: '/downloads/cs2.pdf' },
    { year: 2023, semester: 5, name: 'Mathematics II', filePath: '/downloads/math2.pdf' },
    { year: 2023, semester: 5, name: 'Physics II', filePath: '/downloads/physics2.pdf' },
    { year: 2023, semester: 5, name: 'Chemistry II', filePath: '/downloads/chem2.pdf' },
    { year: 2023, semester: 5, name: 'Computer Science II', filePath: '/downloads/cs2.pdf' },
    { year: 2023, semester: 6, name: 'Mathematics II', filePath: '/downloads/math2.pdf' },
    { year: 2023, semester: 6, name: 'Physics II', filePath: '/downloads/physics2.pdf' },
    { year: 2023, semester: 6, name: 'Chemistry II', filePath: '/downloads/chem2.pdf' },
    { year: 2023, semester: 6, name: 'Computer Science II', filePath: '/downloads/cs2.pdf' },
    { year: 2022, semester: 1, name: 'Advanced Math', filePath: '/downloads/advanced_math.pdf' },
    { year: 2022, semester: 1, name: 'Data Structures', filePath: '/downloads/data_structures.pdf' },
    { year: 2022, semester: 1, name: 'Algorithms', filePath: '/downloads/algorithms.pdf' },
    { year: 2022, semester: 1, name: 'Operating Systems', filePath: '/downloads/os.pdf' },
    { year: 2022, semester: 2, name: 'Operating Systems', filePath: '/downloads/os.pdf' },
  ];
};

const QuestionPapers = () => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const papers = getQuestionPapers();
    setData(papers);
  }, []);

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setSelectedSemester(null); // Reset semester when year is changed
    toast.success(`Year ${year} selected!`, {
      icon: <CheckCircle size={20} className="text-green-500" />,
    });
  };

  const handleSemesterChange = (semester) => {
    setSelectedSemester(semester);
    toast.success(`Semester ${semester} selected!`, {
      icon: <CheckCircle size={20} className="text-green-500" />,
    });
  };

  const handleDownload = (filePath, paperName) => {
    toast.info(`Downloading: ${paperName}`, {
      icon: <Download size={20} className="text-blue-500" />,
    });
    // Simulate download action
    window.location.href = filePath;
  };

  // Extract unique years and semesters for selection
  const uniqueYears = [...new Set(data.map((paper) => paper.year))];
  const uniqueSemesters = selectedYear ? [...new Set(data.filter(paper => paper.year === selectedYear).map(paper => paper.semester))] : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-500 via-purple-600 to-pink-500">
      <h4 className="text-xl font-extrabold text-center text-white mb-12 drop-shadow-md">Previous Question Papers</h4>

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        {/* Year Selection Dropdown */}
        <div className="mb-8 relative">
          <button
            className="w-full flex justify-between items-center bg-gray-300 text-gray-800 py-4 px-5 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-500 transition duration-500 transform hover:scale-105 shadow-md"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedYear ? (
              <span className="flex items-center space-x-2">
                <Calendar size={24} />
                <span>Year: {selectedYear}</span>
              </span>
            ) : (
              <span>Select Year</span>
            )}
            {isDropdownOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>

          {isDropdownOpen && (
            <ul className="absolute w-full bg-white shadow-lg mt-2 rounded-xl max-h-48 overflow-y-auto z-10">
              {uniqueYears.map((year) => (
                <li
                  key={year}
                  className="py-3 px-5 hover:bg-purple-100 cursor-pointer transition-colors duration-300"
                  onClick={() => {
                    handleYearChange(year);
                    setIsDropdownOpen(false);
                  }}
                >
                  {year}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Semester Selection */}
        {selectedYear && (
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Select Semester:</h3>
            <div className="overflow-x-auto">
              <div className="flex space-x-6">
                {uniqueSemesters.map((semester) => (
                  <button
                    key={semester}
                    className={`whitespace-nowrap py-3 px-6 rounded-lg shadow-lg focus:outline-none transition-transform duration-500 transform hover:scale-105 ${
                      selectedSemester === semester
                        ? 'bg-purple-600 text-white shadow-xl'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    onClick={() => handleSemesterChange(semester)}
                  >
                    Semester {semester}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Question Papers Card List */}
        {selectedSemester && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Question Papers:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.filter(paper => paper.year === selectedYear && paper.semester === selectedSemester).map((paper, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-2xl shadow-lg p-6 flex flex-col items-start justify-between transition-transform duration-500 transform hover:scale-105 hover:shadow-2xl hover:bg-gray-200"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <FileText size={24} className="text-purple-600" />
                    <h4 className="text-xl font-bold text-gray-800">{paper.name}</h4>
                  </div>
                  <button
                    className="mt-auto flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 px-4 rounded-xl hover:from-purple-700 hover:to-pink-600 transition-transform duration-300 transform hover:scale-110 shadow-md"
                    onClick={() => handleDownload(paper.filePath, paper.name)}
                  >
                    <Download size={20} />
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default QuestionPapers;
