#!/bin/bash

echo "🔧 Installing Video Analysis App Dependencies..."
echo ""

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install client dependencies
echo ""
echo "📦 Installing client dependencies..."
cd client
npm install
cd ..

# Install server dependencies
echo ""
echo "📦 Installing server dependencies..."
cd server
npm install
cd ..

echo ""
echo "✅ All dependencies installed!"
echo ""
echo "🚀 Ready to run: npm run dev"
