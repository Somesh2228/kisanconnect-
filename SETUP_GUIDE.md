# Kisan Circle - Complete Setup Guide

## Overview

This guide will help you set up the complete Kisan Circle platform with:
- **PostgreSQL Database** for storing users, messages, posts, and application data
- **Backend API** (Node.js/Express) for handling all business logic
- **Frontend** (HTML/CSS/JavaScript) for the user interface

---

## Prerequisites

Before you begin, make sure you have:
- Node.js (v18+) installed
- PostgreSQL (v14+) installed
- npm or yarn package manager
- A code editor (VS Code recommended)

---

## Step 1: Install PostgreSQL

### Windows
1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Run the installer and follow the setup wizard
3. Remember the password you set for the `postgres` user
4. Default port: 5432

### macOS
```bash
brew install postgresql@14
brew services start postgresql@14
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

---

## Step 2: Create Database

1. Open PostgreSQL command line (psql):
```bash
# Windows: Use pgAdmin or psql from Start Menu
# Mac/Linux:
psql -U postgres
```

2. Create the database:
```sql
CREATE DATABASE kisan_circle;
\q
```

3. Import the schema:
```bash
# Navigate to project directory
cd C:\Users\somes\projects\kisan-circle

# Import schema (Windows)
psql -U postgres -d kisan_circle -f database\schema.sql

# Or on Mac/Linux
psql -U postgres -d kisan_circle -f database/schema.sql
```

---

## Step 3: Configure Environment Variables

1. Open the `.env` file in the root directory
2. Update with your database credentials:

```env
# Database Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=kisan_circle
POSTGRES_USER=postgres
POSTGRES_PASSWORD=YOUR_POSTGRES_PASSWORD_HERE

# JWT Secret (IMPORTANT: Change this to a random string)
JWT_SECRET=change_this_to_a_random_secret_key_12345

# Server Configuration
PORT=8000
FRONTEND_PORT=3000
NODE_ENV=development
```

**Important:** Never commit the `.env` file with real passwords to version control!

---

## Step 4: Install Backend Dependencies

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# This will install:
# - express (web server)
# - pg (PostgreSQL client)
# - bcryptjs (password hashing)
# - jsonwebtoken (authentication)
# - socket.io (real-time messaging)
# - and more...
```

---

## Step 5: Start the Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Or production mode
npm start
```

You should see:
```
🚀 Kisan Circle API Server Started
📡 Port: 8000
🌍 Environment: development
🔗 API: http://localhost:8000
📚 Health: http://localhost:8000/health
✅ Connected to PostgreSQL database
```

Test the API:
- Open browser: http://localhost:8000
- Health check: http://localhost:8000/health

---

## Step 6: Test the Database Connection

Create a test user via API:

```bash
# Using PowerShell:
Invoke-RestMethod -Uri "http://localhost:8000/api/auth/register" -Method POST -ContentType "application/json" -Body '{"name":"Test Farmer","phone":"1234567890","password":"test123","location":"Test Village","district":"Test District","state":"Test State"}'

# Or using curl (Git Bash/WSL):
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Farmer","phone":"1234567890","password":"test123","location":"Test Village","district":"Test District","state":"Test State"}'
```

If successful, you'll receive a response with user details and an access token!

---

## Step 7: Update Frontend to Use Backend

The frontend files (`messaging.js`, `script.js`) need to be updated to call the backend APIs instead of using localStorage.

I'll provide updated versions that connect to your backend API.

Create a new file: `frontend/js/api.js`

```javascript
// API Configuration
const API_BASE_URL = 'http://localhost:8000/api';
let accessToken = localStorage.getItem('accessToken');

// API Helper Functions
const api = {
    // Set auth token
    setToken(token) {
        accessToken = token;
        localStorage.setItem('accessToken', token);
    },

    // Clear auth token
    clearToken() {
        accessToken = null;
        localStorage.removeItem('accessToken');
    },

    // Generic request helper
    async request(endpoint, options = {}) {
        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(accessToken && { 'Authorization': `Bearer ${accessToken}` }),
                ...options.headers,
            },
        };

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Request failed');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    // Auth APIs
    async register(userData) {
        const data = await this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
        this.setToken(data.accessToken);
        return data;
    },

    async login(credentials) {
        const data = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
        this.setToken(data.accessToken);
        return data;
    },

    async logout() {
        await this.request('/auth/logout', { method: 'POST' });
        this.clearToken();
    },

    async getCurrentUser() {
        return await this.request('/auth/me');
    },

    // Messages APIs
    async getConversations() {
        return await this.request('/messages/conversations');
    },

    async getMessages(conversationId) {
        return await this.request(`/messages/conversations/${conversationId}/messages`);
    },

    async sendMessage(conversationId, content) {
        return await this.request(`/messages/conversations/${conversationId}/messages`, {
            method: 'POST',
            body: JSON.stringify({ content }),
        });
    },

    async startConversation(otherUserId) {
        return await this.request('/messages/conversations', {
            method: 'POST',
            body: JSON.stringify({ otherUserId }),
        });
    },

    // Posts APIs
    async getPosts(category = null) {
        const query = category ? `?category=${category}` : '';
        return await this.request(`/posts${query}`);
    },

    async createPost(postData) {
        return await this.request('/posts', {
            method: 'POST',
            body: JSON.stringify(postData),
        });
    },

    async likePost(postId) {
        return await this.request(`/posts/${postId}/like`, {
            method: 'POST',
        });
    },

    // Users APIs
    async searchUsers(search = '') {
        return await this.request(`/users?search=${search}`);
    },
};

// Make api available globally
window.api = api;
```

---

## Step 8: Run the Frontend

You have two options:

### Option A: Simple HTTP Server (Python)
```bash
# Navigate to root directory
cd C:\Users\somes\projects\kisan-circle

# Start server
python -m http.server 3000
```

### Option B: Live Server (VS Code Extension)
1. Install "Live Server" extension in VS Code
2. Right-click `index.html` → "Open with Live Server"

Open browser: http://localhost:3000

---

## Step 9: Test the Complete System

1. **Register a new user**
   - Go to http://localhost:3000
   - Click "Sign Up"
   - Fill in details and submit
   - You should be logged in automatically

2. **Create a post**
   - Click "Share Your Experience"
   - Create a post
   - It will be saved to the database

3. **Test messaging**
   - Go to Messages section
   - Start a conversation
   - Send messages
   - Messages are stored in PostgreSQL and delivered in real-time via WebSocket

---

## Troubleshooting

### Backend won't start
```bash
# Check if PostgreSQL is running
# Windows:
Get-Service -Name postgresql*

# Mac/Linux:
brew services list  # or
sudo systemctl status postgresql
```

### Database connection error
- Verify `.env` file has correct credentials
- Test connection:
```bash
psql -U postgres -d kisan_circle
# If this works, your DB is fine
```

### Port already in use
```bash
# Windows - Kill process on port 8000:
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:8000 | xargs kill -9
```

---

## Next Steps

### Production Deployment

1. **Use environment-specific configs**
   - Create `.env.production` file
   - Set `NODE_ENV=production`

2. **Use PostgreSQL in cloud**
   - Try: Neon, Supabase, AWS RDS, or DigitalOcean
   - Update `DATABASE_URL` in `.env`

3. **Deploy backend**
   - Heroku, Railway, Render, or AWS
   - Set environment variables in platform

4. **Deploy frontend**
   - Vercel, Netlify, or GitHub Pages
   - Update `API_BASE_URL` to point to deployed backend

---

## Summary

You now have:
✅ PostgreSQL database with complete schema
✅ Backend API with authentication, messaging, and posts
✅ Frontend ready to connect to backend
✅ Real-time messaging with WebSocket
✅ Secure JWT authentication
✅ Complete data persistence

## Database Schema Highlights

Your database includes tables for:
- **users** - User accounts with profiles
- **conversations** & **messages** - Real-time messaging
- **posts** & **comments** - Community posts
- **government_schemes** - Agricultural schemes
- **notifications** - User notifications
- **weather_alerts** - Weather information
- **market_prices** - Commodity prices

All data is now stored persistently in PostgreSQL instead of browser localStorage!

---

## Getting Help

If you encounter issues:
1. Check backend console for errors
2. Check browser console for frontend errors
3. Verify `.env` file configuration
4. Ensure PostgreSQL is running
5. Test API endpoints using Postman or browser

Happy coding! 🚀🌾
