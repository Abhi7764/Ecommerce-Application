let username = document.getElementById('username');
let password = document.getElementById('password');
let btn = document.getElementById('btn');
let wrong = document.getElementById('wrong');
let arr = [];

if (localStorage.getItem('signup')) {
    arr = JSON.parse(localStorage.getItem('signup'));
}

btn.addEventListener('click', () => {
    if (username.value != "" && password.value != "") {
        let user = arr.filter((item) => {
            if (item.username == username.value) {
                return true;
            }
        })

        if (user.length > 0) {
            wrong.innerText = 'user already exists ? Login now';
            // window.location.href = "login.html";
        }
        else {
            let obj = {};
            obj.username = username.value;
            obj.password = password.value;
            // obj.role="user";

            arr.push(obj);
            localStorage.setItem('signup', JSON.stringify(arr));
            wrong.innerText = 'Signup successful';
            window.location.href = "login.html";
        }
    }
    else {
        wrong.innerText = 'fill username/password'
    }
});