/* 
   Form validation and user interaction */

// Form validation and submission handler
// this prevents default form submission and checks all required fields before processing
const orderForm = document.querySelector('.order-form');

orderForm.addEventListener('submit', function(event) {
    event.preventDefault();  // this stop default form submission behavior

    //this gets and trims all form input values to remove extra whitespace
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const gender = document.querySelector('input[name="gender"]:checked');

    // Array to store all validation error messages
    let errors = [];

    // this checks that  first name is not empty
    if (firstName === '') {
        errors.push('First name is required');
    }

    // this checks last name is not empty
    if (lastName === '') {
        errors.push('Last name is required');
    }

    // Regex pattern to check email format 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // check email is not empty and matches email format
    if (email === '') {
        errors.push('Email is required');
    } else if (!emailRegex.test(email)) {
        errors.push('Please enter a valid email address');
    }

    // check that a gender option has been selected
    if (!gender) {
        errors.push('Please select a gender');
    }

    // If there are validation errors, display them and stop submission
    if (errors.length > 0) {
        alert('Please fix the following errors:\n\n• ' + errors.join('\n• '));
        return;
    }

    // If all validations pass, show success message and clear form
    alert('Thank you! Your order has been received.');
    orderForm.reset();
});
