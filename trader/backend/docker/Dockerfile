# Use an official Python runtime as a base image
FROM python:3.9

# Prevent Python from writing .pyc files and set stdout/stderr logging
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Install dependencies: copy the requirements file and install them
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the rest of your application code into the container
COPY . /app/

# Expose the port your Flask app runs on (default is 5000)
EXPOSE 5000

# Command to run your Flask app; adjust as needed
# Option 1: Directly using Flask
# CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
CMD ["python", "app.py"]