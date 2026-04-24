# 🚀 START HERE

Welcome! Your AI Video Analysis App is ready. Follow these steps:

## ⚡ 5-Minute Quick Start

### 1️⃣ Get Google API Key (2 minutes)

1. Go to: https://aistudio.google.com/app/apikey
2. Click **"Get API Key"** or **"Create API Key"**
3. Copy the key
4. Don't lose it! (Keep it safe)

### 2️⃣ Configure Backend (1 minute)

```bash
cd server
cp .env.example .env
```

**Edit the `.env` file** and replace:
```
GOOGLE_API_KEY=YOUR_KEY_HERE
```

That's it! Other defaults work.

### 3️⃣ Install Dependencies (Not needed - already done!)

Dependencies are pre-installed. If missing, run:
```bash
npm install
```

### 4️⃣ Start the App (2 minutes)

From the root `VideoApp` folder:

```bash
npm run dev
```

This starts:
- **React App:** http://localhost:3000 ← Open this!
- **Backend:** http://localhost:5000

### 5️⃣ Try It!

1. Open http://localhost:3000
2. Upload a wrestling video
3. Click "Analyze Video"
4. Wait for AI analysis
5. Ask follow-up questions
6. See results!

## ✅ Verify Everything Works

- [ ] Did `npm run dev` start successfully?
- [ ] Did http://localhost:3000 open in browser?
- [ ] Can you upload a video?
- [ ] Can you click "Analyze Video"?
- [ ] Did analysis results appear?

If ✅ all checked: **You're good to go!** 🎉

## ❌ Something Broke?

### Error: "Cannot find module"
```bash
npm install
npm run dev
```

### Error: "API key not found"
- Check your `.env` file has `GOOGLE_API_KEY=...`
- Make sure key is NOT in quotes
- Restart the server after editing .env

### Error: "Port 5000 in use"
```bash
# Change in server/.env:
PORT=5001
```

### Error: "Cannot upload video"
- Check file is a valid video (MP4, WebM, etc.)
- Check file is under 100MB
- Check your internet connection

## 📚 Documentation (If you want to learn more)

| Document | When to Read |
|----------|--------------|
| **WHAT_WAS_CREATED.md** | Understand what you got |
| **README.md** | Full project guide |
| **SETUP_GUIDE.md** | Detailed setup steps |
| **API_EXAMPLES.md** | Code examples |
| **DEPLOYMENT.md** | Deploy to production |
| **MOBILE_CONVERSION_GUIDE.md** | Make mobile app |
| **PROJECT_STRUCTURE.md** | Technical details |

## 💡 Pro Tips

### 1. Customize the AI Analysis
Edit `server/services/geminiService.js` to change what the AI looks for.

Example: Change for wrestling → Change for basketball:
```javascript
const prompt = `You are a basketball analyst. Analyze this video for...`
```

### 2. Add More Questions
Edit `client/src/App.js` to add suggested questions in InputPanel.

### 3. Style It Your Way
Edit `client/src/App.css` to change colors and layout.

### 4. Add Logo/Branding
Edit `client/public/index.html` and `manifest.json`

## 🎯 Next Steps (After Quick Start)

**Today:**
- [ ] Get API key
- [ ] Run app
- [ ] Upload test video
- [ ] Try analysis

**This Week:**
- [ ] Customize AI prompts for your sport
- [ ] Test with real videos
- [ ] Share with friends/team

**This Month:**
- [ ] Deploy to production (see DEPLOYMENT.md)
- [ ] Set up authentication
- [ ] Add database to save results

**Future:**
- [ ] Convert to mobile app (see MOBILE_CONVERSION_GUIDE.md)
- [ ] Build team analytics dashboard
- [ ] Add payment processing

## 🎮 Try These Examples

### Example 1: Wrestling Analysis
1. Upload a wrestling match video
2. Ask: "What should the red wrestler improve?"
3. Get specific technical feedback

### Example 2: Form Check
1. Upload any athletic video
2. Ask: "What's wrong with their form?"
3. Get detailed technical breakdown

### Example 3: Summarization
1. Upload a sports video
2. Ask: "Summarize this match/performance"
3. Get quick overview

## 🔧 Common Customizations

### Change App Name
Edit `client/public/index.html`:
```html
<title>Your App Name</title>
```

### Change Colors
Edit `client/src/App.css`:
```css
/* Change blue to your color */
background: #3b82f6; /* Your color here */
```

### Change Welcome Text
Edit `client/src/App.js`:
```javascript
<h1>Your App Title</h1>
```

### Change AI Behavior
Edit `server/services/geminiService.js`:
```javascript
const prompt = `You are a [YOUR SPORT] expert...`
```

## 📖 File Meanings

- **client/** = Your website (React)
- **server/** = Your AI engine (Express + Gemini)
- **package.json** = Project configuration
- **.env** = Secrets (API keys, ports, etc.)

## 🆘 Quick Help

| Problem | Solution |
|---------|----------|
| App won't start | Run `npm install` |
| API key error | Check `.env` file |
| Can't upload | Check file type/size |
| Slow analysis | Could be API rate limit |
| Mobile won't work | Browser URL is `localhost` |

For detailed help, see **SETUP_GUIDE.md** or **README.md**

## 🌟 Features You Have

✅ Upload videos  
✅ AI analysis  
✅ Ask questions  
✅ Mobile install (PWA)  
✅ Works offline  
✅ Beautiful UI  
✅ Responsive design  
✅ Ready to deploy  

## 🚀 Ready?

```bash
npm run dev
```

Open: http://localhost:3000

**Let's go!** 🎉

---

Have questions? Read the docs or check the code - it's well-documented!

Need help? All answers are in the markdown files. Enjoy! 💪
