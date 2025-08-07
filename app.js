// Portfolio JavaScript for Nikhil SR - Fixed Version

document.addEventListener('DOMContentLoaded', function() {
    // Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile navigation
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile navigation when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (navToggle) {
                navToggle.classList.remove('active');
            }
        });
    });

    // Fixed smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const offsetTop = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking
                navMenu.classList.remove('active');
                if (navToggle) {
                    navToggle.classList.remove('active');
                }
            }
        });
    });

    // Fixed "View My Work" button
    const viewWorkBtn = document.querySelector('.header-buttons .btn--primary');
    if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const projectsSection = document.querySelector('#projects');
            if (projectsSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const offsetTop = projectsSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Fixed "Get In Touch" button
    const getInTouchBtn = document.querySelector('.header-buttons .btn--outline');
    if (getInTouchBtn) {
        getInTouchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const offsetTop = contactSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Active navigation link highlighting
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }

    // Skills progress bar animation
    function animateSkillBars() {
        const skillFills = document.querySelectorAll('.skill-fill');
        const skillsSection = document.getElementById('skills');
        
        if (!skillsSection) return;
        
        const skillsSectionTop = skillsSection.offsetTop;
        const scrollPos = window.scrollY + window.innerHeight;

        if (scrollPos > skillsSectionTop + 200) {
            skillFills.forEach(fill => {
                if (!fill.classList.contains('animated')) {
                    const width = fill.getAttribute('data-width');
                    fill.style.width = width + '%';
                    fill.classList.add('animated');
                }
            });
        }
    }

    // Improved notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        
        // Set styles directly for better compatibility
        const bgColor = type === 'success' ? '#21808d' : 
                       type === 'error' ? '#c0152f' : '#626c71';
        
        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            left: 20px;
            background: ${bgColor};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 1001;
            max-width: 400px;
            margin: 0 auto;
            font-weight: 500;
            font-size: 14px;
            line-height: 1.4;
            transform: translateY(-100px);
            opacity: 0;
            transition: all 0.3s ease-out;
        `;

        notification.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px;">
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: none;
                    border: none;
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
                    padding: 0;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    opacity: 0.8;
                ">&times;</button>
            </div>
        `;

        // Add to DOM
        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        }, 10);

        // Auto remove after 4 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateY(-100px)';
                notification.style.opacity = '0';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 4000);
    }

    // Fixed contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name')?.trim();
            const email = formData.get('email')?.trim();
            const subject = formData.get('subject')?.trim();
            const message = formData.get('message')?.trim();

            // Basic form validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Get submit button
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            submitButton.style.opacity = '0.7';

            // Simulate API call
            setTimeout(() => {
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
            }, 1500);
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Scroll animations
    function handleScrollAnimations() {
        highlightActiveNavLink();
        animateSkillBars();
        
        // Add scroll effect to navigation
        const nav = document.querySelector('.nav');
        if (nav) {
            if (window.scrollY > 50) {
                nav.style.backgroundColor = 'rgba(19, 52, 59, 0.98)';
                nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                nav.style.backgroundColor = 'rgba(19, 52, 59, 0.95)';
                nav.style.boxShadow = 'none';
            }
        }
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .service-card, .passion-card, .skill-category');
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Project button functionality
    const projectButtons = document.querySelectorAll('.project-actions .btn');
    projectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            if (buttonText === 'View Project') {
                showNotification('Project demo would open in a new tab in a real implementation.', 'info');
            } else if (buttonText === 'Source Code') {
                showNotification('GitHub repository would open in a new tab in a real implementation.', 'info');
            }
        });
    });

    // Scroll event listener with throttling
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleScrollAnimations();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Window resize handler for responsive navigation
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            if (navToggle) {
                navToggle.classList.remove('active');
            }
        }
    });

    // Initialize skill bar animations if skills section is already visible
    setTimeout(() => {
        animateSkillBars();
    }, 1000);

    // Add hover effects for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add hover effects for service cards  
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });

    // Initialize animations with delay for better performance
    setTimeout(() => {
        // Add initial animation to header elements
        const headerTitle = document.querySelector('.header-title');
        const headerSubtitle = document.querySelector('.header-subtitle');
        const headerTagline = document.querySelector('.header-tagline');
        
        if (headerTitle) headerTitle.style.animation = 'fadeInUp 0.8s ease-out';
        if (headerSubtitle) headerSubtitle.style.animation = 'fadeInUp 0.8s ease-out 0.2s both';
        if (headerTagline) headerTagline.style.animation = 'fadeInUp 0.8s ease-out 0.4s both';
    }, 500);

    // Console welcome message
    console.log(`
    🚀 Welcome to Nikhil SR's Portfolio!
    
    Portfolio successfully loaded with:
    ✅ Responsive navigation
    ✅ Smooth scrolling
    ✅ Contact form validation
    ✅ Interactive animations
    ✅ Mobile-friendly design
    
    Feel free to reach out through the contact form!
    `);
});

// Additional utility functions
window.portfolioUtils = {
    scrollToSection: function(sectionId) {
        const section = document.querySelector(sectionId);
        if (section) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const offsetTop = section.offsetTop - navHeight;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    },
    
    showMessage: function(message, type = 'info') {
        // Reuse the notification system
        const event = new CustomEvent('showNotification', {
            detail: { message, type }
        });
        document.dispatchEvent(event);
    }
};