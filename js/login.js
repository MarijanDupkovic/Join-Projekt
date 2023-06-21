/**
 * Initializes the login process by downloading data from the server and populating local variables.
 * This function should be called when logging in.
 * @returns {Promise<void>} A promise that resolves once the login initialization is complete.
 */
async function initLogin() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    categories = JSON.parse(backend.getItem('categories')) || [];
    tasks = JSON.parse(backend.getItem('tasks')) || [];
}

/**
 * Redirects the user to the "forgot password" page.
 */
function showForgotMyPasswordPage() {
    window.location.href = 'forgotpassword.html';
}

/**
 * Redirects the user to the login page.
 */
function goToLogin() {
    window.location.href = './login.html';
}

/**
 * Handles the submission of a password reset request form.
 * @param {Event} event - The submit event object.
 */
async function onSubmitRQPassword(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let response = await action(formData);
    if (response.ok) getRedirected();
}

/** Updates the HTML content and redirects the user to the login page after a successful password reset request. */
function getRedirected() {
    addInnerHTML('forgotMyPasswordText', `We have successfully sent the email.<br>You will now be redirected back to login.<br>
        If not please click <a class="clickHereLink" href="../login.html">here</a>!`);
    document.getElementById('forgotPwForm').style.display = "none";
    setTimeout(() => goToLogin(), 3000);
}

/**
 * Initializes the application.
 * @async
 * @returns {Promise<void>}
 */
async function init() {
    await includeHTML();
    await downloadFromServer();
    load();
    users = JSON.parse(backend.getItem('users')) || [];
    categories = JSON.parse(backend.getItem('categories')) || [];
    tasks = JSON.parse(backend.getItem('tasks')) || [];
}

/** Performs the login operation. */
function login() {
    let userEmail = document.getElementById('userMailLogIn').value;
    let userPassword = document.getElementById('userPasswordLogIn').value;
    checkUserData(userEmail, userPassword);
}

/**
 * Checks the user data for a given email and password.
 * @param {string} userEmail - The user email to check.
 * @param {string} userPassword - The user password to check.
 */
function checkUserData(userEmail, userPassword) {
    for (let i = 0; i < users.length; i++) checkUserDataForUser(i, userEmail, userPassword);
    removeDisplayNone('dataCheck');
}

/**
 * Checks the user data for a specific user.
 * @param {number} i - The index of the user in the users array.
 * @param {string} userEmail - The user email to check.
 * @param {string} userPassword - The user password to check.
 */
function checkUserDataForUser(i, userEmail, userPassword) {
    const user = users[i];
    if (isUserAndMailCorrect(user, userEmail, userPassword)) setLoggedIn(userEmail);
}

/**
 * Checks if the user email and password combination is correct.
 * @param {object} user - The user object to check.
 * @param {string} userEmail - The user email to compare.
 * @param {string} userPassword - The user password to compare.
 * @returns {boolean} - True if the user email and password combination is correct, false otherwise.
 */
function isUserAndMailCorrect(user, userEmail, userPassword) {
    return user.email == userEmail && user.pwd == userPassword;
}

/**
 * Sets the logged-in status for the user.
 * @param {string} userEmail - The user email to set as logged in.
 */
function setLoggedIn(userEmail) {
    indexOfEmail = users.find(u => u.email == userEmail);
    loggedIn = true;
    save();
    window.location.href = './html/summary.html';
}

/**
 * Performs a guest login by checking the user data.
 */
function guestLogin() {
    document.getElementById('userMailLogIn').value = 'guest@guest.de';
    document.getElementById('userPasswordLogIn').value = 'guest';
    login();
}

/**
 * Adds a new user with the provided details.
 */
function addUser() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('userMail').value;
    let password = document.getElementById('userPassword').value;
    let userColor = randomcolor();
    users.push({ 'name': name, 'email': email, 'pwd': password, 'color': userColor });
    pushToDatabase();
    save();
    showFrame('signUpConfirmFrame', 'signUpFrame');
}