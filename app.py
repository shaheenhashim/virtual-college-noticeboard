from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import mysql.connector
from mysql.connector import Error
from datetime import datetime, timedelta
import os
from werkzeug.utils import secure_filename
import config

# Create uploads directory if it doesn't exist
if not os.path.exists('uploads'):
    os.makedirs('uploads')

app = Flask(__name__, static_folder='static', static_url_path='')
app.config['SECRET_KEY'] = config.SECRET_KEY
app.config['JWT_SECRET_KEY'] = config.JWT_SECRET_KEY
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
app.config['UPLOAD_FOLDER'] = config.UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024  # 5MB max file size

CORS(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Allowed file extensions
ALLOWED_EXTENSIONS = {'pdf', 'jpg', 'jpeg', 'png'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Database connection
def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host=config.DB_HOST,
            database=config.DB_NAME,
            user=config.DB_USER,
            password=config.DB_PASSWORD
        )
        return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

# ==================== AUTHENTICATION ROUTES ====================

@app.route('/api/auth/student/login', methods=['POST'])
def student_login():
    try:
        data = request.get_json()
        student_id = data.get('studentId')
        password = data.get('password')
        
        if not student_id or not password:
            return jsonify({'error': 'Student ID and password are required'}), 400
        
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        cursor.execute('SELECT * FROM students WHERE student_id = %s', (student_id,))
        student = cursor.fetchone()
        
        cursor.close()
        connection.close()
        
        if student and bcrypt.check_password_hash(student['password'], password):
            access_token = create_access_token(identity={
                'id': student['id'],
                'student_id': student['student_id'],
                'type': 'student'
            })
            return jsonify({
                'success': True,
                'token': access_token,
                'user': {
                    'id': student['id'],
                    'student_id': student['student_id'],
                    'name': student['name'],
                    'email': student['email'],
                    'type': 'student'
                }
            }), 200
        else:
            return jsonify({'error': 'Invalid credentials'}), 401
            
    except Exception as e:
        print(f"Error in student login: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/auth/admin/login', methods=['POST'])
def admin_login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        role = data.get('role')
        
        if not username or not password or not role:
            return jsonify({'error': 'All fields are required'}), 400
        
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        cursor.execute('SELECT * FROM admins WHERE username = %s AND role = %s', (username, role))
        admin = cursor.fetchone()
        
        cursor.close()
        connection.close()
        
        if admin and bcrypt.check_password_hash(admin['password'], password):
            access_token = create_access_token(identity={
                'id': admin['id'],
                'username': admin['username'],
                'role': admin['role'],
                'type': 'admin'
            })
            return jsonify({
                'success': True,
                'token': access_token,
                'user': {
                    'id': admin['id'],
                    'username': admin['username'],
                    'role': admin['role'],
                    'email': admin['email'],
                    'type': 'admin'
                }
            }), 200
        else:
            return jsonify({'error': 'Invalid credentials'}), 401
            
    except Exception as e:
        print(f"Error in admin login: {e}")
        return jsonify({'error': 'Internal server error'}), 500

# ==================== NOTICE ROUTES ====================

@app.route('/api/notices', methods=['GET'])
def get_notices():
    try:
        # Get query parameters
        section = request.args.get('section')
        importance = request.args.get('importance')
        status = request.args.get('status', 'active')
        search = request.args.get('search')
        
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        # Build query
        query = 'SELECT n.*, a.username as posted_by_username FROM notices n LEFT JOIN admins a ON n.posted_by = a.id WHERE 1=1'
        params = []
        
        if status == 'active':
            query += ' AND n.expiry_date >= CURDATE()'
        elif status == 'expired':
            query += ' AND n.expiry_date < CURDATE()'
        
        if section:
            query += ' AND n.section = %s'
            params.append(section)
        
        if importance:
            query += ' AND n.importance = %s'
            params.append(importance)
        
        if search:
            query += ' AND (n.title LIKE %s OR n.description LIKE %s)'
            search_param = f'%{search}%'
            params.extend([search_param, search_param])
        
        query += ' ORDER BY n.date_posted DESC'
        
        cursor.execute(query, params)
        notices = cursor.fetchall()
        
        # Get attachments for each notice and format dates
        for notice in notices:
            cursor.execute('SELECT * FROM attachments WHERE notice_id = %s', (notice['id'],))
            notice['attachments'] = cursor.fetchall()
            
            # Convert date objects to strings for JSON serialization
            if notice.get('date_posted'):
                notice['date_posted'] = str(notice['date_posted'])
            if notice.get('expiry_date'):
                notice['expiry_date'] = str(notice['expiry_date'])
            if notice.get('created_at'):
                notice['created_at'] = str(notice['created_at'])
            if notice.get('updated_at'):
                notice['updated_at'] = str(notice['updated_at'])
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'notices': notices}), 200
        
    except Exception as e:
        print(f"Error getting notices: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/notices/<int:notice_id>', methods=['GET'])
def get_notice(notice_id):
    try:
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        cursor.execute('SELECT n.*, a.username as posted_by_username FROM notices n LEFT JOIN admins a ON n.posted_by = a.id WHERE n.id = %s', (notice_id,))
        notice = cursor.fetchone()
        
        if not notice:
            cursor.close()
            connection.close()
            return jsonify({'error': 'Notice not found'}), 404
        
        # Get attachments
        cursor.execute('SELECT * FROM attachments WHERE notice_id = %s', (notice_id,))
        notice['attachments'] = cursor.fetchall()
        
        # Convert date objects to strings
        if notice.get('date_posted'):
            notice['date_posted'] = str(notice['date_posted'])
        if notice.get('expiry_date'):
            notice['expiry_date'] = str(notice['expiry_date'])
        if notice.get('created_at'):
            notice['created_at'] = str(notice['created_at'])
        if notice.get('updated_at'):
            notice['updated_at'] = str(notice['updated_at'])
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'notice': notice}), 200
        
    except Exception as e:
        print(f"Error getting notice: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/notices', methods=['POST'])
@jwt_required()
def create_notice():
    try:
        current_user = get_jwt_identity()
        
        # Check if user is admin
        if current_user['type'] != 'admin':
            return jsonify({'error': 'Unauthorized'}), 403
        
        # Get form data
        title = request.form.get('title')
        description = request.form.get('description')
        section = request.form.get('section')
        importance = request.form.get('importance', 'normal')
        date_posted = request.form.get('date_posted')
        expiry_date = request.form.get('expiry_date')
        
        if not all([title, description, section, date_posted, expiry_date]):
            return jsonify({'error': 'All required fields must be provided'}), 400
        
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor()
        
        # Insert notice
        query = '''INSERT INTO notices (title, description, section, importance, date_posted, expiry_date, posted_by) 
                   VALUES (%s, %s, %s, %s, %s, %s, %s)'''
        values = (title, description, section, importance, date_posted, expiry_date, current_user['id'])
        
        cursor.execute(query, values)
        notice_id = cursor.lastrowid
        
        # Handle file upload
        if 'attachment' in request.files:
            file = request.files['attachment']
            if file and file.filename and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                # Add timestamp to filename to make it unique
                timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
                filename = f"{timestamp}_{filename}"
                filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(filepath)
                
                # Get file type
                file_extension = filename.rsplit('.', 1)[1].lower()
                file_type = 'pdf' if file_extension == 'pdf' else 'image'
                
                # Insert attachment
                cursor.execute('INSERT INTO attachments (notice_id, filename, file_type) VALUES (%s, %s, %s)',
                             (notice_id, filename, file_type))
        
        connection.commit()
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'message': 'Notice created successfully', 'notice_id': notice_id}), 201
        
    except Exception as e:
        print(f"Error creating notice: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/notices/<int:notice_id>', methods=['PUT'])
@jwt_required()
def update_notice(notice_id):
    try:
        current_user = get_jwt_identity()
        
        # Check if user is admin
        if current_user['type'] != 'admin':
            return jsonify({'error': 'Unauthorized'}), 403
        
        data = request.get_json()
        
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        # Verify notice exists and user has permission
        cursor.execute('SELECT * FROM notices WHERE id = %s', (notice_id,))
        notice = cursor.fetchone()
        
        if not notice:
            cursor.close()
            connection.close()
            return jsonify({'error': 'Notice not found'}), 404
        
        # Super admin can edit any notice, section admin can only edit their section's notices
        if current_user['role'] != 'super-admin' and notice['posted_by'] != current_user['id']:
            cursor.close()
            connection.close()
            return jsonify({'error': 'Unauthorized to edit this notice'}), 403
        
        # Build update query
        update_fields = []
        params = []
        
        if 'title' in data:
            update_fields.append('title = %s')
            params.append(data['title'])
        if 'description' in data:
            update_fields.append('description = %s')
            params.append(data['description'])
        if 'section' in data:
            update_fields.append('section = %s')
            params.append(data['section'])
        if 'importance' in data:
            update_fields.append('importance = %s')
            params.append(data['importance'])
        if 'expiry_date' in data:
            update_fields.append('expiry_date = %s')
            params.append(data['expiry_date'])
        
        if not update_fields:
            cursor.close()
            connection.close()
            return jsonify({'error': 'No fields to update'}), 400
        
        params.append(notice_id)
        query = f"UPDATE notices SET {', '.join(update_fields)} WHERE id = %s"
        
        cursor.execute(query, params)
        connection.commit()
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'message': 'Notice updated successfully'}), 200
        
    except Exception as e:
        print(f"Error updating notice: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/notices/<int:notice_id>', methods=['DELETE'])
@jwt_required()
def delete_notice(notice_id):
    try:
        current_user = get_jwt_identity()
        
        # Check if user is admin
        if current_user['type'] != 'admin':
            return jsonify({'error': 'Unauthorized'}), 403
        
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        # Verify notice exists and user has permission
        cursor.execute('SELECT * FROM notices WHERE id = %s', (notice_id,))
        notice = cursor.fetchone()
        
        if not notice:
            cursor.close()
            connection.close()
            return jsonify({'error': 'Notice not found'}), 404
        
        # Super admin can delete any notice, section admin can only delete their section's notices
        if current_user['role'] != 'super-admin' and notice['posted_by'] != current_user['id']:
            cursor.close()
            connection.close()
            return jsonify({'error': 'Unauthorized to delete this notice'}), 403
        
        # Delete attachments first (files and database records)
        cursor.execute('SELECT filename FROM attachments WHERE notice_id = %s', (notice_id,))
        attachments = cursor.fetchall()
        
        for attachment in attachments:
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], attachment['filename'])
            if os.path.exists(file_path):
                os.remove(file_path)
        
        cursor.execute('DELETE FROM attachments WHERE notice_id = %s', (notice_id,))
        
        # Delete notice
        cursor.execute('DELETE FROM notices WHERE id = %s', (notice_id,))
        
        connection.commit()
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'message': 'Notice deleted successfully'}), 200
        
    except Exception as e:
        print(f"Error deleting notice: {e}")
        return jsonify({'error': 'Internal server error'}), 500

# ==================== STATISTICS ROUTES ====================

@app.route('/api/statistics', methods=['GET'])
@jwt_required()
def get_statistics():
    try:
        current_user = get_jwt_identity()
        
        if current_user['type'] != 'admin':
            return jsonify({'error': 'Unauthorized'}), 403
        
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        stats = {}
        
        if current_user['role'] == 'super-admin':
            # Total notices
            cursor.execute('SELECT COUNT(*) as count FROM notices')
            stats['total_notices'] = cursor.fetchone()['count']
            
            # Active notices
            cursor.execute('SELECT COUNT(*) as count FROM notices WHERE expiry_date >= CURDATE()')
            stats['active_notices'] = cursor.fetchone()['count']
            
            # Important notices
            cursor.execute('SELECT COUNT(*) as count FROM notices WHERE importance = "important" AND expiry_date >= CURDATE()')
            stats['important_notices'] = cursor.fetchone()['count']
            
            # Total admins
            cursor.execute('SELECT COUNT(*) as count FROM admins WHERE role != "super-admin"')
            stats['total_admins'] = cursor.fetchone()['count']
            
            # Notices by section
            cursor.execute('SELECT section, COUNT(*) as count FROM notices GROUP BY section')
            stats['by_section'] = cursor.fetchall()
            
        else:
            # Section admin stats
            admin_id = current_user['id']
            
            # Total notices
            cursor.execute('SELECT COUNT(*) as count FROM notices WHERE posted_by = %s', (admin_id,))
            stats['total_notices'] = cursor.fetchone()['count']
            
            # Active notices
            cursor.execute('SELECT COUNT(*) as count FROM notices WHERE posted_by = %s AND expiry_date >= CURDATE()', (admin_id,))
            stats['active_notices'] = cursor.fetchone()['count']
            
            # Important notices
            cursor.execute('SELECT COUNT(*) as count FROM notices WHERE posted_by = %s AND importance = "important" AND expiry_date >= CURDATE()', (admin_id,))
            stats['important_notices'] = cursor.fetchone()['count']
            
            # Archived notices
            cursor.execute('SELECT COUNT(*) as count FROM notices WHERE posted_by = %s AND expiry_date < CURDATE()', (admin_id,))
            stats['archived_notices'] = cursor.fetchone()['count']
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'statistics': stats}), 200
        
    except Exception as e:
        print(f"Error getting statistics: {e}")
        return jsonify({'error': 'Internal server error'}), 500

# ==================== ADMIN MANAGEMENT ROUTES ====================

@app.route('/api/admins', methods=['GET'])
@jwt_required()
def get_admins():
    try:
        current_user = get_jwt_identity()
        
        # Only super admin can view all admins
        if current_user['role'] != 'super-admin':
            return jsonify({'error': 'Unauthorized'}), 403
        
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        cursor.execute('SELECT id, username, email, role, created_at FROM admins WHERE role != "super-admin"')
        admins = cursor.fetchall()
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'admins': admins}), 200
        
    except Exception as e:
        print(f"Error getting admins: {e}")
        return jsonify({'error': 'Internal server error'}), 500

# ==================== FILE SERVING ====================

# ==================== STATIC FILE SERVING ====================

@app.route('/')
def serve_index():
    return send_from_directory('static', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    if os.path.exists(os.path.join('static', path)):
        return send_from_directory('static', path)
    else:
        return send_from_directory('static', 'index.html')

if __name__ == '__main__':
    # Create uploads directory if it doesn't exist
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    app.run(debug=True, host='0.0.0.0', port=5000)