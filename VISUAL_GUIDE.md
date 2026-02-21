# Visual Step-by-Step Installation Guide
## Virtual College Notice Board System

This guide provides a simplified, visual walkthrough for setting up your Virtual Notice Board System.

---

## 📌 Overview

You'll complete these 5 main steps:
1. ✅ Install Prerequisites
2. ✅ Setup Database
3. ✅ Configure Backend
4. ✅ Install Dependencies
5. ✅ Run Application

**Estimated Time**: 20-30 minutes

---

## Step 1: Install Prerequisites

### 1.1 Install Python

**Windows:**
1. Go to https://www.python.org/downloads/
2. Download Python 3.11 or higher
3. Run installer
4. ✅ CHECK "Add Python to PATH"
5. Click "Install Now"

**Verify Installation:**
```
Open Command Prompt (Windows) or Terminal (Mac/Linux)
Type: python --version
You should see: Python 3.11.x or higher
```

### 1.2 Install MySQL

**Windows:**
1. Go to https://dev.mysql.com/downloads/installer/
2. Download "MySQL Installer for Windows"
3. Run installer
4. Choose "Developer Default"
5. Click "Execute" to install
6. Set root password (remember this!)
7. Complete installation

**Mac (using Homebrew):**
```bash
brew install mysql
brew services start mysql
mysql_secure_installation
```

**Linux:**
```bash
sudo apt-get update
sudo apt-get install mysql-server
sudo systemctl start mysql
sudo mysql_secure_installation
```

**Verify Installation:**
```
Open Command Prompt/Terminal
Type: mysql --version
You should see: mysql Ver 8.x.x
```

---

## Step 2: Setup Database

### 2.1 Organize Your Files

Create a folder structure like this:

```
📁 virtual-notice-board/
   📄 app.py
   📄 config.py
   📄 database.sql
   📄 requirements.txt
   📄 hash_password.py
   📄 README.md
   📄 SETUP_GUIDE.md
   📄 start_windows.bat (Windows)
   📄 start_unix.sh (Mac/Linux)
   📁 static/
      📄 index.html
      📄 student-login.html
      📄 student-dashboard.html
      📄 admin-login.html
      📄 admin-dashboard.html
      📄 section-admin.html
      📄 add-notice.html
      📄 style.css
      📄 script.js
   📁 uploads/ (will be created automatically)
```

### 2.2 Import Database

**Method 1: Using Command Line (Recommended)**

1. Open Command Prompt/Terminal
2. Navigate to your project folder:
   ```bash
   cd path/to/virtual-notice-board
   ```

3. Login to MySQL:
   ```bash
   mysql -u root -p
   ```
   Enter your MySQL password

4. You'll see: `mysql>`

5. Import the database:
   ```sql
   source database.sql;
   ```
   OR exit MySQL first and run:
   ```bash
   mysql -u root -p < database.sql
   ```

**Method 2: Using MySQL Workbench (GUI)**

1. Open MySQL Workbench
2. Connect to your local MySQL server
3. Click "Server" → "Data Import"
4. Select "Import from Self-Contained File"
5. Browse and select `database.sql`
6. Click "Start Import"

### 2.3 Verify Database

```bash
mysql -u root -p
```

```sql
USE notice_board_db;
SHOW TABLES;
```

You should see:
- admins
- attachments  
- notices
- students

```sql
SELECT COUNT(*) FROM students;
SELECT COUNT(*) FROM admins;
SELECT COUNT(*) FROM notices;
```

You should see:
- 5 students
- 6 admins
- 10 notices

Type `exit;` to quit MySQL.

---

## Step 3: Configure Backend

### 3.1 Update config.py

1. Open `config.py` in a text editor
2. Find this section:
   ```python
   DB_PASSWORD = ''
   ```
3. Replace with your MySQL password:
   ```python
   DB_PASSWORD = 'your_mysql_password_here'
   ```
4. Save the file

**Example:**
```python
# Database configuration
DB_HOST = 'localhost'
DB_NAME = 'notice_board_db'
DB_USER = 'root'
DB_PASSWORD = 'MyPassword123'  # Your MySQL password
```

### 3.2 (Optional) Change Secret Keys

For security, you can change the secret keys:

```python
SECRET_KEY = 'your-unique-secret-key-here'
JWT_SECRET_KEY = 'your-unique-jwt-secret-key-here'
```

---

## Step 4: Install Dependencies

### 4.1 Open Terminal in Project Directory

**Windows:**
- Open File Explorer
- Navigate to `virtual-notice-board` folder
- Type `cmd` in the address bar
- Press Enter

**Mac/Linux:**
- Open Terminal
- Navigate to project folder:
  ```bash
  cd ~/path/to/virtual-notice-board
  ```

### 4.2 Create Virtual Environment

```bash
python -m venv venv
```

Wait for it to complete (takes 1-2 minutes)

### 4.3 Activate Virtual Environment

**Windows:**
```bash
venv\Scripts\activate
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

You should see `(venv)` appear in your terminal prompt

### 4.4 Install Python Packages

```bash
pip install -r requirements.txt
```

This will install:
- Flask
- Flask-CORS
- Flask-Bcrypt
- Flask-JWT-Extended
- mysql-connector-python
- And other dependencies

Wait for installation to complete (2-3 minutes)

---

## Step 5: Run the Application

### 5.1 Start the Backend Server

With virtual environment activated:

```bash
python app.py
```

You should see output like:
```
 * Running on http://127.0.0.1:5000
 * Running on http://0.0.0.0:5000
Press CTRL+C to quit
```

✅ **Backend is now running!**

⚠️ **Keep this terminal window open!**

### 5.2 Access the Application

1. Open your web browser
2. Go to: `http://localhost:5000`
3. You should see the Virtual Notice Board homepage

---

## 🎯 Quick Test

### Test Student Login

1. Click "Student Login"
2. Enter credentials:
   - **Student ID**: `STU001`
   - **Password**: `student123`
3. Click "Login"
4. You should see the student dashboard with notices

### Test Admin Login

1. Logout (if logged in)
2. Click "Admin Login"
3. Select Role: "Examination Admin"
4. Enter credentials:
   - **Username**: `exam_admin`
   - **Password**: `admin123`
5. Click "Login"
6. You should see the admin dashboard

### Test Adding a Notice

1. Login as admin (as above)
2. Click "Add New Notice"
3. Fill in the form:
   - Title: "Test Notice"
   - Section: Select one
   - Importance: Normal
   - Description: "This is a test notice"
   - Post Date: Today's date
   - Expiry Date: Future date
4. (Optional) Upload a PDF or image
5. Click "Publish Notice"
6. Notice should appear in your dashboard

---

## 🔄 Starting the App Later

### Quick Method (Recommended)

**Windows:**
Double-click `start_windows.bat`

**Mac/Linux:**
```bash
chmod +x start_unix.sh  # Only needed once
./start_unix.sh
```

### Manual Method

1. Open terminal in project folder
2. Activate virtual environment:
   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`
3. Run: `python app.py`
4. Open browser: `http://localhost:5000`

---

## 🛑 Stopping the Application

1. Go to the terminal running Flask
2. Press `Ctrl + C`
3. Type `deactivate` to exit virtual environment

---

## ✅ Checklist

Before you start, make sure you have:

- [ ] Python installed (version 3.8+)
- [ ] MySQL installed and running
- [ ] Project files organized correctly
- [ ] Database imported successfully
- [ ] config.py updated with MySQL password
- [ ] Virtual environment created
- [ ] Dependencies installed
- [ ] Flask server running
- [ ] Application accessible at localhost:5000

---

## 🆘 Common Problems and Solutions

### Problem: "python: command not found"
**Solution**: 
- Make sure Python is installed
- Try `python3` instead of `python`
- On Windows, reinstall Python and check "Add to PATH"

### Problem: "Access denied for user 'root'"
**Solution**:
- Check your MySQL password in config.py
- Make sure MySQL is running
- Try: `mysql -u root -p` to test login

### Problem: "Can't find module Flask"
**Solution**:
- Make sure virtual environment is activated (you see `(venv)`)
- Run: `pip install -r requirements.txt`

### Problem: "Port 5000 is already in use"
**Solution**:
- Close any other applications using port 5000
- Or change port in app.py: `app.run(port=5001)`
- Update script.js: `const API_BASE_URL = 'http://localhost:5001/api';`

### Problem: "No module named 'mysql'"
**Solution**:
```bash
pip install mysql-connector-python
```

### Problem: Database tables not found
**Solution**:
- Re-import database:
  ```bash
  mysql -u root -p notice_board_db < database.sql
  ```

---

## 📞 Still Need Help?

If you're still having issues:

1. **Check detailed guide**: Read `SETUP_GUIDE.md`
2. **Check browser console**: Press F12 in browser, look for errors
3. **Check Flask terminal**: Look for error messages
4. **Verify MySQL**: Make sure MySQL service is running
5. **Check file locations**: Ensure all files are in correct folders

---

## 🎓 What You've Learned

After completing this setup, you now have:

✅ A working Python Flask backend
✅ MySQL database with sample data
✅ REST API for authentication and CRUD operations
✅ Frontend with HTML/CSS/JavaScript
✅ File upload functionality
✅ Role-based access control
✅ JWT authentication

**Congratulations! Your Virtual Notice Board is ready to use! 🎉**

---

## 📚 Next Steps

1. Explore the application with different user roles
2. Try creating, editing, and deleting notices
3. Test file uploads
4. Experiment with search and filters
5. Review the code to understand how it works
6. Customize the styling in style.css
7. Add new features!

---

**Need the detailed technical documentation?**
See `SETUP_GUIDE.md` for comprehensive instructions and troubleshooting.
