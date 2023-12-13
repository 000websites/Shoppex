const logout = document.querySelector('.logout');
const profile = document.querySelector('.profile');
const home = document.querySelector('.home');
const home1 = document.querySelector('.home1');
const myCart = document.querySelector('.myCart');


home.addEventListener("click", () => {
    if (localStorage.getItem('currentUser')) {
        window.location.href = '../Landingpage/landingpage.html';
    }
    else {
        window.location.href = '../index.html';
    }
})
home1.addEventListener("click", () => {
    window.location.href = '../LandingHome/index.html';

})

logout.addEventListener("click", () => {
    window.location.href = "../Login/login.html";
    localStorage.removeItem('currentUser');
})

profile.addEventListener("click", () => {
    window.location.href = "../Profile/profile.html";
})

myCart.addEventListener('click', () => {
    window.location.href = './mycart.html';
})



const cardWrapper = document.querySelector('.left');
const warning = document.querySelector('.warning');
const cartList = document.querySelector('.mainCart');
let cartItems = [];
localStorage.getItem('myCart') ? cartItems = JSON.parse(localStorage.getItem('myCart')) : [];
localStorage.getItem('myCart') ? warning.classList.add('hide') : warning.classList.remove('hide');
let cartID = 0;

let total = 0;
let count = 1;
cartItems.map(product => {
    cartList.classList.remove('hide')
    product.id = cartID++;
    total += product.price;
    (localStorage.getItem('myCart')) ?
        cardWrapper.innerHTML += `
    <div class="card">
        <img class="image-top" src=${product.img} alt="${product.title}">
        <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">&#x20B9;${product.price}</p>
        </div>
        <button class='addCart'>Remove From Cart</button>
    </div>
    ` : "";
    (localStorage.getItem('myCart')) ?
        cartList.innerHTML += `
    <div class="cartlist">
        <div class="name-id">
            <div class="id">${count++}.</div>
            <div class="name">${product.title}</div>
        </div>
        <div class="price">&#x20B9;${product.price}</div>
    </div>
    ` : "";
})
let myCount = 0;
let removeItem;
document.querySelectorAll('.addCart') ? removeItem = document.querySelectorAll('.addCart') : [];
removeItem.forEach((elem) => {
    elem.setAttribute('id', myCount++);
    elem.addEventListener('click', () => {
        cartItems.map(data => {
            if (elem.id == data.id) {
                cartItems.splice(elem.id, 1);
            }
            else if (cartItems.length == 1) {
                cartItems.pop();
            }
        })
        localStorage.setItem('myCart', JSON.stringify(cartItems));
        window.location.reload();
    })
})
if (myCart.length == undefined) {
    localStorage.removeItem('myCart');
    warning.classList.remove('hide');
}
document.querySelector('.total-price').innerHTML = `&#x20B9;${total}`;

var options = {
    key: "rzp_test_HndvDkSTHCu5Io",
    amount: total * 100,
    currency: "INR",
    name: "Shoppex",
    description: "This is your order",
    theme: {
        color: "#000",
    },
    image:
        "https://i.ebayimg.com/images/g/oBoAAOSwlCxi7WkW/s-l300.png",
};

document.getElementById("checkout").onclick = function (e) {
    e.preventDefault();
    if(total>0){
        localStorage.removeItem('myCart');
        var razorPayGateway = new Razorpay(options);
        razorPayGateway.open();
    }
    else{
        alert('Add items in cart to proceed!!')
    }
}

// Script for navigation bar
const bar= document.getElementById('bar')
const close= document.getElementById('close')

const nav=document.getElementById('navbar')
if(bar){
    bar.addEventListener('click',()=>{
        nav.classList.add('active')
    })
}

if(close){
    close.addEventListener('click',()=>{
        nav.classList.remove('active')
    })
}
