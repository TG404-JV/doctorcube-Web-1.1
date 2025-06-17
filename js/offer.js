document.addEventListener("DOMContentLoaded", function () {
    // Array of offer messages with images and action text
    const offers = [
        {
            image: "img/logo_png/ic_offer.webp",
            text: "Special Offer: Get 10% Off on Registration!",
            action: "Claim Now"
        },
        {
            image: "img/logo_png/ic_offer.webp",
            text: "Limited Time: Free Consultation with Our Experts!",
            action: "Book Now"
        },
        {
            image: "img/logo_png/ic_offer.webp",
            text: "Hurry! Secure Your MBBS Seat Today!",
            action: "Apply Now"
        },
        {
            image: "img/logo_png/ic_offer.webp",
            text: "Exclusive: Free Post-Arrival Support for Students!",
            action: "Register Now"
        },
        {
            image: "img/logo_png/ic_offer.webp",
            text: "Guaranteed Admission for NEET Qualified Students!",
            action: "Check Eligibility"
        }
    ];
    
    // Get DOM elements
    const offerBanner = document.querySelector(".offer-banner");
    const offerImage = document.querySelector(".offer-image img");
    const offerText = document.querySelector(".offer-text");
    const actionButton = document.querySelector(".action-button");
    const closeButton = document.querySelector(".close-offer");
    
    // Function to preload images for smoother transitions
    function preloadImages() {
        offers.forEach(offer => {
            const img = new Image();
            img.src = offer.image;
        });
    }
    
    // Set a single random offer
    function setRandomOffer() {
        const randomIndex = Math.floor(Math.random() * offers.length);
        const currentOffer = offers[randomIndex];
        
        offerImage.src = currentOffer.image;
        offerImage.alt = `Offer: ${currentOffer.text}`;
        offerText.textContent = currentOffer.text;
        actionButton.textContent = currentOffer.action;
        
        // Add transition effects
        offerImage.parentElement.style.transition = "opacity 0.3s ease";
        offerText.style.transition = "opacity 0.3s ease";
        actionButton.style.transition = "opacity 0.3s ease";
        
        // Store the selected offer index for action button functionality
        actionButton.dataset.offerIndex = randomIndex;
    }
    
    // Preload images when page loads
    preloadImages();
    
    // Initial display of banner after delay
    setTimeout(() => {
        // Check if banner was ever shown to the user before
        if (localStorage.getItem("offerBannerViewed") !== "true") {
            setRandomOffer();
            offerBanner.classList.add("show");
            
            // Mark that the user has now seen an ad
            localStorage.setItem("offerBannerViewed", "true");
        }
    }, 2000); // Appears after 2 seconds
    
    // Action button functionality
    actionButton.addEventListener("click", function() {
        const offerIndex = parseInt(this.dataset.offerIndex);
        
        // Example tracking and redirection
        console.log("Offer claimed: " + offers[offerIndex].text);
        
        // You can add different actions based on the current offer
        switch(offerIndex) {
            case 0:
                // Redirect to registration page with discount code
                window.location.href = "index.html";
                break;
            case 1:
                // Open consultation booking
                window.location.href = "index.html";
                break;
            case 2:
                // MBBS seat application
                window.location.href = "index.html";
                break;
            case 3:
                // Learn about support services
                window.location.href = "index.html";
                break;
            case 4:
                // NEET eligibility check
                window.location.href = "index.html";
                break;
            default:
                // General action
                window.location.href = "index.html";
        }
    });
    
    // Close button functionality
    closeButton.addEventListener("click", function () {
        offerBanner.classList.remove("show");
        
        // No need to set localStorage here since we already set it when displaying the banner
    });
});