// login.js

import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js';

const emailInput = document.getElementById('Email');
const passwordInput = document.getElementById('Password');
const loginButton = document.querySelector('#btnEnviar');
const errorMessage = document.getElementById('error-message');

console.log(loginButton);
loginButton.addEventListener('click', async (e) => {
   
    e.preventDefault(); 
    const email = emailInput.value;
    const password = passwordInput.value;
    const auth = getAuth(); 
    
    
    if(valiEmpty(email,password)){
        alert("Ingrese los siguientes campos");
    }
    else{
        try {
            
            await signInWithEmailAndPassword(auth, email, password);
            // Inicio de sesión exitoso, redirigir a otra página.
            window.location.href = '/html/admin.html';
        } catch (error) {
            errorMessage = "Contraseña o correo incorrectos";
            if (error.code === 'auth/wrong-password') {
                //la contraseña es incorrecta muestra una alerta
                errorMessage = 'La contraseña es incorrecta. Intente Nuevamente';
    
            } else if (error.errorMessage) {
                //Otro error de inicio de sesion
                errorMessage = error.errorMessage;
    
    
            }
            alert(errorMessage);
        }
    }
});

function valiEmpty(email, password) {
    if (email === '' && password === '') {
        return true;
    }
    else {
        return false;
    }
}