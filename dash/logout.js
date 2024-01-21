function logout() {
    localStorage.setItem('login', 'false')
    location.href="login.html"
}

function logincheck(){
    if(localStorage.getItem("login")=="false"){
     alert("Please Login First")
     location.href="login.html"
    }
 }
 onload = logincheck()