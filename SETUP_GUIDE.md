# Virtual College Notice Board System - Complete Setup Guide

This guide will walk you through setting up the complete Virtual College Notice Board System with Python Flask backend and MySQL database.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Database Setup](#database-setup)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Running the Application](#running-the-application)
6. [Testing the Application](#testing-the-application)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### 1. Python (Version 3.8 or higher)
- **Windows**: Download from [python.org](https://www.python.org/downloads/)
- **macOS**: Use Homebrew: `brew install python3`
- **Linux**: `sudo apt-get install python3 python3-pip`

Verify installation:
```bash
python --version
# or
python3 --version
```

### 2. MySQL Server (Version 8.0 or higher)
- **Windows**: Download from [MySQL Downloads](https://dev.mysql.com/downloads/mysql/)
- **macOS**: Use Homebrew: `brew install mysql`
- **Linux**: `sudo apt-get install mysql-server`

Verify installation:
```bash
mysql --version
```

### 3. pip (Python Package Manager)
Usually comes with Python. Verify:
```bash
pip --version
# or
pip3 --version
```

---

## Database Setup

### Step 1: Start MySQL Service

**Windows:**
- Open Services (Win + R, type `services.msc`)
- Find "MySQL" and start it
- Or use Command Prompt: `net start MySQL80`

**macOS:**
```bash
brew services start mysql
```

**Linux:**
```bash
sudo systemctl start mysql
sudo systemctl enable mysql
```

### Step 2: Login to MySQL

```bash
mysql -u root -p
```

Enter your MySQL root password when prompted. If you haven't set one, just press Enter.

### Step 3: Create Database and Import Schema

**Option A: Using MySQL Command Line**

While logged into MySQL:
```sql
CREATE DATABASE notice_board_db;
USE notice_board_db;
```

Then exit MySQL (`exit;`) and import the schema:
```bash
mysql -u root -p notice_board_db < database.sql
```

**Option B: Direct Import**

If you prefer, you can import directly:
```bash
mysql -u root -p < database.sql
```

### Step 4: Verify Database Setup

Login to MySQL again and verify:
```bash
mysql -u root -p
```

```sql
USE notice_board_db;
SHOW TABLES;
```

You should see these tables:
- admins
- attachments
- notices
- students

Check sample data:
```sql
SELECT * FROM students;
SELECT * FROM admins;
SELECT * FROM notices;
```

---

## Backend Setup

### Step 1: Create Project Directory

Create a main project folder and organize your files:

```bash
mkdir virtual-notice-board
cd virtual-notice-board
```

### Step 2: Project Structure

Organize your files in this structure:

```
virtual-notice-board/
├── app.py
├── config.py
├── database.sql
├── requirements.txt
├── uploads/            (will be created automatically)
└── static/
    ├── index.html
    ├── student-login.html
    ├── admin-login.html
    ├── student-dashboard.html
    ├── section-admin.html
    ├── admin-dashboard.html
    ├── add-notice.html
    ├── style.css
    └── script.js
```

### Step 3: Place Your Files

1. Copy all Python files (`app.py`, `config.py`) to the root directory
2. Copy all HTML, CSS, and JS files to the `static/` folder
3. Make sure `database.sql` is in the root directory

### Step 4: Configure Database Connection

Open `config.py` and update the database credentials:

```python
# Database configuration
DB_HOST = 'localhost'
DB_NAME = 'notice_board_db'
DB_USER = 'root'
DB_PASSWORD = 'YOUR_MYSQL_PASSWORD'  # Set your MySQL password here
```

**Important**: Replace `YOUR_MYSQL_PASSWORD` with your actual MySQL root password.

### Step 5: Create Virtual Environment (Recommended)

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

You'll see `(venv)` in your command prompt when activated.

### Step 6: Install Python Dependencies

With virtual environment activated:

```bash
pip install -r requirements.txt
```

This will install:
- Flask (Web framework)
- Flask-CORS (Cross-Origin Resource Sharing)
- Flask-Bcrypt (Password hashing)
- Flask-JWT-Extended (Authentication)
- mysql-connector-python (MySQL database driver)
- python-dotenv (Environment variables)
- Werkzeug (WSGI utilities)

### Step 7: Create Uploads Directory

The uploads directory will be created automatically, but you can create it manually:

```bash
mkdir uploads
```

---

## Frontend Setup

### Step 1: Update API Configuration

Your `script.js` file already has the API configuration. Verify it points to your backend:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

If your backend runs on a different port, update this URL accordingly.

### Step 2: Verify File Paths

Make sure all your HTML files correctly reference the CSS and JS files:

```html
<link rel="stylesheet" href="style.css">
<script src="script.js"></script>
```

---

## Running the Application

### Step 1: Start the Backend Server

In your project directory with virtual environment activated:

```bash
python app.py
```

You should see output like:
```
 * Running on http://127.0.0.1:5000
 * Running on http://0.0.0.0:5000
```

**Keep this terminal window open!**

### Step 2: Access the Application

Open your web browser and navigate to:

```
http://localhost:5000
```

You should see the Virtual Notice Board homepage.

---

## Testing the Application

### Test Credentials

The system comes with pre-configured demo accounts:

#### Student Login
- **Student ID**: `STU001`
- **Password**: `student123`

Other student IDs: STU002, STU003, STU004, STU005 (all use password: `student123`)

#### Super Admin Login
- **Role**: Super Admin
- **Username**: `superadmin`
- **Password**: `super123`

#### Section Admin Logins
All section admins use password: `admin123`

| Role | Username |
|------|----------|
| Examination | exam_admin |
| Scholarship | scholar_admin |
| Academics | acad_admin |
| Events | event_admin |
| Placement | place_admin |

### Testing Flow

1. **Test Student Access**
   - Go to Student Login
   - Login with STU001 / student123
   - View notices, filter by section, search

2. **Test Section Admin**
   - Logout
   - Go to Admin Login
   - Select "Examination Admin"
   - Login with exam_admin / admin123
   - View your notices
   - Add new notice
   - Edit/Delete notices

3. **Test Super Admin**
   - Logout
   - Go to Admin Login
   - Select "Super Admin"
   - Login with superadmin / super123
   - View all notices
   - View statistics
   - Manage admins

---

## API Endpoints Reference

### Authentication
- `POST /api/auth/student/login` - Student login
- `POST /api/auth/admin/login` - Admin login

### Notices
- `GET /api/notices` - Get all notices (with filters)
- `GET /api/notices/<id>` - Get specific notice
- `POST /api/notices` - Create notice (Admin only)
- `PUT /api/notices/<id>` - Update notice (Admin only)
- `DELETE /api/notices/<id>` - Delete notice (Admin only)

### Statistics
- `GET /api/statistics` - Get dashboard statistics (Admin only)

### Admins
- `GET /api/admins` - Get all admins (Super Admin only)

---

## Troubleshooting

### Common Issues and Solutions

#### 1. "Module not found" errors
**Solution**: Make sure virtual environment is activated and dependencies are installed
```bash
pip install -r requirements.txt
```

#### 2. MySQL connection errors
**Solutions**:
- Verify MySQL is running: `mysql -u root -p`
- Check credentials in `config.py`
- Ensure database exists: `SHOW DATABASES;`

#### 3. "Port 5000 already in use"
**Solution**: Change port in `app.py`:
```python
app.run(debug=True, host='0.0.0.0', port=5001)  # Use different port
```

Then update `script.js`:
```javascript
const API_BASE_URL = 'http://localhost:5001/api';
```

#### 4. CORS errors in browser console
**Solution**: Already handled by Flask-CORS, but verify it's installed:
```bash
pip install Flask-CORS
```

#### 5. "Cannot read property of null" JavaScript errors
**Solution**: 
- Open browser developer console (F12)
- Check if API requests are successful
- Verify you're logged in (token exists in localStorage)

#### 6. File upload not working
**Solution**:
- Check `uploads/` directory exists and has write permissions
- Verify file size is under 5MB
- Check file type is PDF, JPG, JPEG, or PNG

#### 7. Password hashing issues
**Problem**: The demo passwords in database.sql are pre-hashed for these credentials.

If you need to add new users, use this Python script to generate hashed passwords:

```python
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt()
password = "your_password"
hashed = bcrypt.generate_password_hash(password).decode('utf-8')
print(hashed)
```

### Checking Logs

Enable detailed error logging by setting Flask debug mode in `app.py`:
```python
app.run(debug=True)
```

### Resetting the Database

If you need to start fresh:

```bash
mysql -u root -p
```

```sql
DROP DATABASE notice_board_db;
CREATE DATABASE notice_board_db;
exit;
```

Then reimport:
```bash
mysql -u root -p notice_board_db < database.sql
```

---

## Development Tips

### 1. Modify Existing Data

To modify notices, students, or admins, use MySQL:

```bash
mysql -u root -p notice_board_db
```

```sql
-- View all notices
SELECT * FROM notices;

-- Update a notice
UPDATE notices SET title = 'New Title' WHERE id = 1;

-- Add a new student
INSERT INTO students (student_id, name, email, password) 
VALUES ('STU006', 'New Student', 'new@college.edu', '$2b$12$...');
```

### 2. Testing API with Postman or cURL

**Example: Login**
```bash
curl -X POST http://localhost:5000/api/auth/student/login \
  -H "Content-Type: application/json" \
  -d '{"studentId":"STU001","password":"student123"}'
```

**Example: Get Notices (with token)**
```bash
curl -X GET http://localhost:5000/api/notices \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 3. Customization

- **Colors/Styles**: Edit `static/style.css`
- **Database schema**: Modify `database.sql` and recreate database
- **API endpoints**: Edit `app.py`
- **Frontend logic**: Edit `static/script.js`

---

## Production Deployment (Optional)

For production deployment, consider:

1. **Use environment variables** for sensitive data
2. **Disable debug mode** in `app.py`
3. **Use a production WSGI server** like Gunicorn
4. **Set up HTTPS** with SSL certificates
5. **Use a production database** with proper security
6. **Configure firewall rules**
7. **Set up automatic backups**

---

## Need Help?

If you encounter issues not covered here:

1. Check the browser console (F12) for JavaScript errors
2. Check the terminal running Flask for Python errors
3. Verify MySQL is running and accessible
4. Ensure all files are in correct locations
5. Check file permissions for uploads directory

---

## Summary

You now have a fully functional Virtual College Notice Board System with:
- ✅ MySQL database with sample data
- ✅ Python Flask REST API backend
- ✅ HTML/CSS/JavaScript frontend
- ✅ JWT authentication
- ✅ File upload functionality
- ✅ Role-based access control (Student, Section Admin, Super Admin)

Enjoy your Virtual Notice Board System!
