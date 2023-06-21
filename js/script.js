setURL('https://marijan-dupkovic.developerakademie.net/smallest_backend_ever');
/** Includes other HTML Files */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) element.innerHTML = await resp.text();
        else element.innerHTML = 'Page not found';
    }
}

/**
 * Retrieves the first letters of each word in a username and returns them as an acronym.
 * @param {string} username - The username from which to extract the first letters.
 * @returns {string} The acronym formed from the first letters of the username.
 */
function getFirstLettersOfName(username) {
    let str = username;
    let matches = str.match(/\b(\w)/g);
    let acronym = matches.join('');
    return acronym;
}

/**
 * Resets the category options of the specified element.
 * @param {HTMLElement} sID - The target element to reset.
 */
function resetCategoryOptions(id) {
    document.getElementById(id).classList.remove('d-none', 'cl_categories');
    document.getElementById(id).classList.add('dropDownStart');
}

/**
 * Performs an action by sending a POST request to a specified URL with the provided form data.
 * @param {FormData} formData - The form data to be sent in the request body.
 * @returns {Promise<Response>} A promise that resolves to the response from the server.
 */
function action(formData) {
    const input = 'https://gruppe-527.developerakademie.net/Join-Projekt/send_mail.php';
    const requestInit = { method: 'post', body: formData };
    return fetch(input, requestInit);
}

/**
 * Generates navigation links by updating the inner HTML of the navigation container with the provided links.
 * @param {string} coloredLink - The CSS class to apply to the colored link.
 * @param {...string} links - The links to be added to the navigation container.
 */
function generateNavigationLinks(coloredLink, ...links) {
    setInnerHTML('navigation-left-links', '');
    for (let i = 0; i < links.length; i++) addNavigationLink(coloredLink, i, links);
}

/**
 * Adds a navigation link to the navigation container based on the provided parameters.
 * @param {string} coloredLink - The CSS class representing the colored link.
 * @param {number} i - The index of the link in the links array.
 * @param {string[]} links - The array of links.
 */
function addNavigationLink(coloredLink, i, links) {
    let linkname = links[i];
    if (coloredLink == linkname) addInnerHTML('navigation-left-links', generateSelectedNavigationLinkHTML(linkname));
    else addInnerHTML('navigation-left-links', generateUnSelectedNavigationLinkHTML(linkname));
}

/**
 * Converts the first letter of a string to lowercase.
 * @param {string} string - The input string.
 * @returns {string} The input string with the first letter converted to lowercase.
 */
function firstLetterToLowerCase(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

/** Performs the logout action. */
function logout() {
    localStorage.removeItem(indexOfEmail);
    localStorage.removeItem(loggedIn);
    window.location.href = '../login.html';
}

/**
 * Cancels the action of adding a new item based on the provided ID.
 * @param {string} id - The ID of the element.
 */
function cancelAddNew(id) {
    if (id == 'addNewCat') cancelAddNewCat(id);
    if (id == 'addNewSubTask') setInnerHTML('id_' + 'addNewSubTask', setBackToSubTaskField('label', 'Subtasks',
        'dropDownMenuField', 'addNewSubTask', './img/addIcon.png'));
    if (id == 'assignedTo') cancelAssignedTo();
}

/** Cancels the assignedTo action by setting all checkboxes to false. */
function cancelAssignedTo() {
    let children = document.getElementById('assignedTo').children;
    for (let i = 0; i < children.length; i++) setCheckBoxFalse(i);
}

/**
 * Sets the checkbox at the specified index to false.
 * @param {number} i - The index of the checkbox to set to false.
 */
function setCheckBoxFalse(i) {
    if (i > 1) document.getElementById('assignedTo').children[i].children[0].checked = false;
}

/** Cancels the process of adding a new category. */
function cancelAddNewCat(id) {
    setInnerHTML('id_categoryBox', setBackToOptionsField('label', 'Category', 'dropDownMenuField', 'categoryBox', './img/dropdownIcon.png', 'task category'));
    addInnerHTML('categoryBox', `<div class="cl_categories d-none" onclick="changeToInputField('${id}')" id="addNewCat" >New Category</div>`);
    generateOptionsHTML(categories, 'categories');
    addEventListenerToSelectBoxFor('categoryBox', 'categories', '');
    addEvenListenersToSelectfor(categories, 'categories', '');
    save();
    dropDownCat = false;
}

/**
 * Shows the dropdown items based on the specified type of used items.
 * @param {string} usedItems - The type of used items ('categories' or 'users').
 */
function showDropDownItems(usedItems, edit) {
    if (usedItems == 'categories') showCategoryItems();
    if (usedItems + edit == 'users' + edit) showUsersItems(edit);
}

/** Shows the category items in the dropdown. */
function showCategoryItems() {
    if (document.getElementById('CategorycategoryBox')) showCategories();
}

/** Shows the categories in the dropdown. */
function showCategories() {
    checkDropDown();
    setCategoriesVisisble();
    if (selectedCategory) removeDisplayNone(selectedCategory);
}

/** Sets the visibility of the categories. */
function setCategoriesVisisble() {
    for (let i = 0; i < categories.length; i++) {
        if (isContainingClassDnone(categories[i]['name'])) removeDisplayNone(categories[i]['name']);
        else addDisplayNone(categories[i]['name']);
    }
}

/** Checks the state of the drop-down menu and sets it to visible. */
function checkDropDown() {
    if (!selectedCategory) setContainerCategeroyVisible();
    else setContainerVisibleAlerternate();
}

/** Toggles the visibility of the container based on the state of the dropDownCat variable. */
function setContainerVisibleAlerternate() {
    if (!dropDownCat) showDropDonwsMenu();
    else hideDropDownWithAddNewCat();
}

/** Toggles the visibility of the container category based on the state of the dropDownCat variable. */
function setContainerCategeroyVisible() {
    if (!dropDownCat) showDropDonwsMenu();
    else hideDropDownWithOutAddNewCat();
}

/** Hides the drop-down menu without showing the "Add New Category" option. */
function hideDropDownWithOutAddNewCat() {
    addDisplayNone('addNewCat');
    dropDownCat = false;
}

/** Hides the drop-down menu along with the "Add New Category" option. */
function hideDropDownWithAddNewCat() {
    addDisplayNone('addNewCat');
    addDisplayNone('CategorycategoryBox');
    dropDownCat = false;
}

/** Shows the drop-down menu with the "Add New Category" option. */
function showDropDonwsMenu() {
    removeDisplayNone('CategorycategoryBox');
    removeDisplayNone('addNewCat');
    dropDownCat = true;
}

/**
 * Sets the behavior for submitting the form.
 * @param {string} addForm - The form to set the behavior for.
 */
function setOnSubmitForm(addForm) {
    let submitElement = document.getElementById('submitting');
    submitElement.onsubmit = function () {
        setForm(addForm);
        return false;
    };
}

/**
 * Sets the form behavior when submitted.
 * @param {string} addForm - The form to set the behavior for.
 */
function setForm(addForm) {
    if (selectedCategory && activeID) createTheTask(addForm);
    else if (!selectedCategory) document.getElementById('id_categoryBox').children[0].innerHTML += '<span style="color:red;">Please choose a Category</span>';
    else if (!activeID) document.getElementById('idPrio').children[0].innerHTML += '<span style="color:red;">Please choose a Category</span>';
    return false;
}

function createTheTask(addForm) {
    createNewTask(addForm);
    addConfirmMessage('Task');
    if (isElementExistent('addTask')) removeMessage();
    else if (isElementExistent('addTaskAtContacts')) closeAtContacts();
    else if (isElementExistent('addTaskAtBoard').children.length != 0) closeTaskAtBoard();
}

/** Shows the Help and responsible information by setting the logout button and adding the legal notice. */
function showHelpRespo() {
    setLogoutButton();
    addHelp();
}

/** Shows the impressum and responsible information by setting the logout button and adding the legal notice. */
function showImpressumRespo() {
    setLogoutButton();
    addLegalNotice();
}

/** Closes an element at contacts by hiding related elements and removing the confirm message. */
function closeAtContacts() {
    hideAddNewTaskAtContatcs();
    removeMessage();
}

/** Closes a task at the board by updating the HTML and hiding related elements. */
function closeTaskAtBoard() {
    setInnerHTML('addTaskAtBoard', '');
    addDisplayNone('addTaskAtBoard');
    addDisplayNone('overlay');
    if (isElementExistent('confirmMessage')) removeMessage();
    updateBoardHTML();
}

/** Removes the confirm message element after a delay and redirects to the board page. */
function removeMessage() {
    setTimeout(() => {
        removeID('confirmMessage');
        window.location.href = './board.html';
    }, 1000);
}

/**  Shows the useritems in Dropdown menu */
function showUsersItems(edit) {
    if (!dropDownAssign) setUserItems(edit);
    else hideUserItems(edit);
    setStyleOfSelectedUsers(edit);
}
/** Adds an event listener to the document that handles clicks outside of the logout button. */
function addEventListenerDocumentLogoutButton(e) {
    e.preventDefault();
    e.stopPropagation();
    document.addEventListener("click", (event) => {
        let optionDiv = document.getElementById('optionsMenu');
        if (optionDiv && !optionDiv.contains(event.target)) removeID('optionsMenu');
    });
}

/** Toggles the presence of a logout button based on the existence of an element. */
function setLogoutButton(event) {
    if (isElementExistent('optionsMenu')) removeID('optionsMenu');
    else addLogoutButton(event);
}

/** Sets the style of the selected users in the dropdown. */
function setStyleOfSelectedUsers(edit) {
    for (let i = 0; i < users.length; i++) {
        if (isContainingClassDnone(users[i]['name'] + edit)) setUserItemsandShow(i, edit)
        else addDisplayNone(users[i]['name'] + edit);
    }
}

/** Hides the user items in the dropdown. */
function hideUserItems(edit) {
    if (isContainingClassDnone('Assigned toassignedTo' + edit)) toggleUsersDropDown('invite', 'Assigned toassignedTo');
    else toggleUsersDropDown('Assigned toassignedTo' + edit, 'invite');
    dropDownAssign = false;
}

/**
 * Sets the user items and shows the dropdown.
 * @param {number} i - The index of the user.
 */
function setUserItemsandShow(i, edit) {
    removeDisplayNone(users[i]['name'] + edit);
    document.getElementById('assignedTo' + edit).style = `height:unset !important;`;
}

/** Toggles the users dropdown. */
function toggleUsersDropDown(showID, hideID) {
    removeDisplayNone(showID);
    addDisplayNone(hideID);
}

/** Sets the user items and shows the user dropdown. */
function setUserItems(edit) {
    removeDisplayNone('Assigned toassignedTo' + edit);
    document.getElementById('assignedTo' + edit).style = `height:unset;`;
    removeDisplayNone('invite');
    dropDownAssign = true;
}

/** Generates a checkbox item, adds it to the list of subtasks, and clears the input field. */
function generateCheckboxItem() {
    let isChecked;
    if (document.getElementById('newSubtasks').value) {
        if(document.getElementById('warningMessage')) removeID('warningMessage');
        addInnerHTML('list-subtask', setCheckBox());
        if (isItemChecked()) isChecked = true;
        else isChecked = false;
        subtasks.push({ 'item': getValueOf('newSubtasks'), 'checked': isChecked });
        document.getElementById('newSubtasks').value = '';
    }else {
        if(document.getElementById('warningMessage')) removeID('warningMessage');
        document.getElementById('id_addNewSubTask').children[0].innerHTML += `<span style="color:red;" id="warningMessage">Please choose a Category</span>`;
    }
}

/**
 * Checks if the checkbox item is checked.
 * @returns {boolean} True if the checkbox item is checked, false otherwise.
 */
function isItemChecked() {
    return document.getElementById('list-subtask-' + getValueOf('newSubtasks')).checked == true;
}

/**
 * Generates HTML options for an array of items.
 * @param {Array} array - The array of items.
 * @param {string} nameOfArray - The name of the array.
 */
function generateOptionsHTML(array, nameOfArray, edit) {
    for (let i = 0; i < array.length; i++) {
        if (nameOfArray == 'users') addInnerHTML('assignedTo' + edit, generateTheOptionHTML(nameOfArray, getUser(i), edit));
        if (nameOfArray == 'categories') addInnerHTML('categoryBox', generateCategoryOptionHTML(nameOfArray, i));
    }
}

/**
 * Redirects to the specified link after saving the data.
 * @param {string} id - The URL or path of the link to be navigated to.
 */
async function showLink(id) {
    await save();
    location.href = id;
}

/**
 * Shows the specified frames and hides the rest.
 * @param {...string} ids - IDs of the frames to be shown.
 */
function showFrame(...ids) {
    let element1 = ids[0];
    let element2 = ids[1];
    for (let i = 0; i < ids.length; i++) addDisplayNone(ids[i]);
    removeDisplayNone(element1);
    if (element2.length > 0) removeDisplayNone(element2);
}

/** Generates the navigation links for the contacts page. */
function generateNavigationLinksContacts() {
    generateNavigationLinks(color, linkname);
    generateNavigationLinks(color, linkname);
    generateNavigationLinks(color, linkname);
    generateNavigationLinks(color, linkname);
}

/** Adds a logout button to the page. */
function addLogoutButton(e) {
    let clientWidth = document.body.clientWidth;
    document.body.innerHTML += logoutButtonHTML();
    if (clientWidth < 1300) addInnerHTML('optionsMenu', `<div onclick="showImpressumRespo()">Legal Notice</div><div onclick="showHelpRespo()">Help</div>`);
    addEventListenerDocumentLogoutButton(e);
}