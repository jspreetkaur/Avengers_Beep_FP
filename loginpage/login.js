

document.getElementById('login').onclick=()=>{
    let mail=document.getElementById('email').value;
    let pass=document.getElementById('password').value;
    let request = window.indexedDB.open("products")
    , db, tx, store, index
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
    tx = db.transaction("user", "readwrite");
    store = tx.objectStore("user");
    index = store.index("mail");



    db.onerror = (e) => {
        console.log('error' + e.target.errorCode);
    }


    let items = store.getAll();
let y=false;

    items.onsuccess = () => {
    let s1 = items.result.length;

        for (let i = 0; i < s1; i++) {
            if(mail==items.result[i].mail&&pass==items.result[i].pass){
                localStorage.setItem("mail",mail);
                localStorage.setItem("login","true");
                y=true;
                window.location='../index.html';
            }
            
        }
        if(!y){
            alert("Please insert correct credentias")
        }
    }

}
    
}



