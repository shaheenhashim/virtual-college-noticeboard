@echo off
echo ========================================
echo Virtual Notice Board - Quick Start
echo ========================================
echo.

echo Checking if virtual environment exists...
if not exist "venv\" (
    echo Creating virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate

echo Installing dependencies...
pip install -r requirements.txt

echo.
echo Starting Flask server...
echo.
echo ========================================
echo Server will start on http://localhost:5000
echo Press Ctrl+C to stop the server
echo ========================================
echo.

python app.py

pause
