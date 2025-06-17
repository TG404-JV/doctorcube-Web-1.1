document.addEventListener('DOMContentLoaded', function() {
    // Counter Configuration
    const counterConfigs = [
        { 
            elementId: 'students-count', 
            finalValue: 10000, 
            prefix: '', 
            suffix: '+' 
        },
        { 
            elementId: 'success-rate', 
            finalValue: 100, 
            prefix: '', 
            suffix: '%' 
        },
        { 
            elementId: 'countries-count', 
            finalValue: 10, 
            prefix: '', 
            suffix: '+' 
        },
        { 
            elementId: 'universities-count', 
            finalValue: 50, 
            prefix: '', 
            suffix: '+' 
        }
    ];

    // Counting Animation Function
    function animateCounter(config) {
        const counterElement = document.getElementById(config.elementId);
        if (!counterElement) return;

        let currentFrame = 0;
        let currentValue = 0;
        const finalValue = config.finalValue;
        const duration = 2000; // Total animation duration in ms
        const frameDuration = 1000 / 60; // 60 FPS
        const totalFrames = Math.round(duration / frameDuration);
        
        function updateCounter() {
            const progress = currentFrame / totalFrames;
            const easing = 1 - Math.pow(1 - progress, 4); // Smooth animation
            currentValue = Math.round(easing * finalValue);
            
            counterElement.textContent = `${config.prefix}${currentValue}${config.suffix}`;
            
            currentFrame++;
            
            if (currentFrame < totalFrames) {
                requestAnimationFrame(updateCounter);
            } else {
                counterElement.textContent = `${config.prefix}${finalValue}${config.suffix}`;
            }
        }

        // Intersection Observer to trigger animation when in view
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target); // Stop observing after animation
                }
            });
        }, {
            threshold: 0.3 // Start animation when 30% of the element is visible
        });

        observer.observe(counterElement);
    }

    // Initialize counters when page loads
    function initCounters() {
        counterConfigs.forEach(animateCounter);
    }

    window.addEventListener('load', initCounters);
});
