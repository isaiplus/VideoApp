# 🔧 Fix "Port 5000 Already in Use" Error

The error means another program is already using port 5000. Here's how to fix it:

## Quick Fix (Choose One)

### Option 1: Change the Port (Easiest) ⭐

1. **Open:** `server/.env`
2. **Find:** `PORT=5000`
3. **Change to:** `PORT=5001` (or any unused port)
4. **Save the file**
5. **Stop server:** Press Ctrl+C
6. **Start again:** `npm run dev`

### Option 2: Kill the Process Using Port 5000

**On Mac/Linux:**
```bash
# Find what's using port 5000
lsof -i :5000

# Kill the process (replace 12345 with PID from above)
kill -9 12345

# Or kill all node processes
killall node

# Then restart
npm run dev
```

**On Windows:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with the number from above)
taskkill /PID <PID> /F

# Then restart
npm run dev
```

### Option 3: Use a Different Port from Start

If changing port, also update frontend:

**In `client/src/services/api.js`:**
```javascript
const api = axios.create({
  baseURL: 'http://localhost:5001',  // Changed from 5000
  headers: {
    'Content-Type': 'application/json',
  },
});
```

---

## Why This Happens

- You started the server multiple times
- Another app is using port 5000
- The server crashed but process is still running
- You have another version running

---

## Prevention

Always use Ctrl+C to properly stop the server:
```bash
# Stop server gracefully
Ctrl+C

# Then start again
npm run dev
```

---

## After Fixing

1. ✅ Server should start without errors
2. ✅ You'll see "listening on port 5000" (or your new port)
3. ✅ Frontend will work at http://localhost:3000
4. ✅ Ready to upload videos!

---

## Recommended Solution

**I recommend Option 1 (change port)** because:
- Takes 30 seconds
- No need to kill processes
- Doesn't affect other programs
- Easy to remember

Just change `PORT=5000` to `PORT=5001` in `server/.env`

That's it! 🎉
