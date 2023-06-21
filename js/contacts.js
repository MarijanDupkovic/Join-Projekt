/** initialises the contacts page */
async function initContacts() {
    await includeHTML();
    generateNavigationLinks('Contacts', 'Summary', 'Board', 'AddTask', 'Contacts');
    generateContactsHTML();
}

/** Sets site active on Contacts page: categories, visibility, contact details HTML, add task HTML, close button, onSubmit form, event listeners. */
function setSiteActive() {
    addContactCategories();
    setVisibleIfnotEmpty();
    generateContactDetailsHTML();
}

/** Generates HTML content for Contacts page: loads resources, checks login status, sets site active if logged in, redirects to login page if not logged in. */
function generateContactsHTML() {
    load();
    if (loggedIn) setSiteActive();
    else window.location.href = '../login.html';
}

/**
 * Sets the contact category and displays the contacts belonging to that category.
 * @param {number} i - The index of the contact category.
 */
function setContactCategory(i) {
    let ascicode = (65 + i).toString();
    let value = String.fromCharCode(ascicode);
    document.getElementById('contacts').innerHTML += addContactCategoriesHTML(value);
    getContactsWith(value);
}

/** Adds Contact Categories from A to Z */
function addContactCategories() {
    setInnerHTML('contacts', '');
    for (let i = 0; i < 26; i++) setContactCategory(i);
}

/**
 * Handles the form submission event and performs an action using the form data.
 * @param {Event} event - The form submission event.
 */
async function onSubmitting(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let response = await action(formData);
    if (response.ok) createNewContact();
    return false;
}

/**
 * Deletes a contact from the users array based on the contact's name.
 * @param {string} contactName - The name of the contact to be deleted.
 */
function deleteContact(contactName) {
    let deleteUser = users.find(u => u.name == contactName);
    let index = users.indexOf(deleteUser);
    users.splice(index, 1);
    pushToDatabase();
}

/**
 * Adds an event listener to the delete button with the specified ID.
 * @param {string} id - The ID of the delete button.
 */
function addEventListenerToDeleButton(id) {
    let deleteButton = document.getElementById(id);
    let contactToDelete;
    if (id == 'deleteButtonContent') contactToDelete = getContactToDeleteButtonContent();
    else if (id == 'deleteButton') contactToDelete = getContactToDeleteButton();
    deleteButton.addEventListener('click', (e) => setEventToDeleteButton(e,contactToDelete, deleteButton));
}


/**
 * Sets the event handler for the delete button of a contact.
 * @param {string} contactToDelete - The name of the contact to delete.
 */
function setEventToDeleteButton(e,contactToDelete, button) {
    e.stopPropagation();
    let clientWidth = document.body.clientWidth;
    if(clientWidth<=1300) addDisplayNone('kpmt');
    deleteContact(contactToDelete);
    button.onclick = '';
    addDisplayNone('editUserAtContacts');
    addDisplayNone('overlay');
    addContactCategories();
    setVisibleIfnotEmpty();
    generateContactDetailsHTML();
    addDisplayNone('contactDetails');
    save();
    return false;
}

/**
 * Gets the name of the contact to delete from the edit contact form.
 * @returns {string} The name of the contact to delete.
 */
function getContactToDeleteButton() {
    return document.getElementById('editContactName').value;
}

/**
 * Gets the content of the contact (email) to delete from the contact details.
 * @returns {string} The content (email) of the contact to delete.
 */
function getContactToDeleteButtonContent() {
    return document.getElementById('contactDetailsEmail').innerHTML;
}

/**
 * Retrieves the contact names starting with the specified letter.
 * @param {string} startLetter - The letter to filter the contact names.
 */
function getContactsWith(startLetter) {
    names = [];
    for (let i = 0; i < users.length; i++) if (isStartingWith(i, startLetter)) setAlphaContainer(i);
}

/**
 * Checks if the contact name at the specified index starts with the specified letter.
 * @param {number} i - The index of the contact.
 * @param {string} startLetter - The letter to compare with the contact name.
 * @returns {boolean} True if the contact name starts with the specified letter, false otherwise.
 */
function isStartingWith(i, startLetter) {
    return users[i]['name'].charAt(0) == startLetter;
}

/**
 * Adds the contact at the specified index to the names array and generates an alpha container for the first letter of the contact's name.
 * @param {number} i - The index of the contact.
 */
function setAlphaContainer(i) {
    names.push(users[i]);
    generateAlphaContainerFor(`${users[i]['name'].charAt(0)}`);
}

/**
 * Retrieves the specified property value of the contact at the given index from the names array.
 * @param {number} i - The index of the contact.
 * @param {string} value - The property name to retrieve the value for.
 * @returns {*} The value of the specified property for the contact.
 */
function getContactWith(i, value) {
    return names[i][value];
}

/**
 * Generates an alpha container for the specified letter, containing the contacts with names starting with that letter.
 * @param {string} letter - The letter for which to generate the alpha container.
 */
function generateAlphaContainerFor(letter) {
    for (let i = 0; i < names.length; i++) setAlphaContainerForLetter(i, letter);
}

/**
 * Sets the alpha container for the specified letter, populating it with contact information.
 * @param {number} i - The index of the contact in the `names` array.
 * @param {string} letter - The letter of the alpha container.
 */
function setAlphaContainerForLetter(i, letter) {
    let contactName = getContactWith(i, 'name');
    let userMail = getContactWith(i, 'email');
    let userPhone = getContactWith(i, 'phone');
    let userColor = getContactWith(i, 'color')
    addInnerHTML('contact' + letter.toUpperCase(), setContactsContainerHTML(contactName, userMail, userPhone, userColor));
    names.splice(0);
}

/** Sets the visibility of alpha containers based on whether they have any contacts. */
function setVisibleIfnotEmpty() {
    for (let i = 0; i < 26; i++) setVissible(i);
}

/**
 * Sets the visibility of the alpha container based on whether it has any contacts.
 * @param {number} i - The index of the alpha container.
 */
function setVissible(i) {
    let ascicode = (65 + i).toString();
    let value = String.fromCharCode(ascicode);
    let child = document.getElementById('contact' + value).children;
    if (child[2]) removeDisplayNone('contact' + value);
}

/** Removes the class "d-none" to show AddNewTaskAtContacts page */
function showAddNewTaskAtContacts() {
    let clientWidth = document.body.clientWidth;
    if(clientWidth<=1300) addDisplayNone('overlay');
    else removeDisplayNone('overlay');
    generateAddTaskHTML('addTaskAtContacts', '');
    addInnerHTML('addTaskAtContacts', `<div onclick="hideAddNewTaskAtContatcs()" 
        class="closeIconAtContacts editUserCloseBtn" id="closeIconAtContacts"></div>`);
    setOnSubmitForm('toDo');
    removeDisplayNone('addTaskAtContacts');
    toggle('closeIconAtContacts', `background-image:url('../img/closeIconEditUserAtContacts.png') !important;`, 1300);
    addEventListenerToDropDown();
}

function hideAddNewTaskAtContatcs(){
    addDisplayNone('addTaskAtContacts');
    addDisplayNone('overlay');
    setInnerHTML('addTaskAtContacts','');
}

/** Shows the edit contact form by retrieving existing contact details and setting up event listeners. */
function showEditContact() {
    addInnerHTML('contactDetailsContainer',generatesEditUserHTML());
    let oldName = document.getElementById('contactName').innerHTML;
    let oldEmail = document.getElementById('contactDetailsEmail').innerHTML;
    let oldPhone = document.getElementById('contactDetailsPhone').innerHTML;
    setEditContact(oldName, oldEmail, oldPhone);
    removeDisplayNone('overlay');
    addEventListenerToDeleButton('deleteButton');
}

/**
 * Sets the values of input fields for editing a contact and removes the 'display-none' class from the edit user section.
 * @param {string} oldName - The old name of the contact.
 * @param {string} oldEmail - The old email of the contact.
 * @param {string} oldPhone - The old phone number of the contact.
 */
function setEditContact(oldName, oldEmail, oldPhone) {
    document.getElementById('editContactName').value = oldName;
    document.getElementById('editContactEmail').value = oldEmail;
    document.getElementById('editContactPhone').value = oldPhone;
    removeDisplayNone('editUserAtContacts');
}

/** Creates a new contact by retrieving user input, adding it to the users array, and updating the database. */
function createNewContact() {
    let userName = getValueOf('createNewContactName');
    let userEmail = getValueOf('createNewContactEmail');
    let userPhone = getValueOf('createNewContactPhone');
    let userColor = randomcolor();
    users.push({ 'name': userName, 'email': userEmail, 'phone': userPhone, 'color': userColor });
    pushToDatabase();
    confirmMessage();
    addDisplayNone('overlay');
}

/** Displays a confirmation message, hides the 'create new user' section, and removes the confirmation message after a delay. */
function confirmMessage() {
    addConfirmMessage('Contact');
    addDisplayNone('createNewUserAtContacts');
    setTimeout(() => removeConfirmMessageContacts(), 1000);
}

/** Performs various actions after removing the confirmation message. */
function removeConfirmMessageContacts() {
    removeID('confirmMessage');
    addContactCategories();
    setVisibleIfnotEmpty();
    save();
}

/** Edits a contact by retrieving input values, getting the old email, setting old data, and closing the edit contact section. */
function editContact() {
    let oldEmail = getInnerHTMLOf('contactDetailsEmail');
    let userName = getValueOf('editContactName');
    let userEmail = getValueOf('editContactEmail');
    let userPhone = getValueOf('editContactPhone');
    let user = users.find(u => u.name == userName);
    setOldData(oldEmail, userName, userEmail, userPhone);
    closeEditContact();
    setContactDetails(userName, userEmail, userPhone, user.color);
}

/** Closes the edit contact section and performs various actions. */
function closeEditContact(e) {
    e.stopPropagation();
    e.preventDefault();
    removeID('editUserAtContacts');
    save();
    pushToDatabase();
    addDisplayNone('overlay');
    addContactCategories();
    setVisibleIfnotEmpty();
}

/**
 * Sets the old data for a contact with the provided values.
 * @param {string} oldEmail - The old email of the contact.
 * @param {string} userName - The updated name of the contact.
 * @param {string} userEmail - The updated email of the contact.
 * @param {string} userPhone - The updated phone number of the contact.
 */
function setOldData(oldEmail, userName, userEmail, userPhone) {
    let oldUser = users.findIndex(user => user.email == oldEmail);
    users[oldUser]['name'] = userName;
    users[oldUser]['email'] = userEmail;
    users[oldUser]['phone'] = userPhone;
}

/** Hides the contact details section and performs various actions. */
function hideContactDetails() {
    let clientWidth = document.body.clientWidth;
    addDisplayNone('contactDetails');
    if (clientWidth <= 1300) addDisplayNone('kpmt');
    toggle('kpmt', '', 1300);
    toggle('addNewContactButton', 'display:flex !important;', 1300);
}

/**
 * Sets the contact details with the provided information and performs various actions.
 * @param {string} userName - The name of the contact.
 * @param {string} userMail - The email of the contact.
 * @param {string} userPhone - The phone number of the contact.
 * @param {string} userColor - The color associated with the contact.
 */
function setContactDetails(userName, userMail, userPhone, userColor) {
    if (isClientWidthSmaller350()) hideCOntactDetailsContainer();
    if (isContainingClassDnone('contactDetails')) removeDisplayNone('contactDetails');
    setContactDetail(userName, userColor, userMail, userPhone);
    resetSetContactDetails();
}

/** Resets the set contact details state and performs various actions. */
function resetSetContactDetails() {
    let clientWidth = document.body.clientWidth;
    removeDisplayNone('contactHeadContainer');
    removeDisplayNone('contactInformationContainer');
    if (clientWidth <= 1300) addDisplayNone('kpmt');
    toggle('kpmt', 'top:120px !important;padding-left:25px !important;', 1300);
    toggle('addNewContactButton', 'display:none !important;', 1300);
    addEventListenerToDeleButton('deleteButtonContent');
}

/**
 * Sets the contact details with the provided information.
 * @param {string} userName - The name of the contact.
 * @param {string} userColor - The color associated with the contact.
 * @param {string} userMail - The email of the contact.
 * @param {string} userPhone - The phone number of the contact.
 */
function setContactDetail(userName, userColor, userMail, userPhone) {
    setInnerHTML('contactName', userName);
    document.getElementById('contactDetailsLogo').style = `background:${userColor}`;
    setInnerHTML('contactDetailsLogo', getFirstLettersOfName(userName));
    setInnerHTML('contactDetailsEmail', userMail);
    setInnerHTML('contactDetailsPhone', userPhone);
    document.getElementById('contactDetailsPhone').href = `tel:${userPhone}`;
}

/** Hides the contact details container by adding the 'd-none' class to specific child elements. */
function hideCOntactDetailsContainer() {
    document.getElementById('contactDetailsContainer').children[5].classList.add('d-none');
    document.getElementById('navigation-top').children[1].classList.remove('d-none');
}

/**
 * Checks if the client width is smaller than or equal to 350 pixels.
 * @returns {boolean} True if the client width is smaller than or equal to 350 pixels, false otherwise.
 */
function isClientWidthSmaller350() {
    return document.body.clientWidth <= 350;
}

/**
 * Sets the background color and text color of the selected element.
 * @param {string} id - The ID of the element to be selected.
 */
function setColorWhenSelectet(id) {
    addContactCategories();
    setVisibleIfnotEmpty();
    document.getElementById(id).style = `background:#2A3647;`;
    document.getElementById(id).children[1].children[0].style = 'color:#FFFFFF';
}

/**
 * Generates a random color in hexadecimal format.
 * @returns {string} The randomly generated color in hexadecimal format (e.g., #FFAABB).
 */
function randomcolor() {
    let random = Math.floor(0x100000000 * Math.random());
    return '#' + ('00000' + random.toString(16)).slice(-6).toUpperCase();
}

/** Function for generating all ContactDetails */
function generateContactDetailsHTML() {
    setInnerHTML('contactDetails','');
    addInnerHTML('contactDetails', genContactDetailsTitleHTML());
    addInnerHTML('contactDetails', generateContactHeadHTML());
    addInnerHTML('contactDetails', generateContactBodyHTML());
    addInnerHTML('contactDetails', `<img src="../img/arrowBackBlack.png" onclick="hideContactDetails()" class="backArrow">`);
}