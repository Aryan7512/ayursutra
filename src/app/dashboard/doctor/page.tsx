'use client'
import { useState } from 'react'

export default function DoctorDashboard() {
  const [doctor] = useState({
    name: 'Dr Aryan',
    location: '32,Mumbai India',
    specialization: '#Specialist in Raktamokshana',
    image: '/images/doctor-avatar.jpg'
  })

  const [currentPatients] = useState([
    {
      name: 'Aisha (34F)',
      condition: 'Sinusitis - Nasya/Vamana prep',
      color: 'bg-cyan-400'
    },
    {
      name: 'Bilal (58M)',
      condition: 'Osteoarthritis – Basti planned',
      color: 'bg-yellow-400'
    },
    {
      name: 'Chandni (26F)',
      condition: 'Acne/PMS – Virechana prep',
      color: 'bg-purple-400'
    },
    {
      name: 'Deepak (45M)',
      condition: 'Constipation – Basti planned',
      color: 'bg-pink-400'
    }
  ])

  const [checklist] = useState([
    { task: "Review Aisha's list, vitals, therapy readiness", completed: true },
    { task: "Supervise Chandani's Panchakarma sessions, adjust treatments safely", completed: true },
    { task: "Coordinate Deepak's ongoing therapies and wellness routines", completed: true }
  ])

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white flex flex-col">
        {/* Doctor Profile */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-lg font-semibold">DA</span>
            </div>
            <div>
              <h2 className="font-semibold text-lg">{doctor.name}</h2>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6">
          <div className="space-y-2 px-4">
            <div className="bg-purple-600 bg-opacity-30 rounded-lg p-3 flex items-center space-x-3">
              <div className="w-6 h-6 bg-purple-500 rounded flex items-center justify-center">
                <span className="text-xs">📊</span>
              </div>
              <span className="font-medium">Dashboard</span>
            </div>

            <div className="p-3 flex items-center space-x-3 hover:bg-gray-800 rounded-lg cursor-pointer">
              <span className="text-lg">📅</span>
              <span>Calendar</span>
            </div>

            <div className="p-3 flex items-center space-x-3 hover:bg-gray-800 rounded-lg cursor-pointer">
              <span className="text-lg">📖</span>
              <span>Discovery</span>
            </div>

            <div className="p-3 flex items-center space-x-3 hover:bg-gray-800 rounded-lg cursor-pointer">
              <span className="text-lg">👥</span>
              <span>Community</span>
            </div>

            <div className="p-3 flex items-center space-x-3 hover:bg-gray-800 rounded-lg cursor-pointer">
              <span className="text-lg">🚪</span>
              <span>Sign Out</span>
            </div>
          </div>
        </nav>

        {/* AyurSutra Branding */}
        <div className="p-6 border-t border-gray-800">
          <h3 className="text-xl font-bold italic">AyurSutra</h3>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white px-6 py-4 flex items-center justify-between border-b">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Search Institutions..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              Contact Us
            </button>
            <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
              <span className="text-purple-700 font-semibold">1</span>
            </div>
            <span className="text-xl cursor-pointer">⚙️</span>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 p-6 overflow-auto">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

          {/* Top Cards Row */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            {/* Profile Card */}
            <div className="bg-pink-100 rounded-2xl p-6 relative">
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 bg-white bg-opacity-50 rounded-full flex items-center justify-center">
                  <span className="text-pink-600">👤</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Profile</h3>
              <div className="mt-4">
                <h4 className="font-bold text-lg">{doctor.name}</h4>
                <p className="text-sm text-gray-600">{doctor.location}</p>
                <p className="text-sm text-gray-600">{doctor.specialization}</p>
              </div>
            </div>

            {/* Active Patients Card */}
            <div className="bg-green-200 rounded-2xl p-6 relative">
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 bg-white bg-opacity-50 rounded-full flex items-center justify-center">
                  <span className="text-green-600">👥</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Active Patients</h3>
              <div className="text-4xl font-bold mt-4">12</div>
            </div>

            {/* My Feedback Card */}
            <div className="bg-pink-200 rounded-2xl p-6 relative">
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 bg-white bg-opacity-50 rounded-full flex items-center justify-center">
                  <span className="text-pink-600">⭐</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">My Feedback</h3>
              <div className="mt-2">
                <p className="text-sm font-medium">Average Rating:</p>
                <div className="flex space-x-1 mt-1">
                  {[1,2,3,4].map((star) => (
                    <span key={star} className="text-yellow-500">⭐</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Sessions Card */}
            <div className="bg-black rounded-2xl p-6 text-white relative">
              <h3 className="text-lg font-semibold mb-2">Upcoming Sessions</h3>
              <div className="mt-4">
                <div className="text-2xl font-bold">11/03/25</div>
                <p className="text-sm text-gray-300">Upcoming Tuesday</p>
                <div className="mt-2">
                  <span className="text-sm">📈</span>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Current Patients */}
            <div className="bg-black rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Current Patients</h3>
              <div className="space-y-4">
                {currentPatients.map((patient, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${patient.color}`}></div>
                    <div>
                      <h4 className="font-medium">{patient.name}</h4>
                      <p className="text-sm text-gray-300">{patient.condition}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <span className="text-2xl">⌄</span>
              </div>
            </div>

            {/* Postings */}
            <div className="bg-blue-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Postings</h3>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">6</div>
                <p className="text-sm text-gray-600">Blogs Posted</p>

                <div className="mt-6 flex items-center justify-center space-x-4">
                  <div className="bg-pink-200 rounded-full w-16 h-16 flex items-center justify-center">
                    <span className="text-lg">4.9/5</span>
                  </div>
                  <div className="bg-black rounded-full w-16 h-16 flex items-center justify-center text-white">
                    <div className="text-center">
                      <div className="text-lg font-bold">9</div>
                      <div className="text-xs">Sessions Successful</div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mt-4">Reviews</p>
              </div>
            </div>

            {/* Daily Checklist */}
            <div className="bg-purple-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Daily Checklist</h3>
              <div className="space-y-3">
                {checklist.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                      item.completed ? 'bg-green-500 border-green-500' : 'border-gray-400'
                    }`}>
                      {item.completed && <span className="text-white text-xs">✓</span>}
                    </div>
                    <p className="text-sm text-gray-700">{item.task}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-2 gap-6">
            {/* Statistics */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Statistics</h3>
              <div className="flex space-x-8">
                {/* Pie Chart Placeholder */}
                <div className="w-32 h-32 relative">
                  <div className="w-32 h-32 rounded-full" style={{
                    background: 'conic-gradient(#e879f9 0deg 108deg, #34d399 108deg 216deg, #fbbf24 216deg 360deg)'
                  }}></div>
                  <div className="absolute inset-4 bg-white rounded-full"></div>
                </div>

                {/* Legend */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-400 rounded"></div>
                    <span>Documentation Completed 30%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded"></div>
                    <span>Documentation In Progress 45%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                    <span>Documentation Pending 25%</span>
                  </div>
                </div>

                {/* Line Chart Placeholder */}
                <div className="flex-1">
                  <div className="h-20 bg-gradient-to-r from-blue-200 to-green-200 rounded relative overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 200 80">
                      <path d="M 10 60 Q 50 20 100 40 T 190 30" stroke="#10b981" strokeWidth="2" fill="none"/>
                      <path d="M 10 70 Q 50 50 100 60 T 190 50" stroke="#3b82f6" strokeWidth="2" fill="none"/>
                    </svg>
                    <div className="absolute bottom-1 right-2 text-xs text-gray-600">
                      <span className="text-green-600">Aisha</span> / <span className="text-blue-600">Deepak</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Documentation */}
            <div className="bg-black rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Documentation</h3>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Ongoing</h4>
                <div className="space-y-2">
                  <div className="bg-green-100 bg-opacity-20 p-2 rounded text-sm">
                    Aarav Sharma Session Record Abhyanga
                  </div>
                  <div className="bg-green-100 bg-opacity-20 p-2 rounded text-sm">
                    Kabir Joshi Therapy Documentation Virechana
                  </div>
                </div>
              </div>

              <div className="bg-white bg-opacity-10 p-3 rounded-lg flex items-center justify-between">
                <span className="text-sm">📄 General Documentation Template</span>
                <span className="text-lg">→</span>
              </div>

              <div className="mt-6">
                <div className="bg-white bg-opacity-10 rounded-full p-3 flex items-center space-x-3">
                  <span className="text-sm">Start a Conversation...</span>
                  <span className="ml-auto text-pink-400">→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}