# ✅ Fix Your API Key (2 Minutes)

Your app is failing because the Google API key is not set up. Here's the quick fix:

## Step 1: Get Your API Key (1 minute)

1. **Open this link:** https://aistudio.google.com/app/apikey
2. **Click "Get API Key"** or **"Create API Key"**
3. **A key will appear** (looks like: `AIzaSyD1234567890abcdefg...`)
4. **Copy it** (important!)

## Step 2: Add Your Key to .env (1 minute)

1. **Open:** `server/.env`
2. **Find this line:**
   ```
   GOOGLE_API_KEY=your_google_api_key_here
   ```

3. **Replace it with your actual key:**
   ```
   GOOGLE_API_KEY=AIzaSyD1234567890abcdefg...
   ```

4. **Save the file** (Ctrl+S or Cmd+S)

## Step 3: Restart the Server

1. **Stop the server:** Press **Ctrl+C** in the terminal
2. **Start it again:** Type `npm run dev`
3. **Wait for "compiled successfully"**

## Step 4: Try Again!

1. **Go to** http://localhost:3000
2. **Upload a video**
3. **Click "Analyze Video"**
4. **Should work now!** ✨

---

## Important Notes

✅ **DO:** Copy your actual key from Google AI Studio
❌ **DON'T:** Use `your_google_api_key_here` (that's just a placeholder)
❌ **DON'T:** Add quotes around the key
✅ **DO:** Make sure you have no spaces before/after

---

## Example

**WRONG:**
```
GOOGLE_API_KEY=your_google_api_key_here
```

**WRONG:**
```
GOOGLE_API_KEY="AIzaSyD..."
```

**RIGHT:**
```
GOOGLE_API_KEY=AIzaSyD1234567890abcdefghijklmnop
```

---

## Get Your Key Now

👉 Go to: https://aistudio.google.com/app/apikey

It takes 30 seconds!

Then come back and follow steps 2-4 above.

---

## Still Not Working?

After restarting the server, if it still fails:

1. **Check terminal** for error messages
2. **Read:** DIAGNOSE_ERROR.md
3. **Make sure** your key starts with `AIzaSy`
4. **Make sure** `.env` was saved correctly
5. **Try restarting** both client and server

---

That's it! Easy fix! 🎉
