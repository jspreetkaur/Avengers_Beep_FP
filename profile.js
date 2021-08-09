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
    document.getElementById("logout-profile").onclick=()=>{
        localStorage.setItem("login","false")
        window.location="../loginpage/login.html"

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
        tx = db.transaction("user", "readwrite");
        store = tx.objectStore("user");
        index = store.index("mail");



        db.onerror = (e) => {
            console.log('error' + e.target.errorCode);
        }


        let items = store.getAll();

        items.onsuccess = () => {
            let s1 = items.result.length;


            for (let i = 0; i < s1; i++) {
                if (items.result[i].mail==localStorage.getItem("mail")) {
                var html = `
                <p>Name:           </p><p class="profile-info-item">${items.result[i].name}</p><br>
                <p>Email:        </p><p class="profile-info-item">${items.result[i].mail}</p><br>
                <p>Gender:         </p><p class="profile-info-item">${items.result[i].gender}</p><br>
            `;

                var wrapper = document.createElement('p');
                wrapper.innerHTML = html;
                wrapper.setAttribute('class', 'para');

                document.getElementById('infos').appendChild(wrapper);

                
        }
    }


    }

     
}
}


document.getElementById('search-btn').onclick = () => {
    let val = document.getElementById('search').value;
    localStorage.setItem("search", val);
    window.location = './details.html'

}