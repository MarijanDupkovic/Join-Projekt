let email = "";

/**
 * Redirects the user to the login page.
 */
function backToLogin() {
    window.location.href = '../login.html';
}

/**
 * Performs necessary actions when the page is loaded.
 */
async function onPageLoad() {
    email = getEmailUrlParameter();
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    categories = JSON.parse(backend.getItem('categories')) || [];
    tasks = JSON.parse(backend.getItem('tasks')) || [];
}

/**
 * Retrieves the value of the "email" parameter from the URL query string.
 * @returns {string|null} The value of the "email" parameter, or null if it is not present.
 */
function getEmailUrlParameter() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('email');
    return email;
}

/**
 * Handles the form submission for updating the password.
 */
function onSubmit() {
    let newPassword = document.getElementById('userPasswordNew').value;
    let confirmPassword = document.getElementById('userPasswordConfirm').value;
    for (let i = 0; i < users.length; i++) {
        if ( areDataFromUser(newPassword, confirmPassword,i)) setNewPassword(i, newPassword);
    }
}

/**
 * Checks if the provided data matches the user's data.
 * @param {string} newPassword - The new password entered by the user.
 * @param {string} confirmPassword - The confirmed password entered by the user.
 * @param {number} i - The index of the user in the users array.
 * @returns {boolean} - True if the data matches, false otherwise.
 */
function areDataFromUser(newPassword, confirmPassword,i){
    return newPassword == confirmPassword && users[i].email == email;
}

/**
 * Sets a new password for the user at the specified index.
 * @param {number} i - The index of the user in the users array.
 * @param {string} newPassword - The new password to set for the user.
 */
function setNewPassword(i, newPassword) {
    users[i].pwd = newPassword;
    pushToDatabase();
    showResetPwText();
    setTimeout(() => backToLogin(), 3000);
}

/**
 * Updates the display to show the password reset text.
 */
function showResetPwText() {
    document.getElementById('forgotMyPasswordText').innerHTML = 'Password changed!<br>You will now be redirected back to login.<br>If not, please click <a class="clickHereLink" href="../login.html">here</a>!';
    document.getElementById('formResetPassword').style.display = "none";
}