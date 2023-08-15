export function validateUsername(username) {
    // Use a regular expression to test the username
    let regex = /^[a-zA-Z0-9]{3,}$/;
    return regex.test(username);
}

// Define a export  function to validate the phone number
// The phone number should be 10 digits long and start with either 6, 7, 8 or 9
export function validatePhoneNumber(phoneNumber) {
    // Use a regular expression to test the phone number
    let regex = /^[6-9]\d{9}$/;
    return regex.test(phoneNumber);
}

// Define a export  function to validate the email
// The email should follow the standard format of username@domain
export function validateEmail(email) {
    // Use a regular expression to test the email
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

// Define a export  function to validate the password
// The password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit and one special character
export function validatePassword(password) {
    // Use a regular expression to test the password
    let regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    return regex.test(password);
}

// Define a export  function to validate the confirm password
// The confirm password should match the password
export function validateConfirmPassword(password, confirmPassword) {
    // console.log(password, confirmPassword)
    // Compare the two passwords
    return password === confirmPassword;
}