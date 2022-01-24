import {Account} from './modules/classes.js'
import { showTasks } from './modules/createTaskList.js';

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

// find header and info elements 
const headerLogin = document.querySelector('#nav');
headerLogin.style.display = 'none';
const headerLoginDiv = document.getElementsByClassName('login')[0];
const headerUserName = document.querySelector('#userName');
const headerUserExit = document.querySelector('#exit');
const userNameButton = document.querySelector('#userNameButton');
const info = document.querySelector('#info');
const infoText = document.querySelector('#infoText');


// listeners of registration|entering and header elements
registrationA.addEventListener('click', showRegistration);
enterButton.addEventListener('click', enterAccount);
registration.addEventListener('click', createAccount);
registrationBack.addEventListener('click', backToEnter);

headerUserExit.addEventListener('click', exitLogin);

if (window.matchMedia("(min-width: 750px)").matches){
    info.addEventListener('mouseover', showInfo);
    info.addEventListener('mouseout', closeInfo);
    headerLoginDiv.addEventListener('mouseover', showExitButton);
    headerLoginDiv.addEventListener('mouseout', closeExitButton);
}else {
    info.removeEventListener('mouseover', showInfo);
    info.removeEventListener('mouseout', closeInfo);
    headerLoginDiv.removeEventListener('mouseover', showExitButton);
    headerLoginDiv.removeEventListener('mouseout', closeExitButton);
    userNameButton.addEventListener('click', showLogin);
    info.addEventListener('click', clickInfo);
}


// functions for login, exit
function showLogin () {
    if(!headerLoginDiv.className.includes('loginOpen')){
        headerLoginDiv.classList.remove('loginClose');
        headerLoginDiv.classList.add('loginOpen');
    }else {
        headerLoginDiv.classList.add('loginClose');
        headerLoginDiv.classList.remove('loginOpen');
    }
}
function showExitButton() {
    headerUserExit.classList.remove('exitClose');
    headerUserExit.classList.add('exitOpen');
};
function closeExitButton() {
    headerUserExit.classList.add('exitClose');
    headerUserExit.classList.remove('exitOpen');
};
function exitLogin () {
    headerLoginDiv.classList.remove('loginOpen');
    headerLogin.style.display ='none';
    root.style.display = 'none';
    enterModal.style.display ='block';
    enterMessage.style.display = 'none';
    while(!!root.firstChild) {root.removeChild(root.firstChild)};
}

// functions for info
function clickInfo () {
    if(!infoText.className.includes('showInfo')){
        showInfo();
    }else {
        closeInfo();
    }
}
function showInfo(){
    infoText.style.display = 'block';
    infoText.classList.remove('closeInfo');
    infoText.classList.add('showInfo');
}
function closeInfo(){
    // infoText.style.display = 'none';
    infoText.classList.add('closeInfo');
    infoText.classList.remove('showInfo');
}

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
                headerLogin.style.display = 'flex';
                headerUserName.innerText = enterLogin.value;
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


    





