'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Leaf,
  Calendar,
  Heart,
  Activity,
  Brain,
  Bell,
  Plus,
  TrendingUp,
  User,
  Settings,
  BookOpen,
  Star
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [userName] = useState('Priya Sharma'); // Demo user
  const [dominantDosha] = useState('Vata');
  const [doshaBalance] = useState({ vata: 45, pitta: 30, kapha: 25 });

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const upcomingAppointments = [
    {
      id: 1,
      therapy: 'Abhyanga (Oil Massage)',
      practitioner: 'Dr. Anjali Patel',
      date: 'Today',
      time: '2:00 PM',
      status: 'confirmed'
    },
    {
      id: 2,
      therapy: 'Shirodhara',
      practitioner: 'Dr. Rajesh Kumar',
      date: 'Tomorrow',
      time: '10:30 AM',
      status: 'confirmed'
    }
  ];

  const dailyTips = [
    'Start your day with warm water and lemon to balance Vata',
    'Practice gentle yoga poses to calm your nervous system',
    'Avoid cold foods and drinks during this season'
  ];

  const progressMetrics = [
    { label: 'Sleep Quality', value: 7.5, max: 10, trend: 'up' },
    { label: 'Energy Level', value: 6.8, max: 10, trend: 'up' },
    { label: 'Digestion', value: 8.2, max: 10, trend: 'stable' },
    { label: 'Stress Level', value: 4.1, max: 10, trend: 'down' }
  ];

  return (
    <div className="min-h-screen bg-light-sage">
      {/* Navigation */}
      <nav className="bg-pakistan-green shadow-sm border-b border-earth-yellow/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-cornsilk" />
              <span className="text-2xl font-bold text-cornsilk">AyurSutra</span>
            </Link>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-deep-forest hover:text-forest-green relative">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 bg-bright-lime rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-bright-lime rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-deep-forest" />
                </div>
                <span className="text-deep-forest font-medium">{userName}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="mb-8"
        >
          <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-deep-forest mb-2">
                  Welcome back, {userName.split(' ')[0]}!
                </h1>
                <p className="text-forest-green">
                  Your {dominantDosha} constitution is guiding your personalized healing journey.
                </p>
              </div>

              {/* Dosha Balance Mini Display */}
              <div className="mt-4 md:mt-0">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-500">{doshaBalance.vata}%</div>
                    <div className="text-xs text-forest-green">Vata</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-500">{doshaBalance.pitta}%</div>
                    <div className="text-xs text-forest-green">Pitta</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">{doshaBalance.kapha}%</div>
                    <div className="text-xs text-forest-green">Kapha</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-deep-forest mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link
                  href="/booking"
                  className="flex flex-col items-center p-4 rounded-xl bg-sage-green/20 hover:bg-sage-green/30 transition-colors"
                >
                  <Plus className="h-8 w-8 text-bright-lime mb-2" />
                  <span className="text-sm font-medium text-deep-forest">Book Session</span>
                </Link>

                <Link
                  href="/progress"
                  className="flex flex-col items-center p-4 rounded-xl bg-sage-green/20 hover:bg-sage-green/30 transition-colors"
                >
                  <Activity className="h-8 w-8 text-bright-lime mb-2" />
                  <span className="text-sm font-medium text-deep-forest">Log Symptoms</span>
                </Link>

                <Link
                  href="/practitioners"
                  className="flex flex-col items-center p-4 rounded-xl bg-sage-green/20 hover:bg-sage-green/30 transition-colors"
                >
                  <User className="h-8 w-8 text-bright-lime mb-2" />
                  <span className="text-sm font-medium text-deep-forest">Find Practitioner</span>
                </Link>

                <Link
                  href="/resources"
                  className="flex flex-col items-center p-4 rounded-xl bg-sage-green/20 hover:bg-sage-green/30 transition-colors"
                >
                  <BookOpen className="h-8 w-8 text-bright-lime mb-2" />
                  <span className="text-sm font-medium text-deep-forest">Learn More</span>
                </Link>
              </div>
            </motion.div>

            {/* Upcoming Appointments */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-deep-forest">Upcoming Sessions</h2>
                <Link
                  href="/appointments"
                  className="text-sm text-forest-green hover:text-deep-forest font-medium"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center space-x-4 p-4 bg-sage-green/10 rounded-xl">
                    <div className="w-12 h-12 bg-bright-lime rounded-xl flex items-center justify-center">
                      <Heart className="h-6 w-6 text-deep-forest" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-deep-forest">{appointment.therapy}</h3>
                      <p className="text-sm text-forest-green">with {appointment.practitioner}</p>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-medium text-deep-forest">{appointment.date}</div>
                      <div className="text-sm text-forest-green">{appointment.time}</div>
                    </div>
                  </div>
                ))}

                {upcomingAppointments.length === 0 && (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-forest-green/40 mx-auto mb-3" />
                    <p className="text-forest-green">No upcoming appointments</p>
                    <Link
                      href="/booking"
                      className="inline-block mt-2 px-4 py-2 bg-bright-lime text-deep-forest rounded-lg font-medium hover:bg-bright-lime/90 transition-colors"
                    >
                      Book Your First Session
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Progress Tracking */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-deep-forest mb-4">Progress Overview</h2>

              <div className="grid md:grid-cols-2 gap-4">
                {progressMetrics.map((metric, index) => (
                  <div key={index} className="p-4 bg-sage-green/10 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-deep-forest">{metric.label}</span>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className={`h-4 w-4 ${
                          metric.trend === 'up' ? 'text-green-500' :
                          metric.trend === 'down' ? 'text-red-500' : 'text-gray-400'
                        }`} />
                        <span className="text-sm font-bold text-deep-forest">
                          {metric.value}/{metric.max}
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-forest-green/20 rounded-full h-2">
                      <div
                        className="bg-bright-lime h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(metric.value / metric.max) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Daily Dosha Tips */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="bg-gradient-to-br from-pakistan-green to-dark-moss-green rounded-2xl p-6 text-white"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-6 w-6 text-earth-yellow" />
                <h2 className="text-lg font-bold">Today's {dominantDosha} Tips</h2>
              </div>

              <div className="space-y-3">
                {dailyTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-earth-yellow rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-white/90 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Wellness Score */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-lg font-bold text-deep-forest mb-4">Wellness Score</h2>

              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-forest-green/20"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 36}`}
                      strokeDashoffset={`${2 * Math.PI * 36 * (1 - 0.78)}`}
                      className="text-bright-lime"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-deep-forest">78</span>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Star className="h-4 w-4 text-bright-lime" />
                  <span className="text-sm font-medium text-deep-forest">Good Progress</span>
                </div>

                <p className="text-xs text-forest-green leading-relaxed">
                  Your wellness score has improved by 12% this month. Keep following your personalized recommendations.
                </p>
              </div>
            </motion.div>

            {/* Quick Settings */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-lg font-bold text-deep-forest mb-4">Account</h2>

              <div className="space-y-3">
                <Link
                  href="/profile"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-sage-green/10 transition-colors"
                >
                  <User className="h-5 w-5 text-forest-green" />
                  <span className="text-sm font-medium text-deep-forest">Profile Settings</span>
                </Link>

                <Link
                  href="/notifications"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-sage-green/10 transition-colors"
                >
                  <Bell className="h-5 w-5 text-forest-green" />
                  <span className="text-sm font-medium text-deep-forest">Notifications</span>
                </Link>

                <Link
                  href="/settings"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-sage-green/10 transition-colors"
                >
                  <Settings className="h-5 w-5 text-forest-green" />
                  <span className="text-sm font-medium text-deep-forest">General Settings</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}