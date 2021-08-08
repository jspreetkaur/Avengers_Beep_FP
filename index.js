window.onload = () => {
    let val={};
    let request = window.indexedDB.open("products")
        , db, transition, store, transition2, storewishlist, indexwishlist,storecart,indexcart
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
        transition = db.transaction("product", "readwrite");
        store = transition.objectStore("product");
        index = store.index("name");



        db.onerror = (e) => {
            console.log('error ' + e.target.errorCode);
        }


        let items = store.getAll();


        items.onsuccess = () => {
            let s1 = items.result.length;


            for (let i = 0; i < s1; i++) {
                if(items.result[i].category.includes("laptop")){
                var html = `
                
                <img src="${items.result[i].image}"/>
                <p>${items.result[i].name}</p>
                <b>$${items.result[i].price}</b>
        `;

                var wrapper = document.createElement('div');
                wrapper.innerHTML = html;
                wrapper.setAttribute('class', 'product-display-slider-box');
                wrapper.classList.add("view"+i);

                document.getElementById('slider3').appendChild(wrapper);

                
                document.getElementsByClassName("view"+i)[0].onclick = () => {
                    add(items.result[i]);
                    window.location="./productdetail/productdetail.html";
                }
            }
        }

            for (let i = 0; i < s1; i++) {
                if(items.result[i].category.includes("mobile")){
                var html = `
                <img src="${items.result[i].image}"/>
                <p>${items.result[i].name}</p>
                <b>$${items.result[i].price}</b>
        `;

                var wrapper = document.createElement('div');
                wrapper.innerHTML = html;
                wrapper.setAttribute('class', 'product-display-slider-box')
                wrapper.classList.add("view2"+i);

                document.getElementById('slider2').appendChild(wrapper);

                
                document.getElementsByClassName("view2"+i)[0].onclick = () => {
                    add(items.result[i]);
                    window.location="./productdetail/productdetail.html";
                }
            }
        }
            for (let i = 0; i < s1; i++) {
                if(items.result[i].category.includes("menwear")){

                var html = `
                <img src="${items.result[i].image}"/>
                <p>${items.result[i].name}</p>
                <b>$${items.result[i].price}</b>
        `;

                var wrapper = document.createElement('div');
                wrapper.innerHTML = html;
                wrapper.setAttribute('class', 'product-display-slider-box')
                wrapper.classList.add("view3"+i);

                document.getElementById('slider1').appendChild(wrapper);

                
                document.getElementsByClassName("view3"+i)[0].onclick = () => {
                    add(items.result[i]);
                    window.location="./productdetail/productdetail.html";
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
    baseName = "products"

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
    window.location = './details/details.html'

}
document.getElementById('view1').onclick=()=>{
    localStorage.setItem("search","menwear");
    window.location='./details/details.html'
}
document.getElementById('view2').onclick=()=>{
    localStorage.setItem("search","mobile");
    window.location='./details/details.html'
}
document.getElementById('view3').onclick=()=>{
    localStorage.setItem("search","laptop");
    window.location='./details/details.html'
}

