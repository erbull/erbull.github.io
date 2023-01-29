// person adlı class
class person{
    constructor(){   //kurucu fonksiyonumuz. Yani bu klasstan bir object oluşturulduğında çağırmaya gerek kalmadan kendiliğinden çalışacak fonksiyon.
                                //İki parametre alıyor. per ve target. Per class ımızın adını, target ise sonucun yazdırılacağı kutuyu -div- temsil ediyor.
        eval(`c_${this.constructor.name}`).innerHTML = `constructor() çalıştı.<br/>Bir ${this.constructor.name} nesnesi oluşturuldu.`;
        eval(`c_${this.constructor.name}`).style.backgroundColor = "blue";
    }

    soyadi; //property. Property'ler, oluşacak objemizin elemanları. Bunlara her türlü değeri atayabiliriz.
    okuma = 0; //_adı property'sinden kaç kez değer okunduğunu tutacak
    yazma = 0; //_adı property'sine kaç kez değer yazıldığını (atandığını) tutacak

    #_adi;  //property, private olarak tanımlandı. Bu sayede class dışından ulaşımın sadece delege üzerinden yapılabilecek ve kontrolümüzde olacak

    set adi(newname){   //private olarak tanımlanmış _adı değişkenine değer atamak için tanımladığımız temsilci. Değer atarken bu temsilciyi -delege- kullanacağız.
                        //Bu sayede _adı dğişkenine değer atandığında veya değiştirildiğinde yapılmasını istediğimiz özel işlemler tanımlayabiliriz.
        this.yazma++;
        eval(`w_${this.constructor.name}`).innerHTML = `delege (set) mesajı :<br/>${this.constructor.name} nesnesine ${this.yazma}. kez bir değer atandı: ${newname}`;
        eval(`w_${this.constructor.name}`).style.backgroundColor = "blue";
        this._adi = newname;
    }

    get adi(){   // yine private olarak tanımlı _adı değişkeninden değer okumak için kullandığımız get fonksiyonu. Bu sayede birisi bu değeri okumak istediğinde özel işlemler tanımlayabiliriz.
        this.okuma++;
        eval(`r_${this.constructor.name}`).innerHTML = `delege (get) mesajı :<br/>${this.constructor.name} nesnesinden ${this.okuma}. kez bir değer okundu: ${this._adi}`;
        eval(`r_${this.constructor.name}`).style.backgroundColor = "blue";
    }
}

//person class'ından türetilmiş (miras alan) erkek adlı class
class erkek extends person{

}

//person class'ından türetilmiş (miras alan) kadın adlı class
class kadin extends person{

} 

//Şimdi sayfa üzerindeki kutalara tıklayarak bazı class işlemleri gerçekleştirerek sonuçları görebiliriz.
var c_person = document.querySelector("#c_person");
var c_erkek = document.querySelector("#c_erkek");
var c_kadin = document.querySelector("#c_kadin");
var w_person = document.querySelector("#w_person");
var w_erkek = document.querySelector("#w_erkek");
var w_kadin = document.querySelector("#w_kadin");
var r_person = document.querySelector("#r_person");
var r_erkek = document.querySelector("#r_erkek");
var r_kadin = document.querySelector("#r_kadin");

//kisi adında bir person nesnesi oluşturuyoruz. Class içerisindeki constructor() metodu çağırmadığımız halde otomatik olarak çalışır.
var kisi = null;
c_person.addEventListener("click", function(){
    if(kisi == null) kisi = new person();
})
        
//ikinci kutuya tıkladığımızda person class ı içerisinde tanımladığımız _adi değişkenine (property) değer atıyoruz.
//Fakat değer get ve set fonksiyonları ile tanımladığımız delegeler üzerinden yapıldı. 
//Kutuya her tıkladığımızda yeniden değer atıyoruz ve delege kutu içerisine olayı yazarak bize bildiriyor.
w_person.addEventListener("click", function(){
    if (kisi == null) alert("Henüz bir nesne oluşturmadınız.");
    else kisi.adi = "Bülent";
})

//üçüncü kutu, yukarıda tanımlı işlemi bu defa get fonksiyonunu kullanarak yapıyor. Yani _adi değişkeninden değer okurken çalışıyor.
r_person.addEventListener("click", function(){
    let a;
    if (kisi == null) alert("Henüz bir nesne oluşturmadınız.");
    else a = kisi.adi;
})

//Aynı işlemleri, person class'ından miras alan erkek ve kadın klasslarından oluşturduğumuz nesneler için deneyelim.
//Dikkat ederseniz bu classlar içerisinde hiç bir özellik veya metod tanımlamadığımız halde person class ında tanımladığımız metodlar çalışıyor.
var er = null;
c_erkek.addEventListener("click", function(){
    if (er == null) er = new erkek();
})

w_erkek.addEventListener("click", function(){
    if (er == null) alert("Henüz bir nesne oluşturmadınız.");
    else er.adi = "Erdoğan";
})

r_erkek.addEventListener("click", function(){
    let a;
    if (er == null) alert("Henüz bir nesne oluşturmadınız.");
    else a = er.adi;
})

//Bir de kadın class'ından bir nesne oluşturmayı deneyelim.
var ka = null;
c_kadin.addEventListener("click", function(){
    if (ka == null) ka = new kadin();
})

w_kadin.addEventListener("click", function(){
    if (ka == null) alert("Henüz bir nesne oluşturmadınız.");
    else ka.adi = "Nida";
})

r_kadin.addEventListener("click", function(){
    let a;
    if (ka == null) alert("Henüz bir nesne oluşturmadınız.");
    else a = ka.adi;
})
