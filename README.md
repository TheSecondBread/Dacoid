# 🔗 Dacoid Link Analytics Dashboard

A full-stack Micro-SaaS application that allows users to create shortened URLs and track their performance — including clicks, device types, and timestamps

## Live Demo

Frontend: https://your-frontend-url.vercel.app  
Backend API: https://your-backend-url.onrender.com

> Test Credentials  
**Email:** intern@dacoid.com  
**Password:** Test123


## ⚙️ Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/TheSecondBread/Dacoid.git
cd Dacoid
```

### 2. Backend Setup (Server Folder)

```bash
cd Server
npm install
```
### Create a .env file inside the Server folder with the following variables:

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
### Start the backend server:

```bash
npm run dev
```


### 3. Frontend Setup (Client Folder)

```bash
cd Client
npm install
npm run dev
```
#### Frontend will start on http://localhost:5173 (or similar).

##  Features

###  Authentication
- Email/password login (JWT-based)
- Hardcoded user for testing (`intern@dacoid.com` / `Test123`)
- JWT stored securely for protected routes

###  URL Shortening
- Input long URL
- Optional custom alias
- Optional expiration date
- Generates short link like: https://yourdomain.com/abc

### Analytics Dashboard
- Table view with:
  - Original URL
  - Short URL
  - Total clicks
  - Created date
- insights using charts:
  - Clicks over time (Line/Bar Chart)
  - Device type distribution (Pie Chart)

### Asynchronous Logging
- On every short link visit:
  - Redirect to original URL
  - Asynchronously logs:
    - Device type
    - IP address
    - Timestamp






