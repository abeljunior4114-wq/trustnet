// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initPricingToggle();
    initAppFilter();
    initContactForm();
    initScrollAnimations();
    initTVIntro();
    initLogo();
    init3DEffects();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Pricing toggle functionality
function initPricingToggle() {
    const pricingToggle = document.getElementById('pricing-toggle');
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const yearlyPrices = document.querySelectorAll('.yearly-price');

    if (pricingToggle) {
        pricingToggle.addEventListener('change', function() {
            if (this.checked) {
                // Show yearly prices
                monthlyPrices.forEach(price => price.style.display = 'none');
                yearlyPrices.forEach(price => price.style.display = 'inline');
            } else {
                // Show monthly prices
                monthlyPrices.forEach(price => price.style.display = 'inline');
                yearlyPrices.forEach(price => price.style.display = 'none');
            }
        });
    }

    // Pricing card interactions - now handled by onclick handlers
    // APK package interactions - now handled by onclick handlers
}

// App filter functionality
function initAppFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const appCards = document.querySelectorAll('.app-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter app cards
            appCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // App card interactions - now handled by onclick handlers
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const service = formData.get('service');
            const message = formData.get('message');
            
            // Validate form
            if (!name || !email || !service || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Show success message
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                
                // Reset form
                this.reset();
                
                // Create Telegram message
                const telegramMessage = createTelegramMessage(name, email, service, message);
                openTelegram(telegramMessage);
                
            }, 2000);
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loading');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .pricing-card, .app-card, .stat-item, .contact-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// TV Intro functionality
function initTVIntro() {
    const tvIntro = document.getElementById('tv-intro');
    const welcomePopup = document.getElementById('welcome-popup');
    
    // Hide welcome popup after 2.5 seconds
    if (welcomePopup) {
        setTimeout(() => {
            welcomePopup.style.display = 'none';
        }, 3000);
    }
    
    // Hide TV intro after animation
    if (tvIntro) {
        setTimeout(() => {
            tvIntro.style.display = 'none';
        }, 5000);
    }
}

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function showAppDetails(appName) {
    const details = {
        'IPTV Smarters Pro': {
            description: 'Professional IPTV player with advanced features including EPG, VOD, and catch-up TV. Perfect for Android devices with intuitive interface.',
            features: ['EPG Guide', 'VOD Library', 'Catch-up TV', 'Multi-device support', 'HD/4K Streaming', 'Parental Controls'],
            price: 'Free with subscription',
            platform: 'Android',
            setup: 'Easy setup with M3U playlist or Xtream Codes API'
        },
        'TiviMate': {
            description: 'Modern IPTV player with beautiful interface and powerful customization options. Highly customizable with advanced features.',
            features: ['Customizable UI', 'EPG Guide', 'Recording', 'Multi-view', 'Timeshift', 'Favorites'],
            price: 'Premium version available',
            platform: 'Android',
            setup: 'Professional setup with advanced configuration options'
        },
        'GSE Smart IPTV': {
            description: 'Comprehensive IPTV solution for iOS devices with advanced streaming capabilities and AirPlay support.',
            features: ['Multi-format support', 'EPG Guide', 'AirPlay support', 'iOS optimized', 'Background playback', 'Picture-in-Picture'],
            price: 'Free with ads',
            platform: 'iOS',
            setup: 'Simple setup with playlist import'
        },
        'Smart IPTV': {
            description: 'Perfect IPTV solution for Smart TVs with intuitive remote control navigation and easy setup.',
            features: ['Smart TV optimized', 'EPG Guide', 'Remote control', 'Easy setup', 'Channel favorites', 'Parental lock'],
            price: 'Free',
            platform: 'Smart TV',
            setup: 'One-click setup with M3U playlist'
        },
        'VLC Media Player': {
            description: 'Universal media player supporting IPTV streams with advanced playback features and cross-platform compatibility.',
            features: ['Universal format support', 'Advanced controls', 'Free and open source', 'Cross-platform', 'Subtitle support', 'Audio enhancement'],
            price: 'Free',
            platform: 'Windows/Mac/Linux',
            setup: 'Advanced setup with network streaming'
        },
        'IPTV Extreme': {
            description: 'Feature-rich IPTV player with advanced streaming and recording capabilities for power users.',
            features: ['Recording', 'Timeshift', 'Multi-view', 'Advanced streaming', 'Channel management', 'Playlist editor'],
            price: 'Free with premium features',
            platform: 'Android',
            setup: 'Professional setup with advanced features'
        }
    };
    
    const appInfo = details[appName];
    if (appInfo) {
        const modal = createModal(appName, appInfo);
        document.body.appendChild(modal);
        
        // Animate in
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
        }, 100);
    }
}

function createModal(title, info) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div class="modal-content" style="
            background: white;
            padding: 2rem;
            border-radius: 16px;
            max-width: 600px;
            width: 90%;
            transform: scale(0.8);
            transition: transform 0.3s ease;
            max-height: 80vh;
            overflow-y: auto;
        ">
            <div class="modal-header" style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
                border-bottom: 2px solid #e5e7eb;
                padding-bottom: 1rem;
            ">
                <div>
                    <h3 style="margin: 0; color: #1f2937; font-size: 1.5rem;">${title}</h3>
                    <p style="margin: 0.25rem 0 0 0; color: #6366f1; font-weight: 500;">${info.platform}</p>
                </div>
                <button class="modal-close" style="
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #6b7280;
                    padding: 0.5rem;
                    border-radius: 50%;
                    transition: background 0.3s ease;
                ">&times;</button>
            </div>
            <div class="modal-body">
                <p style="color: #6b7280; margin-bottom: 1.5rem; line-height: 1.6; font-size: 1.1rem;">${info.description}</p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
                    <div>
                        <h4 style="margin-bottom: 0.75rem; color: #1f2937; font-size: 1.1rem;">Features:</h4>
                        <ul style="margin: 0; color: #6b7280; padding-left: 1.2rem;">
                            ${info.features.map(feature => `<li style="margin-bottom: 0.5rem;">${feature}</li>`).join('')}
                        </ul>
                    </div>
                    <div>
                        <h4 style="margin-bottom: 0.75rem; color: #1f2937; font-size: 1.1rem;">Setup Info:</h4>
                        <p style="color: #6b7280; margin-bottom: 1rem; line-height: 1.5;">${info.setup}</p>
                        <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px; border-left: 4px solid #6366f1;">
                            <p style="margin: 0; font-weight: 600; color: #6366f1;">Price: ${info.price}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer" style="
                margin-top: 1.5rem;
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
                border-top: 2px solid #e5e7eb;
                padding-top: 1rem;
            ">
                <button class="btn btn-outline modal-close-btn" style="padding: 10px 20px;">Close</button>
                <button class="btn btn-primary" onclick="contactForApp('${title}')" style="padding: 10px 20px;">Contact for Setup</button>
            </div>
        </div>
    `;
    
    // Close functionality
    const closeButtons = modal.querySelectorAll('.modal-close, .modal-close-btn');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.style.opacity = '0';
            modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
            setTimeout(() => modal.remove(), 300);
        });
    });

    // Add hover effect to close button
    const closeButton = modal.querySelector('.modal-close');
    closeButton.addEventListener('mouseenter', () => {
        closeButton.style.background = '#f3f4f6';
    });
    closeButton.addEventListener('mouseleave', () => {
        closeButton.style.background = 'none';
    });
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
            setTimeout(() => modal.remove(), 300);
        }
    });
    
    return modal;
}

function contactForApp(appName) {
    const message = `Hi! I'm interested in getting help with ${appName} setup. Can you provide more information and help me get started?`;
    openTelegram(message);
}

function createTelegramMessage(name, email, service, message) {
    return `New Contact Form Submission:
    
Name: ${name}
Email: ${email}
Service: ${service}
Message: ${message}

Please respond to this inquiry.`;
}

function openTelegram(message) {
    const telegramUrl = `https://t.me/iptvrebrandeo?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
    }
    
    .modal-content {
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }
`;
document.head.appendChild(style);

// Add loading class to elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.service-card, .pricing-card, .app-card, .stat-item, .contact-item');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-elements .element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.service-card, .pricing-card, .app-card, .contact-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Add click ripple effect
function addRippleEffect(element) {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(addRippleEffect);
});

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Logo functionality
function initLogo() {
    const logoContainer = document.querySelector('.logo-container');
    
    if (logoContainer) {
        logoContainer.addEventListener('click', function() {
            // Scroll to top with smooth animation
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }, 100);
        });
    }
}

// 3D Effects functionality
function init3DEffects() {
    // Mouse tracking for 3D effects
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Apply 3D rotation to floating elements
        const elements = document.querySelectorAll('.element');
        elements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const rotateX = (mouseY - 0.5) * 15 * speed;
            const rotateY = (mouseX - 0.5) * 15 * speed;
            
            element.style.transform = `translateZ(${index * 10}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        // Apply 3D rotation to hero content
        const heroText = document.querySelector('.hero-text');
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroText) {
            const rotateX = (mouseY - 0.5) * 3;
            const rotateY = (mouseX - 0.5) * 3;
            heroText.style.transform = `translateZ(30px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
        
        if (heroVisual) {
            const rotateX = (mouseY - 0.5) * -3;
            const rotateY = (mouseX - 0.5) * -3;
            heroVisual.style.transform = `translateZ(20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
        
        // Apply 3D rotation to TV frame
        const tvFrame = document.querySelector('.tv-frame');
        if (tvFrame) {
            const rotateX = (mouseY - 0.5) * 8;
            const rotateY = (mouseX - 0.5) * 8;
            tvFrame.style.transform = `rotateY(${-15 + rotateY}deg) rotateX(${10 + rotateX}deg) translateZ(20px)`;
        }
    });
    
    // Enhanced card hover effects
    const cards = document.querySelectorAll('.service-card, .pricing-card, .app-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) translateZ(15px) rotateX(3deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateZ(0)';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            this.style.transform = `translateY(-8px) translateZ(15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
    
    // Parallax scrolling effect
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.element, .hero-text, .hero-visual');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.05);
            const yPos = -(scrolled * speed);
            element.style.transform += ` translateY(${yPos}px)`;
        });
    });
}
