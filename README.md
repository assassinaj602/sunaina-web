# OTech - Modern IT Solutions Website

A fully responsive, modern static website built with HTML5, Tailwind CSS, and Vanilla JavaScript. Designed to match the professional aesthetics of modern IT solution companies with smooth animations and an editor-friendly structure.

## 🚀 Features

- **Fully Responsive Design** - Works perfectly on all devices
- **Modern Animations** - Smooth scroll animations with AOS library
- **Editor-Friendly Code** - Well-commented sections for easy editing
- **SEO Optimized** - Semantic HTML and proper meta tags
- **Fast Loading** - Optimized CSS and JavaScript
- **Netlify CMS Ready** - Content management system included
- **Accessibility Focused** - WCAG compliant design

## 📁 Project Structure

```
webbe/
│
├── index.html                 # Main HTML file
├── css/
│   └── style.css             # Custom CSS styles
├── js/
│   └── script.js             # JavaScript functionality
├── assets/
│   └── images/               # Image assets
│       └── README.md         # Image replacement guide
├── admin/                    # Netlify CMS configuration
│   ├── config.yml           # CMS configuration
│   └── index.html           # CMS admin interface
└── README.md                # This file
```

## 🎨 Design Features

- **Dark Theme** with gradient accents
- **Smooth Animations** on scroll and hover
- **Modern Typography** using Inter and Space Grotesk fonts
- **Glassmorphism Effects** with backdrop blur
- **Interactive Elements** with hover effects and transitions
- **Mobile-First Approach** with responsive breakpoints

## 📝 Sections Included

1. **Hero Section** - Eye-catching intro with animated elements
2. **About Us** - Company overview with technology showcase
3. **Services** - Six comprehensive IT service offerings
4. **Team** - Management team with photo placeholders
5. **News/Blog** - Latest updates and articles
6. **Contact** - Contact information and call-to-action

## ✏️ Easy Editing Guide

### 🖼️ Replacing Team Photos
1. Navigate to the Team section in `index.html`
2. Look for comments marked `<!-- EDITOR: Replace team member information and photos below -->`
3. Replace the placeholder content inside the team member divs
4. Add actual photos to `assets/images/team/` folder
5. Update the image sources in the HTML

### 📰 Adding/Removing News Items
1. Find the News section in `index.html`
2. Look for `<!-- EDITOR: You can easily add, remove, or modify news items below -->`
3. Copy the article structure to add new items
4. Update the date, title, category, and description
5. Add corresponding images to `assets/images/blog/`

### 📞 Updating Contact Information
1. Find the Contact section in `index.html`
2. Look for `<!-- EDITOR: Replace with your actual email address -->`
3. Update email, phone, and address information
4. Update social media links in the footer

### 🛠️ Modifying Services
1. Locate the Services section in `index.html`
2. Each service is in a separate div with icon, title, and description
3. Update the FontAwesome icon classes for different icons
4. Modify titles and descriptions as needed

## 🌐 Deployment Instructions

### Deploy to Netlify (Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Netlify**:
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Set build settings:
     - Build command: (leave empty)
     - Publish directory: `/`
   - Click "Deploy site"

3. **Enable Netlify CMS** (Optional):
   - Go to Site Settings > Identity
   - Enable Identity service
   - Set registration to "Invite only"
   - Enable Git Gateway
   - Access CMS at: `https://yoursite.netlify.app/admin/`

### Deploy to GitHub Pages

1. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to Pages section
   - Set source to "Deploy from a branch"
   - Select "main" branch and "/ (root)" folder
   - Save settings

2. **Access your site**:
   - Site will be available at: `https://yourusername.github.io/repository-name`

## 🔧 Technical Stack

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework (CDN)
- **Vanilla JavaScript** - No framework dependencies
- **AOS** - Animate On Scroll library
- **Font Awesome** - Icon library
- **Google Fonts** - Inter & Space Grotesk typography
- **Netlify CMS** - Content management (optional)

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Performance Features

- **Optimized Loading** - Critical CSS inlined
- **Lazy Loading** - Images load as needed
- **Smooth Animations** - Hardware-accelerated CSS
- **Minimal JavaScript** - Core functionality only
- **CDN Resources** - Fast loading external resources

## 🛠️ Customization Options

### Colors
Update the Tailwind configuration in the HTML `<script>` tag:
```javascript
colors: {
    'primary': '#6366f1',      // Main brand color
    'secondary': '#0f172a',    // Secondary color
    'accent': '#22d3ee',       // Accent color
    'dark': '#0f0f23',         // Dark background
    'darker': '#080815',       // Darker background
}
```

### Fonts
Replace Google Fonts links in the HTML `<head>` section and update Tailwind config.

### Animations
Modify AOS settings in `js/script.js`:
```javascript
AOS.init({
    duration: 1000,        // Animation duration
    easing: 'ease-in-out', // Animation easing
    once: true,            // Animation triggers once
    mirror: false,         // No reverse animation
    offset: 100           // Trigger offset
});
```

## 📋 Content Management

### Using Netlify CMS
1. Access admin panel at `/admin/`
2. Log in with Netlify Identity
3. Manage content through the interface:
   - Add/edit team members
   - Create/update blog posts
   - Modify services
   - Update contact information

### Manual Editing
All content can be edited directly in the HTML file with clear comments marking editable sections.

## 🚨 Important Notes

1. **Image Optimization**: Compress images before uploading for better performance
2. **Content Security**: Always validate user inputs if adding forms
3. **Regular Updates**: Keep dependencies updated for security
4. **Backup**: Always backup your site before major changes
5. **Testing**: Test on multiple devices and browsers before going live

## 📞 Support

For technical questions or customization requests:
- Review the code comments in the files
- Check the `assets/images/README.md` for image guidelines
- Refer to [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- Check [AOS Animation Library](https://michalsnik.github.io/aos/)

## 📄 License

This project is created for client use. Modify and distribute as needed for your business requirements.

---

**Built with ❤️ for modern businesses seeking professional web presence**
