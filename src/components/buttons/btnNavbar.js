const navbar = document.querySelector(".btn-navbar");
const navbarInner = document.querySelector(".navbar-inner");
navbar.addEventListener("click", ()=>{
    if(navbarInner.hidden === false){
        document.querySelector(".navbar").style.width = "60px";
        document.querySelector(".navbar").style.height = "60px";
        navbarInner.hidden = true;
    }else{        
        document.querySelector(".navbar").style.width = "400px";
        document.querySelector(".navbar").style.height = "500px";
        navbarInner.hidden = false;
    }
})

