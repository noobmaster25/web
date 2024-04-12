import {
    login,
    register,
    saveStoreToken
} from "./Auth.js";
import { validateRegister , validateLogin} from "./util.js";


//Evento login

const loginForm = document.getElementById('form-login');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('input-username').value;
    const password = document.getElementById('input-password').value;

    // const errors = validateLogin(username,password);

    // if(errors.length>0){
    //     let errorMessage = "";
    //     errors.forEach(err=>{errorMessage += `${err.error} \n \n`});
    //     alert(errorMessage);
    //     return;
    // }

    try {
        const responseToken = await login(username, password);
        saveStoreToken(responseToken.token);
        window.location.href = "./graficos.html";

    } catch (error) {
        console.log(error);
    }
});


//Evento registro

const registerForm = document.getElementById('form-register');

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name');
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('new-password').value;

    const errors = validateRegister(name,username,email,password);

    if(errors.length>0){
        let errorMessage = "";
        errors.forEach(err=>{errorMessage += `${err.error} \n \n`});
        alert(errorMessage);
        return;
    }

    try {
        register(name,username,email,password);
        alert("Registrado")
        window.location.href = "./login.html";

    } catch (error) {
        console.log(error);
    }
});



//evento toggle entre login y registro


const nav = document.querySelector(".nav-button");
nav.addEventListener("click", e => {
    if (e.target.id == "loginBtn") {
        toggleLogin();
    }
    if (e.target.id == "registerBtn") {
        toggleRegister();
    }
})
const linkRegister = document.getElementById("link-register");
linkRegister.addEventListener("click",()=>toggleRegister());

const linkLogin = document.getElementById("link-login");
linkLogin.addEventListener("click",()=>toggleLogin());

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const loginContainer = document.getElementById("login");
const registerContainer = document.getElementById("register");

const toggleLogin = () => {
    loginContainer.style.left = "4px";
    registerContainer.style.right = "-520px";
    loginBtn.className += " white-btn";
    registerBtn.className = "btn";
    loginContainer.style.opacity = 1;
    registerContainer.style.opacity = 0;
}

const toggleRegister = () => {
    loginContainer.style.left = "-510px";
    registerContainer.style.right = "5px";
    loginBtn.className = "btn";
    registerBtn.className += " white-btn";
    loginContainer.style.opacity = 0;
    registerContainer.style.opacity = 1;
}