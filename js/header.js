        document.addEventListener('DOMContentLoaded', function() {
            // Helper function to safely toggle classes
            function safeToggleClass(element, className) {
                if (element && element.classList) {
                    element.classList.toggle(className);
                    return true;
                }
                console.error('Cannot toggle class on invalid element', element);
                return false;
            }
            
            // Helper function to safely check if element has class
            function safeHasClass(element, className) {
                return element && element.classList && element.classList.contains(className);
            }
            
            // Helper function to safely add class
            function safeAddClass(element, className) {
                if (element && element.classList) {
                    element.classList.add(className);
                    return true;
                }
                return false;
            }
            
            // Helper function to safely remove class
            function safeRemoveClass(element, className) {
                if (element && element.classList) {
                    element.classList.remove(className);
                    return true;
                }
                return false;
            }
            
            // Get elements
            const menuToggle = document.querySelector('.menu-toggle');
            const navMenu = document.querySelector('.nav-menu');
            const menuBackdrop = document.querySelector('.menu-backdrop');
            const dropdowns = document.querySelectorAll('.dropdown');
            
            // Update ARIA attributes
            function updateAriaAttributes(isOpen) {
                if (menuToggle) {
                    menuToggle.setAttribute('aria-expanded', isOpen.toString());
                }
            }
            
            // Toggle menu function
            function toggleMenu() {
                const isOpen = safeToggleClass(navMenu, 'active');
                safeToggleClass(menuToggle, 'active');
                safeToggleClass(menuBackdrop, 'active');
                updateAriaAttributes(isOpen);
                
                // Prevent body scroll when menu is open
                document.body.style.overflow = isOpen ? 'hidden' : '';
            }
            
            // Mobile menu button click and touch
            if (menuToggle) {
                menuToggle.addEventListener('click', function(event) {
                    event.stopPropagation();
                    event.preventDefault();
                    toggleMenu();
                });
                
                menuToggle.addEventListener('touchstart', function(event) {
                    event.stopPropagation();
                    event.preventDefault();
                    toggleMenu();
                }, { passive: false });
            }
            
            // Handle Dropdown Click on Mobile
            dropdowns.forEach(dropdown => {
                const dropdownLink = dropdown.querySelector('.nav-link');
                
                if (dropdownLink) {
                    dropdownLink.addEventListener('click', function(e) {
                        if (window.innerWidth <= 768) {
                            e.preventDefault();
                            safeToggleClass(dropdown, 'active');
                            
                            dropdowns.forEach(otherDropdown => {
                                if (otherDropdown !== dropdown && safeHasClass(otherDropdown, 'active')) {
                                    safeRemoveClass(otherDropdown, 'active');
                                }
                            });
                        }
                    });
                    
                    dropdownLink.addEventListener('touchstart', function(e) {
                        if (window.innerWidth <= 768) {
                            e.preventDefault();
                            safeToggleClass(dropdown, 'active');
                            
                            dropdowns.forEach(otherDropdown => {
                                if (otherDropdown !== dropdown && safeHasClass(otherDropdown, 'active')) {
                                    safeRemoveClass(otherDropdown, 'active');
                                }
                            });
                        }
                    }, { passive: false });
                }
            });
            
            // Close menu when clicking backdrop or outside
            function closeMenu() {
                if (safeHasClass(navMenu, 'active')) {
                    safeRemoveClass(navMenu, 'active');
                    safeRemoveClass(menuToggle, 'active');
                    safeRemoveClass(menuBackdrop, 'active');
                    updateAriaAttributes(false);
                    document.body.style.overflow = '';
                    
                    dropdowns.forEach(dropdown => {
                        safeRemoveClass(dropdown, 'active');
                    });
                }
            }
            
            if (menuBackdrop) {
                menuBackdrop.addEventListener('click', closeMenu);
                menuBackdrop.addEventListener('touchstart', closeMenu, { passive: false });
            }
            
            document.addEventListener('click', function(event) {
                if (safeHasClass(navMenu, 'active') &&
                    !event.target.closest('.nav-menu') &&
                    !event.target.closest('.menu-toggle')) {
                    closeMenu();
                }
            });
            
            // Keyboard accessibility
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape' && safeHasClass(navMenu, 'active')) {
                    closeMenu();
                }
            });
            
            // Reset menu state on window resize
            window.addEventListener('resize', function() {
                if (window.innerWidth > 768) {
                    safeRemoveClass(navMenu, 'active');
                    safeRemoveClass(menuToggle, 'active');
                    safeRemoveClass(menuBackdrop, 'active');
                    updateAriaAttributes(false);
                    document.body.style.overflow = '';
                    
                    dropdowns.forEach(dropdown => {
                        safeRemoveClass(dropdown, 'active');
                    });
                }
            });
        });
