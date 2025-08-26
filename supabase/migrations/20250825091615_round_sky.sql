/*
  # Create Individual User Accounts for Testing

  1. New Users
    - Create multiple teacher accounts with different subjects and data
    - Each user will have their own lessons, classes, and progress
    
  2. User Data
    - Different subjects (English, Science, History, Mathematics)
    - Different year groups and classes
    - Varied lesson themes and progress
    
  3. Security
    - All users follow existing RLS policies
    - Each user can only see their own data
*/

-- Create individual teacher accounts
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES 
-- Teacher 1: Ms. Thompson (English)
(
  '11111111-1111-1111-1111-111111111111',
  'ms.thompson@westfield.edu',
  crypt('Teacher123!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"first_name": "Sarah", "last_name": "Thompson"}',
  false,
  'authenticated'
),
-- Teacher 2: Mr. Johnson (Science)
(
  '22222222-2222-2222-2222-222222222222',
  'mr.johnson@westfield.edu',
  crypt('Science123!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"first_name": "David", "last_name": "Johnson"}',
  false,
  'authenticated'
),
-- Teacher 3: Ms. Garcia (History)
(
  '33333333-3333-3333-3333-333333333333',
  'ms.garcia@westfield.edu',
  crypt('History123!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"first_name": "Maria", "last_name": "Garcia"}',
  false,
  'authenticated'
),
-- Teacher 4: Mr. Wilson (Mathematics)
(
  '44444444-4444-4444-4444-444444444444',
  'mr.wilson@westfield.edu',
  crypt('Math123!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"first_name": "Robert", "last_name": "Wilson"}',
  false,
  'authenticated'
);

-- Create school for all teachers
INSERT INTO schools (
  id,
  name,
  address,
  city,
  postcode,
  admin_email,
  admin_phone,
  admin_name
) VALUES (
  '11111111-1111-1111-1111-111111111111',
  'Westfield Secondary School',
  '123 Education Lane',
  'London',
  'SW1A 1AA',
  'admin@westfield.edu',
  '020 7123 4567',
  'Dr. Elizabeth Carter'
);

-- Create profiles for each teacher
INSERT INTO profiles (
  id,
  first_name,
  last_name,
  email,
  school_id
) VALUES 
(
  '11111111-1111-1111-1111-111111111111',
  'Sarah',
  'Thompson',
  'ms.thompson@westfield.edu',
  '11111111-1111-1111-1111-111111111111'
),
(
  '22222222-2222-2222-2222-222222222222',
  'David',
  'Johnson',
  'mr.johnson@westfield.edu',
  '11111111-1111-1111-1111-111111111111'
),
(
  '33333333-3333-3333-3333-333333333333',
  'Maria',
  'Garcia',
  'ms.garcia@westfield.edu',
  '11111111-1111-1111-1111-111111111111'
),
(
  '44444444-4444-4444-4444-444444444444',
  'Robert',
  'Wilson',
  'mr.wilson@westfield.edu',
  '11111111-1111-1111-1111-111111111111'
);

-- Create teachers records
INSERT INTO teachers (
  id,
  school_id,
  email,
  first_name,
  last_name,
  subject
) VALUES 
(
  '11111111-1111-1111-1111-111111111111',
  '11111111-1111-1111-1111-111111111111',
  'ms.thompson@westfield.edu',
  'Sarah',
  'Thompson',
  'English'
),
(
  '22222222-2222-2222-2222-222222222222',
  '11111111-1111-1111-1111-111111111111',
  'mr.johnson@westfield.edu',
  'David',
  'Johnson',
  'Science'
),
(
  '33333333-3333-3333-3333-333333333333',
  '11111111-1111-1111-1111-111111111111',
  'ms.garcia@westfield.edu',
  'Maria',
  'Garcia',
  'History'
),
(
  '44444444-4444-4444-4444-444444444444',
  '11111111-1111-1111-1111-111111111111',
  'mr.wilson@westfield.edu',
  'Robert',
  'Wilson',
  'Mathematics'
);

-- Create year groups for the school
INSERT INTO year_groups (
  id,
  school_id,
  name,
  academic_year
) VALUES 
('11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Year 7', '2024-25'),
('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Year 8', '2024-25'),
('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'Year 9', '2024-25'),
('44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 'Year 10', '2024-25'),
('55555555-5555-5555-5555-555555555555', '11111111-1111-1111-1111-111111111111', 'Year 11', '2024-25');

-- Create classes for each teacher
INSERT INTO classes (
  id,
  school_id,
  year_group_id,
  name,
  subject
) VALUES 
-- Ms. Thompson's English classes
('11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444', '10A', 'English'),
('11111111-1111-1111-1111-111111111112', '11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', '9B', 'English'),
-- Mr. Johnson's Science classes
('22222222-2222-2222-2222-222222222221', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444', '10C', 'Science'),
('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '8A', 'Science'),
-- Ms. Garcia's History classes
('33333333-3333-3333-3333-333333333331', '11111111-1111-1111-1111-111111111111', '55555555-5555-5555-5555-555555555555', '11A', 'History'),
('33333333-3333-3333-3333-333333333332', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444', '10B', 'History'),
-- Mr. Wilson's Mathematics classes
('44444444-4444-4444-4444-444444444441', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444', '10D', 'Mathematics'),
('44444444-4444-4444-4444-444444444442', '11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', '9A', 'Mathematics');

-- Create sample students for each class
INSERT INTO students (
  id,
  school_id,
  first_name,
  last_name,
  year_group_id
) VALUES 
-- Students for Year 10
('s1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Alice', 'Smith', '44444444-4444-4444-4444-444444444444'),
('s1111111-1111-1111-1111-111111111112', '11111111-1111-1111-1111-111111111111', 'Bob', 'Johnson', '44444444-4444-4444-4444-444444444444'),
('s1111111-1111-1111-1111-111111111113', '11111111-1111-1111-1111-111111111111', 'Charlie', 'Brown', '44444444-4444-4444-4444-444444444444'),
('s1111111-1111-1111-1111-111111111114', '11111111-1111-1111-1111-111111111111', 'Diana', 'Wilson', '44444444-4444-4444-4444-444444444444'),
('s1111111-1111-1111-1111-111111111115', '11111111-1111-1111-1111-111111111111', 'Emma', 'Davis', '44444444-4444-4444-4444-444444444444'),
-- Students for Year 9
('s2222222-2222-2222-2222-222222222221', '11111111-1111-1111-1111-111111111111', 'Frank', 'Miller', '33333333-3333-3333-3333-333333333333'),
('s2222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Grace', 'Taylor', '33333333-3333-3333-3333-333333333333'),
('s2222222-2222-2222-2222-222222222223', '11111111-1111-1111-1111-111111111111', 'Henry', 'Anderson', '33333333-3333-3333-3333-333333333333'),
-- Students for Year 11
('s3333333-3333-3333-3333-333333333331', '11111111-1111-1111-1111-111111111111', 'Ivy', 'Thomas', '55555555-5555-5555-5555-555555555555'),
('s3333333-3333-3333-3333-333333333332', '11111111-1111-1111-1111-111111111111', 'Jack', 'Moore', '55555555-5555-5555-5555-555555555555');

-- Create student-class assignments
INSERT INTO student_classes (
  id,
  student_id,
  class_id
) VALUES 
-- Ms. Thompson's 10A English class
('sc111111-1111-1111-1111-111111111111', 's1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
('sc111111-1111-1111-1111-111111111112', 's1111111-1111-1111-1111-111111111112', '11111111-1111-1111-1111-111111111111'),
('sc111111-1111-1111-1111-111111111113', 's1111111-1111-1111-1111-111111111113', '11111111-1111-1111-1111-111111111111'),
-- Mr. Johnson's 10C Science class
('sc222222-2222-2222-2222-222222222221', 's1111111-1111-1111-1111-111111111114', '22222222-2222-2222-2222-222222222221'),
('sc222222-2222-2222-2222-222222222222', 's1111111-1111-1111-1111-111111111115', '22222222-2222-2222-2222-222222222221'),
-- Ms. Garcia's 11A History class
('sc333333-3333-3333-3333-333333333331', 's3333333-3333-3333-3333-333333333331', '33333333-3333-3333-3333-333333333331'),
('sc333333-3333-3333-3333-333333333332', 's3333333-3333-3333-3333-333333333332', '33333333-3333-3333-3333-333333333331'),
-- Mr. Wilson's 9A Mathematics class
('sc444444-4444-4444-4444-444444444441', 's2222222-2222-2222-2222-222222222221', '44444444-4444-4444-4444-444444444442'),
('sc444444-4444-4444-4444-444444444442', 's2222222-2222-2222-2222-222222222222', '44444444-4444-4444-4444-444444444442');

-- Create sample assessments for different students
INSERT INTO assessments (
  id,
  student_id,
  subject,
  level,
  assessed_at
) VALUES 
-- Alice Smith (English) - Strong student
('a1111111-1111-1111-1111-111111111111', 's1111111-1111-1111-1111-111111111111', 'English', 'Secure', '2024-03-15'),
('a1111111-1111-1111-1111-111111111112', 's1111111-1111-1111-1111-111111111111', 'English', 'Secure+', '2024-03-20'),
-- Bob Johnson (English) - Developing student
('a1111111-1111-1111-1111-111111111121', 's1111111-1111-1111-1111-111111111112', 'English', 'Developing', '2024-03-15'),
('a1111111-1111-1111-1111-111111111122', 's1111111-1111-1111-1111-111111111112', 'English', 'Developing+', '2024-03-20'),
-- Diana Wilson (Science) - Strong student
('a2222222-2222-2222-2222-222222222221', 's1111111-1111-1111-1111-111111111114', 'Science', 'Secure', '2024-03-18'),
-- Emma Davis (Science) - Needs support
('a2222222-2222-2222-2222-222222222222', 's1111111-1111-1111-1111-111111111115', 'Science', 'Emerging+', '2024-03-18'),
-- Ivy Thomas (History) - Advanced student
('a3333333-3333-3333-3333-333333333331', 's3333333-3333-3333-3333-333333333331', 'History', 'Secure+', '2024-03-22'),
-- Frank Miller (Mathematics) - Developing student
('a4444444-4444-4444-4444-444444444441', 's2222222-2222-2222-2222-222222222221', 'Mathematics', 'Developing', '2024-03-25');

-- Create onboarding records for each teacher
INSERT INTO school_onboarding (
  id,
  school_id,
  user_id,
  videos_watched,
  terms_accepted,
  safety_training_completed,
  data_uploaded,
  completed_at
) VALUES 
(
  '11111111-1111-1111-1111-111111111111',
  '11111111-1111-1111-1111-111111111111',
  '11111111-1111-1111-1111-111111111111',
  true,
  true,
  true,
  true,
  now()
),
(
  '22222222-2222-2222-2222-222222222222',
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  true,
  true,
  true,
  false,
  null
),
(
  '33333333-3333-3333-3333-333333333333',
  '11111111-1111-1111-1111-111111111111',
  '33333333-3333-3333-3333-333333333333',
  true,
  true,
  false,
  false,
  null
),
(
  '44444444-4444-4444-4444-444444444444',
  '11111111-1111-1111-1111-111111111111',
  '44444444-4444-4444-4444-444444444444',
  false,
  true,
  false,
  false,
  null
);

-- Create some sample lesson activities for different teachers
INSERT INTO lesson_activities (
  id,
  title,
  description,
  duration,
  type,
  activity_type,
  subject,
  year_group,
  dialogic_structure,
  created_by
) VALUES 
-- Ms. Thompson's English activities
(
  'la111111-1111-1111-1111-111111111111',
  'Victorian Literature Analysis',
  'Analyze Victorian social themes through close reading of key texts',
  '40 mins',
  'discussion',
  'main',
  'English',
  'Year 10',
  'Think-Pair-Share',
  '11111111-1111-1111-1111-111111111111'
),
(
  'la111111-1111-1111-1111-111111111112',
  'Creative Writing Workshop',
  'Develop creative writing skills through guided practice and peer feedback',
  '45 mins',
  'individual',
  'main',
  'English',
  'Year 9',
  'Peer Teaching',
  '11111111-1111-1111-1111-111111111111'
),
-- Mr. Johnson's Science activities
(
  'la222222-2222-2222-2222-222222222221',
  'Energy Conservation Lab',
  'Investigate energy transfer through practical experiments',
  '50 mins',
  'group',
  'main',
  'Science',
  'Year 10',
  'Collaborative Problem Solving',
  '22222222-2222-2222-2222-222222222222'
),
(
  'la222222-2222-2222-2222-222222222222',
  'Forces and Motion Starter',
  'Quick discussion on everyday examples of forces',
  '10 mins',
  'discussion',
  'starter',
  'Science',
  'Year 8',
  'Discussion',
  '22222222-2222-2222-2222-222222222222'
),
-- Ms. Garcia's History activities
(
  'la333333-3333-3333-3333-333333333331',
  'Industrial Revolution Perspectives',
  'Examine different viewpoints on industrialization impacts',
  '35 mins',
  'group',
  'main',
  'History',
  'Year 11',
  'Debate',
  '33333333-3333-3333-3333-333333333333'
),
-- Mr. Wilson's Mathematics activities
(
  'la444444-4444-4444-4444-444444444441',
  'Algebra Problem Solving',
  'Solve linear equations using systematic approaches',
  '30 mins',
  'individual',
  'main',
  'Mathematics',
  'Year 9',
  'Guided Discovery',
  '44444444-4444-4444-4444-444444444444'
);

-- Create activity details for the lesson activities
INSERT INTO activity_details (
  id,
  activity_id,
  preparation,
  steps,
  tips,
  differentiation,
  assessment
) VALUES 
(
  'ad111111-1111-1111-1111-111111111111',
  'la111111-1111-1111-1111-111111111111',
  ARRAY['Students have read Victorian literature extracts', 'Understanding of social context established'],
  ARRAY['Introduce Victorian social themes', 'Read and analyze key passages', 'Discuss in pairs', 'Share insights with class'],
  ARRAY['Use visual aids to support understanding', 'Encourage personal connections to themes'],
  ARRAY['Provide vocabulary support for EAL students', 'Offer extension questions for advanced learners'],
  ARRAY['Monitor discussion quality', 'Assess understanding through questioning']
),
(
  'ad222222-2222-2222-2222-222222222221',
  'la222222-2222-2222-2222-222222222221',
  ARRAY['Students understand basic energy concepts', 'Lab equipment is prepared and safe'],
  ARRAY['Set up experiment apparatus', 'Conduct energy transfer investigation', 'Record measurements', 'Analyze results'],
  ARRAY['Emphasize safety procedures', 'Guide students through measurement techniques'],
  ARRAY['Provide calculation support sheets', 'Offer advanced analysis for confident students'],
  ARRAY['Check practical skills', 'Assess data analysis quality']
),
(
  'ad333333-3333-3333-3333-333333333331',
  'la333333-3333-3333-3333-333333333331',
  ARRAY['Students know basic Industrial Revolution timeline', 'Understanding of different social classes'],
  ARRAY['Present different historical perspectives', 'Assign roles to groups', 'Research and prepare arguments', 'Conduct structured debate'],
  ARRAY['Ensure balanced representation of viewpoints', 'Guide students to use historical evidence'],
  ARRAY['Provide role cards with additional information', 'Challenge advanced students with complex scenarios'],
  ARRAY['Evaluate use of historical evidence', 'Assess quality of argumentation']
);

-- Log initial login events for each teacher
INSERT INTO auth_logs (
  id,
  user_id,
  email,
  event_type,
  ip_address,
  user_agent
) VALUES 
(
  'al111111-1111-1111-1111-111111111111',
  '11111111-1111-1111-1111-111111111111',
  'ms.thompson@westfield.edu',
  'registration',
  '192.168.1.100',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
),
(
  'al222222-2222-2222-2222-222222222222',
  '22222222-2222-2222-2222-222222222222',
  'mr.johnson@westfield.edu',
  'registration',
  '192.168.1.101',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
),
(
  'al333333-3333-3333-3333-333333333333',
  '33333333-3333-3333-3333-333333333333',
  'ms.garcia@westfield.edu',
  'registration',
  '192.168.1.102',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
),
(
  'al444444-4444-4444-4444-444444444444',
  '44444444-4444-4444-4444-444444444444',
  'mr.wilson@westfield.edu',
  'registration',
  '192.168.1.103',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
);