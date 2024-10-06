import React from 'react';
import { User, Calendar, CheckSquare, Bell, CalendarDays } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const dummyData = {
  name: "John Doe",
  events: ["Hackathon - Oct 10", "Assignment 1 Due - Oct 12", "Seminar - Oct 15"],
  attendance: { attended: 80, missed: 5, rate: 94 },
  notices: ["New library hours", "Exam schedule released", "Holiday on Oct 20"],
  schedule: [
    { subject: "Math", date: "Oct 20" },
    { subject: "Physics", date: "Oct 22" },
    { subject: "Chemistry", date: "Oct 24" }
  ],
  graphData: {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Attendance",
        data: [85, 92, 78, 95, 88],
        backgroundColor: ["rgba(54, 162, 235, 0.6)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  },
};

const Dashboard = () => {
  const { name, events, attendance, notices, schedule, graphData } = dummyData;

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white flex flex-wrap justify-center items-center">
      
      {/* Welcome Card */}
      <div className="w-full lg:w-1/3 p-4 animate-fade-in-up">
        <div className="bg-white text-gray-800 rounded-3xl p-8 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-70 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
          <div className="relative z-10 flex items-center space-x-4">
            <User size={36} className="text-white opacity-90 group-hover:scale-125 transition-transform" />
            <div>
              <h2 className="text-2xl font-bold">Welcome, {name}!</h2>
              <p className="text-white opacity-80">We're glad to have you back.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Graph Card */}
      <div className="w-full lg:w-2/3 p-4 animate-fade-in-up delay-400">
        <div className="bg-white text-gray-800 rounded-3xl p-8 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 opacity-70 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold">Attendance Overview</h3>
            <div className="mt-6">
              <Bar
                data={graphData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: true, position: 'top' },
                    title: { display: true, text: 'Attendance by Month' },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Events Card */}
      <div className="w-full lg:w-1/3 p-4 animate-fade-in-up delay-100">
        <div className="bg-white text-gray-800 rounded-3xl p-8 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-blue-500 opacity-70 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
          <div className="relative z-10 flex items-center space-x-4">
            <Calendar size={36} className="text-white opacity-90 group-hover:scale-125 transition-transform" />
            <div>
              <h3 className="text-xl font-bold">Upcoming Events</h3>
              <ul className="mt-4 space-y-2">
                {events.map((event, index) => (
                  <li key={index} className="opacity-80 group-hover:text-white transition-colors duration-300">
                    {event}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Card */}
      <div className="w-full lg:w-1/3 p-4 animate-fade-in-up delay-200">
        <div className="bg-white text-gray-800 rounded-3xl p-8 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-70 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
          <div className="relative z-10 flex items-center space-x-4">
            <CheckSquare size={36} className="text-white opacity-90 group-hover:scale-125 transition-transform" />
            <div>
              <h3 className="text-xl font-bold">Attendance Summary</h3>
              <p className="mt-2 group-hover:text-white transition-colors duration-300">Attended: {attendance.attended}</p>
              <p className="group-hover:text-white transition-colors duration-300">Missed: {attendance.missed}</p>
              <p className="group-hover:text-white transition-colors duration-300">Attendance Rate: {attendance.rate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notices Card */}
      <div className="w-full lg:w-1/3 p-4 animate-fade-in-up delay-300">
        <div className="bg-white text-gray-800 rounded-3xl p-8 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 opacity-70 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
          <div className="relative z-10 flex items-center space-x-4">
            <Bell size={36} className="text-white opacity-90 group-hover:scale-125 transition-transform" />
            <div>
              <h3 className="text-xl font-bold">Notices</h3>
              <ul className="mt-4 space-y-2">
                {notices.map((notice, index) => (
                  <li key={index} className="opacity-80 group-hover:text-white transition-colors duration-300">
                    {notice}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Card */}
      <div className="w-full lg:w-1/3 p-4 animate-fade-in-up delay-400">
        <div className="bg-white text-gray-800 rounded-3xl p-8 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-yellow-500 opacity-70 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
          <div className="relative z-10 flex items-center space-x-4">
            <CalendarDays size={36} className="text-white opacity-90 group-hover:scale-125 transition-transform" />
            <div>
              <h3 className="text-xl font-bold">Exam Schedule</h3>
              <ul className="mt-4 space-y-2">
                {schedule.map((exam, index) => (
                  <li key={index} className="opacity-80 group-hover:text-white transition-colors duration-300">
                    {exam.subject} - {exam.date}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
