# 🔍 Diagnose "Failed to analyze video" Error

This guide helps you figure out what's wrong.

## Step 1: Check Server Logs

When you see "Failed to analyze video" in the app:

1. **Look at Terminal/Console where you ran `npm run dev`**
2. **Scroll up to see error messages**
3. **Copy the error message**

Common errors you might see:

### Error 1: "API key not found"
```
Error: process.env.GOOGLE_API_KEY is undefined
```
**Solution:** 
- Check `server/.env` file
- Make sure it has: `GOOGLE_API_KEY=AIzaSy...`
- Restart server (Ctrl+C, then `npm run dev`)

### Error 2: "API key invalid"
```
Error: Invalid value for key 'key' in resource 'GoogleGenerativeAI': 
Google API key not valid.
```
**Solution:**
- Your API key is wrong or expired
- Get a new one: https://aistudio.google.com/app/apikey
- Update `server/.env`
- Restart server

### Error 3: "CORS error" or "Network error"
```
Error: Network error or CORS blocked
```
**Solution:**
- Make sure backend is running on port 5000
- Check `server/.env` has `CORS_ORIGIN=http://localhost:3000`
- Restart both client and server

### Error 4: "Video file error"
```
Error: Cannot read video file or invalid format
```
**Solution:**
- Try a smaller video file
- Try a different format (MP4, WebM, Ogg)
- Make sure file is under 100MB

---

## Step 2: Verify Your Setup

Run this checklist:

### Backend Check
- [ ] `server/.env` exists
- [ ] `GOOGLE_API_KEY=AIzaSy...` is in the file (actual key, not placeholder)
- [ ] No quotes around the key
- [ ] Server is running (`npm run dev` shows "listening on port 5000")

### API Key Check
- [ ] You got it from: https://aistudio.google.com/app/apikey
- [ ] It starts with: `AIzaSy`
- [ ] It's not expired (created today)
- [ ] It's not the demo key

### Network Check
- [ ] Frontend runs on: http://localhost:3000
- [ ] Backend runs on: http://localhost:5000
- [ ] Both show "compiled successfully"

---

## Step 3: Test the API Directly

Without using the app, test if the API works:

### Using curl (Mac/Linux):
```bash
# Test if server is responding
curl http://localhost:5000/api/health
```

Should return:
```json
{"status":"ok","message":"Video Analysis Server is running"}
```

If that works, the server is running.

### Check API Key:
Edit `server/.env` and verify:
```
GOOGLE_API_KEY=YOUR_ACTUAL_KEY_HERE
```

### Check logs:
In the terminal where you ran `npm run dev`, look for:
- Error messages after you try to upload
- "Analyzing video" message before error
- Specific error from Google API

---

## Step 4: Common Solutions

### Solution 1: Restart Everything
```bash
# Stop server (Ctrl+C in terminal)
# Then:
npm run dev
```

### Solution 2: Update API Key
1. Go to: https://aistudio.google.com/app/apikey
2. Create new key (delete old one if expired)
3. Edit `server/.env`
4. Replace the key
5. Restart server

### Solution 3: Clear Cache
```bash
# Stop server first (Ctrl+C)
# Then:
rm -rf server/uploads
npm run dev
```

### Solution 4: Check Environment
Delete `server/.env` and recreate it:
```bash
cd server
cp .env.example .env
# Edit .env and add your API key
cd ..
npm run dev
```

---

## Step 5: More Detailed Debugging

### Enable Debug Logging

Edit `server/services/geminiService.js`

Find this line:
```javascript
console.log(`Starting analysis for: ${fileName}`);
```

Add more logging around it:
```javascript
console.log('=== ANALYSIS START ===');
console.log(`File: ${fileName}`);
console.log(`API Key exists: ${!!process.env.GOOGLE_API_KEY}`);
console.log(`API Key length: ${process.env.GOOGLE_API_KEY?.length}`);
```

This will show in your terminal what's happening.

### Check Server Response

When upload fails:
1. Open browser Developer Tools (F12)
2. Go to **Network** tab
3. Upload a video
4. Look for request to `http://localhost:5000/api/analyze`
5. Click on it
6. Check **Response** tab
7. Copy the error message

---

## Step 6: Detailed Error Messages

Once you have the exact error, match it here:

### "Error: Invalid API key"
→ Your key is wrong. Get new one from Google AI Studio

### "Error: Resource exhausted"
→ API quota exceeded. Check your Google account usage

### "Error: Permission denied"
→ API key doesn't have permission. Create new key

### "Error: Malformed request"
→ Something wrong with the video data. Try different video

### "Error: ECONNREFUSED"
→ Backend not running. Check terminal shows "listening"

### "Error: File not found"
→ Uploaded file got deleted. Check `server/uploads` folder

---

## Step 7: Get Full Error Details

Edit `server/index.js`

Find this section:
```javascript
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: err.message || 'Internal server error'
  });
});
```

Change to:
```javascript
app.use((err, req, res, next) => {
  console.error('FULL ERROR:', err);
  console.error('Stack:', err.stack);
  res.status(500).json({
    error: err.message || 'Internal server error',
    details: err.toString()
  });
});
```

Now upload a video and check terminal for full error.

---

## Most Common Fix

99% of the time, the fix is:

1. **Open `server/.env`**
2. **Check `GOOGLE_API_KEY` line**
3. **Make sure it has your real key (not placeholder)**
4. **Restart server: `npm run dev`**
5. **Try uploading again**

---

## Need More Help?

After trying these steps, tell me:
1. What error do you see in terminal?
2. What does the server console show?
3. What's in your `server/.env` file? (without the actual key)
4. Does `curl http://localhost:5000/api/health` work?

Then I can give you a more specific solution!
