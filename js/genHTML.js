/**
 * Generates HTML for a checkbox item.
 * @returns {string} The HTML code for the checkbox item.
 */
function setCheckBox() {
    return `<li><input type="checkbox" id="list-subtask-${getValueOf('newSubtasks')}" value="${getValueOf('newSubtasks')}"> ${getValueOf('newSubtasks')}</li>`;
}

/**
 * Generates the HTML for an option in a dropdown menu.
 * @param {string} nameOfArray - The name of the array.
 * @param {string} content - The content of the option.
 * @returns {string} The HTML for the option.
 */
function generateTheOptionHTML(nameOfArray, content, edit) {
    return `<div class="cl_${nameOfArray} d-none" id="${content}${edit}" value="${content}">${content}<input type="checkbox" value="${content}"></div>`;
}

function generatesEditUserHTML(){
    return `
    <div id="editUserAtContacts" class="d-none">
            <div onclick="closeEditContact(event)" class="closeIconAtContacts editUserCloseBtn"></div>
            <div class="editUserAtContactsContainer">
                <div class="editUserAtContacts-left">
                    <div class="left-side-Contacts">
                        <img src="../img/logo-nav.png" alt="">
                        <div>
                            <h3 class="addNewContactTitle">Edit Contact</h3>
                            <div class="fillDiv-w90"></div>
                        </div>
                    </div>
                </div>
                <div class="editUserAtContacts-right">
                    <form onsubmit="editContact(); return false;">
                        <div class="editContactProfileImgContainer">
                            <img class="profileDummy" src="../img/profileDummy.png">
                            <img class="profileDummyInside" src="../img/profileDummyInside.png">
                        </div>
                        <div class="editContactInputs">
                            <div class="editContactNameInput">
                                <input type="text" required placeholder="Firstname Lastname"
                                    pattern="[A-Z]{1}[a-z]*[\s][A-Z]{1}[a-z]*" id="editContactName">
                                <img class="editContactNameImg" src="../img/miniProfile.png">
                            </div>
                            <div class="editContactNameInput">
                                <input type="email" required placeholder="Email" id="editContactEmail">
                                <img class="editContactNameImg" src="../img/miniMailIcon.png">
                            </div>
                            <div class="editContactNameInput">
                                <input type="number" pattern="[0-9]*" required placeholder="Phone" id="editContactPhone">
                                <img class="editContactNameImg" src="../img/miniPhoneIcon.png">
                            </div>
                            <div class="editButtonContainer">
                                <div class="deleteButton" id="deleteButton">Delete
                                </div>
                                <button class="editContactButton">Save</button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    `;
}

/**
 * Generates the HTML for a category option in a dropdown menu.
 * @param {string} nameOfArray - The name of the array.
 * @param {number} i - The index of the category.
 * @returns {string} The HTML for the category option.
 */
function generateCategoryOptionHTML(nameOfArray, i) {
    return `
        <div class="cl_${nameOfArray} d-none" id="${getCategory(i)}" value="${getCategory(i)}" >
            ${getCategory(i)}
            <div class="colorCircle" style="background:${getCategoryColor(i)}">
        </div>
    `;
}

function genAddTaskHTML(board) {
    return `
    <form id="submitting" onsubmit="" class="addTaskForm" >
        <div class="details detailBox">
            <div class="detailBox-left">
                ${generatesInputFieldHTML('label', 'input', 'Title', 'inputTextStd', 'text', 'inputTitle', 'Enter a title')}
                ${generatesTextareaFieldHTML('label', 'textarea', 'Description', 'Enter a description')}
                ${generatesOptionsFieldHTML('label', 'Category', 'dropDownMenuField', 'categoryBox', './img/dropdownIcon.png', 'task category')}
                ${generatesOptionsFieldHTML('label', 'Assigned to', 'dropDownMenuField', 'assignedTo', './img/dropdownIcon.png', 'contacts to assign')}
                <div class="p-relative d-flex align-c">
                    <list class="d-flex" id="list-assigned-user">
                    </list>
                </div>
            </div>
            <div class="border-1px-solid"></div>
            <div class="detailBox-right">
                ${generatesInputFieldHTML('label', 'input', 'Due Date', 'inputTextStd', 'date', 'inputDate')}
                ${generateLabelsHTML('label', 'Prio', '','idPrio')} 
                ${generateSubTaskField('label', 'Subtasks', 'dropDownMenuField', 'addNewSubTask', './img/addIcon.png')}
                <div class="p-relative d-flex align-c">
                    <list class="" id="list-subtask">
                    </list>
                </div>
                <div class="d-flex align-c container-btns">
                    <div class="clearButton" onclick="clearAllInputs('${board}')">
                        Clear
                    </div>
                    <button type="submit" class="createTaskBtn">
                        Create Task  
                        <img class="" src="../img/checkIconWhite.png">
                    </button>
                </div>
            </div>
        </div>
    </form>
`;
}

function genColorChooserHTML() {
    return `
    <div class="d-flex">
        <a onclick="setActiveColor('8AA4FF')" id="8AA4FF" class="colorCircle"style="background-color:#8AA4FF;"></a>
        <a onclick="setActiveColor('FF0000')" id="FF0000" class="colorCircle"style="background-color:#FF0000;"></a>
        <a onclick="setActiveColor('2AD300')" id="2AD300" class="colorCircle"style="background-color:#2AD300;"></a>
        <a onclick="setActiveColor('FF8A00')" id="FF8A00" class="colorCircle"style="background-color:#FF8A00;"></a>
        <a onclick="setActiveColor('E200BE')" id="E200BE" class="colorCircle"style="background-color:#E200BE;"></a>
        <a onclick="setActiveColor('0038FF')" id="0038FF" class="colorCircle"style="background-color:#0038FF;"></a>
    </div>
    `;
}

function genContactDetailsTitleHTML() {
    return `
    <div class="contactsTitleContainer">
        <h2 class="contactsTitle"">Contacts</h2>
        <div class="fillerDiv"></div>
        <h4>Better with a team</h4>
    </div>
    `;
}

function generateContactHeadHTML() {
    return `
    <div class="contactHeadContainer d-none" id="contactHeadContainer">
        <div class="colorCircle-big" id="contactDetailsLogo" style="background-color:#8AA4FF;">AB</div>
        <div class="contactHead">
            <h5 id="contactName">Name</h5>
            <div class="contactHeadAddTask" onclick="showAddNewTaskAtContacts()">
                <img src="../img/plusContacts.png" class="addTaskContacts">
                Add Task
            </div>
        </div>
    </div>
    `;
}

function generateContactBodyHTML() {
    return `
    <div class="contactInformationContainer d-none" id="contactInformationContainer">
        <div class="contactInformationTitle">
            <span>Contact Information</span>
            <div onclick="showEditContact()" class="showEditContainer">
                <div class="showEditImg"></div>
                <span>Edit Contact</span>
            </div>
        </div>
        <div class="contactInformationContent">
            <div class="contactInformationContentContainer">
                <h5 class="contactInformationContentTitles">Email</h5>
                <a class="contactInformationContentLink" id="contactDetailsEmail"></a>
            </div>
            <div class="contactInformationContentContainer">
                <h5 class="contactInformationContentTitles">Phone</h5>
                <a class="contactInformationContentLink" id="contactDetailsPhone"></a>
            </div>
         </div>
    </div>
    <div class="deleteButtonContent" id="deleteButtonContent"></div>
    `;
}

/**
 * Generates HTML for labels in the form.
 * @param {string} field - The HTML tag for the label.
 * @param {string} headline - The headline for the labels section.
 * @returns {string} - The generated HTML for the labels.
 */
function generateLabelsHTML(field, headline, board,id) {
    return `
    <div class="detail" id="${id}">
        <${field}>${headline}</${field}>
        <div class="d-flex">
            <${field} id="id_urgent${board}" value="urgent" onclick="changeStyleOfLabel('id_urgent${board}','${board}')">Urgent <img src="../img/urgentIcon.png" class="prioImg" id="urgentImgID${board}"> </${field}>
            <${field} id="id_medium${board}" value="medium" onclick="changeStyleOfLabel('id_medium${board}','${board}')">Medium <img src="../img/mediumIcon.png" class="prioImg" id="mediumImgID${board}"> </${field}>
            <${field} id="id_low${board}" value="low" onclick="changeStyleOfLabel('id_low${board}','${board}')">Low <img src="../img/lowIcon.png" class="prioImg" id="lowImgID${board}"> </${field}>
        </div>
    </div>
    `;
}

/**
 * Generates HTML for a textarea field in the form.
 * @param {string} field1 - The HTML tag for the label.
 * @param {string} field2 - The HTML tag for the textarea field.
 * @param {string} headline - The headline for the textarea field.
 * @param {string} placeholder - The placeholder text for the textarea field.
 * @returns {string} - The generated HTML for the textarea field.
 */
function generatesTextareaFieldHTML(field1, field2, headline, placeholder) {
    return `
    <div class="detail">
        <${field1}>${headline}</${field1}>
        <${field2} class="inputDescriptionField" type="text" id="inputDescription" placeholder="${placeholder}" required></${field2}>
    </div>
    `;
}

/**
 * Generates HTML for an input field in the form.
 * @param {string} field1 - The HTML tag for the label.
 * @param {string} field2 - The HTML tag for the input field.
 * @param {string} headline - The headline for the input field.
 * @param {string} properties - The CSS properties for the input field.
 * @param {string} type - The type of the input field (e.g., text, date, etc.).
 * @param {string} id - The id of the input field.
 * @param {string} placeholder - The placeholder text for the input field.
 * @returns {string} - The generated HTML for the input field.
 */
function generatesInputFieldHTML(field1, field2, headline, properties, type, id, placeholder) {
    return `
    <div class="detail" id="id_${id}">
        <${field1}>${headline}</${field1}>
        <${field2} class="${properties}" type="${type}" id="${id}" placeholder="${placeholder}" required>
    </div>
    `;
}

/**
 * Generates HTML for an input field in the form with the option to change the input field.
 * @param {string} field1 - The HTML tag for the label.
 * @param {string} field2 - The HTML tag for the input field.
 * @param {string} headline - The headline for the input field.
 * @param {string} properties - The CSS properties for the input field.
 * @param {string} type - The type of the input field (e.g., text, date, etc.).
 * @param {string} id - The id of the input field.
 * @param {string} restoreID - The id to restore when canceling the change.
 * @param {string} atClick - The function to execute when confirming the change.
 * @param {string} newclass - The CSS class for the change container.
 * @returns {string} - The generated HTML for the input field with change option.
 */
function generatesChangedInputFieldHTML(field1, field2, headline, properties, type, id, restoreID, atClick, newclass) {
    return `
    <${field1}>${headline}</${field1}>
    <${field2} class="${properties}" type="${type}" id="${id}" >
    <div class="${newclass} newCat">
        <a onclick="cancelAddNew('${restoreID}')"><img src="../img/cancelIcon.png"></a>
        <div class="border-1px-solid margin0px width0-height31px"></div>
        <a onclick="${atClick}"><img src="../img/checkIcon.png"></a>
    </div>  
    `;
}

/**
 * Generates HTML for an options field in the form.
 * @param {string} field1 - The HTML tag for the label.
 * @param {string} headline - The headline for the options field.
 * @param {string} properties - The CSS properties for the options field.
 * @param {string} id - The id of the options field.
 * @param {string} source - The path to the image source.
 * @param {string} selectionText - The text to display as the default selection.
 * @returns {string} - The generated HTML for the options field.
 */
function generatesOptionsFieldHTML(field1, headline, properties, id, source, selectionText) {
    return `
    <div class="detail" id="id_${id}">
        <${field1}>${headline}</${field1}>
        <div class="${properties}" id="${id}">
            <img src="../${source}" class="selectImg">
            <div class="dropDownStart" id="${headline}${id}" disabled>Select ${selectionText}
            </div>
        </div>
    </div>
    `;
}

function generateInviteNewContactHTML() {
    return `
    <div class="cl_users d-none" id="invite" onclick="showLink('contacts.html')">
        <span>
            Invite Contact
        </span>
        <img src="../img/invite.png" style="width: 15px;height: 15px;object-fit: contain;">
    </div>
    `;
}

/**
 * Generates the options field HTML with the selected value displayed.
 * @param {string} field1 - The HTML tag for the field label.
 * @param {string} headline - The headline or label text.
 * @param {string} properties - The class or properties of the field.
 * @param {string} id - The unique identifier for the field.
 * @param {string} source - The source of the image for the select button.
 * @param {string} selectionText - The text to display when no option is selected.
 * @returns {string} The generated HTML for the options field.
 */
function setBackToOptionsField(field1, headline, properties, id, source, selectionText) {
    return `
    <${field1}>${headline}</${field1}>
        <div class="${properties}" id="${id}">
            <img src="../${source}" class="selectImg">
            <div class="dropDownStart" id="${headline}${id}" disabled>Select ${selectionText}
            </div>
        </div>
    `;
}

/**
 * Generates the subtask field HTML with the option to add a new subtask.
 * @param {string} field1 - The HTML tag for the field label.
 * @param {string} headline - The headline or label text.
 * @param {string} properties - The class or properties of the field.
 * @param {string} id - The unique identifier for the field.
 * @param {string} source - The source of the image for the add subtask button.
 * @returns {string} The generated HTML for the subtask field.
 */
function setBackToSubTaskField(field1, headline, properties, id, source) {
    return `
    <${field1}>${headline}</${field1}>
    <div class="${properties}" id="${id}">
        <div onclick="changeToInputField('${id}')" class="subTaskStart" value="" disabled selected>Add new Subtask<img src="../${source}">
        </div>
    </div>
    `;
}

/**
 * Generates the HTML for a subtask field in the form.
 * @param {string} field1 - The type of the outer field element (e.g., "label").
 * @param {string} headline - The text for the headline of the field.
 * @param {string} properties - The class name or properties for the field element.
 * @param {string} id - The ID of the field element.
 * @param {string} source - The source URL for the image.
 * @returns {string} The generated HTML for the subtask field.
 */
function generateSubTaskField(field1, headline, properties, id, source) {
    return `
    <div class="detail" id="id_${id}">
        <${field1}>${headline}</${field1}>
        <div class="${properties}" id="${id}">
            <div onclick="changeToInputField('${id}')" class="subTaskStart" value="" disabled selected>Add new Subtask<img src="../${source}">
            </div>
        </div>
    </div>
    `;
}

/**
 * Generates HTML code for a selected navigation link.
 * @param {string} linkname - The name of the navigation link.
 * @returns {string} The generated HTML code for the selected navigation link.
 */
function generateSelectedNavigationLinkHTML(linkname) {
    return `
    <a onclick="showLink('${firstLetterToLowerCase(linkname)}.html')" style="background:#091931;" target="_self" class="navigation-left-link" id="show${linkname}">
         <img src="../img/${linkname.toLowerCase()}.png" alt=""> ${linkname}</a>     
    `;
}

/**
 * Generates HTML code for an unselected navigation link.
 * @param {string} linkname - The name of the navigation link.
 * @returns {string} The generated HTML code for the unselected navigation link.
 */
function generateUnSelectedNavigationLinkHTML(linkname) {
    return `
    <a onclick="showLink('${firstLetterToLowerCase(linkname)}.html')" target="_self" class="navigation-left-link" id="show${linkname}">
         <img src="../img/${linkname.toLowerCase()}.png" alt=""> ${linkname}</a>     
    `;
}

function logoutButtonHTML() {
    return `<div class="logoutButton" id="optionsMenu"><div  id="logoutButton" onclick="logout()">Logout</div></div>`;
}

/**
 * Generates HTML code for a contact category section.
 * @param {string} value - The category value (e.g., a letter).
 * @returns {string} The generated HTML code for the contact category section.
 */
function addContactCategoriesHTML(value) {
    return `<div class="contactSegment d-none" id="contact${value}"><h3 class="letter">${value}</h3><div class="contactListFillerDiv"></div></div>`;
}

/**
 * Generates HTML code for a contact container.
 * @param {string} contactName - The name of the contact.
 * @param {string} userMail - The email address of the contact.
 * @param {string} userPhone - The phone number of the contact.
 * @param {string} userColor - The color associated with the contact.
 * @returns {string} The generated HTML code for the contact container.
 */
function setContactsContainerHTML(contactName, userMail, userPhone, userColor) {
    return `
    <div onclick="setContactDetails('${contactName}','${userMail}','${userPhone}','${userColor}');setColorWhenSelectet('contactAt${contactName}')" class="contactSelect" id="contactAt${contactName}">
        <div class="colorCircleMedium" id="colorCircleMedium" style="background:${userColor}">${getFirstLettersOfName(contactName)}</div>
        <div class="contactsAttributeBox">
            <span class="contactSelectName"> ${contactName}</span>
            <span class="contactSelectMail">${userMail}</span>
        </div>
    </div>
    `;
}

/**
 * Generates HTML for an assigned circle element with the specified username.
 * @param {Object} username - The username object.
 * @param {string} username.name - The username.
 * @param {string} username.color - The color for the circle background.
 * @returns {string} The HTML for the assigned circle element.
 */
function setAssignedCircleHTML(user, edit) {
    return `<div class="colorCircleMedium" id="colorCircleMedium${user.name}${edit}" style="background:${user.color}">${getFirstLettersOfName(user.name)}</div>`;
}

/**
 * Sets a confirmation message with the specified text.
 * @param {string} text - The text of the confirmation message.
 * @returns {string} The HTML string representing the confirmation message.
 */
function setConfirmMessage(text) {
    return `<div class="confirmMessage" id="confirmMessage">${text} successfully createt</div>`;
}

/**
 * Generate a card to the To do Area
 * @param {*} element Elements of the card
 * @returns the card with elements
 */
function generateTodoHTML(element, status, index) {
    let elementIndex = tasks.indexOf(element);
    let color;
    categories.forEach(c => { if (c.name == tasks[elementIndex]['category']) color = c.color });
    return `
    <div draggable="true" ondragstart="startDragging(${elementIndex})" class="card" id="card${status}${index}" onclick="openCard('${elementIndex}','${status}')">
        <div style="background:${color}" class="taskStatus" id="cardTaskStatus">
            ${element['category']}
        </div>
        <div class="taskTitle" id="cardTaskTitle">
            ${element['title']}
        </div>
        <div class="taskDescription" id="cardTaskDescription${element['status']}${elementIndex}">
            ${element['description']}
        </div>  
        <div class="barContainer">
            <div class="bar" id="progressbar${element['status']}${elementIndex}">
            </div>
            <div class="taskProgressbar">
                ${getCheckedSubtasks(elementIndex)}/${element['subtasks'].length} Done 
            </div>   
        </div>
        <div class="containerUserAndPrio">
            <div class="assignedUser" id="assignedUserLogo${element['status']}${elementIndex}"></div>
            <div class="taskPrio">
                <img src="../img/${element['prio'].toLowerCase()}.png">
            </div>
        </div>  
    </div>`;
}

function generateMoveToMobile(element, statusToMoveUp, statusToMoveDown) {
    return `
        <div class="mobileSwitch">
            <a class="moveUp" onclick="moveUp('${element}','${statusToMoveUp}',event)" style="color:black;"></a>
            <a class="moveDown" onclick="moveUp('${element}','${statusToMoveDown}',event)" style="color:black;"></a> 
        </div>`;
}

function generateProgresstStyleHTML(progress, difference) {
    return `background:linear-gradient(to right,#29ABE2 ${progress}%,#F4F4F4 ${difference}%);`;
}

function generateAssignedUserHTML(username, index, status, id) {
    let category = tasks[index]['category'];
    let color = findColor(username);
    return `
    <div class="assignedToContainer" id="${category}${id}${username}${status}${index}">
        <div class="colorCircleMedium boardCircle" style="background:${color}">
            ${getFirstLettersOfName(username)} 
        </div>
    </div>
    `;
}

/**
 * Generate a bigger card if you clicket a small card on the areas
 * @param {*} element elemts of the card 
 * @returns the bigger card with more information
 */
function generateOpenCardHTML(element, status) {
    let elementIndex = tasks.indexOf(element);
    let elementID = tasks[elementIndex]['id'];
    let color;
    categories.forEach(c => {
        if (c.name == tasks[elementIndex]['category']) color = c.color
    });

    return `
        <div class="openCard d-none" id="openCard${status}${elementIndex}">
            <img src="../img/closeBtn.png" class="closeBtnOpen" onclick="closeOpenCard('${status}',${elementIndex})">
            <div id="taskStatusCategory${status}${elementIndex}" style="background:${color}" class="taskStatusOpen">
                ${element['category']}
            </div>         
            <div>
                <label id="openCardTitle${status}${elementIndex}" class="d-none editcard">Title</label>
                <input class="taskTitleOpen" id="editTitle${status}${elementIndex}" readonly value="${element['title']}"/>
            </div>
            <div>
                <label id="openCardDescription${status}${elementIndex}" class="d-none editcard">Description</label>
                <textarea class="taskDescriptionOpen" id="editDescription${status}${elementIndex}" readonly>${element['description']}</textarea>
            </div>  
            <div id="dateContainer${status}${elementIndex}" style="display:flex;">
                <label class="taskLabelOpen editcard" >Due date: </label>
                <input  class="taskDueDateOpen" id="editDate${status}${elementIndex}" readonly min="today" type="date" value="${element['dueDate']}" class="inputTextStd"/>
            </div>
            <div class="taskPrioOpen" id="taskPrioOpen${status}${elementIndex}">
                <label class="taskLabelOpen">Priority: </label>
                <img src="../img/${element['prio'].toLowerCase()}AllinOne.png">
            </div>
            <div id="editSubtasksContainer${status}${elementIndex}">
            </div>  
            <div class="taskAssignedUserOpen" id="assignedUserOpen${status}${elementIndex}"> 
                <span class="taskLabelOpen">Assigned to: </span> 
                <label class="taskLabelOpen" id="assignedUserLogoOpen${status}${elementIndex}"></label>
            </div>
            <div class="editDeleteBtnOpen" id="editDeleteBtnOpen${status}${elementIndex}">
                <div class="deleteBtnOpenCard" onclick="deleteTask('${status}',${elementID})"></div>
                <div class="editBtnOpenCard"  onclick="editCard('${status}',${elementIndex},'id_${element['prio'].toLowerCase()}')"></div>
            </div>
            <div class="editSaveBtnOpenContainer"> 
                <button class="editSaveBtnOpen d-none" id="editSaveBtnOpen${status}${elementIndex}" onclick="editThisTask(${elementIndex},'${status}')">
                    Ok<img src="../img/okWhite.png">
                </button>
            </div>
        </div>`;
}

function addCheckBoxAtBoardHTML(index, i, status) {
    return `
        <div> 
            <input type="checkbox"class="taskSubtasksOpen" onchange="setSubtaskChecked('${status}', ${index}, ${i})"
             id="editSubtasks${tasks[index]['subtasks'][i]['item']}${status}${index}" value="${tasks[index]['subtasks'][i]['item']}"/>
             ${tasks[index]['subtasks'][i]['item']} 
        </div>
    `;
}

function resetTaskPrioHTML(element) {
    return `<label class="taskLabelOpen">Priority: </label><img src="../img/${element['prio'].toLowerCase()}.png">`;
}

function resetAssignedHTML(status, index) {
    return `<span class="taskLabelOpen">Assigned to: </span><label class="taskLabelOpen" id="assignedUserLogoOpen${status}${index}"></label>`;
}

function generateAssignedListHTML(edit) {
    return `<div class="p-relative d-flex align-c"><list class="d-flex" id="list-assigned-user${edit}"></list></div>`;
}