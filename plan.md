Employee opens Wope Website
         ↓
Clicks "Continue with GitHub"  ← You redirect them to GitHub's login page
         ↓
GitHub asks: "Allow Wope to access your repos?" ← OAuth permission screen
         ↓
User clicks Allow → GitHub sends a secret "auth code" to your backend
         ↓
Your backend exchanges that code → gets an "access token" (like a key)
         ↓
You store that token safely in DB (so user stays logged in)
         ↓
Use token to call GitHub API → fetch their repositories
         ↓
Store repo names, URLs, IDs in your database
         ↓
Show repos on Wope dashboard
         ↓
User picks a repo → fetch its branches + PRs
         ↓
Store branch/PR metadata in DB
         ↓
Clone the repo locally on your server
         ↓
Analyze PRs → find bugs, answer questions using AI


Week 1: Set up FastAPI + PostgreSQL + GitHub OAuth login
Week 2: Fetch repos, branches, PRs from GitHub API + store in DB
Week 3: Clone repos locally using GitPython
Week 4: Add AI analysis on PR diffs
Week 5: Clean up APIs, error handling, testing