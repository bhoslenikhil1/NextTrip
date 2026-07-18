// ===========================
// NEXTTRIP - COMPLETE JS v2
// ===========================

// Initialize AOS
AOS.init({
    duration: 1000,
    once: false,
    offset: 100
});

// ===========================
// PRELOADER
// ===========================

window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 1500);
    }
});

// ===========================
// SCROLL PROGRESS BAR
// ===========================

const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', function() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    if (scrollProgress) scrollProgress.style.width = scrolled + '%';
});

// ===========================
// NAVBAR
// ===========================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-links a');

// Navbar scroll effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (navToggle) {
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close menu when clicking on a link
navItems.forEach(item => {
    item.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        
        // Update active state
        navItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});

// ===========================
// HERO SLIDESHOW
// ===========================

let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const totalSlides = slides.length;
const heroDots = document.getElementById('heroDots');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + totalSlides) % totalSlides;
    slides[currentSlide].classList.add('active');
    document.querySelectorAll('.hero-dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

// Build slide indicator dots
if (heroDots) {
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => showSlide(i));
        heroDots.appendChild(dot);
    });
}

// Auto-advance slides (pauses while hovering the hero)
let heroInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
const heroSection = document.getElementById('home');
if (heroSection) {
    heroSection.addEventListener('mouseenter', () => clearInterval(heroInterval));
    heroSection.addEventListener('mouseleave', () => {
        heroInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
    });
}

// ===========================
// STATS COUNTER
// ===========================

let animationTriggered = false;

function animateCounters() {
    if (animationTriggered) return;
    animationTriggered = true;

    const stats = document.querySelectorAll('.stat');
    
    stats.forEach(stat => {
        const countElement = stat.querySelector('.stat-num');
        const target = parseInt(stat.getAttribute('data-count'));
        const hasDecimal = stat.hasAttribute('data-decimal');
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;

        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(counter);
            }
            
            if (hasDecimal) {
                countElement.textContent = current.toFixed(1);
            } else {
                countElement.textContent = Math.floor(current);
            }
        }, duration / steps);
    });
}

// Trigger counter animation when stats section is visible
const statsStrip = document.querySelector('.stats-strip');
if (statsStrip) {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            observer.unobserve(statsStrip);
        }
    }, { threshold: 0.5 });
    observer.observe(statsStrip);
}

// ===========================
// COUNTDOWN TIMER
// ===========================

function updateCountdown() {
    const countdownDate = new Date('2026-08-13').getTime();
    
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const padZero = (num) => String(num).padStart(2, '0');
        
        const cdDays = document.getElementById('cd-days');
        const cdHours = document.getElementById('cd-hours');
        const cdMins = document.getElementById('cd-mins');
        const cdSecs = document.getElementById('cd-secs');
        
        if (cdDays) cdDays.textContent = padZero(days);
        if (cdHours) cdHours.textContent = padZero(hours);
        if (cdMins) cdMins.textContent = padZero(minutes);
        if (cdSecs) cdSecs.textContent = padZero(seconds);
        
        if (distance < 0) {
            clearInterval(timer);
            if (cdDays) cdDays.textContent = '00';
            if (cdHours) cdHours.textContent = '00';
            if (cdMins) cdMins.textContent = '00';
            if (cdSecs) cdSecs.textContent = '00';
        }
    }, 1000);
}

updateCountdown();

// ===========================
// TESTIMONIALS SWIPER
// ===========================

const testiSwiper = new Swiper('.testiSwiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        }
    }
});

// ===========================
// BACK TO TOP BUTTON
// ===========================

const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===========================
// POPUP / MODAL
// ===========================

const popupOverlay = document.getElementById('popupOverlay');
const popupClose = document.getElementById('popupClose');
const getQuoteBtn = document.getElementById('getQuoteBtn');

// Show popup after 5 seconds or on button click
setTimeout(() => {
    if (popupOverlay) {
        popupOverlay.classList.add('show');
    }
}, 5000);

if (getQuoteBtn) {
    getQuoteBtn.addEventListener('click', () => {
        if (popupOverlay) {
            popupOverlay.classList.add('show');
        }
    });
}

if (popupClose) {
    popupClose.addEventListener('click', () => {
        if (popupOverlay) {
            popupOverlay.classList.remove('show');
        }
    });
}

if (popupOverlay) {
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            popupOverlay.classList.remove('show');
        }
    });
}

// ===========================
// FORM HANDLERS
// ===========================

function submitLeadForm(form, btn, onDone) {
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending...';

    const endpoint = 'https://formsubmit.co/ajax/' + form.action.split('/').pop();

    fetch(endpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
    })
    .then(() => {
        btn.textContent = '✓ Request Sent!';
        btn.style.background = '#00D97E';
        onDone && onDone();
    })
    .catch(() => {
        btn.textContent = 'Failed — Try Again';
        btn.style.background = '#FF4444';
    })
    .finally(() => {
        setTimeout(() => {
            btn.disabled = false;
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    });
}

function handleQuoteSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const btn = form.querySelector('button[type="submit"]');

    submitLeadForm(form, btn, () => form.reset());

    return false;
}

function handlePopupSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const btn = form.querySelector('button[type="submit"]');

    submitLeadForm(form, btn, () => {
        form.reset();
        if (popupOverlay) {
            popupOverlay.classList.remove('show');
        }
    });

    return false;
}

function handleNewsletter(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    
    console.log('Newsletter Signup:', email);
    
    const btn = form.querySelector('button');
    const originalHtml = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i>';
    btn.style.color = '#00D97E';
    
    setTimeout(() => {
        btn.innerHTML = originalHtml;
        btn.style.color = '';
        form.reset();
    }, 2000);
    
    return false;
}

// ===========================
// FOOTER YEAR UPDATE
// ===========================

document.getElementById('year').textContent = new Date().getFullYear();

// ===========================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// SEARCH TABS (booking widget)
// ===========================

const searchTabs = document.querySelectorAll('.search-tab');
const travelTypeSelect = document.querySelector('[data-role="travel-type"]');
const tabDefaults = { domestic: 'Any type', international: 'Any type', honeymoon: 'Honeymoon', group: 'Group Tour' };

searchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        searchTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        if (travelTypeSelect && tabDefaults[tab.dataset.tab]) {
            travelTypeSelect.value = tabDefaults[tab.dataset.tab];
        }
    });
});

// ===========================
// SEARCH FORM HANDLER
// ===========================

const searchBtn = document.querySelector('.search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const destination = document.querySelector('.search-field select')?.value;
        console.log('Searching packages for:', destination);
        
        // Scroll to packages section
        const packagesSection = document.getElementById('packages');
        if (packagesSection) {
            packagesSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ===========================
// PACKAGE CARD INTERACTIONS
// ===========================

const pkgCards = document.querySelectorAll('.pkg-card');
pkgCards.forEach(card => {
    card.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') return;
        const btn = this.querySelector('a.btn');
        if (btn) btn.click();
    });
});

// ===========================
// DESTINATION CARD INTERACTIONS
// ===========================

const destCards = document.querySelectorAll('.dest-card');
destCards.forEach(card => {
    card.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') return;
        const btn = this.querySelector('a.dest-btn');
        if (btn) btn.click();
    });
});

// ===========================
// GALLERY IMAGE LIGHTBOX (Optional Enhancement)
// ===========================

const galleryImages = document.querySelectorAll('.masonry img');
galleryImages.forEach(img => {
    img.addEventListener('click', function() {
        // In a real app, this would open a lightbox
        console.log('Image clicked:', this.src);
    });
});

// ===========================
// CONTACT FORM SUBMISSION
// ===========================

const contactForm = document.querySelector('.quote-form');
if (contactForm) {
    contactForm.addEventListener('submit', handleQuoteSubmit);
}

// ===========================
// NEWSLETTER FORM
// ===========================

const newsForm = document.querySelector('.news-form');
if (newsForm) {
    newsForm.addEventListener('submit', handleNewsletter);
}

// ===========================
// LAZY LOAD IMAGES (Performance)
// ===========================

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ===========================
// KEYBOARD NAVIGATION
// ===========================

document.addEventListener('keydown', function(e) {
    // Close popup on Escape
    if (e.key === 'Escape' && popupOverlay) {
        popupOverlay.classList.remove('show');
    }
    
    // Scroll to top on Home key
    if (e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// ===========================
// MOBILE DEVICE DETECTION
// ===========================

const isMobileDevice = () => {
    return (typeof window.orientation !== 'undefined') || 
           (navigator.userAgent.indexOf('IEMobile') !== -1);
};

// ===========================
// PERFORMANCE MONITORING
// ===========================

if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log('Page Load Time:', loadTime + 'ms');
    });
}

// ===========================
// UTILITY: DEBOUNCE FUNCTION
// ===========================

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

// ===========================
// RESPONSIVE IMAGE HANDLER
// ===========================

const resizeHandler = debounce(() => {
    console.log('Window resized');
    // Update any responsive elements
}, 250);

window.addEventListener('resize', resizeHandler);

// ===========================
// INITIALIZATION
// ===========================

console.log('✅ NextTrip Website Loaded Successfully!');
console.log('🌍 Ready to show the world your travel dreams.');