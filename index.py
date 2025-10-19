# Vercel serverless function entry point
import sys
import os

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(__file__))

# Import the Flask app
from app_main import app

# Vercel expects the app to be exposed as 'app'
# No need for if __name__ == "__main__" in serverless