// classes 
class Task {
    constructor(id, name, body, priority, priorityIndex) {
        this.id = id;
        this.name = name;
        this.body = body;
        this.priority = priority;
        this.priorityIndex = priorityIndex;
    }
}
class Account {
    constructor(id, name, password) {
        this.id = id;
        this.name = name;
        this.password = password;
    }
}


// find registration objects 
const root = document.querySelector('#root');
root.style.display ='none';
const enterModal = document.querySelector('#enterModal');
const enterH2 = document.querySelector('#enterH2');
const enterMessage = document.querySelector('#enterMessage');
const enterLogin = document.querySelector('#login');
const enterPassword = document.querySelector('#password');
const registrationPassword = document.querySelector('#passwordTwo');
const registrationA = document.querySelector('#registration');
const enterButton = document.querySelector('#enter');
const registration = document.querySelector('#create');
const registrationBack = document.querySelector('#back');
const registrationMessage = document.querySelector('#wrongPassword');
const wrongLogin = document.querySelector('#wrongLogin');
const successMessage = document.querySelector('#successMessage');



// listeners of registration|entering
registrationA.addEventListener('click', showRegistration);
enterButton.addEventListener('click', enterAccount);
registration.addEventListener('click', createAccount);
registrationBack.addEventListener('click', backToEnter);

if (!localStorage.getItem('accounts')) {
    localStorage.setItem('accounts', JSON.stringify([]));
}

const accounts = JSON.parse(localStorage.getItem('accounts'));
// funtions 
function showRegistration () {
    enterH2.innerText = 'Регистрация';
    enterMessage.style.display ='none';
    enterLogin.value = '';
    enterPassword.value = '';
    enterButton.style.display ='none';
    registration.style.display ='inline-block';
    registrationBack.style.display ='inline-block';
    registrationA.style.display = 'none';
    registrationPassword.style.display = 'inline-block';
}

function backToEnter () {
    enterH2.innerText = 'Войти:';
    enterLogin.value = '';
    enterPassword.value = '';
    registrationPassword.value ='';
    enterButton.style.display ='inline-block';
    registration.style.display ='none';
    registrationBack.style.display ='none';
    registrationA.style.display = 'inline-block';
    registrationPassword.style.display = 'none';
    registrationMessage.style.display ='none';
    wrongLogin.style.display ='none';
}

function enterAccount () {
    if (!enterLogin.value){
        return
    }else if (accounts.length == 0){
        enterMessage.style.display ='block';

    } else {
        for (let account of accounts){
            if (account.name == enterLogin.value && account.password == enterPassword.value) {
                root.style.display = 'grid';
                enterModal.style.display ='none';
                showTasks(account.id);
            }else {
                enterMessage.style.display ='block';
            }
        }
        if (enterMessage.style.display ='block'){
            enterLogin.value = '';
            enterPassword.value = '';
        }
    }
}

function createAccount () {
    for (let account of accounts){
        if (!enterLogin.value){
            return
        }else if (account.name == enterLogin.value){
            wrongLogin.style.display ='block';
            enterLogin.value = '';
        }
    }

    if (!enterLogin.value){
        return
    }else if (enterPassword.value == registrationPassword.value) {
        accounts.push(new Account(Date.now()+accounts.length, enterLogin.value, enterPassword.value));
        localStorage.accounts = JSON.stringify(accounts);

        backToEnter();
        successMessage.style.display ='block';
    } else {
        enterPassword.value = '';
        registrationPassword.value ='';
        registrationMessage.style.display ='block';
    }
}
   

function showTasks (tasks) {

   // append function
   function append (parent, child) {
    parent.appendChild(child);
    }


    if (!localStorage.getItem(tasks)) {
        localStorage.setItem(tasks, JSON.stringify([]));
    }

    const localTasks = JSON.parse(localStorage.getItem(tasks));

    // taskCreater
    const taskCreaterContainer = document.createElement('div');
    taskCreaterContainer.className = 'taskCreaterContainer';
    taskCreaterContainer.style.display = 'none';
    const taskCreater = document.createElement('div');
    taskCreater.className = 'taskCreater';
    append (taskCreaterContainer, taskCreater);

    const taskCreaterH2 = document.createElement('h2');
    taskCreaterH2.innerText = 'Создать задачу:';
    append(taskCreater, taskCreaterH2);

    const taskName = document.createElement('input');
    taskName.placeholder = 'Название задачи';
    taskName.className = 'taskName';
    const taskBody = document.createElement('textarea');
    taskBody.placeholder = 'Описание задачи(не обязательно)';
    taskBody.className = 'taskBody';


    // priority
    const taskPriorityDiv = document.createElement('div');
    taskPriorityDiv.className = 'taskPriorityDiv';
    const taskPriorityP = document.createElement('p');
    taskPriorityP.innerText = 'Срочность:  ';
    taskPriorityP.style.display = 'inline-block';
    
    const taskPriority = document.createElement('select');
    taskPriority.className = 'taskPriority';
    const taskPriorityLow = document.createElement('option');
    taskPriorityLow.innerText = 'низкая';
    const taskPriorityMid = document.createElement('option');
    taskPriorityMid.innerText = 'средняя';
    const taskPriorityHight = document.createElement('option');
    taskPriorityHight.innerText = 'высокая';

    append(taskPriority, taskPriorityLow);
    append(taskPriority, taskPriorityMid);
    append(taskPriority, taskPriorityHight);

    append(taskPriorityDiv, taskPriorityP);
    append(taskPriorityDiv, taskPriority);

    // buttons
    const createTaskButton = document.createElement('button');
    createTaskButton.innerText = 'Создать задачу';
    const changeTaskButton = document.createElement('button');
    changeTaskButton.innerText = 'Изменить задачу';
    changeTaskButton.style.display = 'none';
    const cancelCreateButton = document.createElement('button');
    cancelCreateButton.innerText = 'Отменить';

    
    // append in taskCreater
    append(taskCreater, taskName);
    append(taskCreater, taskBody);
    append(taskCreater, taskPriorityDiv);
    append(taskCreater, changeTaskButton);
    append(taskCreater, createTaskButton);
    append(taskCreater, cancelCreateButton);


    // button to create task 
    const buttonTaskCreater = document.createElement('div');
    const buttonTaskCreaterP = document.createElement('p');
    append (buttonTaskCreater, buttonTaskCreaterP)
    buttonTaskCreater.style.display = 'flex';
    buttonTaskCreater.style.alignItems = 'center';
    buttonTaskCreater.style.justifyContent = 'center';
    buttonTaskCreater.className = 'gridBlock';
    buttonTaskCreaterP.innerText = '+';
    buttonTaskCreaterP.style.fontSize = '60px';
    buttonTaskCreaterP.style.color = 'rgb(145, 145, 145)';



    function showModal () {
        changeTaskButton.style.display = 'none';
        createTaskButton.style.display = 'inline-block';
        taskCreaterContainer.style.display = 'block';
       
    }

    function closeModal () {
        taskCreaterH2.innerText = 'Создать задачу:';
        taskCreaterContainer.style.display = 'none';
        taskPriority.selectedIndex = '0';
        taskName.value = '';
        taskBody.value = '';
    }

    // listeners 
    buttonTaskCreater.addEventListener('click', showModal);
    changeTaskButton.addEventListener('click', saveChanges);
    cancelCreateButton.addEventListener('click', closeModal);
    createTaskButton.addEventListener('click', createTask);

    // append into root 
    append(root, buttonTaskCreater);
    append(root, taskCreaterContainer);

   

    // function to create taskform 
    function createTaskForm (taskList){
        if (!taskList.name){
            return;
        }else {
        const createTaskDiv = document.createElement('div');
        const completeTaskDiv = document.createElement('div');
        completeTaskDiv.className = 'gridBlock completeTaskDiv';
        completeTaskDiv.addEventListener ('click', showTask);


        append(createTaskDiv, completeTaskDiv);
        createTaskDiv.id = `div${taskList.id}`;
        createTaskDiv.className = 'gridBlock';
        const completeP = document.createElement('p');
        completeP.innerText ='Completed';
        completeTaskDiv.append(completeP);
        completeP.style.display = 'none';
        completeTaskDiv.id = `complete${taskList.id}`


        const createTaskName = document.createElement ('h2');
        createTaskName.className = 'name';
        createTaskName.id = `name${taskList.id}`;
        createTaskName.innerText = `${taskList.name}`;
        createTaskName.addEventListener('click', closeTask);

        const createTaskBody = document.createElement ('p');
        createTaskBody.className = 'body';
        createTaskBody.id = `body${taskList.id}`;

        createTaskBody.innerText = `${taskList.body}`;
        createTaskBody.addEventListener('click', closeTask);
        const createTaskPriorityDiv = document.createElement ('div');
        createTaskPriorityDiv.className = 'priorityDiv';

        const createTaskPriority = document.createElement ('p');
        createTaskPriority.innerText = 'Срочность:';
        createTaskPriority.style.display = 'inline-block';
        createTaskPriority.className = 'priority';

        const createTaskPriorityStatus = document.createElement ('p');
        createTaskPriorityStatus.className = 'priorityStatus';
        createTaskPriorityStatus.style.display = 'inline-block';
        createTaskPriorityStatus.innerText = `${taskList.priority}`;
        createTaskPriorityStatus.id = `priority${taskList.id}`;


        if (taskList.priorityIndex == 0) {
            createTaskPriorityStatus.className ='priorityStatus low';
            createTaskDiv.style.borderColor = 'rgb(167, 243, 123)';
        } else if (taskList.priorityIndex == 1){
            createTaskPriorityStatus.className ='priorityStatus mid';
            createTaskDiv.style.borderColor = 'rgb(231, 243, 123)';
        }else if (taskList.priorityIndex == 2){
            createTaskPriorityStatus.className ='priorityStatus hight';
            createTaskDiv.style.border = '2px solid rgb(243, 151, 123)';
        }


        const taskButtons = document.createElement ('div');
        taskButtons.className ='taskButtons'
        const completeTask = document.createElement ('div');
        const completeTaskChecker = document.createElement ('input');
        completeTask.append(completeTaskChecker);
        completeTaskChecker.type = 'checkbox';
        completeTaskChecker.id = taskList.id;

        completeTask.className ='completeTask';
        completeTaskChecker.addEventListener('click', completeFunction);

        const deleteTask = document.createElement ('div');
        deleteTask.className = 'deleteTask';
        deleteTask.id = taskList.id;
        deleteTask.addEventListener('click', showDeleteModal)

        const changeTask = document.createElement ('div');
        changeTask.className = 'changeTask';
        changeTask.id = `${taskList.id}`;
        changeTask.addEventListener ('click', changeTaskFunc)

        append (createTaskDiv, createTaskName);
        append (createTaskDiv, createTaskBody);
        append (createTaskPriorityDiv, createTaskPriority);
        append (createTaskPriorityDiv, createTaskPriorityStatus);
        append (createTaskDiv, taskButtons);
        append (taskButtons, completeTask);
        append (taskButtons, changeTask);
        append (taskButtons, deleteTask);
        
        append (createTaskDiv, createTaskPriorityDiv);


        root.prepend(createTaskDiv);
        closeModal();
        }
    }

    // functions and objects to delete Task 

    const deleteModal = document.getElementsByClassName('deleteModal')[0];
    const deleteTaskButton = document.getElementsByClassName('deleteTaskButton')[0];
    const cancelDeleteTask = document.getElementsByClassName('cancelDeleteTask')[0];
    deleteTaskButton.addEventListener('click', deleteTaskFunc);
    cancelDeleteTask.addEventListener('click', closeDeleteModal);

    function showDeleteModal (e) {
        deleteModal.style.display = 'block';
        deleteTaskButton.id = e.target.id;
    }
    
    function closeDeleteModal () {
        deleteModal.style.display = 'none';
        deleteTaskButton.id = '';
    }

    function deleteTaskFunc (e) {
        // console.log(localTasks);
        const taskDelete = document.querySelector(`#div${e.target.id}`);
        taskDelete.remove();
        for (let all in localTasks){
            if(localTasks[all].id == e.target.id){
                localTasks.splice(all, 1)
            }
        }
        // console.log(localTasks)
        closeDeleteModal();
        localStorage[tasks] = JSON.stringify(localTasks);
    }

    function showTask(e) {
        if(e.target.className.includes('completedTaskDiv') || e.target.offsetParent.children[2].innerText.length < 45 || e.target.offsetParent.children[1].innerText.length < 30){
            return
        } else {
        
            e.target.offsetParent.children[1].classList.add('name-actived');
            e.target.offsetParent.children[2].classList.add('index-for-body');
            // console.dir(e.target)
            e.target.offsetParent.style.gridRow = 'span 2';
            e.target.style.display = 'none';
        }
        }

    function closeTask (e) {
        if (e.target.className.includes('index-for-body') || e.target.className.includes('name-actived')){
            e.target.offsetParent.children[1].classList.remove('name-actived');
            e.target.offsetParent.children[0].style.display = 'block';
            e.target.offsetParent.style.gridRow = '';
            e.target.offsetParent.children[2].classList.remove('index-for-body');

        }
    }


    function completeFunction (e) {
        if (e.target.checked){
           const completeDiv = document.querySelector(`#complete${e.target.id}`);
           completeDiv.style.display = 'block';
           completeDiv.offsetParent.style.gridRow = '';
           completeDiv.offsetParent.children[1].classList.remove('name-actived');
           completeDiv.offsetParent.children[2].classList.remove('index-for-body');

           completeDiv.classList.add('completedTaskDiv');
           const completeP = completeDiv.firstChild;
           completeP.style.display = 'block';
           const changetasks = document.getElementsByClassName('changeTask');
           for(changetask of changetasks){
               if(changetask.id == e.target.id){
                   changetask.classList.add('zindex');
               }
           }
        } else {
            const completeDiv = document.querySelector(`#complete${e.target.id}`);
            completeDiv.classList.remove('completedTaskDiv');
            console.dir(completeDiv)
           const completeP = completeDiv.firstChild;
            completeP.style.display = 'none';
           const changetasks = document.getElementsByClassName('changeTask');
            for(changetask of changetasks){
                if(changetask.id == e.target.id){
                    changetask.classList.remove('zindex');
                    
                }
            }
        }

    }; 

    function createTask () {
        const taskID = localTasks.length + Date.now();
        localTasks.push(new Task(taskID, taskName.value, taskBody.value, taskPriority.options[taskPriority.selectedIndex].value, taskPriority.selectedIndex));
        createTaskForm(localTasks[localTasks.length-1]);
        localStorage[tasks] = JSON.stringify(localTasks);
    }

    function changeTaskFunc (element) {
        const id = Number(element.target.id);
        for (task of localTasks) {
            if(task.id == id){
                taskCreaterH2.innerText = 'Изменить задачу:';
                changeTaskButton.id = `${id}`;
                taskName.value = task.name;
                taskBody.value = task.body;
                taskPriority.options.selectedIndex = task.priorityIndex;
                showModal();
                changeTaskButton.style.display = 'inline-block';
                createTaskButton.style.display = 'none';
            }
        }
    }

    function saveChanges (element) {
        const id = Number(element.target.id);
        for (task of localTasks) {
            if(task.id == id){
                task.name = taskName.value;
                task.body = taskBody.value;
                task.priorityIndex = taskPriority.options.selectedIndex;
                task.priority = taskPriority.options[taskPriority.selectedIndex].value;

                const taskChangeName = document.querySelector(`#name${id}`);
                taskChangeName.innerText = task.name;

                const taskChangeBody = document.querySelector(`#body${id}`);
                taskChangeBody.innerText = task.body;

                const taskChangePriority = document.querySelector(`#priority${id}`);
                taskChangePriority.innerText = task.priority;

                const taskChangeDiv = document.querySelector (`#div${id}`);
                if (task.priorityIndex == 0) {
                    taskChangePriority.className ='priorityStatus low';
                    taskChangeDiv.style.borderColor = 'rgb(167, 243, 123)';
                } else if (task.priorityIndex == 1){
                    taskChangePriority.className ='priorityStatus mid';
                    taskChangeDiv.style.borderColor = 'rgb(231, 243, 123)';
                }else if (task.priorityIndex == 2){
                    taskChangePriority.className ='priorityStatus hight';
                    taskChangeDiv.style.border = '2px solid rgb(243, 151, 123)';
                }
                closeModal ()
                localStorage[tasks] = JSON.stringify(localTasks);
            }
    }
    }
    localTasks.forEach(createTaskForm);
};

    





