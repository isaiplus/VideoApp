# ✅ First Run Checklist

Complete this checklist to get your app running in less than 10 minutes.

## Before You Start
- [ ] You have the folder open: `/VideoApp`
- [ ] You have internet connection
- [ ] You have Node.js installed (check: `node --version`)

## Step-by-Step

### Step 1: Get Google API Key (2 minutes)
- [ ] Go to: https://aistudio.google.com/app/apikey
- [ ] Click **"Get API Key"**
- [ ] A key will be displayed (looks like: `AIzaSyD...`)
- [ ] Copy this key somewhere safe (you'll need it in Step 2)
- [ ] Keep this browser tab open (you'll return to it)

### Step 2: Configure Your App (1 minute)
- [ ] Open file: `server/.env`
- [ ] Find this line: `GOOGLE_API_KEY=your_google_api_key_here`
- [ ] Replace `your_google_api_key_here` with your actual key
- [ ] Example: `GOOGLE_API_KEY=AIzaSyD...`
- [ ] **Important:** Do NOT use quotes around the key
- [ ] Save the file (Ctrl+S or Cmd+S)

### Step 3: Start the App (1 minute)
- [ ] Open Terminal/Command Prompt
- [ ] Navigate to VideoApp folder: `cd VideoApp`
- [ ] Run: `npm run dev`
- [ ] Wait for these messages:
  - `compiled successfully`
  - `Compiled!`
  - `webpack compiled`
- [ ] Both client and server should start

### Step 4: Open in Browser (1 minute)
- [ ] Open your browser
- [ ] Go to: `http://localhost:3000`
- [ ] You should see the Video Analysis app
- [ ] The app is ready to use!

### Step 5: Test It Works (2 minutes)
- [ ] Click on the upload area
- [ ] Select a video file (any MP4, WebM, or Ogg)
- [ ] You should see a preview
- [ ] Click **"Analyze Video"**
- [ ] Wait for AI analysis (30-60 seconds)
- [ ] You should see results appear
- [ ] ✅ Success! Your app is working!

### Step 6: Try Follow-up Questions (1 minute)
- [ ] Scroll down to "Ask Follow-up Questions"
- [ ] Type a question like: "What should be improved?"
- [ ] Click **"Ask"**
- [ ] You should see an answer
- [ ] ✅ Double success! Everything works!

## Troubleshooting at Each Step

### Step 1: API Key Issues
**Problem:** Can't find API key button
- Solution: Make sure you're logged into Google account
- Solution: Try incognito mode if stuck
- Solution: Use direct link: https://aistudio.google.com/app/apikey

**Problem:** No key generated
- Solution: Click button again
- Solution: Refresh page and try again

### Step 2: Configuration Issues
**Problem:** Can't find `.env` file
- Solution: It's in the `server` folder
- Solution: Look for: `server/.env`
- Solution: If it doesn't exist, create it from `server/.env.example`

**Problem:** Can't edit the file
- Solution: Use a text editor (VS Code, Notepad++, etc.)
- Solution: Not Word! Use plain text editor
- Solution: Make sure to save after editing

**Problem:** App says "API key not found"
- Solution: Check `server/.env` has your actual key
- Solution: Make sure there are NO quotes around the key
- Solution: Make sure file was saved
- Solution: Restart the server (Stop with Ctrl+C, then `npm run dev` again)

### Step 3: Starting Issues
**Problem:** `npm command not found`
- Solution: Node.js not installed
- Solution: Download from: https://nodejs.org/

**Problem:** `Port 5000 in use`
- Solution: Edit `server/.env`
- Solution: Change: `PORT=5001`
- Solution: Restart the app

**Problem:** Dependencies missing
- Solution: Run: `npm install`
- Solution: Wait for it to complete
- Solution: Then run: `npm run dev`

**Problem:** Weird compilation errors
- Solution: Delete `node_modules` folder
- Solution: Run: `npm install`
- Solution: Run: `npm run dev`

### Step 4: Browser Issues
**Problem:** `http://localhost:3000` shows nothing
- Solution: Wait longer (takes 30-60 seconds first time)
- Solution: Refresh the page (F5 or Cmd+R)
- Solution: Check browser console for errors (F12)
- Solution: Try another browser (Chrome, Firefox, Safari)

**Problem:** Page is blank/white
- Solution: Check browser console (F12) for errors
- Solution: Refresh the page
- Solution: Check if server is running (look at terminal)

### Step 5: Upload Issues
**Problem:** Upload button doesn't work
- Solution: Click inside the dashed box
- Solution: Make sure file is a valid video (MP4, WebM, Ogg)
- Solution: File should be under 100MB

**Problem:** Video preview shows error
- Solution: Try a different video file
- Solution: Make sure it's actually a video
- Solution: Check file size (under 100MB)

**Problem:** Analysis doesn't start
- Solution: Check that server is still running (look at terminal)
- Solution: Check browser console for errors (F12)
- Solution: Make sure API key is valid
- Solution: Try a smaller/different video

**Problem:** Analysis takes very long
- Solution: Be patient! It can take 30-60 seconds
- Solution: Check network connection
- Solution: Check that API key is active
- Solution: Look at server logs for errors

### Step 6: Question Issues
**Problem:** Ask button is disabled/greyed out
- Solution: First click "Analyze Video" and wait for results
- Solution: Then try asking a question
- Solution: Type something in the text box

**Problem:** Question doesn't get answered
- Solution: Wait 30-60 seconds
- Solution: Check browser console for errors (F12)
- Solution: Check server logs for API errors
- Solution: Make sure API key is still valid

## Verify Everything Works

After Step 6, you should have:

- [ ] App loaded at http://localhost:3000
- [ ] Video preview visible after upload
- [ ] Analysis results displayed
- [ ] Follow-up question answered

If all checked: **✅ You're done! Your app works!**

## What's Running

When you have `npm run dev` running:

| What | Where | Port |
|------|-------|------|
| Frontend (React) | http://localhost:3000 | 3000 |
| Backend (API) | http://localhost:5000 | 5000 |

Both should be running and working together.

## Next Steps After First Run

1. ✅ **Close the terminal?** NO! Keep it running while developing
2. **Want to stop?** Press Ctrl+C in terminal
3. **Want to restart?** Run `npm run dev` again
4. **Want to customize?** See [README.md](README.md) or [SETUP_GUIDE.md](SETUP_GUIDE.md)

## Common Questions

**Q: Do I need to restart after editing files?**
A: Not usually - React/Express auto-reload. But restart if weird errors happen.

**Q: Can I close the terminal?**
A: No! The terminal runs the server. Keep it open.

**Q: Can I use a different video?**
A: Yes! Any MP4, WebM, or Ogg file works.

**Q: How long does analysis take?**
A: 30-60 seconds typically.

**Q: Can I use on mobile?**
A: Yes! Use the same URL from your phone on the same network.
   Or install as PWA (see [MOBILE_CONVERSION_GUIDE.md](MOBILE_CONVERSION_GUIDE.md))

**Q: What if something breaks?**
A: See Troubleshooting section above or check other docs.

## Emergency Reset

If everything is broken:

1. **Stop the app:** Press Ctrl+C in terminal
2. **Delete node_modules:** `rm -rf node_modules`
3. **Reinstall:** `npm install`
4. **Restart:** `npm run dev`
5. **Check .env:** Make sure `server/.env` has your API key

## Success Indicators

✅ App is running if you see:
- Terminal shows "compiled successfully"
- Terminal shows "webpack compiled"
- No red error messages in terminal
- Browser shows the upload interface

✅ API is connected if you can:
- Upload a video
- See preview
- Click "Analyze Video"
- See results appear

✅ AI is working if:
- Analysis has actual content (not errors)
- You can ask follow-up questions
- You get answers

## Estimated Timeline

| Step | Time | Total |
|------|------|-------|
| 1. Get API key | 2 min | 2 min |
| 2. Configure .env | 1 min | 3 min |
| 3. Start app | 1 min | 4 min |
| 4. Open browser | 1 min | 5 min |
| 5. Test video upload | 2 min | 7 min |
| 6. Try questions | 1 min | 8 min |

**Total: ~8 minutes from start to working app!**

## You're Ready!

Follow this checklist and you'll have a working app in minutes.

Then check the other guides to customize and deploy.

**Start with Step 1 now!** 🚀
