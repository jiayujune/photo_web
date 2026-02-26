# Alex Morgan — Photography Portfolio

A professional, minimalist photography portfolio website showcasing nature, portrait, urban, and travel photography. Built with pure HTML, CSS, and JavaScript—no frameworks required.

## ✨ Features

### Design & Branding
- **Systematic Design System**: Consistent spacing scale, type scale, and color tokens
- **Minimalist Aesthetic**: Apple-inspired clean design with restrained animations
- **Brand Consistency**: Cohesive visual identity throughout
- **Narrative Elements**: Featured story section adds depth and brand voice

### Functionality
- **Featured Carousel**: Auto-playing hero carousel showcasing best work
- **Category Filtering**: Filter works by Nature, Portrait, Urban, Travel, or view All
- **Full-Screen Image Viewer**: Click any image to view in modal with keyboard navigation
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Scrolling**: Seamless navigation between sections

### Accessibility
- **WCAG AA Compliant**: Proper color contrast ratios
- **Keyboard Navigation**: Full keyboard support (Tab, Arrow keys, ESC)
- **Screen Reader Support**: ARIA labels, semantic HTML, live regions
- **Focus Management**: Visible focus indicators, focus trapping in modal
- **Skip Link**: Direct access to main content for keyboard users

### Performance
- **Pure Static Site**: No build step, fast load times
- **Lazy Loading**: Images load as needed
- **Optimized Animations**: Hardware-accelerated, performant transitions
- **Vanilla JavaScript**: No dependencies, minimal bundle size

## 🎨 Design System

### Spacing Scale (4px base)
- xs: 4px → sm: 8px → md: 16px → lg: 24px → xl: 32px → 2xl: 48px → 3xl: 64px → 4xl: 96px → 5xl: 128px

### Type Scale
- xs: 12px → sm: 14px → base: 16px → md: 18px → lg: 21px → xl: 28px → 2xl: 36px → 3xl: 48px → 4xl: 64px

### Color Tokens
- **Primary**: #1d1d1f (near-black)
- **Secondary**: #86868b (medium gray)
- **Accent**: #0071e3 (blue)
- **Backgrounds**: White, Light (#f5f5f7), Tertiary (#fafafa)

See `DESIGN_DECISIONS.md` for detailed design rationale.

## 📁 File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # Complete design system & styles
├── script.js           # Interactive functionality
├── README.md           # This file
└── DESIGN_DECISIONS.md # Detailed design documentation
```

## 🚀 Getting Started

### Basic Usage
1. Open `index.html` in a modern web browser
2. That's it! No build step or dependencies required

### Customization

#### Adding Your Photos
Edit `script.js` and update the `photoGallery` array:

```javascript
{
    id: 13,
    title: "Your Photo Title",
    category: "nature", // nature, portrait, urban, travel
    image: "images/your-photo.jpg",
    description: "Your photo description"
}
```

#### Updating Featured Carousel
The carousel displays the first 4 items from `photoGallery`. Reorder your array or modify the `featuredWorks` constant:

```javascript
const featuredWorks = photoGallery.slice(0, 4); // Change slice range
```

#### Customizing Content
- **Hero Section**: Edit hero title and subtitle in `index.html`
- **Story Section**: Update photography philosophy text
- **About Section**: Modify bio, credentials, and image
- **Contact Section**: Update email, social links, location

#### Changing Colors
Edit CSS variables in `styles.css`:

```css
:root {
    --color-primary: #1d1d1f;
    --color-accent: #0071e3;
    /* ... */
}
```

## 🎯 Key Features Explained

### Featured Carousel
- Auto-plays every 5 seconds
- Pauses on hover
- Keyboard navigation (Arrow keys)
- Click indicators to jump to specific slide
- Touch-friendly controls

### Category Filtering
- Click filter buttons to show specific categories
- "All" shows complete portfolio
- Smooth transitions between filtered views
- Screen reader announcements for filter changes

### Image Modal
- Click any gallery image to view full-screen
- Navigate with arrow buttons or keyboard (← →)
- Close with X button, ESC key, or click outside
- Focus trap keeps keyboard navigation within modal
- Image title and description displayed

### Responsive Breakpoints
- **Mobile**: < 480px - Single column, hamburger menu
- **Tablet**: 481px - 768px - Adjusted grid layouts
- **Desktop**: > 768px - Full multi-column layouts

## ♿ Accessibility Features

### Keyboard Navigation
- **Tab**: Navigate through interactive elements
- **Enter/Space**: Activate buttons and links
- **Arrow Keys**: Navigate carousel and modal images
- **ESC**: Close modal

### Screen Reader Support
- Semantic HTML structure
- ARIA labels and roles
- Live regions for dynamic content
- Alt text on all images
- Proper heading hierarchy

### Visual Accessibility
- High contrast ratios (WCAG AA compliant)
- Visible focus indicators
- Skip to main content link
- Clear visual hierarchy

## 🎬 Animation Philosophy

Animations are **restrained and purposeful**:
- Fast (150ms): Color changes, hover states
- Base (250ms): Standard transitions
- Slow (350ms): Modal appearance, major changes
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` for natural motion

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Content Guidelines

### Photography Categories
- **Nature**: Landscapes, wildlife, natural scenes
- **Portrait**: People, character studies, expressions
- **Urban**: Cityscapes, architecture, street photography
- **Travel**: Cultural scenes, destinations, journeys

### Image Recommendations
- **Format**: JPG (photos) or WebP (modern browsers)
- **Size**: Width 1200-2000px recommended
- **File Size**: Under 500KB per image for web
- **Aspect Ratio**: 4:3 or 16:9 for consistency

## 🔧 Technical Details

### No Dependencies
- Pure HTML5, CSS3, ES6+ JavaScript
- No build tools or frameworks
- Works offline after initial load

### Performance Optimizations
- Lazy loading images
- Debounced scroll handlers
- Efficient event delegation
- CSS hardware acceleration

### SEO Considerations
- Semantic HTML
- Meta descriptions
- Proper heading hierarchy
- Alt text on images

## 📄 License

This project is provided as-is for personal use. Feel free to customize for your own portfolio.

## 🙏 Credits

- Design inspiration: Apple's minimalist aesthetic
- Photography: Unsplash (replace with your own work)
- Fonts: System fonts (SF Pro Display fallback)

---

**Note**: Replace placeholder content (images, text, contact info) with your own before publishing.

For detailed design decisions and rationale, see `DESIGN_DECISIONS.md`.
