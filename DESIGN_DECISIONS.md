# Design Decisions & Key Features

## Design System

### Spacing Scale (4px base)
- **Rationale**: 4px base provides granular control while maintaining visual harmony
- **Scale**: xs(4px) → sm(8px) → md(16px) → lg(24px) → xl(32px) → 2xl(48px) → 3xl(64px) → 4xl(96px) → 5xl(128px)
- **Usage**: Consistent spacing throughout creates visual rhythm and hierarchy

### Type Scale
- **Rationale**: Systematized font sizes ensure readability and hierarchy
- **Scale**: xs(12px) → sm(14px) → base(16px) → md(18px) → lg(21px) → xl(28px) → 2xl(36px) → 3xl(48px) → 4xl(64px)
- **Line Heights**: Tight(1.2) for headings, Normal(1.5) for body, Relaxed(1.6) for paragraphs, Loose(1.8) for long-form
- **Font Weights**: Normal(400), Medium(500), Semibold(600) - minimal weight variation for elegance

### Color Tokens
- **Primary**: #1d1d1f (near-black) - main text and primary elements
- **Secondary**: #86868b (medium gray) - secondary text
- **Accent**: #0071e3 (blue) - interactive elements and focus states
- **Backgrounds**: White (#ffffff), Light (#f5f5f7), Tertiary (#fafafa)
- **Rationale**: Monochromatic palette with single accent color creates sophisticated, cohesive brand identity

### Shadows
- **Scale**: xs → sm → md → lg (increasing blur and opacity)
- **Usage**: Subtle depth without overwhelming the minimalist aesthetic
- **Rationale**: Minimal shadows maintain clean, modern appearance

### Transitions
- **Fast**: 150ms - micro-interactions
- **Base**: 250ms - standard transitions
- **Slow**: 350ms - major state changes
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1) - natural, Apple-like motion
- **Rationale**: Consistent timing creates cohesive feel; restrained animations maintain professionalism

## Page Structure

### Hero + Featured Carousel
- **Purpose**: Immediate visual impact, showcase best work
- **Design**: Full-screen hero with centered typography, followed by featured carousel
- **Carousel Features**:
  - Auto-play (5s intervals)
  - Pause on hover
  - Keyboard navigation (arrow keys)
  - Touch/swipe support (via click handlers)
  - Accessible indicators

### Works Section
- **Purpose**: Comprehensive portfolio showcase
- **Features**:
  - Category filtering (All, Nature, Portrait, Urban, Travel)
  - Responsive grid layout
  - Hover overlays with title and category
  - Click to view full-screen

### Featured Story Section
- **Purpose**: Narrative element, brand storytelling
- **Design**: Two-column layout (text + image)
- **Content**: Photography philosophy and approach
- **Rationale**: Adds depth beyond visual showcase, establishes brand voice

### About Section
- **Purpose**: Personal connection, credibility
- **Design**: Image + bio + credentials
- **Features**: Sticky image on desktop for visual interest
- **Content**: Professional background, education, awards, exhibitions

### Contact Section
- **Purpose**: Professional inquiry handling
- **Design**: Two-column (info + form)
- **Features**: Email, social links, location, contact form
- **Accessibility**: Proper labels, required fields, form validation

## Accessibility Features

### ARIA Attributes
- **Navigation**: `role="navigation"`, `aria-label`, `aria-current`
- **Carousel**: `role="list"`, `role="listitem"`, `role="tablist"`, `aria-selected`
- **Modal**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- **Forms**: `aria-required`, `aria-label` for inputs
- **Skip Link**: Direct access to main content

### Keyboard Navigation
- **Tab**: Navigate through interactive elements
- **Enter/Space**: Activate buttons and links
- **Arrow Keys**: Navigate carousel and modal images
- **ESC**: Close modal
- **Focus Management**: Focus trap in modal, return focus on close

### Visual Accessibility
- **Focus Styles**: 2px outline with accent color, 2px offset
- **Color Contrast**: WCAG AA compliant (text meets 4.5:1 minimum)
- **Skip Link**: Hidden until focused, allows keyboard users to skip navigation

### Screen Reader Support
- **Alt Text**: All images have descriptive alt text
- **Live Regions**: Filter changes announced to screen readers
- **Semantic HTML**: Proper heading hierarchy, landmarks

## Animation Philosophy

### Restrained Motion
- **Rationale**: Professional portfolio requires subtle, purposeful animations
- **Usage**: Only where it enhances UX (hover states, transitions, modal)
- **Avoided**: Excessive parallax, distracting effects, unnecessary motion

### Transition Timing
- **Fast (150ms)**: Color changes, hover states
- **Base (250ms)**: Standard element transitions
- **Slow (350ms)**: Modal appearance, major state changes

### Easing
- **cubic-bezier(0.4, 0, 0.2, 1)**: Natural, Apple-inspired motion curve
- **Rationale**: Feels organic and polished without being distracting

## Brand Consistency

### Visual Identity
- **Typography**: System fonts (SF Pro Display fallback) - clean, modern
- **Color**: Monochromatic with single accent - sophisticated, timeless
- **Spacing**: Generous whitespace - premium feel
- **Imagery**: High-quality, consistent aspect ratios

### Content Strategy
- **Tone**: Professional yet approachable
- **Narrative**: Story-driven, not just image showcase
- **Credibility**: Awards, exhibitions, education included

### Interaction Patterns
- **Consistent**: Same hover effects, transitions, button styles throughout
- **Predictable**: Users understand interface quickly
- **Delightful**: Subtle touches (carousel pause, smooth scrolling) enhance without distracting

## Performance Considerations

### Image Optimization
- **Lazy Loading**: All gallery images use `loading="lazy"`
- **Responsive Images**: Different sizes for carousel vs gallery
- **Aspect Ratios**: Maintained for consistent layout

### JavaScript
- **Debouncing/Throttling**: Scroll handlers optimized
- **Event Delegation**: Efficient event handling
- **Minimal Dependencies**: Pure vanilla JS for fast load times

### CSS
- **CSS Variables**: Easy theming, maintainable
- **Efficient Selectors**: Minimal specificity, fast rendering
- **Hardware Acceleration**: `will-change` on animated elements

## Responsive Design

### Breakpoints
- **Mobile**: < 480px - Single column, simplified navigation
- **Tablet**: 481px - 768px - Adjusted grid, stacked layouts
- **Desktop**: > 768px - Full multi-column layouts

### Mobile Optimizations
- **Hamburger Menu**: Collapsible navigation
- **Touch Targets**: Minimum 44x44px for accessibility
- **Simplified Carousel**: Larger touch targets, simplified controls
- **Stacked Layouts**: Single column for readability

## Technical Decisions

### Pure Static Site
- **No Framework**: Faster load, easier maintenance, better performance
- **Vanilla JS**: No build step, immediate deployment
- **Progressive Enhancement**: Works without JS (basic functionality)

### Semantic HTML
- **Purpose**: Better SEO, accessibility, maintainability
- **Structure**: Proper heading hierarchy, landmarks, ARIA where needed

### CSS Architecture
- **Design Tokens**: Centralized variables for easy updates
- **Component-Based**: Logical grouping of styles
- **BEM-like**: Clear naming conventions

## Future Enhancements (Not Implemented)

### Potential Additions
- Image lightbox with zoom
- Filter by multiple categories
- Search functionality
- Blog/journal section
- Client testimonials
- Project case studies
- Print shop integration
- Newsletter signup

### Considerations
- All enhancements should maintain design system consistency
- Accessibility must remain priority
- Performance should not degrade
- Mobile experience must stay excellent
