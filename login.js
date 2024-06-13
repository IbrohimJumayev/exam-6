
import { checkToken, redirect } from "./utils.js";

const form = document.querySelector('form');
const userEmail = document.querySelector('#email');
const userPassword = document.querySelector('#password');
const subBtn = document.querySelector('#subBtn');

window.addEventListener('DOMContentLoaded', function () {
    const hasToken = checkToken();
    if (hasToken) {
        redirect('/index.html');
    }
});

const credentials = {
    email: '',
    password: '',
};

async function login() {
    const apiUrl = 'https://api.escuelajs.co/api/v1/auth/login';
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        if (response.ok) {
            const data = await response.json();
            const { access_token, refresh_token } = data;

          
            sessionStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);

            const hasToken = checkToken();
            if (hasToken) {
                console.log('Login successful, redirecting...');
                redirect('/index.html');
            }
        } else {
            console.error('Login failed: ', response.statusText);
            alert('Invalid email or password. Please try again.');
        }
    } catch (error) {
        console.error('Error during login: ', error);
        alert('An error occurred. Please try again.');
    }
}

userEmail.oninput = function (event) {
    credentials.email = event.target.value;
    console.log('Email input: ', credentials.email);
};

userPassword.oninput = function (event) {
    credentials.password = event.target.value;
    console.log('Password input: ', credentials.password);
};

form.onsubmit = function (event) {
    event.preventDefault();
    login();
}
