let btn =
    document.getElementById("backToTop");

window.onscroll = function () {
    if (document.documentElement.scrollTop > 200) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

btn.onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

let hour = new Date().getHours();
let greeting = document.getElementById("greeting");

if (hour < 12) {
    greeting.textContent = "Good Morning! Welcome to Vanilla Palace";
} else if (hour < 18) {
    greeting.textContent = "Good Afternoon! Welcome to Vanilla Palace";
} else {
    greeting.textContent = "Good Evening! Welcome to Vanilla Palace";
}       