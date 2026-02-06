# Great Gourmet - GitHub Pages Deployment

This repository is configured for GitHub Pages deployment.

## Live Demo Links

Once GitHub Pages is enabled, the site will be available at:

- **Public Website**: https://joaobaptistaads-del.github.io/vixion/
- **Admin Panel**: https://joaobaptistaads-del.github.io/vixion/admin-login.html

## Enabling GitHub Pages

To enable GitHub Pages for this repository:

1. Go to repository Settings
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select the branch: `copilot/replicate-project-design`
4. Select folder: `/ (root)`
5. Click "Save"
6. Wait a few minutes for deployment

The site will be live at the URLs above!

## Alternative: View Locally

If you want to view the site immediately without waiting for GitHub Pages:

```bash
# Clone the repository
git clone https://github.com/joaobaptistaads-del/vixion.git
cd vixion

# Switch to the project branch
git checkout copilot/replicate-project-design

# Open in browser
# On Linux/Mac:
open index.html
# Or on Windows:
start index.html

# For admin panel:
open admin-login.html
```

## Using Python HTTP Server

```bash
# Start a local server
python3 -m http.server 8000

# Then open in browser:
# http://localhost:8000 - Public site
# http://localhost:8000/admin-login.html - Admin panel
```

## Admin Credentials

- Username: `admin`
- Password: `admin123`
