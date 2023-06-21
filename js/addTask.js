/**
 * Creates a new task and adds it to the tasks array.
 * @param {string} statusTag - The status tag of the task.
 */
function createNewTask(statusTag) {
    for (let i = 0; i < subtasks.length; i++) { if (isSubtaskChecked(i)) subtasks[i]['checked'] = true; }
    tasks.push({
        'title': getValue('inputTitle'), 'description': getValue('inputDescription'),
        'category': selectedCategory, 'isAssigned': getAssignedContacts(''), 'dueDate': getValue('inputDate'),
        'prio': getTasksPrio(), 'subtasks': subtasks, 'id': tasks.length + 1, 'status': statusTag
    });
    pushToDatabase();
    clearAllInputs();
}

function generateAddTaskHTML(id, board) {
    load();
    if (loggedIn) {
        addInnerHTML(id, `<h2>Add Task</h2>`);
        addInnerHTML(id, genAddTaskHTML(board));
        addInnerHTML('assignedTo', generateInviteNewContactHTML());
        generateOptionsHTML(users, 'users', '');
        addInnerHTML('categoryBox', `<div class="cl_categories d-none" onclick="changeToInputField('addNewCat${board}')" id="addNewCat" >New Category</div>`);
        generateOptionsHTML(categories, 'categories', '');
        document.getElementById('inputDate').setAttribute('min', today);
        addEventListenerToDropDown();
        document.addEventListener('click', (event) => closeDropdownIfOpen(event));
    } else window.location.href = '../login.html';
}

/** Initializes Add Task functionality: includes HTML, generates navigation links, Add Task HTML, and sets onSubmit form.*/
async function initAddTask() {
    await includeHTML();
    generateNavigationLinks('AddTask', 'Summary', 'Board', 'AddTask', 'Contacts');
    generateAddTaskHTML('addTask', '');
    setOnSubmitForm('toDo');
}

function setEnter() {
    if (isElementExistent('newSubtasks')) setEventListenerToInputSubtask();
}

function setEventListenerToInputSubtask() {
    document.getElementById("newSubtasks").onkeypress = (e) => {
        if (e.keyCode == 13) {
            e.preventDefault();
            generateCheckboxItem();
        }
    }
}

/**
 * Retrieves the priority value of the active task.
 * @returns {string} The priority value of the active task.
 */
function getTasksPrio() {
    let taskPrio = document.getElementById(activeID).innerHTML.split(' ');
    return taskPrio[0];
}

/**
 * Checks if a subtask is checked based on its index in the subtasks array.
 * @param {number} i - The index of the subtask in the subtasks array.
 * @returns {boolean} - A boolean value indicating whether the subtask is checked or not.
 */
function isSubtaskChecked(i) {
    return document.getElementById('list-subtask-' + subtasks[i]['item']).checked == true;
}

/**
 * Retrieves the value of the chosen color from the active color options.
 * @returns {string} The value of the chosen color.
 */
function getValueOfChosenColor() {
    for (let i = 0; i < colors.length; i++) { if (isActiveColor(i)) return colors[i]; }
}

/**
 * Checks if a color at the specified index in the colors array is active.
 * @param {number} i - The index of the color in the colors array.
 * @returns {boolean} - A boolean value indicating whether the color is active or not.
 */
function isActiveColor(i) {
    return document.getElementById(colors[i].slice(1)).classList.contains('colorCircleisActive');
}

/** Sets specified color as active, removes class from other color elements. */
function setActiveColor(id) {
    document.getElementById('8AA4FF').classList.remove('colorCircleisActive');
    document.getElementById('FF0000').classList.remove('colorCircleisActive');
    document.getElementById('2AD300').classList.remove('colorCircleisActive');
    document.getElementById('FF8A00').classList.remove('colorCircleisActive');
    document.getElementById('E200BE').classList.remove('colorCircleisActive');
    document.getElementById('0038FF').classList.remove('colorCircleisActive');
    document.getElementById(id).classList.add('colorCircleisActive');
}

/** Clears all input fields and resets relevant UI elements. */
function clearAllInputs(board) {
    if (!board) board = '';
    clearFields(board, 'inputTitle', 'inputDescription', 'inputDate', 'newSubtasks');
    clearLists('list-assigned-user', assignedTo);
    usersAssignedTo = [];
    cancelAddNew('addNewCat');
    cancelAddNew('assignedTo');
    cancelAddNew('addNewSubTask');
    clearLists('list-subtask', subtasks);
}

/** Clears list by given id and array */
function clearLists(id, arrayitem) {
    setInnerHTML(id, '');
    arrayitem = [];
}

/**
 * Resets value of given elements and set back the Style of LabelsFields
 * @param  {...any} ids elemnts to reset
 */
function clearFields(board, ...ids) {
    for (let i = 0; i < ids.length; i++) changeStyleIfExistent(ids, i, board);
}

/** Changes style of Label an reset Style if Element exists */
function changeStyleIfExistent(ids, i, board) {
    if (isElementExistent(ids[i] + board)) document.getElementById(ids[i] + board).value = '';
    changeStyleOfLabel(ids[i] + board, board);
}
/**
 * Changes the style of the label based on the specified element ID.
 * @param {string} id - The ID of the label element to change the style.
 */
function changeStyleOfLabel(id, board) {
    resetAllLabelContainer(board);
    if (activeID.length == 0) setStyles(id, board);
    else refreshStyleOfSelectedLabel(id, board);
}

/** Resets all label containers to their default values. */
function resetAllLabelContainer(board) {
    document.getElementById('id_urgent' + board).style = 'background-color: #FFFFFF; color: #000000;';
    document.getElementById('id_medium' + board).style = 'background-color: #FFFFFF; color: #000000;';
    document.getElementById('id_low' + board).style = 'background-color: #FFFFFF; color: #000000;';
    document.getElementById('urgentImgID' + board).src = '../img/urgentIcon.png';
    document.getElementById('mediumImgID' + board).src = '../img/mediumIcon.png';
    document.getElementById('lowImgID' + board).src = '../img/lowIcon.png';
}

/**
 * Sets the style properties and image source for the specified element ID and name.
 * @param {string} id - The ID of the element to set the style properties.
 * @param {string} color - The style property value to set for the element.
 * @param {string} name - The name used to construct the image source.
 */
function setStyle(id, color, name, board) {
    document.getElementById(id).style = color;
    document.getElementById(name + 'ImgID' + board).src = `../img/${name}WhiteIcon.png`;
    activeID = id;
    activeImg = name + 'ImgID' + board;
    return;
}

/**
 * Sets the style properties for the specified element ID by calling the corresponding style functions.
 * @param {string} id - The ID of the element to set the style properties.
 */
function setStyles(id, board) {
    setStyleOf(id, urgentColor, 'urgent', board);
    setStyleOf(id, mediumColor, 'medium', board);
    setStyleOf(id, lowColor, 'low', board);
}

/**
 * Refreshes the style of the selected label based on the specified ID.
 * @param {string} id - The ID of the label.
 */
function refreshStyleOfSelectedLabel(id, board) {
    if (activeID == id) {
        resetStyleVariables();
        document.getElementById(id).style = 'background-color: #FFFFFF; color: #000000;';
    } else changeStyleOfLabels(id, board);
}

function resetStyleVariables() {
    activeID = '';
    activeImg = '';
}

/**
 * Changes the style of labels based on the specified ID.
 * @param {string} id - The ID of the label.
 */
function changeStyleOfLabels(id, board) {
    resetStyleVariables();
    changeStyleOfLabel(id, board);
}

/**
 * Changes the specified input field to the corresponding input field type.
 * @param {string} id - The ID of the input field.
 */
function changeToInputField(id) {
    if (id == 'addNewCat') changeToAddNewCat();
    if (id == 'addNewSubTask') changeToAddNewSubtask();
}

/** Changes the category dropdown box to the "Add New Category" input field. */
function changeToAddNewCat() {
    setInnerHTML('id_categoryBox', generatesChangedInputFieldHTML('label', 'input', 'Category',
        'inputTextStd', 'text', 'newCat', 'addNewCat', 'addCategory()', 'newCategoriesField'));
    addInnerHTML('id_categoryBox', genColorChooserHTML());
    dropDown = false;
}

/** Changes 'id_addNewSubTask' element to add new subtask. Modifies HTML content by generating changed input field. */
function changeToAddNewSubtask() {
    setInnerHTML('id_addNewSubTask', generatesChangedInputFieldHTML('label', 'input', 'Subtasks', 'inputTextStd', 'text',
        'newSubtasks', 'addNewSubTask', 'generateCheckboxItem()', 'newSubtasksField'));
    setEnter();
}

/** Adds the event listeners to the dropdown elements, such as categories and select user box. */
function addEventListenerToDropDown() {
    addEventListenerToSelectBoxFor('categoryBox', 'categories', '');
    addEventListenerToSelectBoxFor('assignedTo', 'users', '');
    addEvenListenersToSelectfor(users, 'users', '');
    addEvenListenersToSelectfor(categories, 'categories', '');
}

/** Adds the event listener to the select user box and calls the function to add event listeners to user elements. */
function addEventListenerToSelectBoxFor(id, setfor, edit) {
    if (isElementExistent(id)) document.getElementById(id).addEventListener('click', () => showDropDownItems(setfor, edit));
}

/** Sets the event listener to the select category element. */
function setEventListenerToSelectCategory(e) {
    let txt = e.currentTarget.attributes[1].textContent;
    setOption(txt, 'category');
    e.stopPropagation();
}

/** Add an Eventlistener to select categories in dropdown */
function addEvenListenersToSelectfor(array, nameOfArray, edit) {
    for (let i = 0; i < array.length; i++) addEvenListenerToSelectfor(i, array, nameOfArray, edit);
}

/**
 * Adds the event listener to the select category element.
 * @param {number} i - The index of the category.
 */
function addEvenListenerToSelectfor(i, array, nameFor, edit) {
    let sel = document.getElementById(array[i]['name'] + edit);
    if (nameFor == 'users') sel.addEventListener('click', (e) => setChecked(i, edit, e));
    if (nameFor == 'categories') sel.addEventListener('click', (e) => setEventListenerToSelectCategory(e));
}

/**
 * Sets the checkbox of a user to checked or unchecked based on its current state.
 * @param {number} j - The index of the user in the "users" array.
 */
function setChecked(j, edit, e) {
    e.stopPropagation();
    if (!isUserAssigned(j, edit)) setCheckedToSelectUser(j, edit);
    else if (isUserAssigned(j, edit)) setUnCheckedToSelectUser(j, edit);
}

function closeDropdownIfOpen(e) {
    let target = document.getElementById('assignedTo');
    if (dropDownAssign && !target.contains(e.target)) {
        hideUserItems('');
        setStyleOfSelectedUsers('');
        e.stopPropagation();
        e.preventDefault();
        document.removeEventListener('click', (e) => closeDropdownIfOpen(e));
    }
}

/** 
 * Sets checkbox to unchecked, removes assigned circle, and removes user from "usersAssignedTo" array.
 * @param {number} j - Index in "users" array.
*/
function setUnCheckedToSelectUser(j, edit) {
    removeID('colorCircleMedium' + users[j]['name'] + edit);
    document.getElementById(users[j]['name'] + edit).children[0].checked = false;
    let index = usersAssignedTo.indexOf(users[j]['name']);
    usersAssignedTo.splice(index, 1);
}

/** Sets checkbox, adds user to "usersAssignedTo" array, and sets assigned circle.
 * @param {number} j - Index in "users" array. 
 */
function setCheckedToSelectUser(j, edit) {
    usersAssignedTo.push(users[j]['name']);
    document.getElementById(users[j]['name'] + edit).children[0].checked = true;
    setAssignedCircle(users[j]['name'], edit);
}

/**
 * Checks if a specific user is assigned based on the provided index.
 * @param {number} j - The index of the user to check.
 * @returns {boolean} - Indicates whether the user is assigned or not.
 */
function isUserAssigned(j) {
    return usersAssignedTo.includes(users[j]['name']);
}

/**
 * Sets the assigned circle for a user.
 * @param {string} username - The username for which to set the assigned circle.
 */
function setAssignedCircle(username, edit) {
    if (typeof username === 'string') username = users.find(u => u.name == username);
    if (!checkIfUserCicleIsThere(username, edit)) addInnerHTML('list-assigned-user' + edit, setAssignedCircleHTML(username, edit));
}

function checkIfUserCicleIsThere(username, edit) {
    for (let i = 0; i < document.getElementById('list-assigned-user' + edit).children.length; i++) {
        if (document.getElementById('list-assigned-user' + edit).children[i].id == 'colorCircleMedium' + username.name + edit) return true;
        else return false;
    }
}

/**
 * Retrieves the list of assigned contacts based on the "assigned" array.
 * @returns {Array} - The list of assigned contacts.
 */
function getAssignedContacts(edit) {
    for (let i = 0; i < users.length; i++) { if (checkIfCOntactIsAssigned(i, edit)) addAssignedUser(i, edit); }
    return usersAssignedTo;
}

/**
 * Adds an assigned user to the "assigned" array based on the given index.
 * @param {number} i - The index of the user.
 */
function addAssignedUser(i, edit) {
    assigned.push(document.getElementById(users[i]['name'] + edit).children[0].value);
    usersAssignedTo = assigned;
}

/**
 * Checks if a contact is assigned based on the provided index.
 * @param {number} i - The index of the contact to check.
 * @returns {boolean} - Indicates whether the contact is assigned (checked) or not.
 */
function checkIfCOntactIsAssigned(i, edit) {
    return document.getElementById(users[i]['name'] + edit).children[0].checked;
}

/**
 * Sets the specified option based on the given ID and category type.
 * @param {string} id - The ID of the option to be set.
 * @param {string} id2 - The category type.
 */
function setOption(id, id2) {
    if (id2 == 'category') setOptionNow(id);
}

/**
 * Sets the specified option by modifying the class of the corresponding elements.
 * @param {string} id - The ID of the option to be set.
 */
function setOptionNow(id) {
    addDisplayNone('CategorycategoryBox');
    addDisplayNone('addNewCat');
    dropDownCat = false;
    resetOptions();
    setCategoryOptions(id);
    selectedCategory = id;
}

/**
 * Sets the category options by resetting or changing the class of the specified element.
 * @param {string} id - The ID of the target element.
 */
function setCategoryOptions(id) {
    if (isContainingClassDnone(id)) resetCategoryOptions(id);
    else changeCategoryOptions(id);
}

/**
 * Changes the category options of the specified element.
 * @param {HTMLElement} sID - The target element to change.
 */
function changeCategoryOptions(id) {
    document.getElementById(id).classList.add('d-none', 'cl_categories');
    document.getElementById(id).classList.remove('dropDownStart');
}

/**
 * Resets the category options to their initial state.
 * @param {HTMLElement} sID - The category options container element.
 */
function resetOptions() {
    for (let i = 0; i < categories.length; i++) {
        document.getElementById(categories[i]['name']).classList.add('d-none', 'cl_categories');
        document.getElementById(categories[i]['name']).classList.remove('dropDownStart');
    }
}

/** Adds a new category with the provided details. */
function addCategory() {
    let newCategory = document.getElementById('newCat').value;
    let color = getValueOfChosenColor();
    categories.push({ 'name': newCategory, 'color': color });
    pushToDatabase();
    cancelAddNew('addNewCat');
}