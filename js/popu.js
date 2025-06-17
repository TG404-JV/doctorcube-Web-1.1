// Create popup container elements
function createPopupElements() {
    const popupOverlay = document.createElement('div');
    popupOverlay.className = 'popup-overlay';
    
    const popupContent = document.createElement('div');
    popupContent.className = 'university-popup';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'popup-close';
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('aria-label', 'Close popup');
    
    popupContent.appendChild(closeButton);
    popupOverlay.appendChild(popupContent);
    document.body.appendChild(popupOverlay);
    
    return { popupOverlay, popupContent, closeButton };
}

// Get or create popup elements
let popupElements;
function getPopupElements() {
    if (!popupElements) {
        popupElements = createPopupElements();
        
        // Add event listeners
        popupElements.closeButton.addEventListener('click', closePopup);
        popupElements.popupOverlay.addEventListener('click', function(e) {
            if (e.target === popupElements.popupOverlay) {
                closePopup();
            }
        });
        
        // Add keyboard support for accessibility
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && popupElements.popupOverlay.classList.contains('active')) {
                closePopup();
            }
        });
    }
    
    return popupElements;
}

// Modified showUniversityDetails function to use popup
function showUniversityDetails(country, universityId) {
    // Find the university in the database
    const universities = universitiesDatabase[country] || [];
    const university = universities.find(u => u.id === universityId);
    
    if (!university) return;
    
    // Get popup elements
    const { popupOverlay, popupContent } = getPopupElements();
    
    // Populate university details in popup
    popupContent.innerHTML = `
        <button class="popup-close" aria-label="Close popup">&times;</button>
        <div class="details-header">
            <img src="${university.image}" alt="${university.name}" class="details-image">
            <div class="details-title">
                <h2>${university.name}</h2>
                <p>${university.location}</p>
                <p>${university.founded}</p>
            </div>
        </div>
        
        <div class="details-content">
            <div class="details-section">
                <h3 class="detail-heading">About</h3>
                <p>${university.about}</p>
            </div>
            
            <div class="details-section">
                <h3 class="detail-heading">Rankings</h3>
                <p>${university.rankings}</p>
            </div>
            
            <div class="details-section">
                <h3 class="detail-heading">Top Programs</h3>
                <ul class="program-list">
                    ${university.programs.map(program => `<li>${program}</li>`).join('')}
                </ul>
            </div>
            
            <div class="details-section">
                <h3 class="detail-heading">Facilities</h3>
                <ul class="facility-list">
                    ${university.facilities.map(facility => `<li>${facility}</li>`).join('')}
                </ul>
            </div>
            
            <div class="details-section">
                <h3 class="detail-heading">Admission Requirements</h3>
                <p>${university.requirements}</p>
            </div>
            
            <div class="details-section">
                <h3 class="detail-heading">Contact Information</h3>
                <p>${university.contact}</p>
            </div>
        </div>
    `;
    
    // Re-add event listener to close button
    popupContent.querySelector('.popup-close').addEventListener('click', closePopup);
    
    // Show the popup with animation
    popupOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling of the body when popup is open
}

// Function to close the popup
function closePopup() {
    const { popupOverlay } = getPopupElements();
    popupOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
}

// Modified showUniversities function - this part stays the same
function showUniversities(country) {
    // Update breadcrumb
    breadcrumbContainer.innerHTML = `
        <div class="breadcrumb-item breadcrumb-link" id="home-link">Home</div>
        <div class="breadcrumb-separator">></div>
        <div class="breadcrumb-item">${country}</div>
    `;
    
    // Add event listener to the home link again
    document.getElementById('home-link').addEventListener('click', () => {
        showCountries();
    });
    
    // Update UI
    selectedCountrySpan.textContent = country;
    countriesSection.style.display = 'none';
    universitiesSection.style.display = 'block';
    universityDetailsSection.style.display = 'none';
    
    // Clear previous university list
    universityList.innerHTML = '';
    
    // Add universities for the selected country
    const universities = universitiesDatabase[country] || [];
    universities.forEach(university => {
        const universityCard = document.createElement('div');
        universityCard.className = 'university-card';
        universityCard.innerHTML = `
            <img src="${university.image}" alt="${university.name}" class="university-image">
            <div class="university-info">
                <div class="university-name">${university.name}</div>
                <div class="university-location">${university.location}</div>
            </div>
        `;
        
        // Add click event to show university details in popup
        universityCard.addEventListener('click', () => {
            showUniversityDetails(country, university.id);
        });
        
        universityList.appendChild(universityCard);
    });
}