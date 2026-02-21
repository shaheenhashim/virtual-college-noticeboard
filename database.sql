-- Create Database
CREATE DATABASE IF NOT EXISTS notice_board_db;
USE notice_board_db;

-- Students Table
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admins Table
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('super-admin', 'examination', 'scholarship', 'academics', 'events', 'placement') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notices Table
CREATE TABLE IF NOT EXISTS notices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    section ENUM('examination', 'scholarship', 'academics', 'events', 'placement') NOT NULL,
    importance ENUM('normal', 'important') DEFAULT 'normal',
    date_posted DATE NOT NULL,
    expiry_date DATE NOT NULL,
    posted_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (posted_by) REFERENCES admins(id) ON DELETE CASCADE,
    INDEX idx_section (section),
    INDEX idx_date_posted (date_posted),
    INDEX idx_expiry_date (expiry_date)
);

-- Attachments Table
CREATE TABLE IF NOT EXISTS attachments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    notice_id INT NOT NULL,
    filename VARCHAR(255) NOT NULL,
    file_type ENUM('pdf', 'image') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (notice_id) REFERENCES notices(id) ON DELETE CASCADE
);

-- Insert Sample Students (password: student123 - hashed using bcrypt)
INSERT INTO students (student_id, name, email, password) VALUES
('STU001', 'John Doe', 'john.doe@college.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5Mg3VYvS7lQS2'),
('STU002', 'Jane Smith', 'jane.smith@college.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5Mg3VYvS7lQS2'),
('STU003', 'Mike Johnson', 'mike.johnson@college.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5Mg3VYvS7lQS2'),
('STU004', 'Sarah Williams', 'sarah.williams@college.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5Mg3VYvS7lQS2'),
('STU005', 'David Brown', 'david.brown@college.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5Mg3VYvS7lQS2');

-- Insert Sample Admins
-- Password for super-admin: super123
-- Password for other admins: admin123
INSERT INTO admins (username, email, password, role) VALUES
('superadmin', 'superadmin@college.edu', '$2b$12$X8fW7bVE3QN6YlQYP8wB6.JqKHQbMQKy6fV7xP3vPvYZx8Y9qmQKq', 'super-admin'),
('exam_admin', 'exam@college.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5Mg3VYvS7lQS2', 'examination'),
('scholar_admin', 'scholarship@college.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5Mg3VYvS7lQS2', 'scholarship'),
('acad_admin', 'academics@college.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5Mg3VYvS7lQS2', 'academics'),
('event_admin', 'events@college.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5Mg3VYvS7lQS2', 'events'),
('place_admin', 'placement@college.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5Mg3VYvS7lQS2', 'placement');

-- Insert Sample Notices
INSERT INTO notices (title, description, section, importance, date_posted, expiry_date, posted_by) VALUES
('Mid-Semester Examination Schedule - Fall 2024', 'The mid-semester examinations for all undergraduate programs will be conducted from March 15-22, 2024. Students are advised to check the detailed timetable on the examination portal. Hall tickets will be available for download from March 10, 2024.', 'examination', 'important', '2024-02-01', '2024-03-22', 2),
('Hall Ticket Download Instructions', 'Students can download their examination hall tickets from the student portal starting February 5, 2024. Please ensure all fee payments are cleared before downloading.', 'examination', 'normal', '2024-01-28', '2024-03-15', 2),
('Merit Scholarship Application Open for 2024', 'Applications are now open for merit-based scholarships for the academic year 2024. Eligible students with a CGPA above 8.0 can apply. Please download the application form and submit before the deadline.', 'scholarship', 'normal', '2024-01-30', '2024-02-28', 3),
('Annual Tech Fest 2024 - Registration Open', 'The annual tech fest "TechnoVista 2024" will be held on March 5-7, 2024. Students can register for various competitions including coding, robotics, and project exhibitions. Register now to secure your spot!', 'events', 'normal', '2024-01-28', '2024-03-07', 5),
('Course Registration for Spring Semester 2024', 'Course registration for Spring Semester 2024 will begin on February 10, 2024. Students must complete their registration within the stipulated time. Please consult your academic advisor before registration.', 'academics', 'important', '2024-01-25', '2024-02-20', 4),
('Campus Recruitment Drive - Tech Giants 2024', 'Leading tech companies will be visiting campus for recruitment in February. Final year students are requested to update their resumes and register through the placement portal. Pre-placement talks will be scheduled soon.', 'placement', 'normal', '2024-01-22', '2024-03-01', 6),
('Library Extended Hours During Exams', 'The college library will operate with extended hours during the examination period. From March 10-25, the library will be open from 7 AM to 11 PM including weekends.', 'academics', 'normal', '2024-01-20', '2024-03-25', 4),
('Sports Day 2024 - Participation Registration', 'Annual Sports Day will be organized on February 15, 2024. Students interested in participating in various sports events should register with the sports department by February 5, 2024.', 'events', 'normal', '2024-01-18', '2024-02-15', 5),
('Answer Script Review Process', 'Students who wish to apply for answer script review should submit their applications within 7 days of result publication along with the prescribed fee.', 'examination', 'normal', '2024-01-20', '2024-01-31', 2),
('Workshop on AI and Machine Learning', 'A two-day workshop on Artificial Intelligence and Machine Learning will be conducted on February 20-21, 2024. Industry experts will be conducting hands-on sessions. Limited seats available.', 'academics', 'important', '2024-01-15', '2024-02-21', 4);
