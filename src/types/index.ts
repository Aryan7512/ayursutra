// Core Types for AyurSutra Platform

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'practitioner' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface Patient extends User {
  age: number;
  phone?: string;
  location?: string;
  healthGoals: string[];
  prakritiProfile?: PrakritiProfile;
  currentTreatments?: Treatment[];
}

export interface PrakritiProfile {
  id: string;
  patientId: string;
  vataPercentage: number;
  pittaPercentage: number;
  kaphaPercentage: number;
  dominantDosha: 'vata' | 'pitta' | 'kapha';
  assessmentDate: Date;
  responses: AssessmentResponse[];
}

export interface AssessmentResponse {
  questionId: string;
  answer: string | number;
  category: 'physical' | 'physiological' | 'mental' | 'lifestyle' | 'health';
}

export interface Therapy {
  id: string;
  name: string;
  description: string;
  duration: number; // minutes
  price: number;
  suitableForDoshas: string[];
  category: 'detox' | 'rejuvenation' | 'chronic' | 'wellness';
  prerequisites?: string[];
  benefits: string[];
}

export interface Treatment {
  id: string;
  patientId: string;
  practitionerId: string;
  therapyId: string;
  scheduledDate: Date;
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  notes?: string;
  feedback?: TreatmentFeedback;
}

export interface TreatmentFeedback {
  id: string;
  treatmentId: string;
  rating: number; // 1-5
  symptoms: string[];
  improvementLevel: number; // 1-10
  comments?: string;
  submittedAt: Date;
}

export interface Practitioner extends User {
  specialization: string[];
  experience: number; // years
  centerId: string;
  availability: TimeSlot[];
  rating: number;
  totalTreatments: number;
}

export interface Center {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  rating: number;
  amenities: string[];
  practitioners: string[]; // practitioner IDs
  therapies: string[]; // therapy IDs
}

export interface TimeSlot {
  dayOfWeek: number; // 0-6
  startTime: string; // "09:00"
  endTime: string; // "17:00"
}

export interface Notification {
  id: string;
  userId: string;
  type: 'reminder' | 'appointment' | 'wellness-tip' | 'feedback-request';
  title: string;
  message: string;
  scheduledFor: Date;
  status: 'pending' | 'sent' | 'failed';
  channels: ('email' | 'sms' | 'push' | 'in-app')[];
}