let posX = 0, posY = 0, startPosX = 0, startPosY = 0;
let rotX = 30, rotY = 30, rotZ = 0;
let cube = document.querySelector(".cube");

cubeSize();
cube.style.transform = "rotateX(" + rotX + "deg) rotateY(" + rotY + "deg) rotateZ(" + rotZ + "deg)";
document.getElementById("x").value = rotX;
document.getElementById("y").value = rotY;
document.getElementById("z").value = rotZ;

function cubeSize(){
    let size = document.getElementById("size").value;
    if(!isNaN(Number(size))){
        cube.style.width = size + "px";
        cube.style.height = size + "px";

        document.querySelector(".front").style.transform = "translateZ("+ size / 2 + "px)";
        document.querySelector(".back").style.transform = "rotateY(180deg) translateZ("+ size / 2 + "px)";
        document.querySelector(".left").style.transform = "rotateY(90deg) translateZ("+ size / 2 + "px)";
        document.querySelector(".right").style.transform = "rotateY(270deg) translateZ("+ size / 2 + "px)";
        document.querySelector(".top").style.transform = "rotateX(90deg) translateZ("+ size / 2 + "px)";
        document.querySelector(".bottom").style.transform = "rotateX(270deg) translateZ("+ size / 2 + "px)";					
    };
}

function rotate(){
    document.getElementById("x").value = document.getElementById("x").value % 360;
    document.getElementById("y").value = document.getElementById("y").value % 360;
    document.getElementById("z").value = document.getElementById("z").value % 360;

    rotX = document.getElementById("x").value;
    rotY = document.getElementById("y").value;
    rotZ = document.getElementById("z").value;

    cube.style.transform = "rotateX(" + rotX +"deg) rotateY(" + rotY + "deg) rotateZ("+ rotZ +"deg)";
}

function opac(){
    let faces = document.querySelectorAll(".face");
    if(document.getElementById("opac").value > 100) document.getElementById("opac").value = 100;

    faces.forEach(element => {
        element.style.opacity = document.getElementById("opac").value / 100;
    })
}

function perspect(){
    let pers = document.getElementById("pers").value;

    document.querySelector(".cube-base").style.perspective = pers + "px";
}		

// when the user clicks down on the element
cube.addEventListener('mousedown', function(e){
    e.preventDefault();

    // get the starting position of the cursor
    startPosX = e.clientX;
    startPosY = e.clientY;

    if(document.getElementById("move").value == "Move"){
        document.addEventListener('mousemove', mouseRotate);
        document.addEventListener('mouseup', function(){
            document.removeEventListener('mousemove', mouseRotate);
        });					
    }
    else{
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', function(){
            document.removeEventListener('mousemove', mouseMove);
        });
    }
});

function mouseMove(e) {
    // calculate the new position
    posX = startPosX - e.clientX;
    posY = startPosY - e.clientY;

    // with each move we also want to update the start X and Y
    startPosX = e.clientX;
    startPosY = e.clientY;

    // set the element's new position:
    cube.style.top = (cube.offsetTop - posY) + "px";
    cube.style.left = (cube.offsetLeft - posX) + "px";
}

function mouseRotate(e) {
    // calculate the new position
    rotY = (rotY + e.clientX - startPosX) % 360;
    rotX = (rotX + startPosY - e.clientY) % 360;

    // with each move we also want to update the start X and Y
    startPosX = e.clientX;
    startPosY = e.clientY;

    // set the element's new position:
    cube.style.transform = "rotateX(" + rotX + "deg) rotateY(" + rotY + "deg) rotateZ(" + rotZ + "deg)";
    document.getElementById("x").value = rotX;
    document.getElementById("y").value = rotY;
}

function modChange(){
    if(document.getElementById("move").value == "Move"){
        document.getElementById("move").value = "Rotate";
        document.getElementById("move-note").innerText = "Küpü mausunuzla tutup taşıyabilirsiniz.";
    } else {
        document.getElementById("move").value = "Move";
        document.getElementById("move-note").innerText = "Küpü mousunuzla tutup çevirebilirsiniz.";
    }
}

function changeCursor(){
    document.body.style.cursor = "move";
}

function cursorDefault(){
    document.body.style.cursor = "auto";
}
