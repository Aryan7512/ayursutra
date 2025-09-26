'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Leaf, ChevronLeft, ChevronRight, Brain, Heart, Activity } from 'lucide-react';
import Link from 'next/link';
import { ASSESSMENT_QUESTIONS, calculateDosha, DOSHA_DESCRIPTIONS } from '@/utils/dosha';

export default function AssessmentPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, 'vata' | 'pitta' | 'kapha'>>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any>(null);

  const currentQuestion = ASSESSMENT_QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / ASSESSMENT_QUESTIONS.length) * 100;
  const isLastQuestion = currentQuestionIndex === ASSESSMENT_QUESTIONS.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const handleResponse = (dosha: 'vata' | 'pitta' | 'kapha') => {
    setResponses(prev => ({
      ...prev,
      [currentQuestion.id]: dosha
    }));

    if (isLastQuestion) {
      // Calculate results
      const calculatedResults = calculateDosha({
        ...responses,
        [currentQuestion.id]: dosha
      });
      setResults(calculatedResults);
      setShowResults(true);
    } else {
      // Move to next question
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 300);
    }
  };

  const goToPrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const goToNext = () => {
    if (!isLastQuestion && responses[currentQuestion.id]) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'physical':
        return <Activity className="h-6 w-6" />;
      case 'mental':
        return <Brain className="h-6 w-6" />;
      case 'physiological':
        return <Heart className="h-6 w-6" />;
      default:
        return <Leaf className="h-6 w-6" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'physical':
        return 'text-tigers-eye';
      case 'mental':
        return 'text-earth-yellow';
      case 'physiological':
        return 'text-pakistan-green';
      default:
        return 'text-dark-moss-green';
    }
  };

  const getDoshaColor = (dosha: string) => {
    switch (dosha) {
      case 'vata':
        return 'from-blue-400 to-purple-400';
      case 'pitta':
        return 'from-red-400 to-orange-400';
      case 'kapha':
        return 'from-green-400 to-blue-400';
      default:
        return 'from-sage-green to-forest-green';
    }
  };

  if (showResults && results) {
    return (
      <div className="min-h-screen bg-light-sage">
        {/* Navigation */}
        <nav className="bg-pakistan-green shadow-sm border-b border-earth-yellow/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-2">
                <Leaf className="h-8 w-8 text-deep-forest" />
                <span className="text-2xl font-bold text-deep-forest">AyurSutra</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Results */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-deep-forest mb-4">
              Your Prakriti Results
            </h1>
            <p className="text-xl text-forest-green">
              Your unique Ayurvedic constitution has been revealed
            </p>
          </motion.div>

          {/* Dosha Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-xl mb-8"
          >
            <h2 className="text-2xl font-bold text-deep-forest mb-6 text-center">
              {results.constitution}
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Vata */}
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-200"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - results.vataPercentage / 100)}`}
                      className="text-blue-400"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-deep-forest">
                      {results.vataPercentage}%
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-deep-forest mb-2">Vata</h3>
                <p className="text-sm text-forest-green">Movement & Creativity</p>
              </div>

              {/* Pitta */}
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-200"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - results.pittaPercentage / 100)}`}
                      className="text-red-400"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-deep-forest">
                      {results.pittaPercentage}%
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-deep-forest mb-2">Pitta</h3>
                <p className="text-sm text-forest-green">Transformation & Intelligence</p>
              </div>

              {/* Kapha */}
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-200"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - results.kaphaPercentage / 100)}`}
                      className="text-green-400"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-deep-forest">
                      {results.kaphaPercentage}%
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-deep-forest mb-2">Kapha</h3>
                <p className="text-sm text-forest-green">Stability & Structure</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-lg text-deep-forest mb-4">
                Your dominant dosha is <span className="font-bold text-bright-lime">{results.dominantDosha.toUpperCase()}</span>
              </p>
              <div className={`inline-block px-6 py-3 rounded-full bg-gradient-to-r ${getDoshaColor(results.dominantDosha)} text-white font-semibold`}>
                {DOSHA_DESCRIPTIONS[results.dominantDosha].name} Constitution
              </div>
            </div>
          </motion.div>

          {/* Dosha Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-sage-green rounded-2xl p-8 mb-8"
          >
            <h3 className="text-2xl font-bold text-deep-forest mb-4">
              Understanding Your {DOSHA_DESCRIPTIONS[results.dominantDosha].name} Constitution
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-deep-forest mb-2">Key Characteristics</h4>
                <p className="text-deep-forest mb-4">
                  {DOSHA_DESCRIPTIONS[results.dominantDosha].characteristics}
                </p>

                <h4 className="font-bold text-deep-forest mb-2">Physical Traits</h4>
                <p className="text-deep-forest">
                  {DOSHA_DESCRIPTIONS[results.dominantDosha].physicalTraits}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-deep-forest mb-2">Mental Traits</h4>
                <p className="text-deep-forest mb-4">
                  {DOSHA_DESCRIPTIONS[results.dominantDosha].mentalTraits}
                </p>

                <h4 className="font-bold text-deep-forest mb-2">Elements</h4>
                <p className="text-deep-forest">
                  {DOSHA_DESCRIPTIONS[results.dominantDosha].element}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Personalized Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-2xl p-8 mb-8"
          >
            <h3 className="text-2xl font-bold text-deep-forest mb-6">
              Personalized Recommendations
            </h3>

            <div className="space-y-4">
              {results.recommendations.map((recommendation: string, index: number) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-bright-lime rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-forest-green leading-relaxed">{recommendation}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-deep-forest mb-6">
              Ready to Begin Your Healing Journey?
            </h3>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-deep-forest text-white rounded-full text-lg font-semibold hover:bg-deep-forest/90 transition-colors shadow-lg"
              >
                View Your Dashboard
              </Link>
              <Link
                href="/booking"
                className="px-8 py-4 border-2 border-forest-green text-forest-green rounded-full text-lg font-semibold hover:bg-forest-green hover:text-white transition-colors"
              >
                Book Treatment
              </Link>
            </div>

            <p className="text-forest-green mt-6">
              Your results have been saved to your profile for personalized treatment recommendations.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

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
              <div className="text-sm text-cornsilk">
                Question {currentQuestionIndex + 1} of {ASSESSMENT_QUESTIONS.length}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="w-full bg-forest-green/20 h-2">
        <motion.div
          className="h-2 bg-bright-lime"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Assessment Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-sage-green ${getCategoryColor(currentQuestion.category)} mb-4`}>
            {getCategoryIcon(currentQuestion.category)}
            <span className="text-sm font-medium capitalize text-deep-forest">
              {currentQuestion.category}
            </span>
          </div>

          <h1 className="text-2xl lg:text-3xl font-bold text-deep-forest mb-4">
            Discover Your Prakriti
          </h1>
          <p className="text-forest-green">
            Answer honestly based on your natural tendencies throughout your life
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl p-8 shadow-xl"
          >
            <h2 className="text-xl lg:text-2xl font-bold text-deep-forest mb-8 text-center">
              {currentQuestion.question}
            </h2>

            <div className="space-y-4">
              {Object.entries(currentQuestion.options).map(([dosha, option]) => (
                <motion.button
                  key={dosha}
                  onClick={() => handleResponse(dosha as 'vata' | 'pitta' | 'kapha')}
                  className={`w-full p-6 text-left rounded-xl border-2 transition-all duration-200 ${
                    responses[currentQuestion.id] === dosha
                      ? 'border-bright-lime bg-bright-lime/10'
                      : 'border-forest-green/20 hover:border-bright-lime hover:bg-sage-green/20'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getDoshaColor(dosha)}`} />
                        <span className="font-bold text-deep-forest capitalize">{dosha}</span>
                      </div>
                      <p className="text-forest-green leading-relaxed">
                        {option.text}
                      </p>
                    </div>
                    {responses[currentQuestion.id] === dosha && (
                      <div className="ml-4 w-6 h-6 bg-bright-lime rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-deep-forest rounded-full" />
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={goToPrevious}
                disabled={isFirstQuestion}
                className="flex items-center space-x-2 px-4 py-2 text-forest-green hover:text-deep-forest disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
                <span>Previous</span>
              </button>

              <div className="flex space-x-2">
                {ASSESSMENT_QUESTIONS.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index < currentQuestionIndex
                        ? 'bg-bright-lime'
                        : index === currentQuestionIndex
                        ? 'bg-forest-green'
                        : 'bg-forest-green/20'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                disabled={!responses[currentQuestion.id] || isLastQuestion}
                className="flex items-center space-x-2 px-4 py-2 text-forest-green hover:text-deep-forest disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}