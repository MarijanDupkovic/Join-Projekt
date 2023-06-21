let currentDraggedElement;

/** Initialize the Board Page */
async function initBoard() {
    await includeHTML();
    load();
    generateNavigationLinks('Board', 'Summary', 'Board', 'AddTask', 'Contacts');
    generateAddTaskToBoardImg();
    updateBoardHTML();
    document.getElementById('boardContainer').addEventListener('scroll',()=> scrolling());
}

/** Uptade the Board Page */
function updateBoardHTML() {
    resetBoardComplete();
    addArea('toDo','toDo','inProgress');
    addArea('inProgress','toDo','awaitingFeedback');
    addArea('awaitingFeedback','inProgress','done');
    addArea('done','awaitingFeedback','done');
    taskDetails();
    setStyleProgressbar();
    addUserAcronyms('assignedUserLogo');
}

function resetBoardComplete() {
    for (let i = 0; i < document.getElementById('boardContainer').children.length; i++) {
        if (document.getElementById('boardContainer').children[2]) document.getElementById('boardContainer').children[2].remove();
    }
}
function scrolling() {
        if(document.getElementById('boardContainer').scrollTop ==0) removeDisplayNone('kpmt');
        else addDisplayNone('kpmt');
}

/**
 * Adds task areas to the specified container based on the given status ID.
 * @param {string} id - The ID of the container to which the task areas will be added.
 */
function addArea(id,statusToMoveUp,statusToMoveDown) {
    let area = tasks.filter(t => t['status'] == id);
    setInnerHTML(id, '');
    for (let index = 0; index < area.length; index++) {
        if (!isElementExistent('card' + id + area[index]['id'])){
            addInnerHTML(id, generateTodoHTML(area[index], id,area[index]['id']));
            if(isElementExistent('card'+id+area[index]['id']))addInnerHTML('card'+id+area[index]['id'],generateMoveToMobile(area[index]['id'],statusToMoveUp,statusToMoveDown));
        } 
    }
}

function moveUp(element,statusToMoveUp,event){
    let elem = tasks.find(t => t.id == element ); 
    let eID = tasks.indexOf(elem);
    event.stopPropagation();
    startDragging(eID);
    moveTo(statusToMoveUp);
    pushToDatabase();
}

/** Adds task details for all tasks. */
function taskDetails() {
    for (let i = 0; i < tasks.length; i++) addTaskDetail(i);
}

/**
 * Adds task details for a specific task to the board container.
 * @param {number} i - The index of the task in the tasks array.
 */
function addTaskDetail(i) {
    if (!isElementExistent('openCard' + tasks[i]['status'] + i)) addInnerHTML('boardContainer', generateOpenCardHTML(tasks[i], tasks[i]['status']));
}

/**
 * Checks if the element's category matches the category at the specified index in the categories array.
 * @param {number} i - The index of the category in the categories array.
 * @param {Object} element - The element to compare the category with.
 * @returns {boolean} True if the element's category matches the category at the specified index, false otherwise.
 */
function isElement(i, element) {
    return categories[i]['name'] == element['category'];
}

/** Sets the style of the progress bar for each task. */
function setStyleProgressbar() {
    for (let i = 0; i < tasks.length; i++) {
        let progress = getProgressOfSubtasks(i);
        if (isTaskAndProgressNotZero(i, progress)) setStyleOfProgressbar(generateProgresstStyleHTML(progress, 100 - progress), i);
    }
}

/**
 * Sets the style of the progress bar for a specific task.
 * @param {string} text - The CSS style text to apply to the progress bar.
 * @param {number} i - The index of the task in the tasks array.
 */
function setStyleOfProgressbar(text, i) {
    document.getElementById('progressbar' + tasks[i]['status'] + i).style = text;
}

/**
 * Checks if the task element and progress are not zero.
 * @param {number} i - The index of the task in the tasks array.
 * @param {number} progress - The progress of the task.
 * @returns {boolean} - Returns true if the task element exists and the progress is not zero, otherwise false.
 */
function isTaskAndProgressNotZero(i, progress) {
    return document.getElementById('progressbar' + tasks[i]['status'] + i) && progress != 0;
}

/**
 * Calculates the progress of subtasks for a given task.
 * @param {number} index - The index of the task in the tasks array.
 * @returns {number} - The progress of the task based on the completed subtasks.
 */
function getProgressOfSubtasks(index) {
    return 100 / tasks[index]['subtasks'].length * getCheckedSubtasks(index);
}

/**
 * Checks if a subtask is checked for a given task.
 * @param {number} elementIndex - The index of the task in the tasks array.
 * @param {number} i - The index of the subtask in the subtasks array of the task.
 * @returns {boolean} - True if the subtask is checked, false otherwise.
 */
function isSubtaskCheckedBoard(elementIndex, i) {
    return tasks[elementIndex]['subtasks'][i]['checked'] == true;
}

/**
 * Opens a card with detailed information for a task.
 * @param {number} index - The index of the task in the tasks array.
 * @param {string} status - The status of the task.
 */
function openCard(index, status) {
    let clientWidth = document.body.clientWidth;
    if (isHTMLElement('openCard', status, index)) removeDisplayNone('openCard' + status + index);
    setInnerHTML('assignedUserLogoOpen' + status + index, '');
    addUserAcronyms('assignedUserLogoOpen');
    addSubtasksToCardOpen(status, index);
    removeDisplayNone('overlay');
    if (clientWidth < 1000) {
        document.getElementById('boardContainer').style = `overflow-y:hidden;`;
        document.getElementById('boardContainer').children[0].classList.add('d-none');
        document.getElementById('boardContainer').children[1].classList.add('d-none');
    } 
}

/**
* Adds user acronyms to the specified HTML element.
* @param {string} id - The id of the HTML element.
*/
function addUserAcronyms(id) {
    for (let i = 0; i < tasks.length; i++) {
        let index = tasks.indexOf(tasks[i]);
        let status = tasks[i]['status'];
        for (let j = 0; j < tasks[i]['isAssigned'].length; j++) {
            if (id == 'assignedUserLogoOpen') addNamesToOpenCard(id, i, index, status, j);
            else if (id == 'assignedUserLogo') addInnerHTML(id + status + index, generateAssignedUserHTML(tasks[i]['isAssigned'][j], index, status, 'assignedToContainer'));
        }
    }
}

/**
 * Adds user names to the open card with the specified id.
 * @param {string} id - The id of the open card element.
 * @param {number} i - The index of the task.
 * @param {number} index - The index of the task within the tasks array.
 * @param {number} status - The status of the task.
 * @param {number} j - The index of the assigned user within the isAssigned array.
 */
function addNamesToOpenCard(id, i, index, status, j) {
    addInnerHTML(id + tasks[i]['status'] + index, generateAssignedUserHTML(tasks[i]['isAssigned'][j], index, status, 'assignedToContainerOpen'));
    addInnerHTML(tasks[index]['category'] + 'assignedToContainerOpen' + tasks[i]['isAssigned'][j] + status + index, `<div>${tasks[i]['isAssigned'][j]}</div>`);
}

/**
 * Adds subtasks to the open card.
 * @param {string} status - The status of the element.
 * @param {number} index - The index of the element.
 */
function addSubtasksToCardOpen(status, index) {
    setInnerHTML('editSubtasksContainer' + status + index, '');
    for (let i = 0; i < tasks[index]['subtasks'].length; i++) addInnerHTML('editSubtasksContainer' + status + index, addCheckBoxAtBoardHTML(index, i, status));
    for (let j = 0; j < tasks[index]['subtasks'].length; j++) {
        if (tasks[index]['subtasks'][j]['checked'] == true) setCheckBoxCheckedOpenCard(index, j, status, true);
        else setCheckBoxCheckedOpenCard(index, j, status, false);
    }
}

/**
 * Sets the checked property of the checkbox in the open card.
 * @param {number} index - The index of the element.
 * @param {number} j - The index of the subtask.
 * @param {string} status - The status of the element.
 * @param {boolean} prop - The value of the checked property.
 */
function setCheckBoxCheckedOpenCard(index, j, status, prop) {
    document.getElementById('editSubtasks' + tasks[index]['subtasks'][j]['item'] + status + index).checked = prop;
}

/**
 * Sets the checked property of a subtask in the board.
 * @param {string} status - The status of the element.
 * @param {number} index - The index of the element.
 * @param {number} i - The index of the subtask.
 */
function setSubtaskChecked(status, index, i) {
    if (isSubtaskAtBoardChecked(index, i, status)) tasks[index]['subtasks'][i]['checked'] = true;
    else tasks[index]['subtasks'][i]['checked'] = false;
    pushToDatabase();
}

/**
 * Checks if a subtask in the board is checked.
 * @param {number} index - The index of the element.
 * @param {number} i - The index of the subtask.
 * @param {string} status - The status of the element.
 * @returns {boolean} - True if the subtask is checked, false otherwise.
 */
function isSubtaskAtBoardChecked(index, i, status) {
    return document.getElementById('editSubtasks' + tasks[index]['subtasks'][i]['item'] + status + index).checked == true;
}

/**
 * Opens the edit card view for a specific task.
 * @param {string} status - The status of the task.
 * @param {number} elementIndex - The index of the task element.
 * @param {string} aID - The ID of the assigned user.
 */
function editCard(status, elementIndex, aID) {
    let task = tasks[elementIndex];
    toggleEditCard(status, elementIndex, 'taskStatusCategory', 'editDeleteBtnOpen', 'editSubtasksContainer', 'editSaveBtnOpen', 'openCardTitle', 'openCardDescription');
    setStyleForEditCard(status, elementIndex);
    setDataForEditCard(status, elementIndex, task, aID, 'Edit');
}

/**
 * Sets the data for the edit card view.
 * @param {string} status - The status of the task.
 * @param {number} elementIndex - The index of the task element.
 * @param {Object} task - The task object.
 * @param {string} aID - The ID of the assigned user.
 */
function setDataForEditCard(status, elementIndex, task, aID) {
    setInnerHTML('taskPrioOpen' + status + elementIndex, generateLabelsHTML('label', 'Prio', 'Board'));
    setInnerHTML('assignedUserOpen' + status + elementIndex, generatesOptionsFieldHTML('label', 'Assigned to',
        'dropDownMenuField', 'assignedToEdit', './img/dropdownIcon.png', 'contacts to assign'));
    addInnerHTML('assignedToEdit',generateInviteNewContactHTML());
    generateOptionsHTML(users, 'users', 'Edit');
    addInnerHTML('assignedUserOpen' + status + elementIndex, generateAssignedListHTML('Edit'));
    setActiveCheckbox(task);
    setStyles(aID + 'Board', 'Board');
    setEditFields(status, elementIndex);
    dropDownAssign = false;
    addEventListenerToSelectBoxFor('assignedToEdit', 'users', 'Edit');
    addEvenListenersToSelectfor(users, 'users', 'Edit');
    assigned = [];
}

function setEditFields(status, elementIndex) {
    editEditField(status, elementIndex, 'editTitle', 'inputTextStd');
    editEditField(status, elementIndex, 'editDescription', 'inputDescriptionField');
    editEditField(status, elementIndex, 'editDate', 'inputTextStd');
}

/**
 * Sets the style for the edit card view.
 * @param {string} status - The status of the task.
 * @param {number} elementIndex - The index of the task element.
 */
function setStyleForEditCard(status, elementIndex) {
    document.getElementById('editTitle' + status + elementIndex).classList.remove('taskTitleOpen');
    document.getElementById('openCardTitle' + status + elementIndex).style = 'margin-top:60px';
    document.getElementById('editDescription' + status + elementIndex).classList.remove('taskDescriptionOpen');
    document.getElementById('editDate' + status + elementIndex).classList.remove('taskDueDateOpen');
    document.getElementById('dateContainer' + status + elementIndex).style = "display:block;";
    document.getElementById('assignedUserOpen' + status + elementIndex).style = "overflow:hidden;"
}

/**
 * Shows the edit card view by modifying the display of various elements.
 * @param {string} status - The status of the task.
 * @param {number} elementIndex - The index of the task element.
 */
function toggleEditCard(status, elementIndex, add1, add2, add3, remove1, remove2, remove3) {
    addDisplayNone(add1 + status + elementIndex);
    addDisplayNone(add2 + status + elementIndex);
    addDisplayNone(add3 + status + elementIndex);
    removeDisplayNone(remove1 + status + elementIndex);
    removeDisplayNone(remove2 + status + elementIndex);
    removeDisplayNone(remove3 + status + elementIndex);
}

/**
 * Sets the checkboxes of assigned users to active.
 * @param {Object} task - The task object containing assigned user information.
 */
function setActiveCheckbox(task) {
    for (let i = 0; i < task['isAssigned'].length; i++) {
        document.getElementById(task['isAssigned'][i] + 'Edit').children[0].checked = true;
        setAssignedCircle(task['isAssigned'][i], 'Edit');
        usersAssignedTo.push(task['isAssigned'][i]);
    }
}

/**
 * Edits the task data and updates the board.
 * @param {number} index - The index of the task to edit.
 * @param {string} stati - The status of the task to edit.
 */
function editThisTask(index, stati) {
    editTaskData(index, stati);
    addDisplayNone('openCard' + stati + index);
    addDisplayNone('overlay');
    closeOpenCard(stati, index, 'Board');
    save();
    updateBoardHTML();
    pushToDatabase();
}

/**
 * Updates the task data based on the edited values.
 * @param {number} index - The index of the task to edit.
 * @param {string} stati - The status of the task to edit.
 */
function editTaskData(index, stati) {
    tasks[index]['title'] = document.getElementById('editTitle' + stati + index).value;
    document.getElementById('editTitle' + stati + index).innerHTML = tasks[index]['title'];
    tasks[index]['description'] = document.getElementById('editDescription' + stati + index).value;
    document.getElementById('editDescription' + stati + index).innerHTML = tasks[index]['description'];
    tasks[index]['category'] = tasks[index]['category'];
    tasks[index]['isAssigned'] = getAssignedContacts('Edit');
    tasks[index]['dueDate'] = document.getElementById('editDate' + stati + index).value;
    let taskPrio = document.getElementById(activeID).innerHTML.split(' ');
    tasks[index]['prio'] = taskPrio[0].toLowerCase();
    tasks[index]['subtasks'] = tasks[index]['subtasks'];
    tasks[index]['id'] = tasks[index]['id'];
    tasks[index]['status'] = tasks[index]['status'];
}

/**
 * Enables editing for the specified field in the edit card.
 * @param {string} status - The status of the task.
 * @param {number} elementIndex - The index of the task element.
 * @param {string} id - The ID of the field to be edited.
 * @param {string} addClass - The CSS class to be added to the field.
 */
function editEditField(status, elementIndex, id, addClass) {
    document.getElementById(id + status + elementIndex).removeAttribute('readonly');
    document.getElementById(id + status + elementIndex).classList.add(addClass);
}

/**
 * Closes the open card and hides the overlay.
 * @param {string} status - The status of the task.
 * @param {number} index - The index of the task element.
 */
function closeOpenCard(status, index) {
    let clientWidth = document.body.clientWidth;
    addDisplayNone('openCard' + status + index);
    addDisplayNone('overlay');
    if (clientWidth < 1000) {
        document.getElementById('boardContainer').style = `overflow-y:overlay;`;
        document.getElementById('boardContainer').children[0].classList.remove('d-none');
        document.getElementById('boardContainer').children[1].classList.remove('d-none');
    }
    usersAssignedTo = [];
    assigned = [];
    dropDownAssign = false;
    save();
    pushToDatabase();
    updateBoardHTML();
}

/** Allows dropping of dragged elements by preventing the default behavior. */
function allowDrop(ev) {
    ev.preventDefault();
}

/** Shows the "Add New Task" section on the board and populates it with necessary HTML. */
function showAddNewTaskAtBoard(status) {
    removeDisplayNone('addTaskAtBoard');
    generateAddTaskHTML('addTaskAtBoard', '');
    addCloseBtnToAddTaskAtBoard();
    addEventListenerToDropDown();
    removeDisplayNone('overlay');
    setOnSubmitForm(status);
}

/**
 * Deletes a task from the tasks array.
 * @param {string} status - The status of the task to delete.
 * @param {number} ind - The index of the task to delete.
 */
function deleteTask(status, ind) {
    let taskToDelete = tasks.find(t => t.id == ind);
    let taskIndex = tasks.indexOf(taskToDelete);
    tasks.splice(taskIndex, 1);
    addDisplayNone('overlay');
    pushToDatabase();
    updateBoardHTML();
}

/** Adds a close button to the "Add Task" overlay at the board. */
function addCloseBtnToAddTaskAtBoard() {
    addInnerHTML('addTaskAtBoard', `<div onclick="closeTaskAtBoard()" class="closeIconAtContacts" id="closeIconAtContacts"></div>`);
}

/** Generates the "Add Task" images for each section in the board. */
function generateAddTaskToBoardImg() {
    addInnerHTML('dragAreaToDoTitle', `<img class="cursor" src="../img/plusButtonDark.png" id="todoImg" onclick="showAddNewTaskAtBoard('toDo')">`);
    addInnerHTML('dragAreaIPTitle', `<img class="cursor" src="../img/plusButtonDark.png" id="ipImg" onclick="showAddNewTaskAtBoard('inProgress')">`);
    addInnerHTML('dragAreaAFTitle', `<img class="cursor" src="../img/plusButtonDark.png" id="awImg" onclick="showAddNewTaskAtBoard('awaitingFeedback')">`);
    addInnerHTML('dragAreaDoneTitle', `<img class="cursor" src="../img/plusButtonDark.png" id="doneImg" onclick="showAddNewTaskAtBoard('done')">`);
}