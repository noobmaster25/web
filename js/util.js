const nameRegex = /^[a-zA-ZÀÁÇÉÈÍÏÓÖÚÜÑñ' \s]{2,}$/;
const usernameRegex = /^[a-zA-Z0-9_]+$/;
const emailRegex = /^[\w-.]+@([\w-.]+.)+[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}|:;'"<>,./?])[a-zA-Z0-9!@#$%^&*()_+{}|:;'"<>,./?]]{8,}$/;

const validateRegister = (name, username, email, password) => {

    const errors = [];

    // Validación de nombre
   
    if (!nameRegex.test(name)) {
        errors.push({
            field: 'name',
            error: 'Nombre no válido: Debe contener al menos 2 caracteres y solo letras, acentos y espacios en blanco.'
        });
    }

    // Validación de nombre de usuario
    
    if (!usernameRegex.test(username)) {
        errors.push({
            field: 'username',
            error: 'Nombre de usuario no válido: Solo se permiten letras, números y guion bajo.'
        });
    }

    // Validación de correo electrónico
   
    if (!emailRegex.test(email)) {
        errors.push({
            field: 'email',
            error: 'Correo electrónico no válido: Debe seguir el formato correcto.'
        });
    }

    // Validación de contraseña
    
    if (!passwordRegex.test(password)) {
        errors.push({
            field: 'password',
            error: 'Contraseña no válida: Debe tener al menos 8 caracteres, una minúscula, una mayúscula, un número y un carácter especial.'
        });
    }

    // Retornar el array de errores o un objeto vacío si no hay errores
    return errors.length > 0 ? errors : {
        error: null,
        fields: null
    };
}

const validateLogin = (username, password)=>{
    const errors = [];
     // Validación de nombre de usuario
    
     if (!usernameRegex.test(username)) {
        errors.push({
            field: 'username',
            error: 'Nombre de usuario no válido: Solo se permiten letras, números y guion bajo.'
        });
    }

      // Validación de contraseña
    
      if (!passwordRegex.test(password)) {
        errors.push({
            field: 'password',
            error: 'Contraseña no válida: Debe tener al menos 8 caracteres, una minúscula, una mayúscula, un número y un carácter especial.'
        });
    }

     // Retornar el array de errores o un objeto vacío si no hay errores
     return errors.length > 0 ? errors : {
        error: null,
        fields: null
    };
}
export {
    validateRegister,validateLogin
}