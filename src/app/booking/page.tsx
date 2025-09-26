'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Leaf,
  MapPin,
  Clock,
  User,
  Star,
  Heart,
  Activity,
  Brain,
  Shield,
  Search
} from 'lucide-react';
import Link from 'next/link';

export default function BookingPage() {
  const [selectedTherapy, setSelectedTherapy] = useState<number | null>(null);
  const [selectedCenter, setSelectedCenter] = useState<number | null>(null);
  const [selectedPractitioner, setSelectedPractitioner] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDosha, setFilterDosha] = useState<string>('all');

  const therapies = [
    {
      id: 1,
      name: 'Abhyanga',
      description: 'Full-body oil massage for deep relaxation and toxin removal',
      duration: 60,
      price: 120,
      suitableForDoshas: ['vata', 'pitta', 'kapha'],
      category: 'detox',
      benefits: ['Improves circulation', 'Reduces stress', 'Nourishes skin', 'Balances doshas'],
      icon: Heart
    },
    {
      id: 2,
      name: 'Shirodhara',
      description: 'Continuous pouring of warm oil on forehead for mental clarity',
      duration: 45,
      price: 150,
      suitableForDoshas: ['vata', 'pitta'],
      category: 'rejuvenation',
      benefits: ['Calms nervous system', 'Improves sleep', 'Reduces anxiety', 'Enhances focus'],
      icon: Brain
    },
    {
      id: 3,
      name: 'Swedana',
      description: 'Herbal steam therapy for deep detoxification',
      duration: 30,
      price: 80,
      suitableForDoshas: ['vata', 'kapha'],
      category: 'detox',
      benefits: ['Opens pores', 'Eliminates toxins', 'Improves metabolism', 'Reduces stiffness'],
      icon: Activity
    },
    {
      id: 4,
      name: 'Nasya',
      description: 'Nasal therapy for respiratory and mental clarity',
      duration: 30,
      price: 70,
      suitableForDoshas: ['vata', 'kapha'],
      category: 'wellness',
      benefits: ['Clears sinuses', 'Improves breathing', 'Enhances mental clarity', 'Balances head region'],
      icon: Shield
    }
  ];

  const centers = [
    {
      id: 1,
      name: 'AyurSutra Wellness Center - Andheri',
      address: '123 Linking Road, Andheri West, Mumbai',
      rating: 4.8,
      totalReviews: 156,
      amenities: ['Parking', 'AC', 'WiFi', 'Herbal Tea'],
      distance: '2.3 km'
    },
    {
      id: 2,
      name: 'Holistic Healing Hub - Bandra',
      address: '456 Hill Road, Bandra West, Mumbai',
      rating: 4.6,
      totalReviews: 89,
      amenities: ['Meditation Room', 'Organic Cafe', 'Yoga Studio'],
      distance: '4.1 km'
    }
  ];

  const practitioners = [
    {
      id: 1,
      name: 'Dr. Anjali Patel',
      specialization: ['Panchakarma', 'Women\'s Health', 'Stress Management'],
      experience: 12,
      rating: 4.9,
      totalTreatments: 1200,
      centerId: 1,
      availability: ['10:00 AM', '2:00 PM', '4:30 PM']
    },
    {
      id: 2,
      name: 'Dr. Rajesh Kumar',
      specialization: ['Detoxification', 'Chronic Pain', 'Digestive Health'],
      experience: 15,
      rating: 4.7,
      totalTreatments: 1500,
      centerId: 1,
      availability: ['9:30 AM', '1:00 PM', '5:00 PM']
    }
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
  ];

  const filteredTherapies = therapies.filter(therapy => {
    const matchesSearch = therapy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         therapy.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDosha = filterDosha === 'all' || therapy.suitableForDoshas.includes(filterDosha);
    return matchesSearch && matchesDosha;
  });

  const handleBooking = () => {
    if (selectedTherapy && selectedCenter && selectedPractitioner && selectedDate && selectedTime) {
      // Simulate booking process
      alert('Booking confirmed! Redirecting to dashboard...');
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);
    } else {
      alert('Please complete all booking steps');
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const getDoshaColor = (dosha: string) => {
    switch (dosha) {
      case 'vata': return 'text-blue-500';
      case 'pitta': return 'text-red-500';
      case 'kapha': return 'text-green-500';
      default: return 'text-forest-green';
    }
  };

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
              <Link
                href="/dashboard"
                className="text-cornsilk hover:text-earth-yellow font-medium"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="text-center mb-8"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-deep-forest mb-4">
            Book Your Healing Session
          </h1>
          <p className="text-xl text-forest-green">
            Choose the perfect therapy for your constitution and wellness goals
          </p>
        </motion.div>

        {/* Booking Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 1 && selectedTherapy ? 'bg-bright-lime text-deep-forest' :
                  step === 2 && selectedCenter ? 'bg-bright-lime text-deep-forest' :
                  step === 3 && selectedPractitioner ? 'bg-bright-lime text-deep-forest' :
                  step === 4 && selectedDate && selectedTime ? 'bg-bright-lime text-deep-forest' :
                  'bg-forest-green/20 text-forest-green'
                }`}>
                  {step}
                </div>
                {step < 4 && <div className="w-8 h-px bg-forest-green/20 ml-2" />}
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-8 text-sm text-forest-green">
            <span>Choose Therapy</span>
            <span>Select Center</span>
            <span>Pick Practitioner</span>
            <span>Schedule</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Booking Flow */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Choose Therapy */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-deep-forest mb-4">Step 1: Choose Your Therapy</h2>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="h-5 w-5 text-forest-green absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search therapies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-forest-green/30 rounded-lg focus:ring-2 focus:ring-bright-lime focus:border-transparent"
                  />
                </div>

                <select
                  value={filterDosha}
                  onChange={(e) => setFilterDosha(e.target.value)}
                  className="px-4 py-2 border border-forest-green/30 rounded-lg focus:ring-2 focus:ring-bright-lime focus:border-transparent"
                >
                  <option value="all">All Doshas</option>
                  <option value="vata">Vata</option>
                  <option value="pitta">Pitta</option>
                  <option value="kapha">Kapha</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {filteredTherapies.map((therapy) => {
                  const Icon = therapy.icon;
                  return (
                    <motion.button
                      key={therapy.id}
                      onClick={() => setSelectedTherapy(therapy.id)}
                      className={`p-4 text-left rounded-xl border-2 transition-all ${
                        selectedTherapy === therapy.id
                          ? 'border-bright-lime bg-bright-lime/10'
                          : 'border-forest-green/20 hover:border-bright-lime'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 bg-sage-green rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-deep-forest" />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-bold text-deep-forest mb-1">{therapy.name}</h3>
                          <p className="text-sm text-forest-green mb-2">{therapy.description}</p>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-4">
                              <span className="text-deep-forest">
                                <Clock className="h-4 w-4 inline mr-1" />
                                {therapy.duration}min
                              </span>
                              <span className="font-bold text-bright-lime">${therapy.price}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 mt-2">
                            <span className="text-xs text-forest-green">Suitable for:</span>
                            {therapy.suitableForDoshas.map((dosha) => (
                              <span key={dosha} className={`text-xs font-medium capitalize ${getDoshaColor(dosha)}`}>
                                {dosha}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Step 2: Select Center */}
            {selectedTherapy && (
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <h2 className="text-2xl font-bold text-deep-forest mb-4">Step 2: Select Center</h2>

                <div className="space-y-4">
                  {centers.map((center) => (
                    <motion.button
                      key={center.id}
                      onClick={() => setSelectedCenter(center.id)}
                      className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                        selectedCenter === center.id
                          ? 'border-bright-lime bg-bright-lime/10'
                          : 'border-forest-green/20 hover:border-bright-lime'
                      }`}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-deep-forest mb-1">{center.name}</h3>
                          <p className="text-sm text-forest-green mb-2 flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {center.address}
                          </p>

                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-deep-forest">{center.rating}</span>
                              <span className="text-forest-green">({center.totalReviews} reviews)</span>
                            </div>
                            <span className="text-forest-green">{center.distance} away</span>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Choose Practitioner */}
            {selectedCenter && (
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <h2 className="text-2xl font-bold text-deep-forest mb-4">Step 3: Choose Practitioner</h2>

                <div className="space-y-4">
                  {practitioners.filter(p => p.centerId === selectedCenter).map((practitioner) => (
                    <motion.button
                      key={practitioner.id}
                      onClick={() => setSelectedPractitioner(practitioner.id)}
                      className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                        selectedPractitioner === practitioner.id
                          ? 'border-bright-lime bg-bright-lime/10'
                          : 'border-forest-green/20 hover:border-bright-lime'
                      }`}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-bright-lime rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-deep-forest" />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-bold text-deep-forest mb-1">{practitioner.name}</h3>
                          <p className="text-sm text-forest-green mb-2">
                            {practitioner.experience} years experience • {practitioner.totalTreatments}+ treatments
                          </p>

                          <div className="flex items-center space-x-4 text-sm mb-2">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-deep-forest">{practitioner.rating}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {practitioner.specialization.map((spec) => (
                              <span key={spec} className="px-2 py-1 bg-sage-green/20 text-xs text-deep-forest rounded">
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Schedule */}
            {selectedPractitioner && (
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <h2 className="text-2xl font-bold text-deep-forest mb-4">Step 4: Schedule Your Session</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-deep-forest mb-2">
                      Select Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-forest-green/30 rounded-lg focus:ring-2 focus:ring-bright-lime focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-deep-forest mb-2">
                      Select Time
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full px-4 py-2 border border-forest-green/30 rounded-lg focus:ring-2 focus:ring-bright-lime focus:border-transparent"
                    >
                      <option value="">Choose time slot</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="bg-white rounded-2xl p-6 shadow-sm sticky top-8"
            >
              <h3 className="text-xl font-bold text-deep-forest mb-4">Booking Summary</h3>

              {selectedTherapy ? (
                <div className="space-y-4">
                  <div className="border-b border-forest-green/20 pb-4">
                    <h4 className="font-semibold text-deep-forest">Therapy</h4>
                    <p className="text-forest-green">{therapies.find(t => t.id === selectedTherapy)?.name}</p>
                    <p className="text-sm text-forest-green">
                      {therapies.find(t => t.id === selectedTherapy)?.duration} minutes •
                      ${therapies.find(t => t.id === selectedTherapy)?.price}
                    </p>
                  </div>

                  {selectedCenter && (
                    <div className="border-b border-forest-green/20 pb-4">
                      <h4 className="font-semibold text-deep-forest">Center</h4>
                      <p className="text-forest-green">{centers.find(c => c.id === selectedCenter)?.name}</p>
                    </div>
                  )}

                  {selectedPractitioner && (
                    <div className="border-b border-forest-green/20 pb-4">
                      <h4 className="font-semibold text-deep-forest">Practitioner</h4>
                      <p className="text-forest-green">{practitioners.find(p => p.id === selectedPractitioner)?.name}</p>
                    </div>
                  )}

                  {selectedDate && selectedTime && (
                    <div className="border-b border-forest-green/20 pb-4">
                      <h4 className="font-semibold text-deep-forest">Date & Time</h4>
                      <p className="text-forest-green">{selectedDate} at {selectedTime}</p>
                    </div>
                  )}

                  <div className="pt-2">
                    <div className="flex justify-between items-center text-lg font-bold text-deep-forest">
                      <span>Total</span>
                      <span>${therapies.find(t => t.id === selectedTherapy)?.price}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleBooking}
                    disabled={!(selectedTherapy && selectedCenter && selectedPractitioner && selectedDate && selectedTime)}
                    className="w-full py-3 bg-deep-forest text-white rounded-lg font-semibold hover:bg-deep-forest/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm Booking
                  </button>
                </div>
              ) : (
                <p className="text-forest-green text-center py-8">
                  Select a therapy to begin your booking
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}