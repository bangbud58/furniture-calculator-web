# Vercel serverless function entry point
import sys
import os

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(__file__))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'web_deploy'))

# Import the Flask app from web_deploy folder
from web_deploy.app import app

# Vercel expects the app to be exposed as 'app'
# No need for if __name__ == "__main__" in serverless