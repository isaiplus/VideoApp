const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const { analyzeVideo, getCustomAnalysis } = require('./services/geminiService');

const app = express();
const PORT = process.env.PORT || 5000;

// Create uploads directory if it doesn't exist
const uploadDir = process.env.UPLOAD_DIR || './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Configure multer for video uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE || 104857600) },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only video files are allowed.'));
    }
  }
});

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Video Analysis Server is running' });
});

app.post('/api/analyze', upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No video file provided' });
    }

    const videoPath = req.file.path;
    const fileName = req.file.filename;

    console.log(`Analyzing video: ${fileName}`);

    // Analyze the video using Gemini
    const analysis = await analyzeVideo(videoPath, fileName);

    // Clean up uploaded file
    fs.unlink(videoPath, (err) => {
      if (err) console.error('Error deleting file:', err);
    });

    res.json({
      success: true,
      summary: analysis.summary,
      suggestions: analysis.suggestions,
      keyPoints: analysis.keyPoints,
      detailedAnalysis: analysis.detailedAnalysis
    });

  } catch (error) {
    console.error('Analysis error:', error);
    
    // Clean up on error
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }

    res.status(500).json({
      error: error.message || 'Failed to analyze video'
    });
  }
});

app.post('/api/custom-analysis', async (req, res) => {
  try {
    const { videoPath, userInput, previousAnalysis } = req.body;

    if (!userInput || !previousAnalysis) {
      return res.status(400).json({
        error: 'Missing required parameters'
      });
    }

    const customAnalysis = await getCustomAnalysis(
      userInput,
      previousAnalysis
    );

    res.json({
      success: true,
      response: customAnalysis
    });

  } catch (error) {
    console.error('Custom analysis error:', error);
    res.status(500).json({
      error: error.message || 'Failed to process request'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({
    error: err.message || 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Video Analysis Server running on http://localhost:${PORT}`);
  console.log(`📹 Upload endpoint: POST /api/analyze`);
  console.log(`🤖 Custom analysis endpoint: POST /api/custom-analysis`);
  console.log(`\nMake sure to set GOOGLE_API_KEY in .env file\n`);
});

module.exports = app;
