// DOM Elements
const form = document.getElementById("searchForm");
const locationInput = document.getElementById("location");
const dateInput = document.getElementById("date");
const priceInput = document.getElementById("price");
const suggestionsBox = document.getElementById("suggestions");
const errorMessageLocation = locationInput.nextElementSibling;
const errorMessageDate = dateInput.nextElementSibling;
const errorMessagePrice = priceInput.nextElementSibling;
const loadingIndicator = document.getElementById('loading');
const successMessage = document.getElementById('successMessage');

// Location Suggestions (Mocked Data)
const locationSuggestions = ['Lakshadweep', 'Goa', 'Kerala', 'Rajasthan', 'Uttarakhand', 'Delhi', 'Mumbai', 'Kolkata'];

// Handle Location Input
locationInput.addEventListener('input', function() {
  const query = locationInput.value.toLowerCase();
  const filteredSuggestions = locationSuggestions.filter(location => location.toLowerCase().includes(query));
  showLocationSuggestions(filteredSuggestions);
});

// Display Location Suggestions
function showLocationSuggestions(suggestions) {
  suggestionsBox.innerHTML = ''; // Clear previous suggestions

  suggestions.forEach(suggestion => {
    const div = document.createElement('div');
    div.textContent = suggestion;
    div.addEventListener('click', () => locationInput.value = suggestion);
    suggestionsBox.appendChild(div);
  });
}

// Live Price Formatting
priceInput.addEventListener('input', function() {
  let value = priceInput.value.replace(/[^0-9.]/g, "");  // Allow only numbers and dot
  if (value.length > 10) value = value.slice(0, 10);  // Limit to 10 characters
  priceInput.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas for thousands
});

// Form Submission and Validation
form.addEventListener("submit", function(e) {
  e.preventDefault();

  // Clear any existing errors
  clearErrors();

  let isValid = true;

  // Validate Location
  if (locationInput.value.trim() === "") {
    showError(locationInput, "Location is required.");
    isValid = false;
  }

  // Validate Date
  if (!dateInput.value) {
    showError(dateInput, "Date is required.");
    isValid = false;
  }

  // Validate Price
  if (!priceInput.value.trim() || isNaN(priceInput.value.replace(/[^0-9.]/g, ""))) {
    showError(priceInput, "Enter a valid price.");
    isValid = false;
  }

  // If all validations pass
  if (isValid) {
    showLoading(true);

    setTimeout(() => {
      showLoading(false);
      showSuccessMessage();
      form.reset();
    }, 2000);
  }
});

// Show Error
function showError(input, message) {
  const errorMessage = input.nextElementSibling;
  errorMessage.textContent = message;
  input.style.borderColor = "red";
}

// Clear Error Messages
function clearErrors() {
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(message => message.textContent = "");
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => input.style.borderColor = "");
}

// Show Loading Spinner
function showLoading(isLoading) {
  if (isLoading) {
    loadingIndicator.style.display = "block";
  } else {
    loadingIndicator.style.display = "none";
  }
}

// Show Success Message
function showSuccessMessage() {
  successMessage.style.display = "block";
  setTimeout(() => {
    successMessage.style.display = "none";
  }, 3000);
}

// Dark Mode Toggle
const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
