import React from 'react';

const Results = ({ results }) => {
  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-green-600 via-blue-600 to-purple-500 text-white flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6">Your Academic Results</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-4xl">
        {results.map((semesterResult, index) => (
          <div
            key={index}
            className="p-6 bg-white text-gray-800 rounded-3xl shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out relative group overflow-hidden"
          >
            <h3 className="text-xl font-semibold mb-4">Semester {index + 1}</h3>
            {semesterResult ? (
              <div>
                <p className="font-bold">CGPA: {semesterResult.cgpa}</p>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Subject-wise Marks:</h4>
                  <ul className="list-disc list-inside">
                    {semesterResult.subjects.map((subject, i) => (
                      <li key={i}>
                        {subject.name}: {subject.marks} marks
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-red-500 font-semibold">Result not declared yet.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
