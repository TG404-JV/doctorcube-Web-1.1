/* Enhanced Gallery JavaScript with 3D Effects and Animations */

document.addEventListener('DOMContentLoaded', function() {
    // Select gallery elements
    const slider = document.querySelector('.gallery-slider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const items = document.querySelectorAll('.gallery-item');
    
    // Set initial values
    let position = 0;
    let isAnimating = false;
    const itemWidth = items[0].offsetWidth + 30; // Width + margin
    const visibleItems = Math.floor(slider.offsetWidth / itemWidth);
    const maxPosition = Math.max(0, items.length - visibleItems);
    
    // Initialize gallery items with animation delay
    items.forEach((item, index) => {
        // Set animation delay based on index for staggered entrance
        item.style.setProperty('--item-index', index);
        
        // Set featured items
        if (index === 1 || index === 4) {
            item.classList.add('featured');
        }
        
        // Add fullscreen preview capability
        item.addEventListener('click', function() {
            createFullscreenPreview(this.querySelector('img').src);
        });
    });
    
    // Create pagination dots
    createPagination();
    
    // Auto Slide with enhanced easing
    let autoSlideInterval = setInterval(nextSlide, 5000);
    
    // Reset interval when user interacts
    function resetInterval() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    // Enhanced slide transitions with easing
    function nextSlide() {
        if (isAnimating) return;
        isAnimating = true;
        
        if (position < maxPosition) {
            position++;
        } else {
            // Add a bounce effect at the end
            slider.style.transform = `translateX(-${position * itemWidth + 20}px)`;
            setTimeout(() => {
                slider.style.transform = `translateX(-${position * itemWidth}px)`;
                setTimeout(() => {
                    position = 0;
                    updateSliderPosition(true);
                    isAnimating = false;
                }, 300);
            }, 200);
            return;
        }
        
        updateSliderPosition();
        setTimeout(() => {
            isAnimating = false;
        }, 700); // Match the CSS transition duration
    }
    
    function prevSlide() {
        if (isAnimating) return;
        isAnimating = true;
        
        if (position > 0) {
            position--;
        } else {
            // Add a bounce effect at the start
            slider.style.transform = `translateX(20px)`;
            setTimeout(() => {
                slider.style.transform = `translateX(0)`;
                setTimeout(() => {
                    position = maxPosition;
                    updateSliderPosition(true);
                    isAnimating = false;
                }, 300);
            }, 200);
            return;
        }
        
        updateSliderPosition();
        setTimeout(() => {
            isAnimating = false;
        }, 700); // Match the CSS transition duration
    }
    
    // Update slider position with enhanced transitions
    function updateSliderPosition(skipAnimation) {
        // Update pagination dots
        updatePagination();
        
        // Apply 3D rotation to items based on their position
        items.forEach((item, index) => {
            const distance = Math.abs(index - position);
            const scale = 1 - Math.min(distance * 0.05, 0.2);
            const opacity = 1 - Math.min(distance * 0.2, 0.6);
            const rotateY = (index - position) * 2;
            
            if (skipAnimation) {
                item.style.transition = 'none';
                setTimeout(() => {
                    item.style.transition = '';
                }, 50);
            }
            
            // Only apply 3D effects to items near the current view
            if (distance < 3) {
                item.style.transform = `scale(${scale}) rotateY(${rotateY}deg)`;
                item.style.opacity = opacity;
                item.style.zIndex = 10 - distance;
            } else {
                item.style.opacity = 0.4;
            }
        });
        
        // Move the slider
        slider.style.transform = `translateX(-${position * itemWidth}px)`;
    }
    
    // Button event listeners with enhanced feedback
    nextBtn.addEventListener('click', function() {
        // Visual feedback on button press
        this.classList.add('active-btn');
        setTimeout(() => this.classList.remove('active-btn'), 300);
        
        nextSlide();
        resetInterval();
    });
    
    prevBtn.addEventListener('click', function() {
        // Visual feedback on button press
        this.classList.add('active-btn');
        setTimeout(() => this.classList.remove('active-btn'), 300);
        
        prevSlide();
        resetInterval();
    });
    
    // Create pagination dots
    function createPagination() {
        const paginationDiv = document.createElement('div');
        paginationDiv.className = 'gallery-pagination';
        
        for (let i = 0; i <= maxPosition; i++) {
            const dot = document.createElement('div');
            dot.className = 'pagination-dot';
            if (i === position) dot.classList.add('active');
            
            // Add click event to jump to that position
            dot.addEventListener('click', () => {
                if (isAnimating) return;
                position = i;
                updateSliderPosition();
                resetInterval();
            });
            
            paginationDiv.appendChild(dot);
        }
        
        // Add pagination after gallery nav
        document.querySelector('.gallery-nav').after(paginationDiv);
    }
    
    // Update pagination dots
    function updatePagination() {
        const dots = document.querySelectorAll('.pagination-dot');
        dots.forEach((dot, index) => {
            if (index === position) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Create fullscreen preview
    function createFullscreenPreview(imgSrc) {
        // Create fullscreen container
        const fullscreen = document.createElement('div');
        fullscreen.className = 'gallery-fullscreen';
        
        // Create image
        const img = document.createElement('img');
        img.className = 'fullscreen-image';
        img.src = imgSrc;
        
        // Create close button
        const closeBtn = document.createElement('div');
        closeBtn.className = 'fullscreen-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', () => {
            fullscreen.classList.remove('active');
            setTimeout(() => fullscreen.remove(), 500);
        });
        
        // Add elements to container
        fullscreen.appendChild(img);
        fullscreen.appendChild(closeBtn);
        
        // Add to body
        document.body.appendChild(fullscreen);
        
        // Add active class after a tiny delay for animation
        setTimeout(() => fullscreen.classList.add('active'), 10);
        
        // Close on click outside image
        fullscreen.addEventListener('click', (e) => {
            if (e.target === fullscreen) {
                fullscreen.classList.remove('active');
                setTimeout(() => fullscreen.remove(), 500);
            }
        });
        
        // Close on ESC key
        document.addEventListener('keydown', function escClose(e) {
            if (e.key === 'Escape') {
                fullscreen.classList.remove('active');
                setTimeout(() => fullscreen.remove(), 500);
                document.removeEventListener('keydown', escClose);
            }
        });
    }
    
    // Responsive adjustment
    window.addEventListener('resize', function() {
        const newVisibleItems = Math.floor(slider.offsetWidth / itemWidth);
        const newMaxPosition = Math.max(0, items.length - newVisibleItems);
        
        if (position > newMaxPosition) {
            position = newMaxPosition;
            updateSliderPosition();
        }
    });
    
    // Add hover effect for gallery items
    items.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Slightly push neighboring items away
            const index = Array.from(items).indexOf(this);
            
            if (items[index - 1]) {
                items[index - 1].style.transform = 'translateX(-5px) scale(0.98) rotateY(-5deg)';
            }
            
            if (items[index + 1]) {
                items[index + 1].style.transform = 'translateX(5px) scale(0.98) rotateY(5deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            // Reset neighboring items
            const index = Array.from(items).indexOf(this);
            
            if (items[index - 1]) {
                items[index - 1].style.transform = '';
            }
            
            if (items[index + 1]) {
                items[index + 1].style.transform = '';
            }
        });
    });
    
    // Add parallax effect to gallery items
    document.querySelector('.gallery-section').addEventListener('mousemove', function(e) {
        if (window.innerWidth < 768) return; // Skip on mobile
        
        const sectionRect = this.getBoundingClientRect();
        const xPos = (e.clientX - sectionRect.left) / sectionRect.width - 0.5;
        const yPos = (e.clientY - sectionRect.top) / sectionRect.height - 0.5;
        
        items.forEach((item, index) => {
            const depth = 1 + (index % 3) * 0.2; // Vary the depth effect
            if (Math.abs(index - position) < 3) {
                item.style.transform = `scale(${1 - Math.min(Math.abs(index - position) * 0.05, 0.2)}) 
                                        rotateY(${(index - position) * 2}deg) 
                                        translate(${xPos * 10 * depth}px, ${yPos * 10 * depth}px)`;
            }
        });
    });
    
    // Reset parallax effect when mouse leaves
    document.querySelector('.gallery-section').addEventListener('mouseleave', function() {
        updateSliderPosition();
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            nextSlide();
            resetInterval();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
            resetInterval();
        }
    });
    
    // Add touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const threshold = 50; // Minimum distance for swipe
        
        if (touchEndX + threshold < touchStartX) {
            // Swipe left
            nextSlide();
            resetInterval();
        } else if (touchEndX > touchStartX + threshold) {
            // Swipe right
            prevSlide();
            resetInterval();
        }
    }
    
    // Add animation for gallery captions
    items.forEach(item => {
        const caption = item.querySelector('.gallery-caption');
        if (caption) {
            item.addEventListener('mouseenter', () => {
                caption.style.transform = 'translateY(0)';
                caption.style.opacity = '1';
            });
            
            item.addEventListener('mouseleave', () => {
                caption.style.transform = 'translateY(10px)';
                caption.style.opacity = '0';
            });
        }
    });
    
    // Initialize the gallery with first update
    updateSliderPosition();
});

/* Additional script for Timeline animation */
document.addEventListener('DOMContentLoaded', function() {
    const timeline = document.querySelector('.timeline');
    
    if (timeline) {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        // Add animation when items come into view
        function animateOnScroll() {
            timelineItems.forEach(item => {
                const itemTop = item.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (itemTop < windowHeight - 100) {
                    item.classList.add('visible');
                }
            });
        }
        
        // Initial check
        animateOnScroll();
        
        // Add scroll event listener
        window.addEventListener('scroll', animateOnScroll);
    }
});

/* Script for Stats Animation */
document.addEventListener('DOMContentLoaded', function() {
    const stats = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        stats.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
            
            // Only animate if not already animated
            if (!stat.classList.contains('animated')) {
                let current = 0;
                const increment = Math.ceil(target / 50); // Divide animation into 50 steps
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                        stat.classList.add('animated'); // Mark as animated
                    }
                    stat.textContent = current + (stat.textContent.includes('+') ? '+' : '');
                }, 30);
            }
        });
    }
    
    // Function to check if element is in viewport
    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Animate stats when scrolled into view
    function checkStatsVisibility() {
        if (stats.length > 0 && isInViewport(stats[0])) {
            animateStats();
            window.removeEventListener('scroll', checkStatsVisibility);
        }
    }
    
    // Initial check
    checkStatsVisibility();
    
    // Add scroll event listener
    window.addEventListener('scroll', checkStatsVisibility);
});

/* Office Address Selector Script */
function changeOffice() {
    const officeSelect = document.getElementById('officeSelect');
    const streetAddress = document.getElementById('streetAddress');
    const emailAddress = document.getElementById('emailAddress');
    const phoneNumber = document.getElementById('phoneNumber');
    
    const offices = {
        moscow: {
            address: 'Бульвар строителей 43 Кемерово Россия',
            email: 'doctorscube71@gmail.com',
            phone: '+91 7517036564'
        },
        spb: {
            address: 'Kranti chowk, near santh eknath mandir, above Punjab and Sindh bank 2nd floor, Aurangabad Maharashtra 431003',
            email: 'doctorscube71@gmail.com',
            phone: '+91 7517036564'
        },
        kazan: {
            address: 'Delhi Office Address, Main Street, New Delhi, 110001',
            email: 'doctorscube71@gmail.com',
            phone: '+91 7517036564'
        }
    };
    
    const selectedOffice = offices[officeSelect.value];
    
    streetAddress.textContent = selectedOffice.address;
    emailAddress.textContent = selectedOffice.email;
    phoneNumber.textContent = selectedOffice.phone;
}

/* Smooth Scroll Script */
document.addEventListener('DOMContentLoaded', function() {
    const scrollLinks = document.querySelectorAll('.scroll-link');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
});

/* Header Scroll Effect */
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});