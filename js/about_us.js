let bgcolor =prompt
("enter color ")
document.body.style.
background =bgcolor


let btn =
 document.getElementById("backToTop");
window.onscroll = function(){
    if (document.documentElement.scrollTop > 200) {
        btn.style.display ="block";
    }else {
        btn.style.display ="none";
    }
    };

btn.onclick =function (){
    window.scrollTo({top: 0, behavior:"smooth"});
};