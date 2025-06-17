document.addEventListener("DOMContentLoaded", function () {
    function animateValue(element, start, end, duration) {
        let startTime = null;
        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            let progress = Math.min((timestamp - startTime) / duration, 1);
            let currentValue = Math.floor(progress * (end - start) + start);
            
            // Update number
            element.innerText = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.innerText = currentValue + "+"; // Add "+" after animation ends
            }
        }
        requestAnimationFrame(step);
    }

    let observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    let stats = document.querySelectorAll(".stat-number");
                    stats[0] && animateValue(stats[0], 0, 10000, 4000);  
                    stats[1] && animateValue(stats[1], 0, 6, 1000);      
                    stats[2] && animateValue(stats[2], 0, 50, 5000);    
                    stats[3] && animateValue(stats[3], 0, 10, 4000);    
                    observer.disconnect(); // Run animation once
                }
            });
        },
        { threshold: 0.5 }
    );

    let statsSection = document.querySelector(".stats");
    if (statsSection) observer.observe(statsSection);
});
