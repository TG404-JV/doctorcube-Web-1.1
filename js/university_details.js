// DOM elements
const countriesSection = document.getElementById('countries-section');
const universitiesSection = document.getElementById('universities-section');
const universityDetailsSection = document.getElementById('university-details-section');
const selectedCountrySpan = document.getElementById('selected-country');
const universityList = document.getElementById('university-list');
const homeLink = document.getElementById('home-link');
const breadcrumbContainer = document.getElementById('breadcrumb');

// Add event listeners to country cards
document.querySelectorAll('.country-card').forEach(card => {
    card.addEventListener('click', () => {
        const country = card.getAttribute('data-country');
        showUniversities(country);
    });
});

// Home link event listener
homeLink.addEventListener('click', () => {
    showCountries();
});

// Function to show universities for a selected country
function showUniversities(country) {
    // Update breadcrumb
    breadcrumbContainer.innerHTML = `
        <div class="breadcrumb-item breadcrumb-link" id="home-link">Home</div>
        <div class="breadcrumb-separator">></div>
        <div class="breadcrumb-item">${country}</div>
    `;
    
    // Make sure the home link is visible
    document.getElementById('home-link').style.display = 'inline-block';
    
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
        
        // Add click event to show university details
        universityCard.addEventListener('click', () => {
            showUniversityDetails(country, university.id);
        });
        
        universityList.appendChild(universityCard);
    });
}

// Function to show details for a specific university
function showUniversityDetails(country, universityId) {
    // Find the university in the database
    const universities = universitiesDatabase[country] || [];
    const university = universities.find(u => u.id === universityId);
    
    if (!university) return;
    
    // Update breadcrumb
    breadcrumbContainer.innerHTML = `
        <div class="breadcrumb-item breadcrumb-link" id="home-link">Home</div>
        <div class="breadcrumb-separator">></div>
        <div class="breadcrumb-item breadcrumb-link" id="country-link">${country}</div>
        <div class="breadcrumb-separator">></div>
        <div class="breadcrumb-item">${university.name}</div>
    `;
    
    // Make sure the home link is visible
    document.getElementById('home-link').style.display = 'inline-block';
    
    // Add event listeners to breadcrumb links
    document.getElementById('home-link').addEventListener('click', () => {
        showCountries();
    });
    
    document.getElementById('country-link').addEventListener('click', () => {
        showUniversities(country);
    });
    
    // Update UI
    countriesSection.style.display = 'none';
    universitiesSection.style.display = 'none';
    universityDetailsSection.style.display = 'block';
    
    // Populate university details
    document.getElementById('detail-image').src = university.image;
    document.getElementById('detail-image').alt = university.name;
    document.getElementById('detail-university-name').textContent = university.name;
    document.getElementById('detail-location').textContent = university.location;
    document.getElementById('detail-founded').textContent = university.founded;
    document.getElementById('detail-about').textContent = university.about;
    document.getElementById('detail-rankings').textContent = university.rankings;
    document.getElementById('detail-requirements').textContent = university.requirements;
    document.getElementById('detail-contact').textContent = university.contact;
    
    // Populate programs list
    const programsList = document.getElementById('detail-programs');
    programsList.innerHTML = '';
    university.programs.forEach(program => {
        const li = document.createElement('li');
        li.textContent = program;
        programsList.appendChild(li);
    });
    
    // Populate facilities list
    const facilitiesList = document.getElementById('detail-facilities');
    facilitiesList.innerHTML = '';
    university.facilities.forEach(facility => {
        const li = document.createElement('li');
        li.textContent = facility;
        facilitiesList.appendChild(li);
    });
}

// Function to show countries section
function showCountries() {
    // Update breadcrumb
    breadcrumbContainer.innerHTML = `
        <div class="breadcrumb-item breadcrumb-link" id="home-link" style="display: none;">Home</div>
    `;
    
    // Add event listener to the home link again
    document.getElementById('home-link').addEventListener('click', () => {
        showCountries();
    });
    
    // Update UI
    countriesSection.style.display = 'block';
    universitiesSection.style.display = 'none';
    universityDetailsSection.style.display = 'none';
}