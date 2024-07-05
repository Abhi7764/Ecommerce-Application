let container = document.getElementById("container");
let arr = [];

if (localStorage.getItem("loged")) {

  let user = JSON.parse(localStorage.getItem("loged"));
  let logoutBtn = document.createElement("button");
  logoutBtn.setAttribute("id", "logout");
  logoutBtn.innerText = "Logout";
  logoutBtn.addEventListener("click", logoutUser);
  document.body.appendChild(logoutBtn);
  showTotalPrice();

  function getData() {
    let data = [];
    if (localStorage.getItem(`carts`)) {
      data = JSON.parse(localStorage.getItem(`carts`));
    }
    return data;
  }

  function saveData() {
    localStorage.setItem('carts', JSON.stringify(arr));
  }

  document.addEventListener("DOMContentLoaded", () => {
    arr = getData();

    arr.forEach((item) => {
      if (item.username == user) {
        console.log(user)
        // console.log(typeof item.username, typeof user);
        createProduct(item);
      }
    });
  });

  function createProduct(obj) {
    let divChild = document.createElement("div");
    divChild.setAttribute("class", "childDiv");
    divChild.setAttribute("id", `${obj.id}`);

    let img = document.createElement("img");
    img.setAttribute("class", "img");
    img.src = `${obj.img}`;
    divChild.appendChild(img);

    let p1 = document.createElement("p");
    p1.innerText = obj.productName;
    divChild.appendChild(p1);

    let p2 = document.createElement("p");
    p2.innerText = `${obj.price * obj.qty}`;
    divChild.appendChild(p2);

    let p3 = document.createElement("p");
    p3.innerText = obj.desc;
    divChild.appendChild(p3);


    let btn1 = document.createElement("button");
    btn1.setAttribute("id", `${obj.id}`);
    btn1.innerText = "-";
    btn1.addEventListener("click", decreaseQuantity);
    divChild.appendChild(btn1);

    let p4 = document.createElement("p");
    p4.innerText = obj.qty;
    divChild.appendChild(p4);

    let btn2 = document.createElement("button");
    btn2.setAttribute("id", `${obj.id}`);
    btn2.innerText = "+";
    btn2.addEventListener("click", increaseQuantity);
    divChild.appendChild(btn2);

    let btn3 = document.createElement("button");
    btn3.setAttribute("id", `${obj.id}`);
    btn3.innerText = "remove";
    btn3.addEventListener("click", removeItem);
    divChild.appendChild(btn3);

    container.appendChild(divChild);
  }

  function logoutUser() {
    localStorage.removeItem("loged");
    window.location.href = "login.html";
  }

  function decreaseQuantity(e) {
    let parent = e.target.parentNode;
    let para = parent.querySelectorAll("p");
    let id = parent.getAttribute("id");
    arr = getData();

    arr.forEach((item) => {
      if (item.username == user) {
        if (id == item.id) {
          if (item.qty > 1) {
            para[1].innerText = `${(item.price * item.qty) - item.price}`;
            para[3].innerText = `${--item.qty}`;
          }
        }
      }
    });
    saveData();
    showTotalPrice();
  }

  function increaseQuantity(e) {
    let parent = e.target.parentNode;
    let para = parent.querySelectorAll("p");
    let id = parent.getAttribute("id");
    arr = getData();
    arr.forEach((item) => {
      if (item.username == user) {
        if (id == item.id) {
          let price = parseInt(item.price) * parseInt(item.qty);
          //console.log(typeof price);
          price += parseInt(item.price);
          para[1].innerText = `${price}`;
          para[3].innerText = `${++item.qty}`;
        }
      }

    });
    saveData();
    showTotalPrice();
  }

  function removeItem(e) {
    let parent = e.target.parentNode;
    let id = parent.getAttribute("id");
    arr = getData();
    arr = arr.filter((item) => {
      if (id != item.id) {
        return true;
      }
    });
    saveData();
    parent.remove();
    showTotalPrice();
    // if(arr.length == 0) {
    //   localStorage.removeItem(`${user}`);
    // }
  }

  function showTotalPrice() {
    let totalPrice = 0;
    arr = getData();
    arr.forEach((item) => {
      if (item.username === user) {
        totalPrice += parseInt(item.price * item.qty);
      }
    });
    let h2 = document.getElementById("showPrice");
    if (totalPrice > 0) {
      h2.innerHTML = `Total Price : ₹${totalPrice} <a href="/ordernow">Order Now</a>`;
    }
    else {
      h2.innerText = "Cart is Empty";
    }
    //console.log(totalPrice);
  }
}
else {
  window.location.href = 'login.html';
}
