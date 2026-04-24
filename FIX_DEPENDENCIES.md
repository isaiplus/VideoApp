# 🔧 Fix Missing Dependencies

You're getting errors because the npm packages aren't installed yet. Here's how to fix it:

## Quick Fix (3 steps)

### Step 1: Open Terminal
Navigate to your VideoApp folder in terminal:
```bash
cd ~/Developer/Repos/VideoApp
```

### Step 2: Install All Dependencies

**Option A: Automatic (Easiest)**
```bash
bash INSTALL_DEPENDENCIES.sh
```

**Option B: Manual (Step by Step)**
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..

# Install server dependencies
cd server
npm install
cd ..
```

### Step 3: Start the App
```bash
npm run dev
```

That's it! The errors should be gone.

---

## If You Still Get Errors

### Error: "Permission denied" or "EACCES"
Try:
```bash
sudo npm install
```

### Error: "Port already in use"
Edit `server/.env` and change:
```
PORT=5000
```
to:
```
PORT=5001
```

### Error: Still missing packages?
Try clearing cache and reinstalling:
```bash
npm cache clean --force
rm -rf client/node_modules
rm -rf server/node_modules
rm -rf node_modules
npm install
cd client && npm install && cd ..
cd server && npm install && cd ..
```

### Error: "Module not found" after npm install
The packages should install automatically. If not:
```bash
cd client
npm install lucide-react axios react-router-dom react-scripts
cd ..
```

---

## What Each Install Does

| Command | What it does |
|---------|------------|
| `npm install` in root | Installs: concurrently (for running both apps) |
| `npm install` in client | Installs: React, Axios, Lucide, React Router |
| `npm install` in server | Installs: Express, Multer, Google AI, CORS, Dotenv |

---

## Verify Installation

After installing, check that these folders exist:

✅ `client/node_modules/` - should have folders
✅ `server/node_modules/` - should have folders
✅ Both should be large folders (not empty)

If they're empty, the install didn't work.

---

## Still Stuck?

Try the nuclear option (clears everything and reinstalls):

```bash
# From VideoApp folder
rm -rf client/node_modules
rm -rf server/node_modules  
rm -rf node_modules
rm package-lock.json
cd client && rm package-lock.json && cd ..
cd server && rm package-lock.json && cd ..

# Now reinstall everything
npm install
cd client && npm install && cd ..
cd server && npm install && cd ..
```

---

## Once Installation Completes

You should see:
- ✅ No red errors in terminal
- ✅ "added XX packages" message
- ✅ Both node_modules folders are large

Then run:
```bash
npm run dev
```

And open: http://localhost:3000

Good luck! 🚀
