# Deployment Guide

## Production Checklist

- [ ] All environment variables configured
- [ ] Google API key obtained and verified
- [ ] Frontend build optimized
- [ ] Backend error handling tested
- [ ] CORS configured for production domain
- [ ] Video upload limits set
- [ ] Rate limiting configured
- [ ] HTTPS enabled

## Deploying to Heroku

### Prerequisites
- Heroku account
- Heroku CLI installed
- Git repository initialized

### Steps

1. **Create Heroku app**
```bash
heroku create your-app-name
```

2. **Add buildpacks**
```bash
heroku buildpacks:add heroku/nodejs
```

3. **Set environment variables**
```bash
heroku config:set GOOGLE_API_KEY=your_key_here
heroku config:set NODE_ENV=production
heroku config:set CORS_ORIGIN=https://your-app-name.herokuapp.com
```

4. **Create Procfile** in root:
```
web: npm start
```

5. **Update package.json scripts**:
```json
{
  "scripts": {
    "build": "cd client && npm run build",
    "start": "npm run build && cd server && node index.js"
  }
}
```

6. **Deploy**
```bash
git push heroku main
```

## Deploying to Vercel (Frontend Only)

### Steps

1. **Build the frontend**
```bash
cd client
npm run build
```

2. **Connect to Vercel**
- Go to vercel.com
- Import project
- Select `client` directory
- Add environment variable:
  - `REACT_APP_API_URL=https://your-backend-url.com`

3. **Deploy backend separately** (Heroku, AWS, etc.)

## Deploying to AWS

### Option 1: AWS Amplify (Recommended for Frontend)

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize
amplify init

# Deploy frontend
amplify publish
```

### Option 2: EC2 (Full Stack)

1. **Launch EC2 instance**
   - Ubuntu 20.04 LTS
   - t2.micro (free tier) or larger

2. **SSH into instance**
```bash
ssh -i key.pem ubuntu@your-instance-ip
```

3. **Install Node.js**
```bash
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

4. **Clone and setup**
```bash
git clone your-repo-url
cd VideoApp
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..
```

5. **Create .env file**
```bash
cd server
nano .env
# Add GOOGLE_API_KEY and other variables
```

6. **Start with PM2**
```bash
npm install -g pm2
pm2 start "npm start" --name "video-analysis"
pm2 startup
pm2 save
```

7. **Setup Nginx reverse proxy**
```bash
sudo apt-get install nginx
sudo nano /etc/nginx/sites-available/default
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

8. **Enable HTTPS with Let's Encrypt**
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Deploying to DigitalOcean

### Steps

1. **Create Droplet**
   - Choose Ubuntu 20.04
   - Select size (minimum 1GB RAM recommended)

2. **SSH and setup** (same as AWS EC2 above)

3. **Configure firewall**
```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

4. **Setup domain**
   - Point domain to droplet IP
   - Follow Nginx + Let's Encrypt steps above

## Environment Variables for Production

```env
# API
GOOGLE_API_KEY=your_production_key
NODE_ENV=production

# Server
PORT=5000
CORS_ORIGIN=https://your-domain.com

# File Upload
MAX_FILE_SIZE=104857600
UPLOAD_DIR=/var/uploads/videos

# Database (if added later)
DATABASE_URL=your_database_url
```

## Monitoring and Maintenance

### Monitor Logs
```bash
# Heroku
heroku logs --tail

# AWS/DigitalOcean with PM2
pm2 logs

# Systemd
journalctl -u video-analysis -f
```

### Update Dependencies
```bash
npm update
npm audit fix
```

### Backup Uploads
```bash
# Regular backup schedule
0 2 * * * rsync -avz /var/uploads/videos /backup/
```

## Performance Optimization

1. **Enable Gzip compression**
```javascript
const compression = require('compression');
app.use(compression());
```

2. **Add caching headers**
```javascript
app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=3600');
  next();
});
```

3. **Implement rate limiting**
```bash
npm install express-rate-limit
```

4. **Use CDN** for static assets
   - Cloudflare
   - AWS CloudFront
   - DigitalOcean Spaces

## Scaling Considerations

- **Horizontal scaling**: Use load balancer (AWS ALB, Nginx)
- **Video processing queue**: Consider Redis + Bull for async jobs
- **Database**: Add PostgreSQL or MongoDB for user data
- **Caching**: Implement Redis for API responses
- **Separate storage**: Use AWS S3 or DigitalOcean Spaces for videos

## SSL Certificate

All production sites should use HTTPS:

```bash
# Let's Encrypt (free)
sudo certbot certonly --standalone -d your-domain.com

# Or use provider's certificate management
```

## Troubleshooting Deployment

**Port already in use**
```bash
sudo lsof -i :5000
sudo kill -9 <PID>
```

**CORS errors**
- Check `CORS_ORIGIN` matches production domain
- Restart server after changes

**Out of memory**
- Increase server size
- Implement cleanup for old uploads
- Add pagination to API responses

**Slow uploads**
- Optimize video processing
- Add chunked upload
- Use CDN for distribution

## Next: Add Features

- Authentication system
- User accounts and history
- Payment processing
- API rate limiting
- Advanced analytics
