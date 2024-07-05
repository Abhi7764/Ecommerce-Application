var arr = []; // global variable

if (localStorage.getItem("loged")) {
  let submitTask = document.getElementById("submitTask");
  submitTask.addEventListener("click", showProduct);

  document.addEventListener("DOMContentLoaded", function () {
    arr = getData();
    createProduct(arr);
  });

  function showProduct() {
    let productName = document.getElementById("pro");
    let desc = document.getElementById("desc");
    let price = document.getElementById("price");
    let img = document.getElementById("img");
    //console.log(img.value);
    let obj;
    //console.log(productName.value, desc.value, price.value,img.value);
    if (productName.value != "" && desc.value != "" && price.value != "" && img.value != "") {
      obj = createProductObj(productName.value, desc.value, price.value, img.value);
      arr.push(obj);
      storeLocalStorage(arr);
    }
    else {
      alert("fill all input box");
    }

    let data = [];
    data.push(obj);
    createProduct(data);

    // productName.value = "";
    // desc.value = "";
    // price.value = "";
    img.value = "";
  }

  function createProductObj(productName, desc, price, img) {
    const obj = {};
    obj.productName = productName;
    obj.desc = desc;
    obj.price = price;
    obj.id = `${Date.now()}`;
    obj.img = img;
    obj.qty = `${1}`;
    return obj;
  }

  function getData() {
    let data = [];
    if (localStorage.getItem("products")) {
      data = JSON.parse(localStorage.getItem("products"));
    } else {
      data = [];
    }
    return data;
  }

  function createProduct(arr) {
    let container = document.getElementById("container");

    if (arr.length > 0) {
      arr.forEach((ele) => {
        let divChild = document.createElement("div");
        divChild.setAttribute("class", "divChild");
        divChild.setAttribute("id", `${ele.id}`);

        let img = document.createElement("img");
        img.setAttribute("class", "image");
        img.src = `${ele.img}`;

        let nameP = document.createElement("p");
        nameP.innerText = ele.productName;

        let descP = document.createElement("p");
        descP.innerText = ele.desc;

        let priceP = document.createElement("p");
        priceP.innerText = `₹${ele.price}`;

        let upadate = document.createElement("button");
        upadate.setAttribute("id", `${ele.id}`);

        upadate.addEventListener("click", updateProduct);
        upadate.innerText = "Update";

        let remove = document.createElement("button");
        remove.addEventListener("click", removeProduct);

        remove.setAttribute("id", `${ele.id}`);
        remove.innerText = "Remove";

        divChild.append(img, nameP, descP, priceP, upadate, remove);
        container.appendChild(divChild);
      });
    }
  }

  function removeProduct(e) {
    let parent = e.target.parentNode;
    console.log(parent);
    let id = parent.getAttribute("id");
    console.log(id);
    arr = arr.filter((item) => {
      if (id != item.id) {
        return true;
      }
    });

    console.log(arr);
    storeLocalStorage(arr);
    parent.remove();
    // console.log(arr);
  }

  function storeLocalStorage(arr) {
    localStorage.setItem("products", JSON.stringify(arr));
  }

  function updateProduct(e) {
    let parent = e.target.parentNode;
    let para = parent.querySelectorAll("p");
    let br = document.createElement("br");

    let p1 = document.createElement("input");
    p1.setAttribute("type", "text");
    p1.setAttribute("id", "changeName");
    p1.value = para[0].innerText;
    parent.appendChild(p1);
    p1.appendChild(br);

    let p2 = document.createElement("input");
    p2.setAttribute("type", "text");
    p2.setAttribute("id", "changeDesc");
    p2.value = para[1].innerText;

    //  p2.appendChild(br);
    parent.appendChild(p2);


    let p3 = document.createElement("input");
    p3.setAttribute("type", "number");
    p3.setAttribute("id", "changePrice");
    p3.value = para[2].innerText;
    //p3.appendChild(br);
    parent.appendChild(p3);


    // let p4 = document.createElement("input");
    // p4.setAttribute("type", "text");
    // p4.setAttribute("id", "changeImg");
    // p4.value = para[3].innerText;

    let submitBtn = document.createElement("button");
    submitBtn.setAttribute("id", "btn");
    submitBtn.addEventListener("click", upadate);
    submitBtn.innerText = "Submit";

    parent.appendChild(submitBtn);

    function upadate() {
      let changeName = document.getElementById("changeName");
      let changeDesc = document.getElementById("changeDesc");
      let changePrice = document.getElementById("changePrice");
      if (changeName.value != "" && changeDesc.value != "" && changePrice.value != "") {
        para[0].innerText = changeName.value;
        para[1].innerHTML = changeDesc.value + "<br/>";
        para[2].innerText = changePrice.value;

        arr = getData();

        arr.forEach((item) => {
          if (item.id == parent.id) {
            item.productName = changeName.value;
            item.desc = changeDesc.value;
            item.price = changePrice.value;
          }
        });
        p1.remove();
        p2.remove();
        p3.remove();
        submitBtn.remove();
        storeLocalStorage(arr);
      }
      else {
        alert("Fill all input fields");
      }

    }
  }
  let logout = document.getElementById("logout");
  logout.addEventListener("click", () => {
    localStorage.removeItem("loged");
    window.location.href = "login.html";
  });
} else {
  window.location.href = "login.html";
}
