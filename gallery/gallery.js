
// Automated Greeting + Date + Clock


function formatDate(d) {
    return new Intl.DateTimeFormat(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }).format(d);
}

function formatTime(d) {
    return new Intl.DateTimeFormat(undefined, {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit'
    }).format(d);
}

function getGreeting(hour) {
    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17 && hour < 21) return "Good evening";
    return "Good night";
}

function updateDateTime() {
    const now = new Date();

    const greetingEl = document.getElementById("greeting");
    const dateEl = document.getElementById("currentDate");
    const clockEl = document.getElementById("clock");

    if (greetingEl) greetingEl.textContent = getGreeting(now.getHours()) + "   --Welcome to Vanilla Palace--";
    if (dateEl) dateEl.textContent = formatDate(now);
    if (clockEl) clockEl.textContent = formatTime(now);
}

setInterval(updateDateTime, 1000);
updateDateTime();



// Light / Dark Theme Toggle


const THEME_KEY = "vanilla_theme_pref";

function applyTheme(theme) {
    const body = document.body;
    const toggleBtn = document.getElementById("theme-toggle");

    if (theme === "dark") {
        body.classList.add("dark-theme");
        if (toggleBtn) toggleBtn.setAttribute("aria-pressed", "true");
    } else {
        body.classList.remove("dark-theme");
        if (toggleBtn) toggleBtn.setAttribute("aria-pressed", "false");
    }
}

function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);

    if (saved) {
        applyTheme(saved);
    } else {
        // Auto-dark from 8pm–6am
        const hour = new Date().getHours();
        const auto = (hour >= 20 || hour < 6) ? "dark" : "light";
        applyTheme(auto);
    }
}

initTheme();

document.getElementById("theme-toggle")?.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark-theme");
    const next = isDark ? "light" : "dark";

    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
});


// automated carousel slider

const slides = document.querySelectorAll('.carousel input');
let currentSlide = 0;
let slideInterval;
const intervalTime = 4000; // 4 seconds per slide

function showSlide(index) {
    slides[index].checked = true;
    currentSlide = index;
}

function nextSlide() {
    let nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
}

// Start auto sliding
function startSlide() {
    slideInterval = setInterval(nextSlide, intervalTime);
}

// Pause sliding
function pauseSlide() {
    clearInterval(slideInterval);
}

// Resume sliding
function resumeSlide() {
    startSlide();
}

// Auto-start
startSlide();

// Pause when hovering carousel
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', pauseSlide);
carousel.addEventListener('mouseleave', resumeSlide);

// Allow manual clicking to also reset the interval
slides.forEach((slide, index) => {
    slide.addEventListener('click', () => {
        pauseSlide();
        showSlide(index);
        resumeSlide();
    });
});
