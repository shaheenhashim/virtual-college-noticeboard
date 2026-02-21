"""
Password Hashing Utility for Virtual Notice Board System

This script helps you generate bcrypt password hashes for new users.
Use the generated hashes when adding new students or admins to the database.
"""

from flask_bcrypt import Bcrypt

def hash_password(password):
    """Generate bcrypt hash for a given password"""
    bcrypt = Bcrypt()
    hashed = bcrypt.generate_password_hash(password).decode('utf-8')
    return hashed

def main():
    print("=" * 60)
    print("Virtual Notice Board - Password Hashing Utility")
    print("=" * 60)
    print()
    
    while True:
        print("\nOptions:")
        print("1. Hash a password")
        print("2. Hash default passwords (for demo)")
        print("3. Exit")
        
        choice = input("\nEnter your choice (1-3): ").strip()
        
        if choice == '1':
            password = input("Enter password to hash: ")
            hashed = hash_password(password)
            print(f"\nOriginal Password: {password}")
            print(f"Hashed Password: {hashed}")
            print("\nUse this hash in your SQL INSERT statement:")
            print(f"'{hashed}'")
            
        elif choice == '2':
            print("\nGenerating hashes for default passwords...")
            print()
            
            # Student password
            student_pass = "student123"
            student_hash = hash_password(student_pass)
            print(f"Student Password: {student_pass}")
            print(f"Hash: {student_hash}")
            print()
            
            # Admin password
            admin_pass = "admin123"
            admin_hash = hash_password(admin_pass)
            print(f"Section Admin Password: {admin_pass}")
            print(f"Hash: {admin_hash}")
            print()
            
            # Super admin password
            super_pass = "super123"
            super_hash = hash_password(super_pass)
            print(f"Super Admin Password: {super_pass}")
            print(f"Hash: {super_hash}")
            print()
            
        elif choice == '3':
            print("\nExiting...")
            break
        else:
            print("\nInvalid choice! Please enter 1, 2, or 3.")
    
    print("\nThank you for using Password Hashing Utility!")

if __name__ == "__main__":
    main()
