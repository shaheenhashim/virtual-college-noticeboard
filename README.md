# virtual-college-noticeboard
A virtual college notice board is a digital,web based platform designed to replace traditional,paper-based bulletin boards in academic institution.
# Virtual College Notice Board System

A complete full-stack web application for managing college notices and announcements with role-based access control.

## 🌟 Features

### For Students
- ✅ View all active notices
- ✅ Filter notices by section (Examination, Scholarship, Academics, Events, Placement)
- ✅ Search notices by keywords
- ✅ View important notices separately
- ✅ Download attachments (PDF, Images)
- ✅ Access archived/expired notices

### For Section Admins
- ✅ Post new notices for their section
- ✅ Edit and delete their own notices
- ✅ Upload file attachments
- ✅ Set expiry dates for notices
- ✅ Mark notices as important
- ✅ View statistics (total, active, important, archived)

### For Super Admin
- ✅ View all notices from all sections
- ✅ Manage section admins
- ✅ View comprehensive statistics
- ✅ Monitor notice activity across all sections

## 🛠️ Technology Stack

### Backend
- **Python 3.8+** - Programming language
- **Flask** - Web framework
- **MySQL** - Database
- **Flask-JWT-Extended** - Authentication
- **Flask-Bcrypt** - Password hashing
- **Flask-CORS** - Cross-origin resource sharing

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling
- **JavaScript (ES6+)** - Functionality
- **Font Awesome** - Icons

## 📋 Prerequisites

Before installation, ensure you have:
- Python 3.8 or higher
- MySQL 8.0 or higher
- pip (Python package manager)
- A modern web browser

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

**Windows:**
```bash
start_windows.bat
```

**Mac/Linux:**
```bash
chmod +x start_unix.sh
./start_unix.sh
```

### Option 2: Manual Setup

1. **Clone or Download the Project**
   ```bash
   cd virtual-notice-board
   ```

2. **Set up MySQL Database**
   ```bash
   mysql -u root -p < database.sql
   ```

3. **Configure Database Connection**
   Edit `config.py`:
   ```python
   DB_USER = 'root'
   DB_PASSWORD = 'your_mysql_password'
   ```

4. **Create Virtual Environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

5. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

6. **Run the Application**
   ```bash
   python app.py
   ```

7. **Access the Application**
   Open browser and go to: `http://localhost:5000`

## 📂 Project Structure

```
virtual-notice-board/
├── app.py                    # Main Flask application
├── config.py                 # Configuration settings
├── database.sql              # Database schema and sample data
├── requirements.txt          # Python dependencies
├── hash_password.py          # Password hashing utility
├── SETUP_GUIDE.md           # Detailed setup instructions
├── README.md                # This file
├── start_windows.bat        # Windows quick start
├── start_unix.sh            # Mac/Linux quick start
├── uploads/                 # File uploads directory
└── static/                  # Frontend files
    ├── index.html
    ├── student-login.html
    ├── student-dashboard.html
    ├── admin-login.html
    ├── admin-dashboard.html
    ├── section-admin.html
    ├── add-notice.html
    ├── style.css
    └── script.js
```

## 🔐 Default Login Credentials

### Student Accounts
| Student ID | Password |
|------------|----------|
| STU001 | student123 |
| STU002 | student123 |
| STU003 | student123 |
| STU004 | student123 |
| STU005 | student123 |

### Super Admin
| Username | Password | Role |
|----------|----------|------|
| superadmin | super123 | Super Admin |

### Section Admins (All use password: admin123)
| Username | Section |
|----------|---------|
| exam_admin | Examination |
| scholar_admin | Scholarship |
| acad_admin | Academics |
| event_admin | Events |
| place_admin | Placement |

## 📚 API Documentation

### Authentication Endpoints

#### Student Login
```
POST /api/auth/student/login
Body: {
  "studentId": "STU001",
  "password": "student123"
}
```

#### Admin Login
```
POST /api/auth/admin/login
Body: {
  "username": "exam_admin",
  "password": "admin123",
  "role": "examination"
}
```

### Notice Endpoints

#### Get All Notices
```
GET /api/notices?section=examination&status=active&search=exam
Headers: Authorization: Bearer <token>
```

#### Get Single Notice
```
GET /api/notices/<notice_id>
Headers: Authorization: Bearer <token>
```

#### Create Notice (Admin Only)
```
POST /api/notices
Headers: Authorization: Bearer <token>
Body: FormData {
  title: string,
  description: string,
  section: string,
  importance: string,
  date_posted: date,
  expiry_date: date,
  attachment: file (optional)
}
```

#### Update Notice (Admin Only)
```
PUT /api/notices/<notice_id>
Headers: Authorization: Bearer <token>
Body: {
  "title": "Updated Title",
  "description": "Updated description"
}
```

#### Delete Notice (Admin Only)
```
DELETE /api/notices/<notice_id>
Headers: Authorization: Bearer <token>
```

### Statistics Endpoint

```
GET /api/statistics
Headers: Authorization: Bearer <token>
```

## 🗄️ Database Schema

### Tables

1. **students** - Student accounts
2. **admins** - Admin accounts (super admin & section admins)
3. **notices** - All notices
4. **attachments** - File attachments for notices

For detailed schema, see `database.sql`

## 🔧 Configuration

### Environment Variables

Edit `config.py` to configure:

```python
# Secret keys (change in production!)
SECRET_KEY = 'your-secret-key'
JWT_SECRET_KEY = 'your-jwt-secret-key'

# Database
DB_HOST = 'localhost'
DB_NAME = 'notice_board_db'
DB_USER = 'root'
DB_PASSWORD = 'your_password'

# Upload settings
UPLOAD_FOLDER = 'uploads'
```

## 🧪 Testing

### Manual Testing Steps

1. **Test Student Login**
   - Login with STU001 / student123
   - Verify notice display
   - Test filtering and search

2. **Test Section Admin**
   - Login as exam_admin / admin123
   - Create new notice
   - Upload attachment
   - Edit/delete notice

3. **Test Super Admin**
   - Login as superadmin / super123
   - View all notices
   - Check statistics

### API Testing with cURL

```bash
# Login
curl -X POST http://localhost:5000/api/auth/student/login \
  -H "Content-Type: application/json" \
  -d '{"studentId":"STU001","password":"student123"}'

# Get Notices
curl -X GET http://localhost:5000/api/notices \
  -H "Authorization: Bearer <your_token>"
```

## 🐛 Troubleshooting

### Common Issues

1. **"Module not found" error**
   - Solution: `pip install -r requirements.txt`

2. **MySQL connection failed**
   - Check MySQL is running
   - Verify credentials in config.py

3. **Port 5000 already in use**
   - Change port in app.py: `app.run(port=5001)`

4. **CORS errors**
   - Ensure Flask-CORS is installed
   - Check API_BASE_URL in script.js

For detailed troubleshooting, see `SETUP_GUIDE.md`

## 📝 Adding New Users

### Generate Password Hash

Use the utility script:

```bash
python hash_password.py
```

Then insert into database:

```sql
INSERT INTO students (student_id, name, email, password)
VALUES ('STU006', 'New Student', 'new@college.edu', '<hashed_password>');
```

## 🔒 Security Notes

⚠️ **Important for Production:**

1. Change all default passwords
2. Update SECRET_KEY and JWT_SECRET_KEY
3. Use environment variables for sensitive data
4. Enable HTTPS
5. Set up proper firewall rules
6. Regular database backups
7. Implement rate limiting
8. Add input validation
9. Use production WSGI server (Gunicorn/uWSGI)
10. Disable debug mode

## 📖 Additional Resources

- **Detailed Setup**: See `SETUP_GUIDE.md`
- **Flask Documentation**: https://flask.palletsprojects.com/
- **MySQL Documentation**: https://dev.mysql.com/doc/

## 🤝 Contributing

This is a mini project for educational purposes. Feel free to:
- Report bugs
- Suggest features
- Submit improvements

## 📄 License

This project is created for educational purposes as a mini project for Frontend Development.

## 👨‍💻 Author

Created as a Mini Project - Frontend Development

## 🆘 Support

For issues and questions:
1. Check SETUP_GUIDE.md
2. Review troubleshooting section
3. Check browser console (F12) for errors
4. Verify Flask terminal for backend errors

## ✨ Future Enhancements

Potential improvements:
- Email notifications
- Real-time updates with WebSockets
- Mobile responsive design improvements
- Push notifications
- Notice categories/tags
- Comment system
- Analytics dashboard
- Export to PDF
- Batch operations
- Advanced search filters

---

**Happy Learning! 🎓**
