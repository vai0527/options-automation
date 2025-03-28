# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set a working directory
WORKDIR /app

# Copy requirements and install them
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container
COPY . /app

# Expose port 5000 for Flask
EXPOSE 5000

# Define environment variable for Flask
ENV FLASK_APP=app.py

# Command to run the Flask server
CMD ["python", "app.py"]
