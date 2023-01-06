let str = '<nav class="navbar navbar-expand-md navbar-dark fixed-top">' +
          '<div class="container">'+
            '<a class="navbar-brand" href="#home">'+
              '<img class="logo" src="../img/logo.png"/>'+
            '</a>'+
            '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main_nav">'+
              '<span class="navbar-toggler-icon"></span>'+
            '</button>'+
            '<div id="main_nav" class="collapse navbar-collapse justify-content-end">'+
              '<ul class="navbar-nav">'+
                '<li class="nav-item" onmouseover="hareket(this)"><a class="nav-link" href="../index.html#home">Ana Sayfa</a></li>'+
                '<li class="nav-item" onmouseover="hareket(this)"><a class="nav-link" href="../index.html#fundemental">Temel Bilgiler</a></li>'+
                '<li class="nav-item" onmouseover="hareket(this)"><a class="nav-link" href="../index.html#programming">Programlama</a></li>'+
                '<li class="nav-item" onmouseover="hareket(this)"><a class="nav-link" href="../index.html#_html">HTML</a></li>'+
                '<li class="nav-item" onmouseover="hareket(this)"><a class="nav-link" href="../index.html#_css">CSS</a></li>'+
                '<li class="nav-item" onmouseover="hareket(this)"><a class="nav-link" href="../index.html#_java">JavaScript</a></li>'+
                '<div id="animation" class="animation"></div>'+
              '</ul>'+
            '</div>'+
          '</div>'+
        '</nav>';

document.getElementById("nav-menu").innerHTML = str;

function hareket(e){
  var target = document.getElementById("animation");
  target.style.width = window.getComputedStyle(e).width;
  target.style.left = e.offsetLeft+"px";
};