import { checkToken, redirect, logout } from "./utils.js";

const title = document.querySelector('#title');
const price = document.querySelector('#price');
const desc = document.querySelector('#description');
const addBtn = document.querySelector('#addProduct');
const productForm = document.querySelector('form');
const productsCard = document.querySelector('.product-cards');

const logoutBtn = document.querySelector('#logout')
const products = [];

window.addEventListener('DOMContentLoaded', function() {
    const hasToken = checkToken()
    if(!hasToken) redirect('/login.html')
})

logoutBtn.onclick = logout


function toggleAddBtnDisabled() {
    if (title.value.trim() === "" || price.value.trim() === "" || desc.value.trim() === "") {
        addBtn.disabled = true;
    } else {
        addBtn.disabled = false;
    }
}


productForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const newProduct = {
        id: Date.now(),
        title: title.value,
        price: price.value,
        desc: desc.value,
    };

    products.push(newProduct);

    renderProducts();

   
    title.value = '';
    price.value = '';
    desc.value = '';

 
    toggleAddBtnDisabled();


});

title.oninput = function(event) {
    toggleAddBtnDisabled()
}

price.oninput = function(event) {
    toggleAddBtnDisabled()
}
desc.oninput = function(event) {
    toggleAddBtnDisabled()
}


toggleAddBtnDisabled();


function renderProducts() {
    productsCard.innerHTML = '';

    products.forEach(singleProduct => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <h3><span>Title:</span> ${singleProduct.title}</h3>
            <p><span>Price:</span> ${singleProduct.price}$</p>
            <p><span>Description:</span> ${singleProduct.desc}</p>
        `;

        productsCard.appendChild(productCard);
    });
}
