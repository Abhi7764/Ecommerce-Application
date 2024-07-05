let div = document.getElementById("div");
let loadmore = document.getElementById("loadmore");
let navul = document.getElementById("navul");
let showCart = document.getElementById("showCart");

showCart.addEventListener("click",()=>{
    //console.log("cart")
    if (localStorage.getItem("loged")) {
        window.location.href = "addToCart.html";
    }
    else{
        window.location.href = "login.html";
    }
});

if (localStorage.getItem("loged")) {
    let logoutBtn = document.createElement("button");
    logoutBtn.setAttribute("class", "navBtn");
    logoutBtn.innerText = "Logout";
    logoutBtn.addEventListener("click", logoutUser);
    navul.appendChild(logoutBtn); 
}

function showLoginSignup(){
    console.log("show login sign function")
    let loginBtn = document.createElement("button");
    loginBtn.setAttribute("class","navBtn");
    loginBtn.innerText="Login";
    loginBtn.addEventListener("click",()=>{
        window.location.href = "login.html";
    })
    navul.appendChild(loginBtn);

    let signupBtn = document.createElement("button");
    signupBtn.setAttribute("class","navBtn");
    signupBtn.innerText="Signup";
    signupBtn.addEventListener("click",()=>{
        window.location.href = "signup.html";
    })
    navul.appendChild(signupBtn);
}

let arr = [];
let i = 0;
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("products")) {
        arr = JSON.parse(localStorage.getItem("products"));
    }
    if(!localStorage.getItem("loged")){
        showLoginSignup();
    }
   
    loadmoreItem();
    totalCartItem(); 
});

function totalCartItem(){
    if(localStorage.getItem("loged")) {
        let user = JSON.parse(localStorage.getItem("loged"));
        let cart =[];
        if(localStorage.getItem('carts')){
            cart = JSON.parse(localStorage.getItem('carts'));
        }
        cart = cart.filter((item)=>{
            if(item.username == user){
                return true;
            }
        })
        let spanItem = document.getElementById("spanItem");
        if(cart.length >0){  
            spanItem.innerText= `${cart.length}`;
        }
    }   
}

loadmore.addEventListener("click",loadmoreItem);

function loadmoreItem(){
    let count = 0;
    for (; i < arr.length; i++) {
        createProduct(arr[i]);
        count++;
        if (count == 6) {
            i++;
            break;
        }
    }
    if (i == arr.length) {
        loadmore.remove();
    }
}

function createProduct(obj) {
    let divChild = document.createElement("div");
    divChild.setAttribute("class", "Abhi");
    divChild.setAttribute("id", `${obj.id}`);

    let img = document.createElement("img");
    img.setAttribute("class", "img");
    img.src = `${obj.img}`;
    divChild.appendChild(img);

    let p1 = document.createElement("p");
    p1.innerText = obj.productName;
    divChild.appendChild(p1);

    let p2 = document.createElement("p");
    p2.innerText = `₹${obj.price}`;
    divChild.appendChild(p2);

    let p3 = document.createElement("p");
    p3.innerText = obj.desc;
    divChild.appendChild(p3);

    let addToCart = document.createElement("button");
    addToCart.setAttribute("id", `${obj.id}`);

    addToCart.innerText = "Add to cart";
    addToCart.addEventListener("click", addToCartProduct);
    divChild.appendChild(addToCart);

    div.appendChild(divChild);
    //console.log(arr[i]);
}

function addToCartProduct(e) {
    if (localStorage.getItem("loged")) {
        let cart = [];
        let user = JSON.parse(localStorage.getItem("loged"));

        if (localStorage.getItem('carts')) {
            cart = JSON.parse(localStorage.getItem('carts'));
        }

        let parent = e.target.parentNode;
        let id = parent.getAttribute("id");

        if(cart.length>0){
            let found= cart.find((item)=>{
                if(item.username == user){
                    if(item.id==id){
                        return true;
                    }
                }
            })
            if(found){
                cart.forEach((item)=>{
                    if(item.username==user){
                        if(item.id==id){
                            item.qty++;
                        }
                    } 
                }) 
                addLocalStorage(cart);
            }else{
                //console.log("already element in cart");
                arr.forEach((item)=>{
                    if(item.id==id){
                        item.username = `${user}`;
                        cart.push(item);
                    }
                })
                addLocalStorage(cart);
                totalCartItem();
            }
        }else{
            console.log("Cart have Zero items")
            arr.forEach((item)=>{
                item.username = `${user}`;
                if(item.id==id){
                    cart.push(item);
                }
            })
            addLocalStorage(cart);
            //totalCartItem();
        }
    }else{
        window.location.href="login.html"
    }
}   

function addLocalStorage(cart) {
    // let user;
    // if(localStorage.getItem("loged")){
    //     user = JSON.parse(localStorage.getItem("loged"));
    // }
    //console.log(user);
    localStorage.setItem('carts', JSON.stringify(cart));
}

function logoutUser() {
    localStorage.removeItem("loged");
    window.location.href = "login.html";
}
