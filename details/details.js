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
        , db, tx, store, index, tx2, storewishlist, indexwishlist
        ;
    window.indexedDB = window.indexedDB || window.mozIndexedDB ||
        window.webkitIndexedDB || window.msIndexedDB;
    request.onupgradeneeded = (e) => {

    }

    request.onerror = (e) => {
        console.log('error' + e.target.errorCode);
    }


    request.onsuccess = (e) => {
        db = request.result;
        tx = db.transaction("product", "readwrite");
        store = tx.objectStore("product");
        index = store.index("name");



        db.onerror = (e) => {
            console.log('error' + e.target.errorCode);
        }


        let items = store.getAll();

        items.onsuccess = () => {
            let s1 = items.result.length;


            for (let i = 0; i < s1; i++) {
                if (items.result[i].name.toLowerCase().includes(localStorage.getItem("search")) || items.result[i].category.toLowerCase().includes(localStorage.getItem("search"))) {
                var html = `
                    <div class="details-card-image ${"det"+i}">
                    <img src="${items.result[i].image}"/>
                </div>
                <div class="card-detail-des-box">
                    <div class="details-card-name">
                        <div>
                            <h1>${items.result[i].name} </h1>
                        </div>
                        <ul>
                        ${items.result[i].description.map((item) => {
                    return (
                        `<li>
            ${item}
            </li>`)
                }).join('')}
                        </ul>
                    </div>
                    <div class="details-card-price">
                        <b>$${items.result[i].originalprice}</b>
                        <p>
                            <span>$${items.result[i].price}</span>
                            <span>$${100 - Math.floor(items.result[i].price * 100 / items.result[i].originalprice)}</span>
                        </p>
                        <div class="detail-card-wishlist ${"wish"+i}">
                            <i class="fa fa-heart"></i>
                        </div>
                        <button class="global-btn ${"car"+i}">ADD TO CART</button>
                    </div>
                </div>
            `;

                var wrapper = document.createElement('div');
                wrapper.innerHTML = html;
                wrapper.setAttribute('class', 'details-card');

                document.getElementById('details-card-box').appendChild(wrapper);

                document.getElementsByClassName("wish"+i)[0].onclick = () => {
                    db = request.result;
                    tx2 = db.transaction("wishlist", "readwrite");
                    storewishlist = tx2.objectStore("wishlist");
                    indexwishlist = storewishlist.index("name");
                    let val = items.result[i];
                    val.mail = localStorage.getItem("mail");
                    storewishlist.add(val);
                }
                document.getElementsByClassName("car"+i)[0].onclick = () => {
                    db = request.result;
                    tx2 = db.transaction("cart", "readwrite");
                    storewishlist = tx2.objectStore("cart");
                    indexwishlist = storewishlist.index("name");
                    let val = items.result[i];
                    val.mail = localStorage.getItem("mail");
                    storewishlist.add(val);
                }
                document.getElementsByClassName("det"+i)[0].onclick = () => {
                    add(items.result[i]);
                    window.location = "../productdetail/productdetail.html";
                }
            }
        }



    }

     }
}
function add(obj, info) {
    info = typeof info !== 'undefined' ? false : true;
    connectDB(function (db) {
        var transaction = db.transaction(["details"], "readwrite");
        var objectStore = transaction.objectStore("details");
        objectStore.clear();
        var objectStoreRequest = objectStore.add(obj);
        objectStoreRequest.onerror = logerr;
        objectStoreRequest.onsuccess = function () {
            if (info) { console.log("Rows has been added"); }
            else { console.log("Rows has been updated"); }
            console.info(objectStoreRequest.result);
        }
    });
}


var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB,
    IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction,
    baseName = "products",
    storeName = "wishlist";

function logerr(err) {
    console.log(err);
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
        if (!Db.objectStoreNames.contains("details")) {
            var store = Db.createObjectStore("details", { keyPath: "id" });
        }
        connectDB(f);
    }
}
document.getElementById('search-btn').onclick = () => {
    let val = document.getElementById('search').value;
    localStorage.setItem("search", val);
    window.location = './details.html'

}