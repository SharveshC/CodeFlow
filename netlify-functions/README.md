# Netlify AI Proxy

Deploy this to Netlify for free AI backend:

## Setup Instructions

1. **Install Netlify CLI**
   ```bash
   npm i -g netlify-cli
   ```

2. **Deploy to Netlify**
   ```bash
   netlify deploy --prod --functions=netlify-functions
   ```

3. **Set Environment Variable**
   - In Netlify dashboard: Site settings → Build & deploy → Environment
   - Add `GOOGLE_AI_API_KEY`
   - Value: `AIzaSyCuqfJHWBsrW-vr1TGPV3Sd6MdDgMFIusU`

4. **Update AI Widget**
   - Change endpoint to your Netlify URL
   - Example: `https://your-app.netlify.app/.netlify/functions/ai-chat`

## Benefits

✅ **Completely Free** - No credit card required
✅ **Secure Backend** - API key hidden server-side
✅ **Git Integration** - Deploy from GitHub
✅ **Custom Domain** - Can use your domain
✅ **Auto HTTPS** - SSL included free
✅ **CDN Included** - Fast global delivery

## Features

🔒 **Secure API Key Storage**
🚀 **Fast Response Times**
📊 **Usage Analytics**
🔄 **Automatic Deployments**
🛡️ **DDoS Protection**
🌍 **Global CDN**
