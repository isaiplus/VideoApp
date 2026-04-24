# Video Analysis AI App

An AI-powered video analysis application built with React and Node.js that uses Google Gemini to analyze videos and provide actionable insights for sports performance improvement.

## Features

✨ **Core Features:**
- Upload and analyze videos with AI
- Get detailed performance suggestions
- Ask follow-up questions about the analysis
- Beautiful, responsive UI
- Works as a Progressive Web App (PWA)
- Mobile-ready design

🎯 **Use Cases:**
- Wrestling technique analysis
- Sports performance evaluation
- Athletic form correction
- Training improvement recommendations

## Tech Stack

### Frontend
- **React 18** - UI framework
- **Axios** - HTTP client
- **Lucide Icons** - UI icons
- **CSS3** - Styling with gradients and animations
- **PWA** - Progressive Web App support

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **Google Generative AI** - Video analysis
- **Multer** - File upload handling

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google API Key with Gemini access

## Setup Instructions

### 1. Get Google API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Get API Key"
3. Create a new API key
4. Copy the key (you'll need this)

### 2. Install Dependencies

**Root directory:**
```bash
npm install
```

**Client directory:**
```bash
cd client
npm install
cd ..
```

**Server directory:**
```bash
cd server
npm install
cd ..
```

### 3. Configure Environment Variables

**Create `.env` file in the `server` directory:**

```bash
cd server
cp .env.example .env
```

**Edit `server/.env` and add:**
```
GOOGLE_API_KEY=your_api_key_here
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
MAX_FILE_SIZE=104857600
UPLOAD_DIR=./uploads
```

### 4. Run the Application

**Development mode (runs both client and server):**
```bash
npm run dev
```

This will start:
- React app on `http://localhost:3000`
- Express server on `http://localhost:5000`

**Or run separately:**

Terminal 1 - Backend:
```bash
cd server
npm start
```

Terminal 2 - Frontend:
```bash
cd client
npm start
```

## Project Structure

```
VideoApp/
├── client/                          # React frontend
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json           # PWA manifest
│   │   └── service-worker.js       # PWA service worker
│   └── src/
│       ├── components/
│       │   ├── VideoUpload.js       # Video upload component
│       │   ├── AnalysisResults.js   # Results display
│       │   └── InputPanel.js        # Follow-up questions
│       ├── services/
│       │   └── api.js               # API client
│       ├── App.js                   # Main app component
│       └── index.js                 # Entry point
│
├── server/                          # Node.js backend
│   ├── services/
│   │   └── geminiService.js         # Google Gemini integration
│   ├── index.js                     # Express server
│   ├── package.json
│   └── .env.example
│
├── package.json                     # Root package.json
└── README.md                        # This file
```

## API Endpoints

### Analyze Video
**POST** `/api/analyze`

Upload a video file for analysis.

**Request:**
```
Content-Type: multipart/form-data
{
  "video": <file>
}
```

**Response:**
```json
{
  "success": true,
  "summary": "...",
  "suggestions": "...",
  "keyPoints": "...",
  "detailedAnalysis": "..."
}
```

### Custom Analysis
**POST** `/api/custom-analysis`

Get custom analysis based on user questions.

**Request:**
```json
{
  "videoPath": "filename",
  "userInput": "Your question here",
  "previousAnalysis": { ... }
}
```

**Response:**
```json
{
  "success": true,
  "response": "Detailed response to your question"
}
```

## Building for Production

### Frontend Build
```bash
cd client
npm run build
```

This creates an optimized build in `client/build/`

### Deployment Options

1. **Heroku**
   ```bash
   git push heroku main
   ```

2. **Vercel** (Frontend only)
   - Import `client` directory
   - Set `REACT_APP_API_URL` environment variable

3. **AWS/DigitalOcean** (Full stack)
   - Deploy server to compute instance
   - Deploy client to CDN or static host

## Converting to Mobile App

### Option 1: React Native
```bash
npx create-react-native-app video-analysis
# Share components and logic between web and mobile
```

### Option 2: PWA (Recommended for Quick Setup)
The app already includes PWA support:
- Install on iOS home screen
- Install on Android via Chrome
- Works offline (cached assets)

### Option 3: Electron
```bash
npm install electron --save-dev
# Create desktop app wrapper
```

## Features Explanation

### Video Upload
- Drag & drop support
- File type validation
- Preview before analysis
- Supports: MP4, WebM, Ogg, MOV

### AI Analysis
Generates 4 types of analysis:
1. **Summary** - Quick overview
2. **Suggestions** - Improvement recommendations
3. **Key Points** - Important observations
4. **Detailed Analysis** - In-depth technical analysis

### Interactive Follow-up
- Ask specific questions
- Get contextual answers
- Learn about specific athletes/performers
- Get custom recommendations

## Troubleshooting

### "API key not found"
- Check `.env` file has `GOOGLE_API_KEY`
- Restart the server after adding key

### "Video file too large"
- Max file size is 100MB
- Compress video before uploading

### CORS errors
- Check `CORS_ORIGIN` in `.env` matches client URL
- Restart server after changes

### Port already in use
- Change `PORT` in `.env`
- Or kill process: `lsof -ti:5000 | xargs kill -9`

## Example Usage

1. **Go to** http://localhost:3000
2. **Upload** a wrestling match video
3. **Click** "Analyze Video"
4. **Review** the generated analysis
5. **Ask** follow-up questions like:
   - "What should the wrestler in red improve?"
   - "What are the key technical issues?"
   - "Summarize the bout"

## Limitations

- Video analysis depends on Gemini API availability
- Large videos may take longer to process
- API quota limits apply (check Google Gemini pricing)
- Works best with clear, well-lit video content

## Performance Tips

- Use videos under 50MB for faster processing
- Ensure good internet connection
- Close other applications for smooth UI
- Clear browser cache if experiencing issues

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use for personal and commercial projects

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the API endpoints
3. Check Google Gemini documentation
4. Create an issue on GitHub

## Future Enhancements

- [ ] Real-time video streaming analysis
- [ ] Multi-video comparison
- [ ] Generate PDF reports
- [ ] Video timeline annotations
- [ ] Team analytics dashboard
- [ ] Offline mode improvements
- [ ] Multiple language support
- [ ] Custom AI training
