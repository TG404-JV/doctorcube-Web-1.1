document.addEventListener('DOMContentLoaded', () => {
    // Array of background images
    const images = [
        '/img/dc_img/Doctorcubes.JPG',
        '/img/dc_img/Doctorcubes 2.JPG',
        '/img/dc_img/Doctorcubes 3.JPG',
        '/img/dc_img/Doctorcubes 4.JPG',
        '/img/dc_img/Doctorcubes 5.JPG',
        '/img/dc_img/Doctorcubes 6.JPG',
        '/img/dc_img/Doctorcubes 7.JPG',
        '/img/dc_img/Doctorcubes 8.JPG',
        '/img/dc_img/Doctorcubes 9.JPG',
        '/img/dc_img/Doctorcubes office 1.JPG',
        '/img/dc_img/Doctorcubes office 2.JPG',
        '/img/dc_img/Doctorcubes office 3.JPG'
    ];
    let index = 0;

    // Preload images to avoid delays
    images.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onerror = () => console.error(`Failed to load image: ${src}`);
    });

    // Change background image every 5 seconds
    const hero = document.querySelector('.hero');
    if (!hero) {
        console.error('Hero element not found');
        return;
    }

    setInterval(() => {
        index = (index + 1) % images.length;
        // Primary approach: Update custom property
        hero.style.setProperty('--bg-image', `url(${images[index]})`);
        // Fallback: Add class for each image
        hero.className = 'hero'; // Reset classes
        hero.classList.add(`hero-bg-${index}`);
        console.log(`Changed to image: ${images[index]}`); // Debug log
    }, 5000); // 5000ms = 5 seconds

    // Handle NEET score input visibility
    const neetScoreSelect = document.getElementById('neetScore');
    if (neetScoreSelect) {
        neetScoreSelect.addEventListener('change', function() {
            const neetScoreInput = document.querySelector('.neet-score-input');
            if (neetScoreInput) {
                neetScoreInput.style.display = this.value === 'yes' ? 'block' : 'none';
            }
        });
    } else {
        console.warn('NEET score select element not found');
    }

    // Validate mobile number input
    window.validateMobileNumber = function(input) {
        input.value = input.value.replace(/[^0-9]/g, '').slice(0, 10);
    };
});