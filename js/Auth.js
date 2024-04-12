import { customFetch } from "./helpers.js";

const urlLogin = "http://localhost:8080/api/v0/auth/login"
const urlRegister = "http://localhost:8080/api/v0/auth/registro"

const login = async(username,password)=>{
    const authenticationUser = {
        username,
        password
    }

    const options = {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(authenticationUser)
    }

    const token = await customFetch(urlLogin,options);
    return token;
}

const register = (name,username,email,password) => {
    const newUser = {
        nombre:name,
        username,
        email,
        password
    }

    const options = {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(newUser)
    }

    customFetch(urlRegister,options);
}


const saveStoreToken = (token)=>{
    window.localStorage.setItem("authToken",token);
}

const getStoreToken = ()=>{
    return window.localStorage.getItem("authToken");
}

const removeStoreToken = ()=>{
    window.localStorage.removeItem("authToken");
}

const isAuthenticated=()=>{return !!getStoreToken()}



export {login,register, saveStoreToken, getStoreToken, removeStoreToken, isAuthenticated};