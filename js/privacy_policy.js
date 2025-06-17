
// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking anywhere outside
document.addEventListener('click', function(event) {
    if (!navMenu.contains(event.target) && !mobileMenu.contains(event.target)) {
        navMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});
