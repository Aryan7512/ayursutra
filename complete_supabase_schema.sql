-- Complete AyurSutra Database Schema for Supabase
-- Run this in your Supabase SQL editor to create all missing tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Patients table (already exists in original schema)
CREATE TABLE IF NOT EXISTS patients (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    country VARCHAR(100),
    gender VARCHAR(20),
    prior_panchakarma_experience BOOLEAN,
    dietary_habits TEXT,
    shared_calendar BOOLEAN DEFAULT false,
    content_preferences TEXT[],
    activity_level VARCHAR(20) DEFAULT 'moderate',
    health_goals TEXT[],
    chronic_conditions TEXT[],
    current_medications TEXT[],
    stress_anxiety BOOLEAN DEFAULT false,
    physical_symptoms BOOLEAN DEFAULT false,
    panchakarma_expectations TEXT[],
    consent_share BOOLEAN DEFAULT false,
    agree_terms BOOLEAN DEFAULT false,
    previous_therapies TEXT[],
    previous_benefits TEXT[],
    side_effects TEXT,
    follow_instructions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Practitioners table (enhanced from original)
CREATE TABLE IF NOT EXISTS practitioners (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    specialization TEXT[],
    years_of_experience INTEGER,
    license_number VARCHAR(100),
    bio TEXT,
    consultation_fee DECIMAL(10, 2),
    availability_schedule JSONB,
    city VARCHAR(100),
    state VARCHAR(100),
    location TEXT,
    profile_image_url TEXT,
    clinic_name VARCHAR(255),
    verified BOOLEAN DEFAULT false,
    rating DECIMAL(3,2) DEFAULT 0.0,
    total_reviews INTEGER DEFAULT 0,
    online_consultation BOOLEAN DEFAULT false,
    in_person_consultation BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Specializations table
CREATE TABLE IF NOT EXISTS specializations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Doctor Specializations junction table
CREATE TABLE IF NOT EXISTS doctor_specializations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    practitioner_id UUID REFERENCES practitioners(id) ON DELETE CASCADE,
    specialization_id UUID REFERENCES specializations(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(practitioner_id, specialization_id)
);

-- Consultation Types table
CREATE TABLE IF NOT EXISTS consultation_types (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    practitioner_id UUID REFERENCES practitioners(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('online', 'in_person')),
    duration_minutes INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Appointment Slots table
CREATE TABLE IF NOT EXISTS appointment_slots (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    practitioner_id UUID REFERENCES practitioners(id) ON DELETE CASCADE,
    consultation_type_id UUID REFERENCES consultation_types(id) ON DELETE CASCADE,
    slot_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT true,
    is_blocked BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced Events table
CREATE TABLE IF NOT EXISTS events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    practitioner_id UUID REFERENCES practitioners(id) ON DELETE SET NULL,
    appointment_slot_id UUID REFERENCES appointment_slots(id) ON DELETE SET NULL,
    consultation_type_id UUID REFERENCES consultation_types(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_time TIME,
    type VARCHAR(50) DEFAULT 'consultation',
    status VARCHAR(20) DEFAULT 'scheduled',
    booking_notes TEXT,
    patient_phone VARCHAR(20),
    price DECIMAL(10, 2),
    payment_status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Doctor Reviews table
CREATE TABLE IF NOT EXISTS doctor_reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    practitioner_id UUID REFERENCES practitioners(id) ON DELETE CASCADE,
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES events(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    is_anonymous BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Consultations table (already exists in original schema)
CREATE TABLE IF NOT EXISTS consultations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    practitioner_id UUID,
    symptoms TEXT NOT NULL,
    ai_recommendations TEXT,
    prescribed_treatments TEXT[],
    follow_up_date DATE,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Treatment Plans table (already exists in original schema)
CREATE TABLE IF NOT EXISTS treatment_plans (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    plan_name VARCHAR(255) NOT NULL,
    description TEXT,
    ai_generated_plan TEXT,
    duration_weeks INTEGER,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Progress Tracking table (already exists in original schema)
CREATE TABLE IF NOT EXISTS progress_tracking (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    treatment_plan_id UUID REFERENCES treatment_plans(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    symptoms_rating INTEGER CHECK (symptoms_rating >= 1 AND symptoms_rating <= 10),
    energy_level INTEGER CHECK (energy_level >= 1 AND energy_level <= 10),
    sleep_quality INTEGER CHECK (sleep_quality >= 1 AND sleep_quality <= 10),
    stress_level INTEGER CHECK (stress_level >= 1 AND stress_level <= 10),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample specializations
INSERT INTO specializations (name, description) VALUES
('Panchakarma Specialist', 'Expert in Panchakarma detoxification and rejuvenation therapies'),
('Ayurveda Physician', 'General Ayurvedic medicine and treatment'),
('Pulse Diagnosis', 'Specialist in traditional pulse diagnosis (Nadi Pariksha)'),
('Herbal Medicine', 'Expert in Ayurvedic herbs and formulations'),
('Yoga Therapy', 'Integration of yoga and Ayurveda for healing'),
('Nutrition Consultant', 'Ayurvedic nutrition and dietary counseling'),
('Skin & Beauty', 'Ayurvedic treatments for skin and beauty care'),
('Women''s Health', 'Specialized in women''s health and reproductive wellness'),
('Digestive Health', 'Expert in digestive disorders and gut health'),
('Mental Wellness', 'Ayurvedic approach to mental health and stress management')
ON CONFLICT (name) DO NOTHING;

-- Insert sample practitioners
INSERT INTO practitioners (
    email, first_name, last_name, phone, specialization, years_of_experience,
    bio, consultation_fee, city, state, location, verified, rating, total_reviews,
    online_consultation, in_person_consultation
) VALUES
(
    'dr.rajesh.sharma@ayursutra.com',
    'Rajesh',
    'Sharma',
    '+91-9876543210',
    ARRAY['Panchakarma Specialist'],
    15,
    'Dr. Rajesh Sharma is a renowned Panchakarma specialist with over 15 years of experience in traditional Ayurvedic treatments. He has helped thousands of patients achieve optimal health through personalized treatment plans.',
    2000,
    'Mumbai',
    'Maharashtra',
    'Andheri West, Mumbai',
    true,
    4.8,
    127,
    true,
    true
),
(
    'dr.priya.reddy@ayursutra.com',
    'Priya',
    'Reddy',
    '+91-9876543211',
    ARRAY['Women''s Health', 'Herbal Medicine'],
    12,
    'Dr. Priya Reddy specializes in women''s health and reproductive wellness using traditional Ayurvedic approaches. She combines ancient wisdom with modern understanding.',
    1800,
    'Bangalore',
    'Karnataka',
    'Koramangala, Bangalore',
    true,
    4.9,
    89,
    true,
    true
),
(
    'dr.amit.kumar@ayursutra.com',
    'Amit',
    'Kumar',
    '+91-9876543212',
    ARRAY['Digestive Health', 'Pulse Diagnosis'],
    10,
    'Dr. Amit Kumar is an expert in digestive health and traditional pulse diagnosis. He provides comprehensive treatment for various digestive disorders.',
    1500,
    'Delhi',
    'Delhi',
    'Lajpat Nagar, New Delhi',
    true,
    4.7,
    156,
    true,
    false
)
ON CONFLICT (email) DO NOTHING;

-- Insert consultation types for each practitioner
INSERT INTO consultation_types (practitioner_id, type, duration_minutes, price, description)
SELECT
    p.id,
    'online',
    45,
    CASE
        WHEN p.first_name = 'Rajesh' THEN 1500
        WHEN p.first_name = 'Priya' THEN 1300
        WHEN p.first_name = 'Amit' THEN 1200
    END,
    'Video consultation with detailed health assessment and personalized treatment recommendations'
FROM practitioners p
WHERE p.email IN ('dr.rajesh.sharma@ayursutra.com', 'dr.priya.reddy@ayursutra.com', 'dr.amit.kumar@ayursutra.com');

INSERT INTO consultation_types (practitioner_id, type, duration_minutes, price, description)
SELECT
    p.id,
    'in_person',
    60,
    p.consultation_fee,
    'In-person consultation with physical examination, pulse diagnosis, and comprehensive treatment plan'
FROM practitioners p
WHERE p.email IN ('dr.rajesh.sharma@ayursutra.com', 'dr.priya.reddy@ayursutra.com')
AND p.in_person_consultation = true;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_patients_email ON patients(email);
CREATE INDEX IF NOT EXISTS idx_practitioners_email ON practitioners(email);
CREATE INDEX IF NOT EXISTS idx_practitioners_city ON practitioners(city);
CREATE INDEX IF NOT EXISTS idx_practitioners_verified ON practitioners(verified);
CREATE INDEX IF NOT EXISTS idx_practitioners_rating ON practitioners(rating);
CREATE INDEX IF NOT EXISTS idx_events_patient_id ON events(patient_id);
CREATE INDEX IF NOT EXISTS idx_events_practitioner_id ON events(practitioner_id);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_appointment_slots_practitioner ON appointment_slots(practitioner_id);
CREATE INDEX IF NOT EXISTS idx_appointment_slots_date ON appointment_slots(slot_date);
CREATE INDEX IF NOT EXISTS idx_doctor_reviews_practitioner ON doctor_reviews(practitioner_id);
CREATE INDEX IF NOT EXISTS idx_consultation_types_practitioner ON consultation_types(practitioner_id);

-- Row Level Security (RLS) policies
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE treatment_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_reviews ENABLE ROW LEVEL SECURITY;

-- Allow public read access to practitioners and related tables
ALTER TABLE practitioners ENABLE ROW LEVEL SECURITY;
ALTER TABLE specializations ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointment_slots ENABLE ROW LEVEL SECURITY;

-- Public read policies for practitioner data
CREATE POLICY IF NOT EXISTS "Public can view verified practitioners" ON practitioners FOR SELECT USING (verified = true);
CREATE POLICY IF NOT EXISTS "Public can view specializations" ON specializations FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Public can view consultation types" ON consultation_types FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Public can view available appointment slots" ON appointment_slots FOR SELECT USING (is_available = true);

-- Patient policies
CREATE POLICY IF NOT EXISTS "Patients can view own data" ON patients FOR SELECT USING (auth.uid()::text = id::text);
CREATE POLICY IF NOT EXISTS "Patients can update own data" ON patients FOR UPDATE USING (auth.uid()::text = id::text);
CREATE POLICY IF NOT EXISTS "Patients can insert own data" ON patients FOR INSERT WITH CHECK (auth.uid()::text = id::text);

-- Events policies
CREATE POLICY IF NOT EXISTS "Patients can view own events" ON events FOR SELECT USING (auth.uid()::text = patient_id::text);
CREATE POLICY IF NOT EXISTS "Patients can insert own events" ON events FOR INSERT WITH CHECK (auth.uid()::text = patient_id::text);
CREATE POLICY IF NOT EXISTS "Patients can update own events" ON events FOR UPDATE USING (auth.uid()::text = patient_id::text);

-- Consultations policies
CREATE POLICY IF NOT EXISTS "Patients can view own consultations" ON consultations FOR SELECT USING (auth.uid()::text = patient_id::text);
CREATE POLICY IF NOT EXISTS "Patients can insert own consultations" ON consultations FOR INSERT WITH CHECK (auth.uid()::text = patient_id::text);

-- Treatment plans policies
CREATE POLICY IF NOT EXISTS "Patients can view own treatment plans" ON treatment_plans FOR SELECT USING (auth.uid()::text = patient_id::text);
CREATE POLICY IF NOT EXISTS "Patients can insert own treatment plans" ON treatment_plans FOR INSERT WITH CHECK (auth.uid()::text = patient_id::text);

-- Progress tracking policies
CREATE POLICY IF NOT EXISTS "Patients can view own progress" ON progress_tracking FOR SELECT USING (auth.uid()::text = patient_id::text);
CREATE POLICY IF NOT EXISTS "Patients can insert own progress" ON progress_tracking FOR INSERT WITH CHECK (auth.uid()::text = patient_id::text);

-- Review policies
CREATE POLICY IF NOT EXISTS "Anyone can view reviews" ON doctor_reviews FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Patients can insert own reviews" ON doctor_reviews FOR INSERT WITH CHECK (auth.uid()::text = patient_id::text);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_patients_updated_at ON patients;
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_practitioners_updated_at ON practitioners;
CREATE TRIGGER update_practitioners_updated_at BEFORE UPDATE ON practitioners FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_events_updated_at ON events;
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_consultations_updated_at ON consultations;
CREATE TRIGGER update_consultations_updated_at BEFORE UPDATE ON consultations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_treatment_plans_updated_at ON treatment_plans;
CREATE TRIGGER update_treatment_plans_updated_at BEFORE UPDATE ON treatment_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_doctor_reviews_updated_at ON doctor_reviews;
CREATE TRIGGER update_doctor_reviews_updated_at BEFORE UPDATE ON doctor_reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();