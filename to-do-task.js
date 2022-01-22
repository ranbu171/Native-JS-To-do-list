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


// find or create local base of accounts 
if (!localStorage.getItem('accounts')) {
    localStorage.setItem('accounts', JSON.stringify([]));
}
const accounts = JSON.parse(localStorage.getItem('accounts'));


// find DOM objects to entering or registration modal
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
const wrongPassword = document.querySelector('#wrongPassword');
const wrongLogin = document.querySelector('#wrongLogin');
const successMessage = document.querySelector('#successMessage');


// listeners of registration|entering
registrationA.addEventListener('click', showRegistration);
enterButton.addEventListener('click', enterAccount);
registration.addEventListener('click', createAccount);
registrationBack.addEventListener('click', backToEnter);


// funtions for registration or entering
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
};

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
    wrongLogin.style.display ='none';
    wrongPassword.style.display ='none';

};

function createAccount () {
    for (let account of accounts){
        if (!enterLogin.value){
            return
        }else if (account.name == enterLogin.value){
            wrongLogin.style.display ='block';
            wrongPassword.style.display = 'none'
            enterLogin.value = '';
        }else {
        wrongLogin.style.display ='none';
        }
    }

    if (!enterLogin.value || !enterPassword.value || !registrationPassword.value){
        return
    }else if (enterPassword.value == registrationPassword.value) {
        accounts.push(new Account(Date.now()+accounts.length, enterLogin.value, enterPassword.value));
        localStorage.accounts = JSON.stringify(accounts);
        backToEnter();
        successMessage.style.display ='block';
    } else {
        enterPassword.value = '';
        registrationPassword.value ='';
        wrongPassword.style.display ='block';
    }
};

function enterAccount () {
    if (!enterLogin.value){
        return
    }else if (accounts.length == 0){
        enterMessage.style.display ='block';

    }else {
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
};


   


// function to running tasks app
function showTasks (tasks) {

    // checking localStorage
    if (!localStorage.getItem(tasks)) {
        localStorage.setItem(tasks, JSON.stringify([]));
    };
    const localTasks = JSON.parse(localStorage.getItem(tasks));

   // append function
   function append (parent, child) {
    parent.appendChild(child);
    };


    // modal to create task 
    const taskCreaterContainer = document.createElement('div');
    taskCreaterContainer.className = 'taskCreaterContainer';
    taskCreaterContainer.style.display = 'none';
    
    const taskCreater = document.createElement('div');
    taskCreater.className = 'taskCreater';

    const taskCreaterH2 = document.createElement('h2');
    taskCreaterH2.innerText = 'Создать задачу:';

    const taskCreaterP = document.createElement('p');
    taskCreaterP.innerText = 'Название максимум 110 символов';

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

    

    // buttons
    const createTaskButton = document.createElement('button');
    createTaskButton.innerText = 'Создать задачу';
    const changeTaskButton = document.createElement('button');
    changeTaskButton.innerText = 'Изменить задачу';
    changeTaskButton.style.display = 'none';
    const cancelCreateButton = document.createElement('button');
    cancelCreateButton.innerText = 'Отменить';


    // button to create task 
    const buttonTaskCreater = document.createElement('div');
    const buttonTaskCreaterP = document.createElement('p');
    buttonTaskCreater.style.display = 'flex';
    buttonTaskCreater.style.alignItems = 'center';
    buttonTaskCreater.style.justifyContent = 'center';
    buttonTaskCreater.className = 'gridBlock';
    buttonTaskCreaterP.innerText = '+';
    buttonTaskCreaterP.style.fontSize = '60px';
    buttonTaskCreaterP.style.color = 'rgb(145, 145, 145)';
    
    // appends
    append (buttonTaskCreater, buttonTaskCreaterP);

    append(taskPriority, taskPriorityLow);
    append(taskPriority, taskPriorityMid);
    append(taskPriority, taskPriorityHight);
    
    append(taskPriorityDiv, taskPriorityP);
    append(taskPriorityDiv, taskPriority);

    append(taskCreater, taskCreaterH2);
    append(taskCreater, taskCreaterP);
    append(taskCreater, taskName);
    append(taskCreater, taskBody);
    append(taskCreater, taskPriorityDiv);
    append(taskCreater, changeTaskButton);
    append(taskCreater, createTaskButton);
    append(taskCreater, cancelCreateButton);

    append(taskCreaterContainer, taskCreater);

    // append into root 
    append(root, buttonTaskCreater);
    append(root, taskCreaterContainer);

    //objects to delete Task 
    const deleteModal = document.getElementsByClassName('deleteModal')[0];
    const deleteTaskButton = document.getElementsByClassName('deleteTaskButton')[0];
    const cancelDeleteTask = document.getElementsByClassName('cancelDeleteTask')[0];

    // listeners of enterind modal
    buttonTaskCreater.addEventListener('click', showModal);
    changeTaskButton.addEventListener('click', saveChanges);
    cancelCreateButton.addEventListener('click', closeModal);
    createTaskButton.addEventListener('click', createTask);
    deleteTaskButton.addEventListener('click', deleteTaskFunc);
    cancelDeleteTask.addEventListener('click', closeDeleteModal);




    // function to create taskform 
    function createTaskForm (taskList){
        
        // create task
        const createTaskDiv = document.createElement('div');
        createTaskDiv.id = `div${taskList.id}`;
        createTaskDiv.className = 'gridBlock';

        const completeTaskDiv = document.createElement('div');
        completeTaskDiv.id = `complete${taskList.id}`
        completeTaskDiv.className = 'gridBlock completeTaskDiv';

        const completeP = document.createElement('p');
        completeP.innerText ='Completed';
        completeP.style.display = 'none';

        const createTaskName = document.createElement ('h2');
        createTaskName.className = 'name';
        createTaskName.id = `name${taskList.id}`;
        createTaskName.innerText = taskList.name;

        const createTaskBody = document.createElement ('p');
        createTaskBody.className = 'body';
        createTaskBody.id = `body${taskList.id}`;
        createTaskBody.innerText = taskList.body;


        const createTaskPriorityDiv = document.createElement ('div');
        createTaskPriorityDiv.className = 'priorityDiv';
        
        const createTaskPriority = document.createElement ('p');
        createTaskPriority.innerText = 'Срочность:';
        createTaskPriority.style.display = 'inline-block';
        createTaskPriority.className = 'priority';

        const createTaskPriorityStatus = document.createElement ('p');
        createTaskPriorityStatus.className = 'priorityStatus';
        createTaskPriorityStatus.style.display = 'inline-block';
        createTaskPriorityStatus.innerText = taskList.priority;
        createTaskPriorityStatus.id = `priority${taskList.id}`; 

        
        const taskButtons = document.createElement ('div');
        taskButtons.className ='taskButtons';

        const completeTask = document.createElement ('div');
        completeTask.className ='completeTask';

        const completeTaskChecker = document.createElement ('input');
        completeTaskChecker.type = 'checkbox';
        completeTaskChecker.id = taskList.id;

        const deleteTask = document.createElement ('i');
        deleteTask.className = 'deleteTask fas fa-trash-alt';
        deleteTask.id = taskList.id;

        const changeTask = document.createElement ('i');
        changeTask.className = 'changeTask fas fa-pencil-alt';
        changeTask.id = taskList.id;

        
        // listeners
        completeTaskDiv.addEventListener ('click', showTask);
        createTaskName.addEventListener('click', closeTask);
        createTaskBody.addEventListener('click', closeTask);
        completeTaskChecker.addEventListener('click', completeFunction);
        changeTask.addEventListener ('click', changeTaskFunc);
        deleteTask.addEventListener('click', showDeleteModal);


        // appends
        append(completeTask, completeTaskChecker)
        append(createTaskDiv, completeTaskDiv);
        append(completeTaskDiv, completeP);
        append(createTaskDiv, createTaskName);
        append(createTaskDiv, createTaskBody);
        append(createTaskPriorityDiv, createTaskPriority);
        append(createTaskPriorityDiv, createTaskPriorityStatus);
        append(createTaskDiv, taskButtons);
        append(taskButtons, completeTask);
        append(taskButtons, changeTask);
        append(taskButtons, deleteTask);
        append (createTaskDiv, createTaskPriorityDiv);


        if (taskList.name.length > 30 || taskList.body.length > 45) {
            completeTaskDiv.classList.add('pointer');
        }else {
            completeTaskDiv.classList.remove('pointer');
        }

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


        root.prepend(createTaskDiv);
        closeModal();
    };

    

    // all functions to work
    function createTask () {
        if (!taskName.value){
            taskName.placeholder = 'Название задачи';
            taskName.style.borderColor = 'rgb(89, 171, 226)';
        } else if (taskName.value.length >= 110){
            taskName.value = '';
            taskName.placeholder = 'Слишком много символов';
            taskName.style.borderColor = 'red';
        }else {
        const taskID = localTasks.length + Date.now();
        localTasks.push(new Task(taskID, taskName.value, taskBody.value, taskPriority.options[taskPriority.selectedIndex].value, taskPriority.selectedIndex));
        createTaskForm(localTasks[localTasks.length-1]);
        localStorage[tasks] = JSON.stringify(localTasks);
        }
    };

    function showModal () {
        changeTaskButton.style.display = 'none';
        createTaskButton.style.display = 'inline-block';
        taskCreaterContainer.style.display = 'block';
       
    };

    function closeModal () {
        taskCreaterH2.innerText = 'Создать задачу:';
        taskCreaterContainer.style.display = 'none';
        taskPriority.selectedIndex = '0';
        taskName.value = '';
        taskBody.value = '';
        taskName.placeholder = 'Название задачи';
        taskName.style.borderColor = 'rgb(89, 171, 226)';
    };

    function addPointer (div, name, body) {
        if (name > 30 || body > 45) {
            div.classList.add('pointer');
        }else {
            div.classList.remove('pointer');
    
        }
    };

    function showTask(e) {
        if(e.target.localName == 'p'){
            return;
        } else if(e.target.offsetParent.children[2].innerText.length > 45 || e.target.offsetParent.children[1].innerText.length > 30) {
            e.target.offsetParent.children[1].classList.add('full-name');
            e.target.offsetParent.children[2].classList.add('full-body');
            e.target.offsetParent.style.gridRow = 'span 2';
            e.target.style.display = 'none';
        }
    };

    function closeTask (e) {
        if (e.target.className.includes('full-body') || e.target.className.includes('full-name')){
            e.target.offsetParent.children[1].classList.remove('full-name');
            e.target.offsetParent.children[0].style.display = 'block';
            e.target.offsetParent.style.gridRow = '';
            e.target.offsetParent.children[2].classList.remove('full-body');

        }
    };

    function completeFunction (e) {
        if (e.target.checked){
           const completeDiv = document.querySelector(`#complete${e.target.id}`);
           completeDiv.style.display = 'block';
           completeDiv.offsetParent.style.gridRow = '';
           completeDiv.offsetParent.children[1].classList.remove('full-name');
           completeDiv.offsetParent.children[2].classList.remove('full-body');

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

    function changeTaskFunc (e) {
        const id = Number(e.target.id);
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
    };

    function saveChanges (e) {
        const id = Number(e.target.id);
        if (!taskName.value){
            taskName.placeholder = 'Название задачи';
            taskName.style.borderColor = 'rgb(89, 171, 226)';
        }else if (taskName.value.length >= 110){
            taskName.value = '';
            taskName.placeholder = 'Слишком много символов';
            taskName.style.borderColor = 'red';
        }else {
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
    
                    addPointer(taskChangeDiv.children[0], taskName.value.length, taskBody.value.length)
                    closeModal ()
                    localStorage[tasks] = JSON.stringify(localTasks);
                }
        }
        }



        
    };

    function showDeleteModal (e) {
        deleteModal.style.display = 'block';
        deleteTaskButton.id = e.target.id;
    };
    
    function closeDeleteModal () {
        deleteModal.style.display = 'none';
        deleteTaskButton.id = '';
    };

    function deleteTaskFunc (e) {
        const taskDelete = document.querySelector(`#div${e.target.id}`);
        taskDelete.remove();
        for (let all in localTasks){
            if(localTasks[all].id == e.target.id){
                localTasks.splice(all, 1)
            }
        }
        closeDeleteModal();
        localStorage[tasks] = JSON.stringify(localTasks);
    };

    localTasks.forEach(createTaskForm);
};

    





