window.onload = function() {
    document.getElementById('email').focus(); // Set focus on the email input
};

document.querySelector('form').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Clear any previous error messages
    const errorElement = document.querySelector('.error-message');
    if (errorElement) errorElement.remove();

    // Make the AJAX POST request
    const response = await fetch('../php/signin.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    });

    const result = await response.json();

    if (result.error) {
        // If there's an error, display it
        const errorMessage = document.createElement('p');
        errorMessage.textContent = result.error;
        errorMessage.classList.add('error-message');
        document.querySelector('form').appendChild(errorMessage);
    } else if (result.success) {
        // If login is successful, store the user ID and usertype in localStorage
        localStorage.setItem('id_user', result.id_user); // Store the user ID
        localStorage.setItem('usertype', result.usertype); // Store the user type (user or admin)
        console.log('User ID stored:', result.id_user); // Log the stored ID for verification

        // Redirect based on usertype
        if (result.usertype === 'admin') {
            window.location.href = '../admin/index.php'; // Redirect to admin dashboard
        } else {
            window.location.href = '../php/club.php'; // Redirect to user club page
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    let emailInput = document.getElementById('email');
    let passwordInput = document.getElementById('password');

    emailInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === 'ArrowDown') {
            passwordInput.focus();
        }
    });
    passwordInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            validateForm();
        } else if (event.key === 'ArrowUp') {
            emailInput.focus();
        }
    });
});
