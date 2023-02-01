function openCalculator(){
    let rss = document.querySelector(".rss");
    if (rss == null) calculator();
    else if (rss.style.display === "none") rss.style.display = "block";
    else rss.style.display = "none";
}

function calculator(){
    let sum = 0, mem = null; strNumber = "", strOp = ""; 

    // Hesap makinesi dış çerçeve
    let rss = document.createElement("div");
    rss.classList.add("rss"); 
    document.body.appendChild(rss);  

    //Hesap makinesi başlık Çubuğu
    let titlebar = document.createElement("div");
    titlebar.classList.add("titlebar");
    rss.appendChild(titlebar);
    
    let bulets = document.createElement("div");
    bulets.classList.add("bulets"); 
    bulets.innerHTML = "<div></div><div></div><div></div>"
    titlebar.appendChild(bulets);

    let titleTxt = document.createElement("div");
    titleTxt.classList.add("title"); 
    titleTxt.innerHTML = "Calculator"
    titlebar.appendChild(titleTxt);

    let close = document.createElement("div");
    close.classList.add("close"); 
    close.innerHTML = "<div id='close'>X<div>"
    titlebar.appendChild(close);

    //Ekran
    let screen = document.createElement("div");
    screen.classList.add("screen"); 
    rss.appendChild(screen);

    //Üst bilgi alanı
    let header = document.createElement("div");
    header.id = "header"; 
    screen.appendChild(header);
    
    //Memory alanı
    let spnMem = document.createElement("span");
    spnMem.id = "spnMem";
    header.appendChild(spnMem);

     //Toplam alanı
     let divSum = document.createElement("div");
     header.appendChild(divSum);   

    let spnSum = document.createElement("span");
    spnSum.id = "spnSum"; 
    spnSum.innerHTML = "0";
    divSum.appendChild(spnSum);

    let spnOp = document.createElement("span");
    spnOp.style.marginLeft = "5px";
    divSum.appendChild(spnOp);

    //Yazma alanı
    let divStr = document.createElement("div");
    divStr.id = "divStr"; 
    divStr.innerHTML = "0";
    screen.appendChild(divStr);

    //Tuş takımı çerçevesi
    let grid = document.createElement("div");
    grid.classList.add("grid"); 
    rss.appendChild(grid);

    //Tuşları oluşturuyoruz.
    let strKeys = ["MC", "M+", "M-", "MR", "C", "CE", "/", "x", "7", "8", "9", "+", "4", "5", "6", "-", "1", "2", "3", "=", "+-", "0", "."]
    
    strKeys.forEach(el =>{
        let divKey = document.createElement("div");
        if (el == "=") divKey.style.height = "calc(200% + 8px)";
        divKey.innerText = el;
        grid.appendChild(divKey);

        divKey.addEventListener("mousedown", function(){
            this.classList.add("active");

            this.addEventListener('mouseup', function(){
                this.classList.remove("active");
            });
    
            keyWrite(el);
        });

        document.addEventListener("keypress", function(e){
            let key = e.key;
            if(e.key == "Enter") key = "=";
            
            keyWrite(key);
        });
    })

    function keyWrite(key){
        switch(key){
            case "MC":
                mem = null;
                spnMem.innerText = "";
                break;
    
            case "M+":
                if(mem == null){
                    mem = Number(divStr.innerText);
                }
                else{
                    mem += Number(divStr.innerText);                
                }

                write(spnMem, mem, 12);
                break;
    
            case "M-":
                if(mem == null){
                    mem = 0 - Number(divStr.innerText);
                }
                else{
                    mem -= Number(divStr.innerText);                
                }

                write(spnMem, mem, 12);
                break;
    
            case "MR":
                if(mem != null){
                    write(divStr, mem, 12);               
                }
                break;
            
            case "C":
                _number = "";
                divStr.innerText = "0";
                break;
    
            case "CE":
                    strNumber = "";
                    sum = 0;
                    spnSum.innerText = "0";
                    divStr.innerText = "0";
                    break;
    
            case "+-":
                strNumber = strNumber == "" ? strNumber + "-" : String(-Number(strNumber));
                divStr.innerText = strNumber;
                break;
    
            case "0" : case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": case ".":
                if(lengthControl(strNumber) > 12) break;
                if(strNumber.split(".").length > 1 && key == ".") break;
                
                if(strOp == "="){
                  sum = 0;
                  spnSum.innerText = "0"; 
                } 
                strNumber += key;
                divStr.innerText = strNumber;
                break;
            
            case "+": case "-": case "X": case "x": case "*": case "/":
                if(key == "X" || key == "*") key = "x";
                calculate();
                write(spnSum, sum, 12);
                strNumber = "";
                strOp = key;
                spnOp.innerText = strOp;
                break;
    
            case "=":
                calculate();
                write(spnSum, sum, 12);
                spnOp.innerText = "";
                write(divStr, sum, 16);
                strNumber = "";
                strOp = key;
        }
    }
    
    function calculate(){
        switch(strOp){
            case "+": case "": case "=":
                sum += Number(strNumber);
                break;
    
            case "-":
                sum -= Number(strNumber); 
                break;
            
            case "X": case "x": case "*":
                sum *= Number(strNumber);
                break; 
    
            case "/":
                sum /= Number(strNumber); 
                break;
        }
    }

    function write(el, num, len){
        el.innerText = lengthControl(String(num))>len ? num.toPrecision(8) : String(num);
    }

    //Yazdırılacak sayı için uzunluk kontrolü
    function lengthControl(_str){
        let _strs = _str.split(".");
        if(_strs.length > 1){  //yazılacak sayının uzunluğunu kontrol et
            return _strs[0].length + _strs[1].length;
        }
        else{
            return _str.length ;
        }
    }
    
    //Hesap makinesini ekran üzerinde taşımak için
    
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

    
    document.querySelector("#close").addEventListener("click", function(){
        rss.style.display = "none";
    });
}




