import React from 'react';
import PropTypes from 'prop-types';
import { Book, User, FileText } from 'lucide-react';

const CourseInformation = ({ courses }) => {
  if (!courses || courses.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto my-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Course Information</h2>
        <p className="text-gray-600">No courses available at this time.</p>
      </div>
    );
  }

  // Grouping courses by semester
  const groupedCourses = courses.reduce((acc, course) => {
    const semester = course.semester || 'Unspecified';
    if (!acc[semester]) {
      acc[semester] = [];
    }
    acc[semester].push(course);
    return acc;
  }, {});

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Course Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
        {Object.keys(groupedCourses).map((semester) => (
          <div key={semester} className="mb-8 w-full">
            <h3 className="text-lg font-semibold mb-2 text-white">{semester}</h3>
            <div className="space-y-4">
              {groupedCourses[semester].map((course, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl relative overflow-hidden border border-gray-200"
                >
                  <div className="relative z-10 flex flex-col p-4 rounded-xl">
                    <h4 className="text-lg font-semibold mb-1 flex items-center text-white">
                      <Book className="mr-2 h-5 w-5" />
                      {course.title}
                    </h4>
                    
                    <div className="flex items-center mb-2">
                      {/* Instructor Image */}
                      {course.instructorImage && (
                        <img
                          src={course.instructorImage}
                          alt={`${course.instructor}'s profile`}
                          className="w-12 h-12 rounded-full mr-3 object-cover border-2 border-white shadow-md"
                        />
                      )}
                      <p className="text-sm text-white flex items-center">
                        <span className="font-semibold">{course.instructor}</span>
                      </p>
                    </div>

                    <div className="text-sm space-y-1 mt-2">
                      {course.syllabus && (
                        <a
                          href={course.syllabus}
                          className="flex items-center text-blue-200 hover:text-blue-300 transition-colors duration-300"
                        >
                          <FileText className="mr-2 h-5 w-5" />
                          Course Syllabus
                        </a>
                      )}
                    </div>

                    {/* Add course duration or credits */}
                    <div className="text-sm text-white mt-2">
                      <span className="font-semibold">Duration:</span> {course.duration || 'N/A'}
                      <span className="ml-2 font-semibold">Credits:</span> {course.credits || 'N/A'}
                    </div>

                   
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

CourseInformation.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      instructor: PropTypes.string.isRequired,
      syllabus: PropTypes.string,
      instructorImage: PropTypes.string, // Added instructor image property
      semester: PropTypes.string, // Semester property
      duration: PropTypes.string, // Course duration
      credits: PropTypes.string, // Course credits
    })
  ).isRequired,
};

export default CourseInformation;
