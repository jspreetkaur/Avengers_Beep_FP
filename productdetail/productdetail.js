window.onload = () => {
    let request = window.indexedDB.open("products")
        , db, tx, store
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
        tx = db.transaction("details", "readwrite");
        store = tx.objectStore("details");
        index = store.index("name");



        db.onerror = (e) => {
            console.log('error' + e.target.errorCode);
        }


        let items = store.getAll();


        items.onsuccess = () => {

            var html = `
            <div class="product-detail-image" style="background-image:url('${items.result[0].image}')"></div>
            <div class="product-detail-info">
                <div class="product-detail-price">
                    <span class="product-detail-name">${items.result[0].name}</span>
                    <span class="product-detail-price-list">
                        <span>$${items.result[0].originalprice}</span>
                        <span>$${items.result[0].price}</span>
                    </span>
                </div>
                <div class="product-detail-description">
                    <div>
                        <ul>
                        ${items.result[0].description.map((item) => {
                return (
                    `<li>
${item}
</li>`)
            }).join('')}
                            
                        </ul>
                    </div>
                </div>
                <div class="product-detail-button-box">
                    <div class="product-detail-button">
                        <button class="wishlist-add">ADD TO WISHLIST</button>
                        <button class="cart-add">ADD TO CART</button>
                    </div>
                    <div class="product-detail-price-save">
                        <span>$${items.result[0].price}</span>
                        <span> you save $${parseInt(items.result[0].originalprice)-parseInt(items.result[0].price)}</span>
    
                    </div>
                </div>
            </div>
        `;

            var wrapper = document.createElement('div');
            wrapper.innerHTML = html;
            wrapper.setAttribute('class', 'product-detail-conatiner')

            document.getElementById('product-detail-conatiner').appendChild(wrapper);




            document.getElementsByClassName("wishlist-add")[0].onclick = () => {
                let obj = items.result[0];

                obj.mail = localStorage.getItem("mail");


                up2(obj);


            }
            document.getElementsByClassName("cart-add")[0].onclick = () => {
                let obj = items.result[0];

                obj.mail = localStorage.getItem("mail");


                up(obj);


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

function connectDB(f) {

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



function up(obj) {
    del(obj.id, 'up');
    add(obj, 'up');
}
function up2(obj) {
    del2(obj.id, 'up');
    add2(obj, 'up');
}


function add(obj, info) {
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
    });
}



function add2(obj, info) {
    info = typeof info !== 'undefined' ? false : true;
    connectDB(function (db) {
        var transaction = db.transaction(["wishlist"], "readwrite");
        var objectStore = transaction.objectStore("wishlist");
        var objectStoreRequest = objectStore.add(obj);
        objectStoreRequest.onerror = logerr;
        objectStoreRequest.onsuccess = function () {
            if (info) { console.log("Rows has been added"); }
            else { console.log("Rows has been updated"); }
            console.info(objectStoreRequest.result);
        }
    });
}

function del(id, info) {
    info = typeof info !== 'undefined' ? false : true;
    connectDB(function (db) {
        var transaction = db.transaction([storeName], "readwrite");
        var objectStore = transaction.objectStore(storeName);
        var objectStoreRequest = objectStore.delete(id);
        objectStoreRequest.onerror = logerr;
        objectStoreRequest.onsuccess = function () {
            if (info)
                console.log("Rows has been deleted: ", id);
        }
    });
}

function del2(id, info) {
    info = typeof info !== 'undefined' ? false : true;
    connectDB(function (db) {
        var transaction = db.transaction(["wishlist"], "readwrite");
        var objectStore = transaction.objectStore("wishlist");
        var objectStoreRequest = objectStore.delete(id);
        objectStoreRequest.onerror = logerr;
        objectStoreRequest.onsuccess = function () {
            if (info)
                console.log("Rows has been deleted: ", id);
        }
    });
}
document.getElementById('search-btn').onclick = () => {
    let val = document.getElementById('search').value;
    localStorage.setItem("search", val);
    window.location = '../details/details.html'

}