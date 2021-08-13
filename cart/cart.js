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
        , db, tx2, storecart, indexcart
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
        tx2 = db.transaction("cart", "readwrite");
        storecart = tx2.objectStore("cart");
        indexcart = storecart.index("name");



        db.onerror = (e) => {
            console.log('error ' + e.target.errorCode);
        }

        var x = 0;
        let items = storecart.getAll();


        items.onsuccess = () => {
            let s1 = items.result.length;


            for (let i = 0; i < s1; i++) {
                if (items.result[i].mail == localStorage.getItem("mail")) {
                    x = x + items.result[i].price;
                    var html = `
                    <div class="product-image">
                <img src="${items.result[i].image}">
            </div>
            <div class="product-details">
                <div class="product-title">${items.result[i].name}</div>
                <p class="product-description">${items.result[i].description[0]}</p>
            </div>
            <div class="product-price">${items.result[i].price}</div>
            <div class="product-quantity">
                <input type="number" id="${"cart-val" + i}" value="1" min="1"/>
            </div>
            <div class="product-removal">
                <button class="remove-product ${"cart-remove-product" + i}">
                    Remove
                </button>
            </div>
            <div class=${"product-line-price" + i}></div>
                    `


                    var wrapper = document.createElement('div');
                    wrapper.innerHTML = html;
                    wrapper.setAttribute('class', 'product')
                    document.getElementById('shopping-cart').appendChild(wrapper);
                    document.getElementById("cart-val" + i).onchange = () => {
                        x = 0;
                        for (let j = 0; j < s1; j++) {
                            if (items.result[j].mail == localStorage.getItem("mail")) {

                                x += document.getElementById("cart-val" + j).value * items.result[j].price;
                            }
                        }
                        document.getElementsByClassName("product-line-price" + i)[0].innerHTML = "$" + document.getElementById("cart-val" + i).value * items.result[i].price;
                    }
                    document.getElementsByClassName("cart-remove-product" + i)[0].onclick = () => {
                        del(items.result[i].xid);
                        window.location.reload();
                    }


                }
            }
            let html2 = `
<div class="totals">
            <div class="totals-item">
                <label>Subtotal</label>
                <div class="totals-value" id="cart-subtotal"></div>
            </div>
            
            <div class="totals-item">
                <label>Shipping</label>
                <div class="totals-value" id="cart-shipping">5.00</div>
            </div>
            <div class="totals-item totals-item-total">
                <label>Grand Total</label>
                <div class="totals-value" id="cart-total"></div>
            </div>
        </div>

        <button class="checkout">Checkout</button>
`
            var wrapper2 = document.createElement('div');
            wrapper2.innerHTML = html2;

            document.getElementById('shopping-cart').appendChild(wrapper2);
            setInterval(() => {
                document.getElementById("cart-subtotal").innerHTML = x;
                document.getElementById("cart-total").innerHTML = x + 5;

            }, 1000);
            document.getElementsByClassName('checkout')[0].onclick = () => {
                localStorage.setItem("total",x);
                for (let k = 0; k < s1; k++) {
                    
                        add(items.result[k]);
                    
                }
                window.location='../checkout/checkout.html'
            }
        }

    }
}
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB,
    IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction,
    baseName = "products",
    storeName = "cart";

function logerr(err) {
    console.log(err);
}
function del(id, info) {
    info = typeof info !== 'undefined' ? false : true;
    connectDB(function (db) {
        var transaction = db.transaction(["cart"], "readwrite");
        var objectStore = transaction.objectStore("cart");
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

function add(obj, info) {
    info = typeof info !== 'undefined' ? false : true;
    connectDB(function (db) {
        var transaction = db.transaction(["orders"], "readwrite");
        var objectStore = transaction.objectStore("orders");
        var objectStoreRequest = objectStore.add(obj);
        objectStoreRequest.onerror = logerr;
        objectStoreRequest.onsuccess = function () {
            if (info) { console.log("Rows has been added"); }
            else { console.log("Rows has been updated"); }
            console.info(objectStoreRequest.result);
        }
    });
}

document.getElementById('search-btn').onclick = () => {
    let val = document.getElementById('search').value;
    localStorage.setItem("search", val);
    window.location = '../details/details.html'

}