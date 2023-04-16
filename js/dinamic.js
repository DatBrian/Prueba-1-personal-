// script llenado dinamico
// script accordion

let buttons = document.querySelectorAll("button");

let modalHunters = document.querySelector(".modalHunters");
let modalCafeteria = document.querySelector(".modalCafeteria");
let modal8 = document.querySelector(".modal8piso");
let modalBaños = document.querySelector(".modalBaños");

buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (e.target.classList.contains("hunters")) {
            modalHunters.style.display = "block";
        } else if (e.target.classList.contains("cafeteria")) {
            modalCafeteria.style.display = "block";
        } else if (e.target.classList.contains("piso")) {
            modal8.style.display = "block";
        } else if (e.target.classList.contains("baños")) {
            modalBaños.style.display = "block";
        } else if (e.target.classList.contains("closeHunters")) {
            modalHunters.style.display = "none";
        } else if (e.target.classList.contains("closeCafeteria")) {
            modalCafeteria.style.display = "none";
        } else if (e.target.classList.contains("closePiso")) {
            modal8.style.display = "none";
        } else if (e.target.classList.contains("closeBaños")) {
            modalBaños.style.display = "none";
        }
    });
});



