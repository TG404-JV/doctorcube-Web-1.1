// registration.js - JavaScript for the counselling registration form with Firebase Realtime Database integration

document.addEventListener('DOMContentLoaded', function() {
    const stateSelect = document.getElementById('state');
    const citySelect = document.getElementById('city');
    const neetScoreSelect = document.getElementById('neetScore');
    const scoreInput = document.querySelector('.neet-score-input');
    const form = document.getElementById('counsellingForm');
    const successMessage = document.getElementById('successMessage');

    const states = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
        'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
        'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
        'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
        'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
    ];
    
    let statesAndCities = {};

    // Firebase Configuration
   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD1uOrBlg0s_FQCM_3dTnm0_wzvDBc_4nQ",
    authDomain: "doctorcubes-b4935.firebaseapp.com",
    projectId: "doctorcubes-b4935",
    storageBucket: "doctorcubes-b4935.appspot.com",
    messagingSenderId: "150491308507",
    appId: "1:150491308507:web:d4e50111cad0438d69c7fe",
    measurementId: "G-RGVWFQ953J",
    databaseURL: "https://doctorcubes-b4935-default-rtdb.firebaseio.com"
};

    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    // Get Firebase Realtime Database reference
    const database = firebase.database();

    async function fetchCitiesData() {
        try {
            const response = await fetch('json/indian_cities.json');
            if (!response.ok) throw new Error('Failed to fetch cities data');
            
            statesAndCities = await response.json();
            populateStates();
        } catch (error) {
            console.error('Error fetching cities data:', error);
        }
    }

    function populateStates() {
        states.sort();
        states.forEach(state => {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            stateSelect.appendChild(option);
        });
    }

    function populateCities(state) {
        citySelect.innerHTML = '<option value="">Select City *</option>';
        if (statesAndCities[state] && Array.isArray(statesAndCities[state])) {
            statesAndCities[state].sort().forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
        } else {
            console.warn(`No cities found for state: ${state}`);
        }
    }

    neetScoreSelect.addEventListener('change', function() {
        if (this.value === 'yes') {
            scoreInput.style.display = 'block';
            document.getElementById('score').required = true;
        } else {
            scoreInput.style.display = 'none';
            document.getElementById('score').required = false;
        }
    });

    stateSelect.addEventListener('change', function() {
        if (this.value) {
            populateCities(this.value);
        } else {
            citySelect.innerHTML = '<option value="">Select City *</option>';
        }
    });

    function resetFormCompletely() {
        form.reset();
        stateSelect.selectedIndex = 0;
        citySelect.innerHTML = '<option value="">Select City *</option>';
        neetScoreSelect.selectedIndex = 0;

        if (scoreInput) scoreInput.style.display = 'none';
        
        const scoreElement = document.getElementById('score');
        if (scoreElement) scoreElement.required = false;

        const formElements = form.elements;
        for (let i = 0; i < formElements.length; i++) {
            formElements[i].classList.remove('is-invalid', 'is-valid');
            const feedbackElement = formElements[i].nextElementSibling;
            if (feedbackElement && (feedbackElement.classList.contains('invalid-feedback') || 
                                   feedbackElement.classList.contains('valid-feedback'))) {
                feedbackElement.textContent = '';
            }
        }
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            mobile: document.getElementById('mobile').value,
            email: document.getElementById('email').value,
            state: document.getElementById('state').value,
            city: document.getElementById('city').value,
            interestedCountry: document.getElementById('country').value,
            hasNeetScore: document.getElementById('neetScore').value,
            neetScore: document.getElementById('neetScore').value === 'yes' ? document.getElementById('score').value : 'N/A',
            hasPassport: document.getElementById('passport').value,
            submissionDate: new Date().toISOString()
        };

        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        // Get current date in ddmmyy format
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yy = String(today.getFullYear()).slice(-2);
        const formattedDate = `${dd}${mm}${yy}`;

        // Generate a unique key under the current date node
        const newRegistrationRef = database.ref(`registrations/${formattedDate}`).push();

        newRegistrationRef.set(formData)
            .then(() => {
                console.log('Data saved successfully with key:', newRegistrationRef.key);

                if (successMessage) {
                    successMessage.style.display = 'block';
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 5000);
                }

                resetFormCompletely();
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;

                alert("Thank you! Our team will connect with you soon.");
            })
            .catch(error => {
                console.error('Error saving data:', error);
                alert("There was an error submitting your form. Please try again.");
                
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            });
    });

    fetchCitiesData();
});
