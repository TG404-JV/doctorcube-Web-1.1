        // Add mouse move parallax effect to cubes
        document.addEventListener('mousemove', (e) => {
            const cubes = document.querySelectorAll('.cube');
            const moveX = (e.clientX - window.innerWidth / 2) / 50;
            const moveY = (e.clientY - window.innerHeight / 2) / 50;
            
            cubes.forEach(cube => {
                const cubeBounds = cube.getBoundingClientRect();
                const cubeX = cubeBounds.left + cubeBounds.width / 2;
                const cubeY = cubeBounds.top + cubeBounds.height / 2;
                
                const diffX = (e.clientX - cubeX) / 20;
                const diffY = (e.clientY - cubeY) / 20;
                
                cube.style.transform = `translate(${diffX}px, ${diffY}px) rotate3d(1, 1, 1, ${cube.classList.contains('cube-1') ? '0deg' : '180deg'})`;
            });
            
            // Add subtle tilt to service categories
            const cards = document.querySelectorAll('.service-category');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const tiltX = (y - centerY) / 20;
                const tiltY = (centerX - x) / 20;
                
                if (rect.left < e.clientX && e.clientX < rect.right && 
                    rect.top < e.clientY && e.clientY < rect.bottom) {
                    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px)`;
                } else {
                    card.style.transform = '';
                }
            });
        });


        // Simple parallax effect for the 3D elements
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            
            // Apply parallax to hero 3D element
            const heroElement = document.querySelector('.hero-3d-element');
            if (heroElement) {
                heroElement.style.transform = `translateY(${scrollPosition * 0.05}px) rotateY(${scrollPosition * 0.02}deg)`;
            }
            
            // Apply parallax to CTA 3D element
            const ctaElement = document.querySelector('.cta-3d-element');
            if (ctaElement) {
                ctaElement.style.transform = `translateY(${-scrollPosition * 0.03}px) rotateY(${-scrollPosition * 0.01}deg)`;
            }
            
            // Apply parallax to background
            const parallaxBg = document.querySelector('.parallax-bg');
            if (parallaxBg) {
                parallaxBg.style.transform = `translateY(${scrollPosition * 0.1}px)`;
            }
        });

        // Add animation to service items
        const serviceItems = document.querySelectorAll('.service-item');
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        serviceItems.forEach(item => {
            observer.observe(item);
        });
