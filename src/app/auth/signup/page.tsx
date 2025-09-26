'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Leaf, Eye, EyeOff, User, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    age: '',
    location: '',
    healthGoals: [] as string[]
  });
  const [isLoading, setIsLoading] = useState(false);

  const healthGoalOptions = [
    'Stress Management',
    'Weight Management',
    'Digestive Health',
    'Sleep Improvement',
    'Pain Relief',
    'Mental Clarity',
    'Skin Health',
    'Energy Boost',
    'Immune Support',
    'Emotional Balance'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleHealthGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      healthGoals: prev.healthGoals.includes(goal)
        ? prev.healthGoals.filter(g => g !== goal)
        : [...prev.healthGoals, goal]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, redirect to assessment
      window.location.href = '/assessment';
    }, 2000);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-light-sage flex flex-col">
      {/* Navigation */}
      <nav className="bg-pakistan-green shadow-sm border-b border-earth-yellow/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-cornsilk" />
              <span className="text-2xl font-bold text-cornsilk">AyurSutra</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Signup Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="max-w-2xl w-full"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center mb-6"
              >
                <div className="w-16 h-16 bg-bright-lime rounded-full flex items-center justify-center">
                  <Leaf className="h-8 w-8 text-deep-forest" />
                </div>
              </motion.div>

              <h2 className="text-3xl font-bold text-deep-forest mb-2">
                Begin Your Journey
              </h2>
              <p className="text-forest-green">
                Create your account and discover your Ayurvedic constitution
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-deep-forest mb-2">
                    <User className="h-4 w-4 inline mr-2" />
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-forest-green/30 rounded-lg focus:ring-2 focus:ring-bright-lime focus:border-transparent transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-deep-forest mb-2">
                    <Mail className="h-4 w-4 inline mr-2" />
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-forest-green/30 rounded-lg focus:ring-2 focus:ring-bright-lime focus:border-transparent transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-deep-forest mb-2">
                    <Phone className="h-4 w-4 inline mr-2" />
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-forest-green/30 rounded-lg focus:ring-2 focus:ring-bright-lime focus:border-transparent transition-colors"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-deep-forest mb-2">
                    Age
                  </label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    min="18"
                    max="100"
                    required
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-forest-green/30 rounded-lg focus:ring-2 focus:ring-bright-lime focus:border-transparent transition-colors"
                    placeholder="Your age"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-deep-forest mb-2">
                  <MapPin className="h-4 w-4 inline mr-2" />
                  Location (City, Country)
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-forest-green/30 rounded-lg focus:ring-2 focus:ring-bright-lime focus:border-transparent transition-colors"
                  placeholder="e.g., Mumbai, India"
                />
              </div>

              {/* Health Goals */}
              <div>
                <label className="block text-sm font-medium text-deep-forest mb-3">
                  Health Goals (Select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {healthGoalOptions.map((goal) => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => handleHealthGoalToggle(goal)}
                      className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                        formData.healthGoals.includes(goal)
                          ? 'bg-bright-lime text-deep-forest border-bright-lime'
                          : 'bg-white text-forest-green border-forest-green/30 hover:border-bright-lime'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-deep-forest mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 border border-forest-green/30 rounded-lg focus:ring-2 focus:ring-bright-lime focus:border-transparent transition-colors"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-forest-green hover:text-deep-forest"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-bright-lime focus:ring-bright-lime border-forest-green/30 rounded mt-1"
                />
                <label htmlFor="terms" className="ml-3 text-sm text-forest-green">
                  I agree to the{' '}
                  <Link href="/terms" className="text-deep-forest hover:text-bright-lime font-medium">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-deep-forest hover:text-bright-lime font-medium">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-deep-forest text-white rounded-lg font-semibold hover:bg-deep-forest/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account & Start Assessment'
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-forest-green">
                Already have an account?{' '}
                <Link
                  href="/auth/login"
                  className="font-medium text-deep-forest hover:text-bright-lime transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-forest-green">
        <p>&copy; 2024 AyurSutra. Bridging ancient wisdom with modern technology.</p>
      </footer>
    </div>
  );
}