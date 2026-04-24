# Quick Start Setup Guide

## Step 1: Get Your Google API Key ⚙️

1. Visit: https://aistudio.google.com/app/apikey
2. Click **"Get API Key"** or **"Create API Key"**
3. Copy the generated key
4. Keep it safe (it's your password to the AI service)

## Step 2: Clone/Setup Project 📁

```bash
# Navigate to your project folder
cd VideoApp

# Install root dependencies
npm install
```

## Step 3: Configure Backend 🔧

```bash
cd server
cp .env.example .env
```

Open `server/.env` and update:
```
GOOGLE_API_KEY=YOUR_API_KEY_HERE
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

Install dependencies:
```bash
npm install
```

## Step 4: Install Frontend Dependencies 📦

```bash
cd ../client
npm install
```

## Step 5: Start the App 🚀

### Option A: Run Both Together (Recommended)
From the root `VideoApp` directory:
```bash
npm run dev
```

### Option B: Run Separately
Terminal 1 - Start Backend:
```bash
cd server
npm start
```

Terminal 2 - Start Frontend:
```bash
cd client
npm start
```

## Step 6: Open in Browser 🌐

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Check health: http://localhost:5000/api/health

## First Test ✅

1. Upload a video (wrestling, sports, etc.)
2. Click "Analyze Video"
3. Wait for AI analysis
4. Ask follow-up questions
5. View results

## Troubleshooting

### "Cannot find module" errors
```bash
npm install  # Re-install dependencies
```

### Port 5000 or 3000 already in use
```bash
# Change PORT in server/.env
PORT=5001
```

### "API key invalid"
- Check .env file has correct key
- Make sure key is from Google AI Studio
- Restart server after editing .env

### Video upload fails
- Check file is a valid video (MP4, WebM, etc.)
- Ensure file is under 100MB
- Check network connection

## Environment Variables Reference

**server/.env:**
- `GOOGLE_API_KEY` - Your Google Gemini API key
- `PORT` - Server port (default: 5000)
- `CORS_ORIGIN` - Client URL (default: http://localhost:3000)
- `MAX_FILE_SIZE` - Max upload size in bytes
- `UPLOAD_DIR` - Where to save uploaded videos

## Project Structure Overview

```
VideoApp/
├── client/          ← React app (runs on :3000)
├── server/          ← Express API (runs on :5000)
├── package.json     ← Root configuration
└── README.md        ← Full documentation
```

## Next Steps

- ✅ **Deploy to production** - See README.md
- ✅ **Build mobile app** - Use React Native or Electron
- ✅ **Add authentication** - Implement user accounts
- ✅ **Create analytics** - Track usage patterns
- ✅ **Customize AI prompts** - In server/services/geminiService.js

## Need Help?

1. Check main README.md
2. Review .env.example for all options
3. Check browser console for errors
4. Check server logs for API issues

Good luck! 🎉
