#!/bin/bash

# BookStore Project Quick Start Script

echo "========================================"
echo "🚀 BookStore Quick Start"
echo "========================================"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"
echo ""

# Build and start containers
echo "📦 Building and starting Docker containers..."
echo "This may take a few minutes on first run..."
echo ""

docker-compose up --build

echo ""
echo "========================================"
echo "✅ BookStore is ready!"
echo "========================================"
echo ""
echo "Open your browser and go to:"
echo "  Frontend: http://localhost:3000"
echo "  Backend API: http://localhost:5000"
echo "  Database: localhost:5432"
echo ""
echo "Database Credentials:"
echo "  User: bookadmin"
echo "  Password: securepassword123"
echo "  Database: bookstore"
echo ""
echo "To stop the server, press Ctrl+C"
echo ""
