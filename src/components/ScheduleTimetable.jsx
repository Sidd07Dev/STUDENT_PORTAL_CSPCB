import React from 'react';

const ScheduleTimetable = ({ schedule, exams, calendar }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto my-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Schedule and Timetables</h2>
      
      {/* Class Schedule Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-blue-600">Class Schedule</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {schedule.map((classItem, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-700 mb-1">Course: {classItem.course}</h4>
              <p className="text-sm text-gray-600 mb-2">{classItem.days}, {classItem.time}</p>
              <p className="text-sm text-gray-600">Location: {classItem.location}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Exam Dates Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-blue-600">Upcoming Exams</h3>
        <ul className="list-disc pl-6 space-y-1">
          {exams.map((exam, index) => (
            <li key={index} className="text-sm text-gray-700">
              {exam.course} - {exam.name}: {exam.date}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Academic Calendar Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-blue-600">Academic Calendar</h3>
        <ul className="list-disc pl-6 space-y-1">
          {calendar.map((event, index) => (
            <li key={index} className="text-sm text-gray-700">
              {event.name}: {event.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ScheduleTimetable;
