// Cerate Navigation bar
let nav = document.createElement("div");
nav.id = "navbar";
nav.style.position = "sticky";
nav.style.display = "flex";
nav.style.width = "75%";
nav.style.left = "12.5%";
nav.style.height = "80px";
nav.style.backgroundImage = "linear-gradient(#020312 70%, transparent)";		
nav.style.justifyContent = "space-between";
nav.style.alignItems = "center";
document.body.appendChild(nav);	
				
// Navigation bar image
let img = document.createElement("img");
img.src = "img/logo.png";
img.style.height = "100%";
img.style.marginLeft = "1em";
document.getElementById("navbar").appendChild(img);	

// Navigation menu
let items = ["Home", "About", "Portfolio", "Contact"];
let menu = document.createElement("div");
menu.id = "menu";
menu.style.display = "flex";
menu.style.alignItems = "center";
document.getElementById("navbar").appendChild(menu);

//Menu İtems
items.forEach(element => //foreach array değişken elemanları için bir döngü metodudur. "for(i=1; i<items.length; i++)" işlevi görür.
{
	let item = document.createElement("div"); 
	item.innerHTML = '<a href="#' + element + '" style="text-decoration: none; color: white">' + element + '</a>';
	item.style.marginLeft = "1em";
	item.style.marginRight = "1em";
	document.getElementById("menu").appendChild(item);
});

//login buttons
let loginbtn = document.createElement("div");
loginbtn.id = "nav-login";
loginbtn.style.display = "flex";
loginbtn.style.justifyContent = "center";
loginbtn.style.backgroundColor = "gray";
loginbtn.style.width = "70px";
loginbtn.style.borderRadius = "5px";
loginbtn.style.marginInline = "10px";
loginbtn.style.padding = "10px";
loginbtn.innerText = "Giriş";
loginbtn.onclick = function(){login()};
document.getElementById("menu").appendChild(loginbtn);

let signupbtn = document.createElement("div");
signupbtn.id = "nav-signup";
signupbtn.style.display = "flex";
signupbtn.style.justifyContent = "center";
signupbtn.style.backgroundColor = "gray";
signupbtn.style.width = "70px";
signupbtn.style.borderRadius = "5px";
signupbtn.style.padding = "10px";
signupbtn.innerText = "Kaydol";
signupbtn.onclick = function(){signupform()};
document.getElementById("menu").appendChild(signupbtn);

