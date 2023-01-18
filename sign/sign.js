let users = []

function signupform(){
    document.getElementById("not-logged").style.display = "none";
    document.getElementById("success").style.display = "none";
    document.getElementById("logged").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("signup").style.display = "block";
}

function signup(){
    if(verify()){
        const user = {
            username : document.querySelector('#username').value,
            name : document.querySelector('#name').value,
            surname : document.querySelector('#surname').value,
            mail : document.querySelector('#mail').value,
            password : document.querySelector('#password').value
        }
        
        users.push(user);
        document.getElementById("signup").style.display = "none";
        document.getElementById("success").style.display = "block";
    }     
}

function verify(){
    let username = document.querySelector('#username').value;
    let name = document.querySelector('#name').value;
    let surname = document.querySelector('#surname').value;
    let mail = document.querySelector('#mail').value;
    let pwd1 = document.querySelector('#password').value;
    let pwd2 = document.querySelector('#verify').value;
    let result = true;

    if(username == ""){
        document.getElementById("w-username").innerText = "Lütfen kullanıcı adınızı giriniz!";
        result = false;
    }
    else {
        users.forEach(element => {
            if (element.name == name){
                document.getElementById("w-username").innerText = "Sistemde kayıtlı bir kullanıcı ismi seçtiniz!";
                result = false;
            }
        })
        if(result) document.getElementById("w-username").innerText = "";
    }
    
    if(name == ""){
        document.getElementById("w-name").innerText = "Lütfen adınızı giriniz!";
        result = false;
    }
    else document.getElementById("w-name").innerText = "";

    if(surname == ""){
        document.getElementById("w-surname").innerText = "Lütfen soyadınızı giriniz!";
        result = false;
    }
    else document.getElementById("w-surname").innerText = "";

    if(mail == ""){
        document.getElementById("w-mail").innerText = "Lütfen email adresinizi giriniz!";
        result = false;
    }
    else document.getElementById("w-mail").innerText = "";

    if(pwd1 == ""){
        document.getElementById("w-pwd").innerText = "Lütfen bir şifre belirleyiniz!";
        result = false;
    }
    else if(pwd1!==pwd2){
        document.getElementById("w-pwd").innerText = "Şifreleriniz uyumsuz!";
        result = false;
    }
    else document.getElementById("w-pwd").innerText = "";

    return result;
}

function login(){
    document.getElementById("not-logged").style.display = "none";
    document.getElementById("success").style.display = "none";
    document.getElementById("logged").style.display = "none";
    document.getElementById("signup").style.display = "none";
    document.getElementById("login").style.display = "block";
}

function sign(){
    let uname = document.querySelector('#userName').value;
    let pass = document.querySelector('#passwd').value;

    users.forEach(element=>{
        if(element["username"] == uname && element["password"] == pass){
            signed(element);
        }
        else{
            document.getElementById("w-sign").innerText = "Kullanıcı adınız veya şifreniz hatalı!";
        }
    })
}

function signed(user){
    document.getElementById("login").style.display = "none";
    document.getElementById("nav-login").style.display = "none";
    document.getElementById("nav-signup").style.display = "none";
    document.getElementById("logged").style.display = "block";

    const name = document.createElement("div");
    name.innerHTML = "<p>" + user.name + " " + user.surname;
    name.style.color = "red";
    document.getElementById("menu").appendChild(name);
    document.getElementById("_name").innerText = user.name + " " + user.surname + " ";
    document.getElementById("_mail").innerText = user.mail + " ";
}