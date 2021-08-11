document.getElementById('proceed').onclick=()=>{
    let fname=document.getElementById('checkout-firstname').value;
    let lname=document.getElementById('checkout-lastname').value;
    let address=document.getElementById('checkout-address').value;
    let city=document.getElementById('checkout-city').value;
    let zip=document.getElementById('checkout-zip').value;
    let country=document.getElementById('checkout-country').value;

    
            
        
    
    
    
    add({
        fname:fname,lname:lname,address:address,city:city,zip:zip,country:country
    },'order')
    
    
    window.location='../payment/payment.html'
    

}
let y=parseInt(localStorage.getItem("total"))+5;
document.getElementById('ship-total').innerHTML="$"+localStorage.getItem("total");
document.getElementById('ship-total2').innerHTML="$"+y;


var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB,
        IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction,
        baseName = "products"
    
    function logerr(err) {
        console.log(err);
    }
    
    function connectDB(f, storeName) {
    
        var request = indexedDB.open(baseName, 1);
        request.onerror = logerr;
        request.onsuccess = function () {
            f(request.result);
        }
        request.onupgradeneeded = function (e) {
            var Db = e.currentTarget.result;
    
    
    
            if (!Db.objectStoreNames.contains(storeName)) {
                var store = Db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
            }
            connectDB(f);
        }
    }
    
    
    window.onload=()=>{
        if(localStorage.getItem("login")=="true"){
            document.getElementById("nav-login").innerHTML="Profile";
    
            document.getElementById("nav-login").onclick=()=>{
                window.location="../profile/profile.html"
    
            }
            document.getElementById("login-profile").onclick=()=>{
                window.location="../profile/profile.html"
    
            }
        }
        else{
            document.getElementById("nav-login").innerHTML="Login"
            document.getElementById("nav-login").onclick=()=>{
            window.location="../loginpage/login.html"
    
            }
            document.getElementById("login-profile").onclick=()=>{
                window.location="../loginpage/login.html"
    
            }
    
        }
    }
    function add(obj, storeName, info) {
        info = typeof info !== 'undefined' ? false : true;
        connectDB(function (db) {
            var transaction = db.transaction([storeName], "readwrite");
            var objectStore = transaction.objectStore(storeName);
            var objectStoreRequest = objectStore.add(obj);
            objectStoreRequest.onerror = logerr;
            objectStoreRequest.onsuccess = function () {
                if (info) { console.log("Rows has been added"); }
                else { console.log("Rows has been updated"); }
                console.info(objectStoreRequest.result);
            }
        }, storeName);
    }
    
    document.getElementById('search-btn').onclick = () => {
        let val = document.getElementById('search').value;
        localStorage.setItem("search", val);
        window.location = '../details/details.html'
    
    }