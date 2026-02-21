# File Organization Checklist

Use this checklist to ensure all files are in the correct locations.

## Directory Structure

```
virtual-notice-board/                    ← Main project folder
│
├── 📄 app.py                           ✅ Main Flask application
├── 📄 config.py                        ✅ Configuration file
├── 📄 database.sql                     ✅ Database schema and sample data
├── 📄 requirements.txt                 ✅ Python dependencies
├── 📄 hash_password.py                 ✅ Password utility
├── 📄 README.md                        ✅ Project overview
├── 📄 SETUP_GUIDE.md                   ✅ Detailed setup instructions
├── 📄 VISUAL_GUIDE.md                  ✅ Visual step-by-step guide
├── 📄 FILE_ORGANIZATION.md             ✅ This file
├── 📄 start_windows.bat                ✅ Windows quick start script
├── 📄 start_unix.sh                    ✅ Mac/Linux quick start script
│
├── 📁 venv/                            ⚠️  Created after running 'python -m venv venv'
│   └── (virtual environment files)
│
├── 📁 uploads/                         ⚠️  Created automatically when app runs
│   └── (uploaded files will be stored here)
│
└── 📁 static/                          ✅ Frontend files folder
    ├── 📄 index.html                   ✅ Homepage
    ├── 📄 student-login.html           ✅ Student login page
    ├── 📄 student-dashboard.html       ✅ Student dashboard
    ├── 📄 admin-login.html             ✅ Admin login page
    ├── 📄 admin-dashboard.html         ✅ Super admin dashboard
    ├── 📄 section-admin.html           ✅ Section admin dashboard
    ├── 📄 add-notice.html              ✅ Add/edit notice page
    ├── 📄 style.css                    ✅ All styles
    └── 📄 script.js                    ✅ All JavaScript code
```

## File Checklist

### Root Directory Files (10 files)
- [ ] app.py
- [ ] config.py
- [ ] database.sql
- [ ] requirements.txt
- [ ] hash_password.py
- [ ] README.md
- [ ] SETUP_GUIDE.md
- [ ] VISUAL_GUIDE.md
- [ ] FILE_ORGANIZATION.md
- [ ] start_windows.bat (Windows) OR start_unix.sh (Mac/Linux)

### Static Folder Files (9 files)
- [ ] static/index.html
- [ ] static/student-login.html
- [ ] static/student-dashboard.html
- [ ] static/admin-login.html
- [ ] static/admin-dashboard.html
- [ ] static/section-admin.html
- [ ] static/add-notice.html
- [ ] static/style.css
- [ ] static/script.js

## How to Organize Files

### Step 1: Create Main Folder
```
Create a folder named: virtual-notice-board
```

### Step 2: Place Root Files
Copy these files to the root of `virtual-notice-board/`:
- app.py
- config.py
- database.sql
- requirements.txt
- hash_password.py
- README.md
- SETUP_GUIDE.md
- VISUAL_GUIDE.md
- FILE_ORGANIZATION.md
- start_windows.bat (or start_unix.sh)

### Step 3: Create Static Folder
```
Inside virtual-notice-board/, create a folder named: static
```

### Step 4: Place Frontend Files
Copy these files to `virtual-notice-board/static/`:
- index.html
- student-login.html
- student-dashboard.html
- admin-login.html
- admin-dashboard.html
- section-admin.html
- add-notice.html
- style.css
- script.js

### Step 5: Verify Structure
Your folder should look like this:

```
virtual-notice-board/
├── app.py
├── config.py
├── ...other root files...
└── static/
    ├── index.html
    ├── style.css
    └── ...other static files...
```

## Quick Verification Commands

### Windows (Command Prompt)
```cmd
cd virtual-notice-board
dir
dir static
```

### Mac/Linux (Terminal)
```bash
cd virtual-notice-board
ls -la
ls -la static/
```

## Expected Output

### Root directory should show:
- app.py
- config.py
- database.sql
- requirements.txt
- hash_password.py
- README.md
- SETUP_GUIDE.md
- VISUAL_GUIDE.md
- FILE_ORGANIZATION.md
- start_windows.bat (or start_unix.sh)
- static/ (folder)

### static/ directory should show:
- index.html
- student-login.html
- student-dashboard.html
- admin-login.html
- admin-dashboard.html
- section-admin.html
- add-notice.html
- style.css
- script.js

## Common Mistakes to Avoid

❌ **Don't do this:**
- Placing HTML files in root directory
- Placing Python files in static folder
- Creating nested static folders
- Mixing backend and frontend files

✅ **Do this:**
- Keep Python files in root
- Keep HTML/CSS/JS in static folder
- Follow the exact structure shown above

## After Organization

Once files are organized correctly:

1. ✅ Open terminal in root directory (`virtual-notice-board/`)
2. ✅ All commands should be run from here
3. ✅ Virtual environment will be created here
4. ✅ Database import will work correctly
5. ✅ Flask will serve files from static folder automatically

## Verification Script

Run this to verify your file organization:

### Windows (PowerShell)
```powershell
# Save this as verify.ps1 and run
Write-Host "Checking root files..."
Test-Path app.py
Test-Path config.py
Test-Path database.sql
Test-Path requirements.txt
Test-Path static

Write-Host "Checking static files..."
Test-Path static/index.html
Test-Path static/style.css
Test-Path static/script.js
```

### Mac/Linux (Bash)
```bash
# Save this as verify.sh and run
echo "Checking root files..."
[ -f "app.py" ] && echo "✅ app.py" || echo "❌ app.py missing"
[ -f "config.py" ] && echo "✅ config.py" || echo "❌ config.py missing"
[ -f "database.sql" ] && echo "✅ database.sql" || echo "❌ database.sql missing"
[ -d "static" ] && echo "✅ static/" || echo "❌ static/ missing"

echo "Checking static files..."
[ -f "static/index.html" ] && echo "✅ index.html" || echo "❌ index.html missing"
[ -f "static/style.css" ] && echo "✅ style.css" || echo "❌ style.css missing"
[ -f "static/script.js" ] && echo "✅ script.js" || echo "❌ script.js missing"
```

## Need Help?

If your files aren't organized correctly:

1. Create a fresh `virtual-notice-board` folder
2. Follow Step 1-5 above carefully
3. Verify using the verification commands
4. Ensure you have exactly 10 files in root and 9 files in static/

---

**Once organization is correct, proceed with database setup and installation!**

See VISUAL_GUIDE.md for next steps.
