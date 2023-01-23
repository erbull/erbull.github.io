function openCalculator(){
    let isOpen = document.body.querySelector(".rss");
    if (isOpen == null) calculator();
    else document.body.removeChild(isOpen);
}


function calculator(){
    let _number = "", _sum = 0, _op = "", m = null;

    // Hesap makinesi dış çerçeve
    let rss = document.createElement("div");
    rss.classList.add("rss"); 
    document.body.appendChild(rss);  

    //Hesap makinesi başlık Çubuğu
    let titlebar = document.createElement("div");
    titlebar.classList.add("titlebar");
    titlebar.innerText = "Calculator"; 
    rss.appendChild(titlebar); 

    //Ekran
    let screen = document.createElement("div");
    screen.classList.add("screen"); 
    rss.appendChild(screen);

    //Üst bilgi alanı
    let header = document.createElement("div");
    header.id = "header"; 
    screen.appendChild(header);  
    
    //Memory alanı
    let mem = document.createElement("span");
    mem.id = "mem";
    header.appendChild(mem);

    //Toplam alanı
    let sum = document.createElement("span");
    sum.id = "sum"; 
    sum.innerHTML = "0";
    header.appendChild(sum);

    //Yazma alanı
    let str = document.createElement("div");
    str.id = "str"; 
    str.innerHTML = "0";
    screen.appendChild(str);

    //Tuş takımı çerçevesi
    let grid = document.createElement("div");
    grid.classList.add("grid"); 
    rss.appendChild(grid);

    //Tuşları oluşturuyoruz.
    let _keys = ["MC", "M+", "M-", "MR", "C", "CE", "/", "x", "7", "8", "9", "+", "4", "5", "6", "-", "1", "2", "3", "=", "+-", "0", "."]
    
    _keys.forEach(el =>{
        let _key = document.createElement("div");
        if (el == "=") _key.style.height = "calc(200% + 8px)";
        _key.innerText = el;
        grid.appendChild(_key);

        _key.addEventListener("mousedown", function(){
            this.classList.add("active");

            this.addEventListener('mouseup', function(){
                this.classList.remove("active");
            });
    
            strWrite(el);
        });

        document.addEventListener("keypress", function(e){
            let key = e.key;
            if(e.key == "Enter") key = "=";
            
            strWrite(key);
        });
    })

    function strWrite(_key){
        switch(_key){
            case "MC":
                m = null;
                mem.innerText = "";
                break;
    
            case "M+":
                if(m == null){
                    m = Number(str.innerText);
                }
                else{
                    m = m + Number(str.innerText);                
                }

                mem.innerText = lengthControl(String(m))>12 ? m.toPrecision(8) : String(m);
                break;
    
            case "M-":
                if(m == null){
                    m = 0 - Number(str.innerText);
                }
                else{
                    m = m - Number(str.innerText);                
                }

                mem.innerText = lengthControl(String(m))>12 ? m.toPrecision(8) : String(m);
                break;
    
            case "MR":
                if(m != null){
                    _number = String(Number(m));
                    str.innerText = lengthControl(String(_number))>16 ? number.toPrecision(8) : _number;                
                }
                break;
            
            case "C":
                _number = "";
                str.innerText = "0";
                break;
    
            case "CE":
                    _number = "";
                    _sum = 0;
                    sum.innerText = "0";
                    str.innerText = "0";
                    break;
    
            case "+-":
                _number = _number == "" ? _number + "-" : String(-Number(_number));
                str.innerText = _number;
                break;
    
            case "0" : case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": case ".":
                if(lengthControl(_number) > 12) break;
                if(isDecimal(_number) && _key == ".") break;
                
                if(_op == "=") _sum = 0;
                _number = _number + _key;
                str.innerText = _number;
                break;
            
            case "+": case "-": case "X": case "x": case "*": case "/":
                if(_key == "X" || _key == "*") _key = "x";
                calculate();
                sum.innerText = lengthControl(String(_sum))>12 ? _sum.toPrecision(8) + " " + _key : _sum + " " + _key;
                _number = "";
                _op = _key;
                break;
    
            case "=":
                calculate();
                sum.innerText = 0;
                str.innerText = lengthControl(String(_sum))>16 ? _sum.toPrecision(8) : _sum;
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
            
            case "X": case "x": case "*":
                _sum *= Number(_number);
                break; 
    
            case "/":
                _sum /= Number(_number); 
                break;
        }
    }

    //Yazdırılacak sayı için uzunluk kontrolü
    function lengthControl(_str){
        let _strs = _str.split(".");
        if(_strs.length > 1){  //yazılacak sayının uzunluğunu ve daha önce ondalık ayracı olup olmadığını kontrol et
            return _strs[0].length + _strs[1].length;
        }
        else{
            return _str.length ;
        }
    }

    function isDecimal(_str){
        let _strs = _str.split(".");
        if(_strs.length > 1) return true;
        return false;
    }
    
    //Hesap makinesini ekran üzerinde taşımak
    
    let startPosX = 0, startPosY = 0;

    titlebar.addEventListener('mousedown', function(e){
        e.preventDefault();

        startPosX = e.clientX;
        startPosY = e.clientY;

        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', function(){
            document.removeEventListener('mousemove', mouseMove);
        });
    });

    function mouseMove(e) {
        let rss = document.querySelector(".rss");
        let posX = 0, posY = 0;

        posX = startPosX - e.clientX;
        posY = startPosY - e.clientY;

        startPosX = e.clientX;
        startPosY = e.clientY;

        rss.style.top = (rss.offsetTop - posY) + "px";
        rss.style.left = (rss.offsetLeft - posX) + "px";
    }
}




