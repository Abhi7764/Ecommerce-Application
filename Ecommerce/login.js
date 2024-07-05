let username = document.getElementById('username');
let password = document.getElementById('password');
let btn = document.getElementById('btn');

// let signup = document.getElementById('signup');
// signup.addEventListener('click',()=>{
//    window.location.href = "signup.html";
// })

btn.addEventListener('click', () => {
   if (username.value != "" && password.value != "") {
      if (localStorage.getItem('signup')) {
         let wrong = document.getElementById('wrong');

         let users = JSON.parse(localStorage.getItem('signup'));
         let user = users.filter((item) => {
            if (item.username === username.value && item.password === password.value) {
               return true;
            }
         })

         if (user.length > 0) {
            console.log("Admin loggin");
            if (user[0].username === 'Admin' && user[0].password === '123') {
               window.location.href = "adminProducts.html";

            } else {
               //Users
               window.location.href = "products.html";
            }
            localStorage.setItem('loged', JSON.stringify(user[0].username));

            //wrong.innerText='Login successfully';
         } else {
            wrong.innerText = 'Invalid username/password';
            password.value = "";
         }
      } else {
         wrong.innerText = 'create new account';
      }
   } else {
      wrong.innerText = 'fill username/password';
   }
});