'use client';

import { motion } from 'framer-motion';
import { Leaf, Heart, Brain, Calendar, Users, Shield } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-light-sage">
      {/* Navigation */}
      <nav className="bg-pakistan-green shadow-sm border-b border-earth-yellow/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Leaf className="h-8 w-8 text-cornsilk" />
              <span className="text-2xl font-bold text-cornsilk">AyurSutra</span>
            </motion.div>

            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href="/auth/login"
                className="px-4 py-2 text-cornsilk hover:text-earth-yellow transition-colors font-medium"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="px-6 py-2 bg-earth-yellow text-dark-moss-green rounded-full hover:bg-tigers-eye transition-colors font-medium shadow-sm"
              >
                Sign Up
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-8"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-5xl lg:text-6xl font-bold text-deep-forest leading-tight"
            >
              Ancient Wisdom, <br />
              <span className="bg-gradient-to-r from-earth-yellow to-tigers-eye bg-clip-text text-transparent">
                Modern Healing
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl lg:text-2xl text-forest-green max-w-3xl mx-auto leading-relaxed"
            >
              Bridge 5,000 years of Ayurvedic wisdom with cutting-edge technology.
              Personalized Panchakarma treatments guided by your unique Prakriti constitution.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            >
              <Link
                href="/assessment"
                className="px-8 py-4 bg-deep-forest text-white rounded-full text-lg font-semibold hover:bg-deep-forest/90 transition-colors shadow-lg"
              >
                Discover Your Dosha
              </Link>
              <Link
                href="#learn-more"
                className="px-8 py-4 border-2 border-forest-green text-forest-green rounded-full text-lg font-semibold hover:bg-forest-green hover:text-white transition-colors"
              >
                Learn About Ayurveda
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About AyurSutra Section */}
      <section className="py-20 bg-sage-green">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-deep-forest mb-6">
              About AyurSutra
            </h2>
            <p className="text-xl text-deep-forest max-w-4xl mx-auto leading-relaxed">
              We're revolutionizing traditional Ayurvedic healthcare by creating the digital bridge
              that modernizes ancient healing practices without losing their cultural essence and authenticity.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid lg:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg">
              <Heart className="h-12 w-12 text-bright-lime mb-6" />
              <h3 className="text-2xl font-bold text-deep-forest mb-4">Personalized Care</h3>
              <p className="text-forest-green leading-relaxed">
                Every treatment plan is customized based on your unique Prakriti constitution,
                ensuring the most effective healing approach for your individual needs.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg">
              <Brain className="h-12 w-12 text-bright-lime mb-6" />
              <h3 className="text-2xl font-bold text-deep-forest mb-4">AI-Powered Insights</h3>
              <p className="text-forest-green leading-relaxed">
                Advanced AI analyzes your progress patterns and provides intelligent recommendations
                while maintaining the authentic principles of Ayurvedic medicine.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg">
              <Shield className="h-12 w-12 text-bright-lime mb-6" />
              <h3 className="text-2xl font-bold text-deep-forest mb-4">Seamless Experience</h3>
              <p className="text-forest-green leading-relaxed">
                From booking appointments to tracking progress, our platform streamlines
                your entire Panchakarma journey with modern convenience and security.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Ayurveda History Section */}
      <section id="learn-more" className="py-20 bg-light-sage">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-deep-forest mb-6">
              The Science of Life
            </h2>
            <p className="text-xl text-forest-green max-w-4xl mx-auto leading-relaxed">
              Ayurveda, literally meaning "knowledge of life," is the world's oldest holistic healing system,
              originating in India over 5,000 years ago.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-sage-green rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-deep-forest mb-4">Ancient Wisdom</h3>
                <p className="text-deep-forest leading-relaxed">
                  Developed by ancient sages through meditation and observation, Ayurveda recognizes that
                  every individual is unique and requires personalized treatment approaches based on their
                  constitutional type (Prakriti).
                </p>
              </div>

              <div className="bg-sage-green rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-deep-forest mb-4">Three Doshas</h3>
                <p className="text-deep-forest leading-relaxed">
                  The foundation of Ayurveda lies in understanding the three biological energies -
                  Vata (movement), Pitta (transformation), and Kapha (structure) - that govern all
                  physiological and psychological functions.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-sage-green rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-deep-forest mb-4">Panchakarma Detox</h3>
                <p className="text-deep-forest leading-relaxed">
                  Panchakarma, meaning "five actions," is Ayurveda's premier detoxification and
                  rejuvenation program that eliminates toxins, restores balance, and enhances vitality
                  through specialized therapeutic procedures.
                </p>
              </div>

              <div className="bg-sage-green rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-deep-forest mb-4">Modern Relevance</h3>
                <p className="text-deep-forest leading-relaxed">
                  In our fast-paced world, Ayurveda's holistic approach to prevention and healing
                  is more relevant than ever, offering sustainable solutions for chronic stress,
                  lifestyle disorders, and overall wellness.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-deep-forest mb-6">
              Platform Features
            </h2>
            <p className="text-xl text-forest-green max-w-4xl mx-auto leading-relaxed">
              Everything you need for a complete Panchakarma healing journey,
              seamlessly integrated into one comprehensive platform.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUp} className="text-center p-6">
              <div className="w-16 h-16 bg-earth-yellow rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Brain className="h-8 w-8 text-dark-moss-green" />
              </div>
              <h3 className="text-xl font-bold text-deep-forest mb-3">Prakriti Assessment</h3>
              <p className="text-forest-green">Comprehensive constitutional analysis to determine your unique dosha balance</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center p-6">
              <div className="w-16 h-16 bg-tigers-eye rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8 text-dark-moss-green" />
              </div>
              <h3 className="text-xl font-bold text-deep-forest mb-3">Smart Booking</h3>
              <p className="text-forest-green">Intelligent scheduling system with practitioner matching and automated reminders</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center p-6">
              <div className="w-16 h-16 bg-earth-yellow rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-dark-moss-green" />
              </div>
              <h3 className="text-xl font-bold text-deep-forest mb-3">Progress Tracking</h3>
              <p className="text-forest-green">Real-time monitoring of your healing journey with detailed analytics</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center p-6">
              <div className="w-16 h-16 bg-tigers-eye rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-dark-moss-green" />
              </div>
              <h3 className="text-xl font-bold text-deep-forest mb-3">Expert Practitioners</h3>
              <p className="text-forest-green">Connect with certified Ayurvedic doctors and therapists</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center p-6">
              <div className="w-16 h-16 bg-earth-yellow rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-dark-moss-green" />
              </div>
              <h3 className="text-xl font-bold text-deep-forest mb-3">Secure & Private</h3>
              <p className="text-forest-green">HIPAA-compliant data protection with granular privacy controls</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center p-6">
              <div className="w-16 h-16 bg-tigers-eye rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Leaf className="h-8 w-8 text-dark-moss-green" />
              </div>
              <h3 className="text-xl font-bold text-deep-forest mb-3">AI Recommendations</h3>
              <p className="text-forest-green">Personalized lifestyle and dietary guidance based on your constitution</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 ayurveda-gradient">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Begin Your Healing Journey
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Join thousands who have discovered the transformative power of personalized Ayurvedic healing.
              Start with our comprehensive Prakriti assessment today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link
                href="/auth/signup"
                className="px-8 py-4 bg-earth-yellow text-dark-moss-green rounded-full text-lg font-bold hover:bg-tigers-eye transition-colors shadow-lg"
              >
                Start Free Assessment
              </Link>
              <Link
                href="/auth/login"
                className="px-8 py-4 border-2 border-white text-white rounded-full text-lg font-semibold hover:bg-white hover:text-deep-forest transition-colors"
              >
                Login to Continue
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-deep-forest text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-8 w-8 text-earth-yellow" />
                <span className="text-2xl font-bold">AyurSutra</span>
              </div>
              <p className="text-white/80 leading-relaxed">
                Bridging 5,000 years of Ayurvedic wisdom with modern technology
                to provide personalized healthcare solutions.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-white/80">
                <li><Link href="/assessment" className="hover:text-bright-lime">Dosha Assessment</Link></li>
                <li><Link href="/booking" className="hover:text-bright-lime">Book Treatment</Link></li>
                <li><Link href="/practitioners" className="hover:text-bright-lime">Find Practitioners</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-white/80">
                <li><Link href="/help" className="hover:text-bright-lime">Help Center</Link></li>
                <li><Link href="/privacy" className="hover:text-bright-lime">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-bright-lime">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/60">
            <p>&copy; 2024 AyurSutra. All rights reserved. Building the future of Ayurvedic healthcare.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
