// LBRCE GATE Portal

console.log("Welcome to LBRCE GATE Portal");

// Search Function

function searchSubject() {

    let subject = document.getElementById("searchBox").value.toLowerCase().trim();

    if (subject == "") {

        alert("Please enter a subject.");

    }

    else if (subject == "digital" || subject == "digital electronics") {

        window.location.href = "digital.html";

    }

    else {

        alert("Subject not found.");

    }
}
// Search on Enter Key

let searchBox = document.getElementById("searchBox");

if (searchBox) {

    searchBox.addEventListener("keypress", function(event) {

        if (event.key === "Enter") {

            searchSubject();

        }

    });

}