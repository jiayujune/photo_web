// ============================================
// PHOTOGRAPHY PORTFOLIO DATA
// ============================================

const photoGallery = [
    {
        id: 1,
        title: "Mountain Sunrise",
        category: "nature",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&h=800&fit=crop",
        description: "The first rays of morning light over the mountains"
    },
    {
        id: 2,
        title: "City Nightscape",
        category: "urban",
        image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1400&h=800&fit=crop",
        description: "The vibrant lights of the city at night"
    },
    {
        id: 3,
        title: "Portrait",
        category: "portrait",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1400&h=800&fit=crop",
        description: "Portrait photography in natural light"
    },
    {
        id: 4,
        title: "Beach Sunset",
        category: "nature",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&h=800&fit=crop",
        description: "Beautiful sunset by the beach"
    },
    {
        id: 5,
        title: "Street Photography",
        category: "urban",
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1400&h=800&fit=crop",
        description: "Capturing moments of urban life"
    },
    {
        id: 6,
        title: "Travel Memories",
        category: "travel",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1400&h=800&fit=crop",
        description: "Beautiful memories from travels"
    },
    {
        id: 7,
        title: "Natural Landscape",
        category: "nature",
        image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1400&h=800&fit=crop",
        description: "The magnificent beauty of nature"
    },
    {
        id: 8,
        title: "Architectural Beauty",
        category: "urban",
        image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1400&h=800&fit=crop",
        description: "Lines and light of modern architecture"
    },
    {
        id: 9,
        title: "Portrait Close-up",
        category: "portrait",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1400&h=800&fit=crop",
        description: "Capturing emotions and expressions"
    },
    {
        id: 10,
        title: "Exotic Culture",
        category: "travel",
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1400&h=800&fit=crop",
        description: "Exploring the charm of different cultures"
    },
    {
        id: 11,
        title: "Deep Forest",
        category: "nature",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1400&h=800&fit=crop",
        description: "The mysterious world of the forest"
    },
    {
        id: 12,
        title: "Urban Life",
        category: "urban",
        image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1400&h=800&fit=crop",
        description: "The fast-paced rhythm of city life"
    }
];

// Featured works for carousel (first 4 items)
const featuredWorks = photoGallery.slice(0, 4);

// ============================================
// DOM ELEMENTS
// ============================================

const carouselTrack = document.getElementById('carouselTrack');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
const carouselIndicators = document.querySelector('.carousel-indicators');
const galleryGrid = document.getElementById('galleryGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const closeModal = document.querySelector('.close-modal');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const contactForm = document.querySelector('.contact-form');

// ============================================
// STATE MANAGEMENT
// ============================================

let currentFilter = 'all';
let currentImageIndex = 0;
let filteredPhotos = photoGallery;
let carouselIndex = 0;
let carouselInterval = null;

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    renderGallery(photoGallery);
    setupEventListeners();
    setupSmoothScroll();
    setupAccessibility();
});

// ============================================
// CAROUSEL FUNCTIONALITY
// ============================================

function initCarousel() {
    if (!carouselTrack) return;
    
    // Render carousel items
    carouselTrack.innerHTML = featuredWorks.map((work, index) => `
        <div class="carousel-item" role="listitem" aria-label="Featured work ${index + 1}">
            <img src="${work.image}" alt="${work.title}" loading="lazy">
            <div class="carousel-item-overlay">
                <div class="carousel-item-title">${work.title}</div>
                <div class="carousel-item-category">${getCategoryName(work.category)}</div>
            </div>
        </div>
    `).join('');

    // Render indicators
    carouselIndicators.innerHTML = featuredWorks.map((_, index) => `
        <button class="carousel-indicator ${index === 0 ? 'active' : ''}" 
                aria-label="Go to slide ${index + 1}" 
                data-index="${index}"
                role="tab"
                aria-selected="${index === 0}">
        </button>
    `).join('');

    // Setup carousel controls
    carouselPrev?.addEventListener('click', () => navigateCarousel(-1));
    carouselNext?.addEventListener('click', () => navigateCarousel(1));
    
    // Setup indicator clicks
    carouselIndicators.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToCarouselSlide(index));
    });

    // Auto-play carousel
    startCarouselAutoPlay();
    
    // Pause on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopCarouselAutoPlay);
        carouselContainer.addEventListener('mouseleave', startCarouselAutoPlay);
    }
}

function navigateCarousel(direction) {
    const newIndex = (carouselIndex + direction + featuredWorks.length) % featuredWorks.length;
    goToCarouselSlide(newIndex);
}

function goToCarouselSlide(index) {
    carouselIndex = index;
    const translateX = -carouselIndex * 100;
    carouselTrack.style.transform = `translateX(${translateX}%)`;
    
    // Update indicators
    carouselIndicators.querySelectorAll('.carousel-indicator').forEach((indicator, i) => {
        if (i === index) {
            indicator.classList.add('active');
            indicator.setAttribute('aria-selected', 'true');
        } else {
            indicator.classList.remove('active');
            indicator.setAttribute('aria-selected', 'false');
        }
    });
    
    // Reset auto-play
    stopCarouselAutoPlay();
    startCarouselAutoPlay();
}

function startCarouselAutoPlay() {
    stopCarouselAutoPlay();
    carouselInterval = setInterval(() => {
        navigateCarousel(1);
    }, 5000);
}

function stopCarouselAutoPlay() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
        carouselInterval = null;
    }
}

// ============================================
// GALLERY FUNCTIONALITY
// ============================================

function renderGallery(photos) {
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = '';
    
    if (photos.length === 0) {
        galleryGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--color-text-secondary);">No works found in this category.</p>';
        return;
    }
    
    photos.forEach((photo, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('role', 'listitem');
        galleryItem.setAttribute('tabindex', '0');
        galleryItem.setAttribute('aria-label', `View ${photo.title}`);
        galleryItem.dataset.category = photo.category;
        galleryItem.dataset.index = index;
        
        galleryItem.innerHTML = `
            <img src="${photo.image}" alt="${photo.title}" loading="lazy">
            <div class="gallery-item-overlay">
                <div class="gallery-item-title">${photo.title}</div>
                <div class="gallery-item-category">${getCategoryName(photo.category)}</div>
            </div>
        `;
        
        // Click handler
        galleryItem.addEventListener('click', () => openModal(index));
        
        // Keyboard handler
        galleryItem.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(index);
            }
        });
        
        galleryGrid.appendChild(galleryItem);
    });
}

function getCategoryName(category) {
    const categoryNames = {
        'nature': 'Nature',
        'portrait': 'Portrait',
        'urban': 'Urban',
        'travel': 'Travel'
    };
    return categoryNames[category] || category;
}

function filterPhotos(filter) {
    currentFilter = filter;
    
    if (filter === 'all') {
        filteredPhotos = photoGallery;
    } else {
        filteredPhotos = photoGallery.filter(photo => photo.category === filter);
    }
    
    renderGallery(filteredPhotos);
    
    // Update filter buttons
    filterButtons.forEach(btn => {
        const isActive = btn.dataset.filter === filter;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive);
    });
}

// ============================================
// MODAL FUNCTIONALITY
// ============================================

function openModal(index) {
    currentImageIndex = index;
    updateModalImage();
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus management for accessibility
    closeModal.focus();
    
    // Trap focus within modal
    trapFocus(modal);
}

function closeModalFunc() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    
    // Return focus to the element that opened the modal
    const activeElement = document.activeElement;
    if (activeElement && activeElement.classList.contains('gallery-item')) {
        activeElement.focus();
    }
}

function updateModalImage() {
    const photo = filteredPhotos[currentImageIndex];
    modalImage.src = photo.image;
    modalImage.alt = photo.title;
    modalCaption.textContent = `${photo.title} — ${photo.description}`;
}

function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    updateModalImage();
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % filteredPhotos.length;
    updateModalImage();
}

// Focus trap for modal accessibility
function trapFocus(container) {
    const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    container.addEventListener('keydown', function trapHandler(e) {
        if (e.key !== 'Tab') return;
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
}

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            currentFilter = filter;
            
            if (filter === 'all') {
                filteredPhotos = photoGallery;
            } else {
                filteredPhotos = photoGallery.filter(photo => photo.category === filter);
            }
            
            renderGallery(filteredPhotos);
            
            // Update filter buttons
            filterButtons.forEach(b => {
                const isActive = b.dataset.filter === filter;
                b.classList.toggle('active', isActive);
                b.setAttribute('aria-selected', isActive);
            });
            
            // Announce to screen readers
            const announcement = document.createElement('div');
            announcement.setAttribute('role', 'status');
            announcement.setAttribute('aria-live', 'polite');
            announcement.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
            announcement.textContent = `Showing ${filter === 'all' ? 'all works' : filter + ' works'}`;
            document.body.appendChild(announcement);
            setTimeout(() => announcement.remove(), 1000);
        });
    });

    // Mobile menu
    hamburger?.addEventListener('click', () => {
        const isExpanded = navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isExpanded);
    });

    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            // Update active state
            navLinks.forEach(l => {
                l.classList.remove('active');
                l.removeAttribute('aria-current');
            });
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
            
            // Close mobile menu
            navMenu.classList.remove('active');
            hamburger?.setAttribute('aria-expanded', 'false');
            
            // Smooth scroll
            const target = document.querySelector(targetId);
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Modal controls
    closeModal?.addEventListener('click', closeModalFunc);
    prevBtn?.addEventListener('click', showPreviousImage);
    nextBtn?.addEventListener('click', showNextImage);
    
    // Close modal on backdrop click
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);

    // Contact form
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

function handleKeyboardNavigation(e) {
    // ESC to close modal
    if (e.key === 'Escape' && modal?.getAttribute('aria-hidden') === 'false') {
        closeModalFunc();
        return;
    }
    
    // Arrow keys in modal
    if (modal?.getAttribute('aria-hidden') === 'false') {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            showPreviousImage();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            showNextImage();
        }
    }
    
    // Arrow keys for carousel
    if (document.activeElement?.closest('.featured-carousel')) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            navigateCarousel(-1);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            navigateCarousel(1);
        }
    }
}

// ============================================
// SMOOTH SCROLL & NAVIGATION
// ============================================

function setupSmoothScroll() {
    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Update navbar style on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        }
    });
}

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                    link.setAttribute('aria-current', 'page');
                }
            });
        }
    });
}

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

function setupAccessibility() {
    // Add loading="lazy" to images (already in HTML)
    // Ensure all interactive elements are keyboard accessible
    // Add ARIA labels where needed
    
    // Announce filter changes to screen readers
    const announceFilterChange = (filter) => {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
        announcement.textContent = `Showing ${filter === 'all' ? 'all works' : filter + ' works'}`;
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
    };
    
    // Enhance filter function to include announcement
    const originalFilter = filterPhotos;
    window.filterPhotos = function(filter) {
        originalFilter(filter);
        announceFilterChange(filter);
    };
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimized scroll handler
const optimizedScrollHandler = throttle(updateActiveNav, 100);
window.addEventListener('scroll', optimizedScrollHandler);
