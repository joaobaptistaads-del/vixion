# Great Gourmet - Restaurant Reservation Website

A modern and elegant restaurant reservation website with comprehensive administrative panel built with HTML, CSS, and JavaScript.

## 🌐 Live Demo

**View the live website here:**
- **Public Website**: https://joaobaptistaads-del.github.io/vixion/
- **Admin Panel**: https://joaobaptistaads-del.github.io/vixion/admin-login.html

> **Admin Credentials**: Username: `admin` | Password: `admin123`

> **Note**: If the links don't work yet, GitHub Pages needs to be enabled. See [DEPLOYMENT.md](DEPLOYMENT.md) for instructions.

## Features

### Public Website

- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI**: Clean and professional design with smooth animations
- **Reservation System**: Interactive form for making restaurant reservations
- **Menu Display**: Showcase restaurant menu items with categories
- **Contact Information**: Display restaurant location, hours, and contact details
- **Social Media Links**: Integration with social media platforms

### Administrative Panel

- **Authentication System**: Secure login with session management
- **Dashboard**: 
  - Real-time sales statistics (today, 7 days, 30 days, 90 days)
  - Interactive sales chart with period filters
  - Recent activity feed
  - Key metrics cards (sales, orders, reservations, customers)
- **Orders Management**: 
  - View all orders with complete details
  - Add new orders
  - Edit order status
  - Delete orders
  - Real-time sales calculations
- **Reservations Management**:
  - Complete reservation listing
  - Confirm/cancel reservations
  - Customer information tracking
- **Menu Management (CRUD)**:
  - Add new menu items
  - Edit existing items
  - Delete items
  - Category organization
- **Settings/Configuration**:
  - Logo management
  - Background image updates
  - Social media links configuration
  - Restaurant information editing

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript
- Google Fonts (Playfair Display & Roboto)

## Getting Started

### Public Website

Simply open `index.html` in your web browser to view the website.

### Admin Panel

1. Open `admin-login.html` in your web browser
2. Login with demo credentials:
   - **Username**: admin
   - **Password**: admin123
3. Access full management dashboard

```bash
# Clone the repository
git clone https://github.com/joaobaptistaads-del/vixion.git

# Navigate to the project directory
cd vixion

# Open index.html for the public site
# Open admin-login.html for the admin panel
```

## Project Structure

```
vixion/
├── index.html           # Main public website
├── styles.css           # Public website styles
├── script.js            # Public website functionality
├── admin-login.html     # Admin authentication page
├── admin.html           # Admin dashboard
├── admin-styles.css     # Admin panel styles
├── admin-auth.js        # Authentication logic
├── admin-data.js        # Data management layer
├── admin-script.js      # Admin UI interactions
└── README.md            # Project documentation
```

## Features Overview

### Navigation
- Fixed header with smooth scrolling navigation
- Mobile-responsive hamburger menu
- Active link highlighting

### Sections
1. **Hero Section**: Eye-catching introduction with call-to-action
2. **About Section**: Information about the restaurant
3. **Menu Section**: Display of food categories and pricing
4. **Reservation Section**: Interactive booking form with validation
5. **Contact Section**: Contact information and social media links

### Reservation Form
- Name, email, and phone validation
- Date picker (only future dates allowed)
- Guest count selector
- Time selection
- Optional message field
- Success confirmation modal

### Admin Panel Features
- **Sales Analytics**: Visual charts with multiple period views
- **Real-time Updates**: Automatic calculation and display
- **Data Persistence**: LocalStorage-based data management
- **Modular Design**: Separated authentication, data, and UI layers
- **Responsive**: Works on desktop and mobile devices

## Customization

You can easily customize the website by:

1. **Colors**: Modify CSS variables in `styles.css`:
   ```css
   :root {
       --primary-color: #c49b63;
       --secondary-color: #1a1a1a;
       /* ... */
   }
   ```

2. **Content**: Edit the text in `index.html`
3. **Menu Items**: Update the menu section in `index.html`
4. **Contact Info**: Modify the contact details in the reservation section

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

### GitHub Pages (Recommended)

This project is ready for GitHub Pages deployment:

1. Go to repository **Settings** → **Pages**
2. Select branch: `copilot/replicate-project-design`
3. Select folder: `/ (root)`
4. Click **Save**
5. Visit: https://joaobaptistaads-del.github.io/vixion/

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

### Local Development

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```

Then visit:
- http://localhost:8000 (public site)
- http://localhost:8000/admin-login.html (admin panel)

## 📞 Support

For questions or issues, please open an issue on GitHub.

## License

This project is open source and available under the MIT License.
