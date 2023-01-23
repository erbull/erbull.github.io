let _number = "", _sum = 0, _op = "", m = null; 

let keys = document.querySelectorAll(".grid div");
keys.forEach(function(element, index) {
    element.addEventListener('mousedown', function(e){
        e.preventDefault();
        this.classList.add("active");

        this.addEventListener('mouseup', function(){
            this.classList.remove("active");
        });

        strWrite(element.innerHTML);
    });
});

document.addEventListener("keypress", function(e){
    let _key = e.key;
    if(e.key == "Enter") _key = "=";
    strWrite(_key);
});

function strWrite(_key){
    switch(_key){
        case "MC":
            m = null;
            document.getElementById("M").innerHTML = "";
            break;

        case "M+":
            if(m == null){
                m = Number(document.getElementById("str").innerHTML);
            }
            else{
                m = m + Number(document.getElementById("str").innerHTML);                
            }
            document.getElementById("M").innerHTML = String(m);
            break;

        case "M-":
            if(m == null){
                m = 0 - Number(document.getElementById("str").innerHTML);
            }
            else{
                m = m - Number(document.getElementById("str").innerHTML);                
            }
            document.getElementById("M").innerHTML = String(m);
            break;

        case "MR":
            if(m != null){
                _number = String(m);
                document.getElementById("str").innerHTML = _number;                
            }
            break;
        
        case "C":
            _number = "";
            document.getElementById("str").innerHTML = "0";
            break;

        case "CE":
                _number = "";
                _sum = 0;
                document.getElementById("sum").innerHTML = "0";
                document.getElementById("str").innerHTML = "0";
                break;

        case "+-":
            _number = _number == "" ? _number + "-" : String(-Number(_number));
            document.getElementById("str").innerHTML = _number;
            break;

        case 0 : case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": case ".":
            if(_op == "=") _sum = 0;
            _number = _number + _key;
            document.getElementById("str").innerHTML = _number;
            break;
        
        case "+": case "-": case "X": case "x": case "*": case "/":
            if(_key == "X" || _key == "*") _key = "x";
            calculate();
            document.getElementById("sum").innerHTML = _sum + " " + _key;
            _number = "";
            _op = _key;
            break;

        case "=":
            calculate();
            document.getElementById("sum").innerHTML = 0;
            document.getElementById("str").innerHTML = _sum;
            _number = "";
            _op = _key;
    }
}

function calculate(){
    switch(_op){
        case "+": case "": case "=":
            _sum += Number(_number);
            break;

        case "-":
            _sum -= Number(_number); 
            break;
        
        case "X": case "x":
            _sum *= Number(_number);
            break; 

        case "/":
            _sum /= Number(_number); 
            break;
    }
}

let startPosX = 0, startPosY = 0;
let bar = document.querySelector("#titlebar");

bar.addEventListener('mousedown', function(e){
    e.preventDefault();

    startPosX = e.clientX;
    startPosY = e.clientY;

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', function(){
        document.removeEventListener('mousemove', mouseMove);
    });
});

function mouseMove(e) {
    let posX = 0, posY = 0;
    let rss = document.querySelector(".rss");

    posX = startPosX - e.clientX;
    posY = startPosY - e.clientY;

    startPosX = e.clientX;
    startPosY = e.clientY;

    rss.style.top = (rss.offsetTop - posY) + "px";
    rss.style.left = (rss.offsetLeft - posX) + "px";
}
