# API Examples

## Base URL
```
http://localhost:5000
```

## Health Check

Check if the server is running:

```bash
curl http://localhost:5000/api/health
```

**Response:**
```json
{
  "status": "ok",
  "message": "Video Analysis Server is running"
}
```

---

## Video Analysis

### Upload and Analyze Video

```bash
curl -X POST \
  -F "video=@/path/to/video.mp4" \
  http://localhost:5000/api/analyze
```

**Using JavaScript/Axios:**
```javascript
const api = axios.create({
  baseURL: 'http://localhost:5000'
});

const uploadVideo = async (videoFile) => {
  const formData = new FormData();
  formData.append('video', videoFile);

  try {
    const response = await api.post('/api/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(`Upload progress: ${percentCompleted}%`);
      }
    });

    return response.data;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};
```

**Using Fetch API:**
```javascript
const uploadVideoFetch = async (videoFile) => {
  const formData = new FormData();
  formData.append('video', videoFile);

  const response = await fetch('http://localhost:5000/api/analyze', {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
```

**Response:**
```json
{
  "success": true,
  "summary": "This wrestling match shows two athletes competing with various takedown attempts...",
  "suggestions": "1. Improve grip strength\n2. Work on footwork positioning\n3. Practice sprawl defense...",
  "keyPoints": "- Good offensive pressure\n- Needs work on leg defense\n- Strong upper body control...",
  "detailedAnalysis": "The red wrestler demonstrates good technique in... [detailed analysis]"
}
```

---

## Custom Analysis

### Ask Follow-up Questions

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "videoPath": "match-123.mp4",
    "userInput": "What should the wrestler in red improve on?",
    "previousAnalysis": {
      "summary": "...",
      "suggestions": "...",
      "keyPoints": "...",
      "detailedAnalysis": "..."
    }
  }' \
  http://localhost:5000/api/custom-analysis
```

**Using JavaScript:**
```javascript
const getCustomAnalysis = async (userQuestion, previousAnalysis) => {
  try {
    const response = await api.post('/api/custom-analysis', {
      videoPath: 'match-123.mp4',
      userInput: userQuestion,
      previousAnalysis: previousAnalysis
    });

    return response.data.response;
  } catch (error) {
    console.error('Custom analysis error:', error);
    throw error;
  }
};

// Usage
const analysis = await uploadVideo(videoFile);
const customResponse = await getCustomAnalysis(
  'What are the key issues with the red wrestler?',
  analysis
);
console.log(customResponse);
```

**Response:**
```json
{
  "success": true,
  "response": "The wrestler in red has several areas for improvement... [detailed response based on the previous analysis and user question]"
}
```

---

## Example Workflows

### Complete Analysis Flow

```javascript
const analyzeVideoComplete = async (videoFile, userQuestion) => {
  try {
    // Step 1: Upload and analyze
    console.log('Uploading video...');
    const analysis = await uploadVideo(videoFile);
    console.log('Video analyzed:', analysis);

    // Step 2: Ask follow-up question
    console.log('Getting custom analysis...');
    const customAnalysis = await getCustomAnalysis(
      userQuestion,
      analysis
    );
    console.log('Custom analysis:', customAnalysis);

    // Step 3: Display results
    return {
      analysis,
      customAnalysis
    };
  } catch (error) {
    console.error('Analysis flow error:', error);
    throw error;
  }
};

// Usage
const videoFile = document.getElementById('videoInput').files[0];
const results = await analyzeVideoComplete(
  videoFile,
  'What should the wrestlers improve on?'
);
```

### Batch Analysis (Multiple Videos)

```javascript
const analyzeBatchVideos = async (videoFiles) => {
  const results = [];

  for (const videoFile of videoFiles) {
    try {
      console.log(`Analyzing ${videoFile.name}...`);
      const analysis = await uploadVideo(videoFile);
      results.push({
        filename: videoFile.name,
        analysis
      });
    } catch (error) {
      results.push({
        filename: videoFile.name,
        error: error.message
      });
    }
  }

  return results;
};
```

---

## Error Handling

### Common Errors and Solutions

**400 - Bad Request**
```json
{
  "error": "No video file provided"
}
```
**Solution:** Make sure video file is included in the request

**400 - File Size**
```json
{
  "error": "File too large"
}
```
**Solution:** Compress video or increase MAX_FILE_SIZE in .env

**400 - Invalid Format**
```json
{
  "error": "Invalid file type. Only video files are allowed."
}
```
**Solution:** Upload a valid video format (MP4, WebM, Ogg, MOV)

**500 - Server Error**
```json
{
  "error": "Video analysis failed: API rate limit exceeded"
}
```
**Solution:** Wait a moment and retry, or check API quota

---

## Advanced Examples

### Upload with Progress Tracking

```javascript
const uploadVideoWithProgress = (videoFile, onProgress) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // Track upload progress
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const percentComplete = (e.loaded / e.total) * 100;
        onProgress(percentComplete);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error(`Upload failed: ${xhr.status}`));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Upload error'));
    });

    const formData = new FormData();
    formData.append('video', videoFile);

    xhr.open('POST', 'http://localhost:5000/api/analyze');
    xhr.send(formData);
  });
};

// Usage
uploadVideoWithProgress(videoFile, (progress) => {
  console.log(`Upload progress: ${progress.toFixed(2)}%`);
  // Update UI progress bar
});
```

### Retry Logic

```javascript
const uploadWithRetry = async (videoFile, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await uploadVideo(videoFile);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      const delay = Math.pow(2, i) * 1000; // Exponential backoff
      console.log(`Retry attempt ${i + 1} after ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};
```

### Cache Results Locally

```javascript
const uploadVideoWithCache = async (videoFile) => {
  // Check if already analyzed
  const cached = localStorage.getItem(`analysis-${videoFile.name}`);
  if (cached) {
    console.log('Using cached analysis');
    return JSON.parse(cached);
  }

  // Analyze
  const analysis = await uploadVideo(videoFile);

  // Cache result
  localStorage.setItem(
    `analysis-${videoFile.name}`,
    JSON.stringify(analysis)
  );

  return analysis;
};
```

---

## Testing with cURL

### Test Video Upload
```bash
# Create a test video file (or use an existing one)
curl -X POST \
  -F "video=@test-video.mp4" \
  -v \
  http://localhost:5000/api/analyze
```

### Test Custom Analysis
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "videoPath": "test.mp4",
    "userInput": "What should I improve?",
    "previousAnalysis": {
      "summary": "Test summary",
      "suggestions": "Test suggestions"
    }
  }' \
  -v \
  http://localhost:5000/api/custom-analysis
```

---

## Rate Limiting (Recommended for Production)

Add rate limiting to prevent abuse:

```bash
npm install express-rate-limit
```

```javascript
// In server/index.js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10 // limit each IP to 10 requests per windowMs
});

app.post('/api/analyze', limiter, upload.single('video'), async (req, res) => {
  // ... existing code
});
```

---

## API Monitoring

### Log All Requests

```javascript
// In server/index.js
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});
```

### Monitor API Performance

```javascript
const performanceMonitor = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.path} - ${res.statusCode} - ${duration}ms`);
  });
  
  next();
};

app.use(performanceMonitor);
```

---

For more examples and advanced usage, check the main README.md and DEPLOYMENT.md files.
