# 1. Use an official Python image
FROM python:3.10-slim

# 2. Set the working directory
WORKDIR /app

# 3. Install system dependencies (needed for OpenCV/PIL if required)
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# 4. Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5. Create a non-root user (Hugging Face security requirement)
RUN useradd -m -u 1000 user
USER user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH

# 6. Set working directory to the user's home app folder
WORKDIR $HOME/app

# 7. Copy all your files into the container
COPY --chown=user . .

# 8. Start the FastAPI app on the required port 7860
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]