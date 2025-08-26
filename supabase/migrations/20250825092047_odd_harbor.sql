/*
  # Create Individual English Teacher Accounts

  1. New Users
    - Creates 4 individual English teachers with realistic names
    - Each has their own school, classes, and student data
    - Different onboarding completion levels for varied testing

  2. Schools
    - Creates separate schools for each teacher
    - Realistic school names and locations

  3. Teacher Profiles
    - Individual profiles with different completion states
    - Varied onboarding progress for testing different scenarios

  4. Classes and Students
    - Each teacher has their own classes and students
    - Different year groups and class sizes
    - Individual student assessment data
*/

-- Create individual schools for each teacher
INSERT INTO schools (id, name, address, city, postcode, admin_name, admin_email, admin_phone) VALUES
  ('school-sarah-001', 'Westfield Academy', '123 Education Lane', 'Manchester', 'M1 2AB', 'Sarah Mitchell', 'sarah.mitchell@westfield.edu', '0161 234 5678'),
  ('school-james-002', 'Riverside Secondary School', '45 River Road', 'Birmingham', 'B2 3CD', 'James Parker', 'james.parker@riverside.edu', '0121 345 6789'),
  ('school-emma-003', 'Oakwood High School', '78 Oak Street', 'Leeds', 'LS4 5EF', 'Emma Thompson', 'emma.thompson@oakwood.edu', '0113 456 7890'),
  ('school-david-004', 'Greenhill College', '90 Green Hill', 'Liverpool', 'L8 9GH', 'David Wilson', 'david.wilson@greenhill.edu', '0151 567 8901');

-- Create individual teacher user accounts
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data) VALUES
  ('user-sarah-001', 'sarah.mitchell@westfield.edu', crypt('Teacher123!', gen_salt('bf')), now(), now(), now(), '{"provider": "email", "providers": ["email"]}', '{"first_name": "Sarah", "last_name": "Mitchell"}'),
  ('user-james-002', 'james.parker@riverside.edu', crypt('Teacher123!', gen_salt('bf')), now(), now(), now(), '{"provider": "email", "providers": ["email"]}', '{"first_name": "James", "last_name": "Parker"}'),
  ('user-emma-003', 'emma.thompson@oakwood.edu', crypt('Teacher123!', gen_salt('bf')), now(), now(), now(), '{"provider": "email", "providers": ["email"]}', '{"first_name": "Emma", "last_name": "Thompson"}'),
  ('user-david-004', 'david.wilson@greenhill.edu', crypt('Teacher123!', gen_salt('bf')), now(), now(), now(), '{"provider": "email", "providers": ["email"]}', '{"first_name": "David", "last_name": "Wilson"}');

-- Create teacher profiles
INSERT INTO profiles (id, first_name, last_name, email, school_id, created_at, updated_at) VALUES
  ('user-sarah-001', 'Sarah', 'Mitchell', 'sarah.mitchell@westfield.edu', 'school-sarah-001', now(), now()),
  ('user-james-002', 'James', 'Parker', 'james.parker@riverside.edu', 'school-james-002', now(), now()),
  ('user-emma-003', 'Emma', 'Thompson', 'emma.thompson@oakwood.edu', 'school-emma-003', now(), now()),
  ('user-david-004', 'David', 'Wilson', 'david.wilson@greenhill.edu', 'school-david-004', now(), now());

-- Create onboarding records with different completion states
INSERT INTO school_onboarding (school_id, user_id, videos_watched, terms_accepted, safety_training_completed, data_uploaded, completed_at) VALUES
  ('school-sarah-001', 'user-sarah-001', true, true, true, true, now()), -- Fully completed
  ('school-james-002', 'user-james-002', true, true, true, false, null), -- Missing data upload
  ('school-emma-003', 'user-emma-003', true, true, false, false, null), -- Missing safety training and data
  ('school-david-004', 'user-david-004', false, false, false, false, null); -- New user, nothing completed

-- Create year groups for each school
INSERT INTO year_groups (school_id, name, academic_year) VALUES
  ('school-sarah-001', 'Year 10', '2024-25'),
  ('school-sarah-001', 'Year 9', '2024-25'),
  ('school-james-002', 'Year 11', '2024-25'),
  ('school-james-002', 'Year 10', '2024-25'),
  ('school-emma-003', 'Year 10', '2024-25'),
  ('school-emma-003', 'Year 8', '2024-25'),
  ('school-david-004', 'Year 9', '2024-25'),
  ('school-david-004', 'Year 7', '2024-25');

-- Create classes for each teacher
INSERT INTO classes (school_id, year_group_id, name, subject) VALUES
  -- Sarah Mitchell's classes
  ((SELECT id FROM year_groups WHERE school_id = 'school-sarah-001' AND name = 'Year 10'), (SELECT id FROM year_groups WHERE school_id = 'school-sarah-001' AND name = 'Year 10'), '10A', 'English'),
  ((SELECT id FROM year_groups WHERE school_id = 'school-sarah-001' AND name = 'Year 9'), (SELECT id FROM year_groups WHERE school_id = 'school-sarah-001' AND name = 'Year 9'), '9B', 'English'),
  
  -- James Parker's classes
  ((SELECT id FROM year_groups WHERE school_id = 'school-james-002' AND name = 'Year 11'), (SELECT id FROM year_groups WHERE school_id = 'school-james-002' AND name = 'Year 11'), '11A', 'English'),
  ((SELECT id FROM year_groups WHERE school_id = 'school-james-002' AND name = 'Year 10'), (SELECT id FROM year_groups WHERE school_id = 'school-james-002' AND name = 'Year 10'), '10C', 'English'),
  
  -- Emma Thompson's classes
  ((SELECT id FROM year_groups WHERE school_id = 'school-emma-003' AND name = 'Year 10'), (SELECT id FROM year_groups WHERE school_id = 'school-emma-003' AND name = 'Year 10'), '10B', 'English'),
  ((SELECT id FROM year_groups WHERE school_id = 'school-emma-003' AND name = 'Year 8'), (SELECT id FROM year_groups WHERE school_id = 'school-emma-003' AND name = 'Year 8'), '8A', 'English'),
  
  -- David Wilson's classes
  ((SELECT id FROM year_groups WHERE school_id = 'school-david-004' AND name = 'Year 9'), (SELECT id FROM year_groups WHERE school_id = 'school-david-004' AND name = 'Year 9'), '9A', 'English'),
  ((SELECT id FROM year_groups WHERE school_id = 'school-david-004' AND name = 'Year 7'), (SELECT id FROM year_groups WHERE school_id = 'school-david-004' AND name = 'Year 7'), '7B', 'English');

-- Create sample students for each teacher (5-8 students per class)
-- Sarah Mitchell's students (Year 10A)
INSERT INTO students (school_id, first_name, last_name, year_group_id) VALUES
  ('school-sarah-001', 'Alice', 'Johnson', (SELECT id FROM year_groups WHERE school_id = 'school-sarah-001' AND name = 'Year 10')),
  ('school-sarah-001', 'Ben', 'Williams', (SELECT id FROM year_groups WHERE school_id = 'school-sarah-001' AND name = 'Year 10')),
  ('school-sarah-001', 'Chloe', 'Brown', (SELECT id FROM year_groups WHERE school_id = 'school-sarah-001' AND name = 'Year 10')),
  ('school-sarah-001', 'Daniel', 'Davis', (SELECT id FROM year_groups WHERE school_id = 'school-sarah-001' AND name = 'Year 10')),
  ('school-sarah-001', 'Emily', 'Miller', (SELECT id FROM year_groups WHERE school_id = 'school-sarah-001' AND name = 'Year 10')),
  ('school-sarah-001', 'Finn', 'Wilson', (SELECT id FROM year_groups WHERE school_id = 'school-sarah-001' AND name = 'Year 10'));

-- Sarah Mitchell's students (Year 9B)
INSERT INTO students (school_id, first_name, last_name, year_group_id) VALUES
  ('school-sarah-001', 'Grace', 'Taylor', (SELECT id FROM year_groups WHERE school_id = 'school-sarah-001' AND name = 'Year 9')),
  ('school-sarah-001', 'Harry', 'Anderson', (SELECT id FROM year_groups WHERE school_id = 'school-sarah-001' AND name = 'Year 9')),
  ('school-sarah-001', 'Isla', 'Thomas', (SELECT id FROM year_groups WHERE school_id = 'school-sarah-001' AND name = 'Year 9')),
  ('school-sarah-001', 'Jack', 'Jackson', (SELECT id FROM year_groups WHERE school_id = 'school-sarah-001' AND name = 'Year 9')),
  ('school-sarah-001', 'Katie', 'White', (SELECT id FROM year_groups WHERE school_id = 'school-sarah-001' AND name = 'Year 9'));

-- James Parker's students (Year 11A)
INSERT INTO students (school_id, first_name, last_name, year_group_id) VALUES
  ('school-james-002', 'Liam', 'Harris', (SELECT id FROM year_groups WHERE school_id = 'school-james-002' AND name = 'Year 11')),
  ('school-james-002', 'Maya', 'Martin', (SELECT id FROM year_groups WHERE school_id = 'school-james-002' AND name = 'Year 11')),
  ('school-james-002', 'Noah', 'Garcia', (SELECT id FROM year_groups WHERE school_id = 'school-james-002' AND name = 'Year 11')),
  ('school-james-002', 'Olivia', 'Rodriguez', (SELECT id FROM year_groups WHERE school_id = 'school-james-002' AND name = 'Year 11')),
  ('school-james-002', 'Peter', 'Lewis', (SELECT id FROM year_groups WHERE school_id = 'school-james-002' AND name = 'Year 11')),
  ('school-james-002', 'Quinn', 'Lee', (SELECT id FROM year_groups WHERE school_id = 'school-james-002' AND name = 'Year 11')),
  ('school-james-002', 'Ruby', 'Walker', (SELECT id FROM year_groups WHERE school_id = 'school-james-002' AND name = 'Year 11'));

-- James Parker's students (Year 10C)
INSERT INTO students (school_id, first_name, last_name, year_group_id) VALUES
  ('school-james-002', 'Sam', 'Hall', (SELECT id FROM year_groups WHERE school_id = 'school-james-002' AND name = 'Year 10')),
  ('school-james-002', 'Tara', 'Allen', (SELECT id FROM year_groups WHERE school_id = 'school-james-002' AND name = 'Year 10')),
  ('school-james-002', 'Uma', 'Young', (SELECT id FROM year_groups WHERE school_id = 'school-james-002' AND name = 'Year 10')),
  ('school-james-002', 'Victor', 'King', (SELECT id FROM year_groups WHERE school_id = 'school-james-002' AND name = 'Year 10')),
  ('school-james-002', 'Willow', 'Wright', (SELECT id FROM year_groups WHERE school_id = 'school-james-002' AND name = 'Year 10'));

-- Emma Thompson's students (Year 10B)
INSERT INTO students (school_id, first_name, last_name, year_group_id) VALUES
  ('school-emma-003', 'Xavier', 'Lopez', (SELECT id FROM year_groups WHERE school_id = 'school-emma-003' AND name = 'Year 10')),
  ('school-emma-003', 'Yara', 'Hill', (SELECT id FROM year_groups WHERE school_id = 'school-emma-003' AND name = 'Year 10')),
  ('school-emma-003', 'Zoe', 'Green', (SELECT id FROM year_groups WHERE school_id = 'school-emma-003' AND name = 'Year 10')),
  ('school-emma-003', 'Adam', 'Adams', (SELECT id FROM year_groups WHERE school_id = 'school-emma-003' AND name = 'Year 10')),
  ('school-emma-003', 'Bella', 'Baker', (SELECT id FROM year_groups WHERE school_id = 'school-emma-003' AND name = 'Year 10')),
  ('school-emma-003', 'Charlie', 'Gonzalez', (SELECT id FROM year_groups WHERE school_id = 'school-emma-003' AND name = 'Year 10'));

-- Emma Thompson's students (Year 8A)
INSERT INTO students (school_id, first_name, last_name, year_group_id) VALUES
  ('school-emma-003', 'Diana', 'Nelson', (SELECT id FROM year_groups WHERE school_id = 'school-emma-003' AND name = 'Year 8')),
  ('school-emma-003', 'Ethan', 'Carter', (SELECT id FROM year_groups WHERE school_id = 'school-emma-003' AND name = 'Year 8')),
  ('school-emma-003', 'Fiona', 'Mitchell', (SELECT id FROM year_groups WHERE school_id = 'school-emma-003' AND name = 'Year 8')),
  ('school-emma-003', 'George', 'Perez', (SELECT id FROM year_groups WHERE school_id = 'school-emma-003' AND name = 'Year 8'));

-- David Wilson's students (Year 9A)
INSERT INTO students (school_id, first_name, last_name, year_group_id) VALUES
  ('school-david-004', 'Hannah', 'Roberts', (SELECT id FROM year_groups WHERE school_id = 'school-david-004' AND name = 'Year 9')),
  ('school-david-004', 'Ian', 'Turner', (SELECT id FROM year_groups WHERE school_id = 'school-david-004' AND name = 'Year 9')),
  ('school-david-004', 'Jasmine', 'Phillips', (SELECT id FROM year_groups WHERE school_id = 'school-david-004' AND name = 'Year 9')),
  ('school-david-004', 'Kyle', 'Campbell', (SELECT id FROM year_groups WHERE school_id = 'school-david-004' AND name = 'Year 9')),
  ('school-david-004', 'Luna', 'Parker', (SELECT id FROM year_groups WHERE school_id = 'school-david-004' AND name = 'Year 9')),
  ('school-david-004', 'Mason', 'Evans', (SELECT id FROM year_groups WHERE school_id = 'school-david-004' AND name = 'Year 9'));

-- David Wilson's students (Year 7B)
INSERT INTO students (school_id, first_name, last_name, year_group_id) VALUES
  ('school-david-004', 'Nora', 'Edwards', (SELECT id FROM year_groups WHERE school_id = 'school-david-004' AND name = 'Year 7')),
  ('school-david-004', 'Oscar', 'Collins', (SELECT id FROM year_groups WHERE school_id = 'school-david-004' AND name = 'Year 7')),
  ('school-david-004', 'Penny', 'Stewart', (SELECT id FROM year_groups WHERE school_id = 'school-david-004' AND name = 'Year 7')),
  ('school-david-004', 'Quinn', 'Sanchez', (SELECT id FROM year_groups WHERE school_id = 'school-david-004' AND name = 'Year 7'));

-- Create sample assessments for each teacher's students
-- Sarah Mitchell's assessments (Dystopian Fiction theme)
INSERT INTO assessments (student_id, subject, level, assessed_at) VALUES
  ((SELECT id FROM students WHERE first_name = 'Alice' AND last_name = 'Johnson'), 'English', 'Secure', '2024-03-15'),
  ((SELECT id FROM students WHERE first_name = 'Ben' AND last_name = 'Williams'), 'English', 'Developing+', '2024-03-15'),
  ((SELECT id FROM students WHERE first_name = 'Chloe' AND last_name = 'Brown'), 'English', 'Developing', '2024-03-15'),
  ((SELECT id FROM students WHERE first_name = 'Daniel' AND last_name = 'Davis'), 'English', 'Secure', '2024-03-15'),
  ((SELECT id FROM students WHERE first_name = 'Emily' AND last_name = 'Miller'), 'English', 'Emerging+', '2024-03-15'),
  ((SELECT id FROM students WHERE first_name = 'Finn' AND last_name = 'Wilson'), 'English', 'Developing+', '2024-03-15');

-- James Parker's assessments (Creative Writing theme)
INSERT INTO assessments (student_id, subject, level, assessed_at) VALUES
  ((SELECT id FROM students WHERE first_name = 'Liam' AND last_name = 'Harris'), 'English', 'Secure+', '2024-03-20'),
  ((SELECT id FROM students WHERE first_name = 'Maya' AND last_name = 'Martin'), 'English', 'Secure', '2024-03-20'),
  ((SELECT id FROM students WHERE first_name = 'Noah' AND last_name = 'Garcia'), 'English', 'Developing', '2024-03-20'),
  ((SELECT id FROM students WHERE first_name = 'Olivia' AND last_name = 'Rodriguez'), 'English', 'Secure', '2024-03-20'),
  ((SELECT id FROM students WHERE first_name = 'Peter' AND last_name = 'Lewis'), 'English', 'Developing+', '2024-03-20');

-- Emma Thompson's assessments (War Poetry theme)
INSERT INTO assessments (student_id, subject, level, assessed_at) VALUES
  ((SELECT id FROM students WHERE first_name = 'Xavier' AND last_name = 'Lopez'), 'English', 'Developing+', '2024-03-18'),
  ((SELECT id FROM students WHERE first_name = 'Yara' AND last_name = 'Hill'), 'English', 'Secure', '2024-03-18'),
  ((SELECT id FROM students WHERE first_name = 'Zoe' AND last_name = 'Green'), 'English', 'Emerging+', '2024-03-18'),
  ((SELECT id FROM students WHERE first_name = 'Adam' AND last_name = 'Adams'), 'English', 'Developing', '2024-03-18');

-- David Wilson's assessments (Shakespeare theme)
INSERT INTO assessments (student_id, subject, level, assessed_at) VALUES
  ((SELECT id FROM students WHERE first_name = 'Hannah' AND last_name = 'Roberts'), 'English', 'Developing', '2024-03-22'),
  ((SELECT id FROM students WHERE first_name = 'Ian' AND last_name = 'Turner'), 'English', 'Emerging+', '2024-03-22'),
  ((SELECT id FROM students WHERE first_name = 'Jasmine' AND last_name = 'Phillips'), 'English', 'Developing+', '2024-03-22'),
  ((SELECT id FROM students WHERE first_name = 'Kyle' AND last_name = 'Campbell'), 'English', 'Emerging', '2024-03-22');

-- Create login history for each user
INSERT INTO auth_logs (user_id, email, event_type, ip_address, user_agent) VALUES
  ('user-sarah-001', 'sarah.mitchell@westfield.edu', 'login', '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'),
  ('user-james-002', 'james.parker@riverside.edu', 'login', '192.168.1.101', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'),
  ('user-emma-003', 'emma.thompson@oakwood.edu', 'login', '192.168.1.102', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'),
  ('user-david-004', 'david.wilson@greenhill.edu', 'registration', '192.168.1.103', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');