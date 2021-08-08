
let run = true;

document.getElementById('reg-btn').onclick = () => {
    let mail = document.getElementById('mail').value;
    let name = document.getElementById('name').value;
    let pass = document.getElementById('pass').value;
    let pass2 = document.getElementById('pass2').value;

    if (mail == "" || name == ""  || pass == "" || pass2 == "" ) {
        run = false;
        alert("feilds should not be empty");
        return;
    }

    if (pass != pass2) {
        run = false;
        alert("password not match");
       
    }
    
    if (pass.length < 7) {
        alert("Password must be greater than 6");
        run = false;
    }

    ValidateEmail(mail);

    if (mail != "" && name != ""  && pass != "" && pass2 != ""  && pass == pass2 && ValidateEmail(mail) == true && pass > 6) {
        run = true;
    }


    if (run == true) {

        let val = {
            mail: mail, name: name, pass: pass
        }


        add(val)
        window.location="../loginpage/login.html"
    }


}







function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
}



var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB,
    IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction,
    baseName = "products",
    storeName = "user";

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


        if (!Db.objectStoreNames.runains(storeName)) {
            var store = Db.createObjectStore(storeName, { keyPath: "email" });
            var index = store.createIndex("email", "email", { unique: true });

        }
        connectDB(f);
    }
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