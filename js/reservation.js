const dateField = document.getElementById("reservation-date");
let todayDate = new Date().toISOString().split("T")[0];
dateField.setAttribute("min", todayDate);

document.getElementById("reservation-form").addEventListener("submit", function (e) {
    e.preventDefault();

    let date = document.getElementById("reservation-date").value;
    let time = document.getElementById("reservation-time").value;
    let people = document.getElementById("reservation-people").value;

    if (date === "") {
        showError("Please select a date.");
        return;
    }
    if (time === "") {
        showError("Please select a time.");
        return;
    }
    if (people === "" || people <= 0) {
        showError("Enter a valid number of people.");
        return;
    }

    let reservation = {
        date: date,
        time: time,
        people: people,
        savedOn: new Date().toLocaleString()
    };

    saveData(reservation);

    displayPopup(reservation);

    document.getElementById("reservation-form").reset();
});

function saveData(res) {
    let list = JSON.parse(localStorage.getItem("reservations")) || [];
    list.push(res);
    localStorage.setItem("reservations", JSON.stringify(list));
}

function displayPopup(res) {
    const box = document.getElementById("popup-message");

    box.innerHTML = `
        <h3>Reservation Confirmed</h3>
        <p><strong>Date:</strong> ${res.date}</p>
        <p><strong>Time:</strong> ${res.time}</p>
        <p><strong>People:</strong> ${res.people}</p>
        <small>Saved on: ${res.savedOn}</small>
    `;

    document.getElementById("popup").style.display = "flex";
}

document.getElementById("close-popup").addEventListener("click", function () {
    document.getElementById("popup").style.display = "none";
});

function showError(msg) {
    const box = document.getElementById("error-box");
    box.textContent = msg;
    box.style.display = "block";

    setTimeout(() => {
        box.style.display = "none";
    }, 3500);
}
