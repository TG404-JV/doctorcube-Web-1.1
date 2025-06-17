document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const countryBtns = document.querySelectorAll('.country-btn');
    const universityCards = document.querySelectorAll('.university-card');
    const noResults = document.querySelector('.no-results');
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
    const appModal = document.getElementById('appModal');
    const closeModalBtn = document.getElementById('closeModal');
    
    // Function to filter universities by country
    function filterUniversities(country) {
        let visibleCount = 0;
        
        universityCards.forEach(card => {
            if (country === 'all' || card.dataset.country === country) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show/hide no results message
        if (visibleCount === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
    }
    
    // Event listener for country buttons
    countryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            countryBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter universities based on selected country
            filterUniversities(this.dataset.country);
        });
    });
    
    // Event listener for view details buttons (open modal)
   // Event listener for view details buttons (open modal)
   viewDetailsBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        window.location.href = 'dc_download_app.html';
    });
});
    
    // Event listener to close modal
    closeModalBtn.addEventListener('click', function() {
        appModal.style.display = 'none';
    });
    
    // Close modal when clicking outside of modal content
    window.addEventListener('click', function(event) {
        if (event.target === appModal) {
            appModal.style.display = 'none';
        }
    });
    
    // Initialize with all universities showing
    filterUniversities('all');
});
