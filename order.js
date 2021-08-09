window.onload = () => {
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
    let request = window.indexedDB.open("products")
        , db, tx, store, index, tx2, storeorders, indexorders
        ;
    window.indexedDB = window.indexedDB || window.mozIndexedDB ||
        window.webkitIndexedDB || window.msIndexedDB;


    request.onupgradeneeded = (e) => {

    }

    request.onerror = (e) => {
        console.log('error ' + e.target.errorCode);
    }


    request.onsuccess = (e) => {
        db = request.result;
        tx2 = db.transaction("orders", "readwrite");
        storeorders = tx2.objectStore("orders");
        indexorders = storeorders.index("name");



        db.onerror = (e) => {
            console.log('error ' + e.target.errorCode);
        }


        let items = storeorders.getAll();


        items.onsuccess = () => {
            let s1 = items.result.length;


            for (let i = 0; i < s1; i++) {
                if (items.result[i].mail == localStorage.getItem("mail")) {
                    var html = `<div class="product-image">
                    <img src="${items.result[i].image}" />
                </div>
                <div class="product-details">
                    <div class="product-title">${items.result[i].name}</div>
                    <p class="product-description">${items.result[i].description[0]}</p>
                </div>
                <div class="product-price">${items.result[i].price}</div>
                <div class="product-quantity">
                </div>
                <div class="product-removal">
                    <button class="remove-product ${"remove-products"+i}">
                        Cancel Order
                    </button>
                </div>`
        

                    var wrapper = document.createElement('div');
                    wrapper.innerHTML = html;
                    wrapper.setAttribute('class', 'product')

                    document.getElementById('shopping-order').appendChild(wrapper);
                    document.getElementsByClassName("remove-products"+i)[0].onclick = () => {
                        del(items.result[i].mid);
                        window.location.reload();
                    }
                    

                }
            }


        }

    }
}
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB,
    IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction,
    baseName = "products",
    storeName = "orders";

function logerr(err) {
    console.log(err);
}
function del(id, info) {
    info = typeof info !== 'undefined' ? false : true;
    connectDB(function (db) {
        var transaction = db.transaction(["orders"], "readwrite");
        var objectStore = transaction.objectStore("orders");
        var objectStoreRequest = objectStore.delete(id);
        objectStoreRequest.onerror = logerr;
        objectStoreRequest.onsuccess = function () {
            if (info)
                console.log("Rows has been deleted: ", id);
        }
    });
}
function connectDB(f) {
    var request = indexedDB.open("products", 1);
    request.onerror = logerr;
    request.onsuccess = function () {
        f(request.result);
    }
    request.onupgradeneeded = function (e) {
        var Db = e.currentTarget.result;



        //Create store
        if (!Db.objectStoreNames.contains(storeName)) {
            var store = Db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
        }
        connectDB(f);
    }
}

document.getElementById('search-btn').onclick = () => {
    let val = document.getElementById('search').value;
    localStorage.setItem("search", val);
    window.location = '../details/details.html'

}