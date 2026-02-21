from flask_bcrypt import Bcrypt
import mysql.connector

bcrypt = Bcrypt()

# Database connection
try:
    connection = mysql.connector.connect(
        host='localhost',
        database='notice_board_db',
        user='root',
        password='shaheen1122'
    )
    
    cursor = connection.cursor()
    
    print("="*60)
    print("🔐 Resetting All Passwords...")
    print("="*60)
    
    # Generate password hashes
    print("\n1️⃣ Generating password hashes...")
    student_hash = bcrypt.generate_password_hash('student123').decode('utf-8')
    admin_hash = bcrypt.generate_password_hash('admin123').decode('utf-8')
    super_hash = bcrypt.generate_password_hash('super123').decode('utf-8')
    
    print("   ✅ Student password hash generated")
    print("   ✅ Admin password hash generated")
    print("   ✅ Super admin password hash generated")
    
    # Update students
    print("\n2️⃣ Updating students...")
    cursor.execute("UPDATE students SET password = %s", (student_hash,))
    student_count = cursor.rowcount
    print(f"   ✅ Updated {student_count} students")
    
    # Update section admins
    print("\n3️⃣ Updating section admins...")
    cursor.execute("UPDATE admins SET password = %s WHERE role != 'super-admin'", (admin_hash,))
    admin_count = cursor.rowcount
    print(f"   ✅ Updated {admin_count} section admins")
    
    # Update super admin
    print("\n4️⃣ Updating super admin...")
    cursor.execute("UPDATE admins SET password = %s WHERE role = 'super-admin'", (super_hash,))
    super_count = cursor.rowcount
    print(f"   ✅ Updated {super_count} super admin")
    
    # Commit changes
    connection.commit()
    
    print("\n" + "="*60)
    print("🎉 ALL PASSWORDS RESET SUCCESSFULLY!")
    print("="*60)
    
    print("\n📋 LOGIN CREDENTIALS:")
    print("-"*60)
    print("\n👨‍🎓 STUDENT LOGIN:")
    print("   Student ID: STU001, STU002, STU003, STU004, or STU005")
    print("   Password: student123")
    
    print("\n👨‍💼 SECTION ADMIN LOGIN:")
    print("   Role: (Select from dropdown)")
    print("   Username: admin")
    print("   Password: admin123")
    
    print("\n👑 SUPER ADMIN LOGIN:")
    print("   Role: Super Admin")
    print("   Username: superadmin")
    print("   Password: super123")
    print("-"*60)
    
    # Close connection
    cursor.close()
    connection.close()
    
    print("\n✅ Database connection closed")
    print("\n🚀 You can now start Flask and login!")
    
except mysql.connector.Error as e:
    print(f"\n❌ Database Error: {e}")
    print("\nPlease check:")
    print("  - MySQL is running")
    print("  - Password is correct: shaheen1122")
    print("  - Database 'notice_board_db' exists")
    
except Exception as e:
    print(f"\n❌ Error: {e}")
