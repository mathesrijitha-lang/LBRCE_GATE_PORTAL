console.log("Welcome to LBRCE GATE Portal");

// Search Function

function searchSubject() {

    let subject = document.getElementById("searchBox").value.toLowerCase().trim();

    if (subject == "") {
        alert("Please enter a subject.");
    }

    else if (subject == "engineering mathematics" || subject == "maths") {
        window.location.href = "subjects.html#engineering-mathematics";
    }

    else if (subject == "network theory") {
        window.location.href = "subjects.html#network-theory";
    }

    else if (subject == "electronic devices") {
        window.location.href = "subjects.html#electronic-devices";
    }

    else if (subject == "analog circuits") {
        window.location.href = "subjects.html#analog-circuits";
    }

    else if (subject == "digital" || subject == "digital electronics") {
        window.location.href = "subjects.html#digital-electronics";
    }

    else if (subject == "signals and systems") {
        window.location.href = "subjects.html#signals-and-systems";
    }

    else if (subject == "control systems") {
        window.location.href = "subjects.html#control-systems";
    }

    else if (subject == "analog communication") {
        window.location.href = "subjects.html#analog-communication";
    }

    else if (subject == "digital communication") {
        window.location.href = "subjects.html#digital-communication";
    }

    else if (subject == "microprocessors") {
        window.location.href = "subjects.html#microprocessors";
    }

    else if (subject == "vlsi" || subject == "vlsi design") {
        window.location.href = "subjects.html#vlsi-design";
    }

    else if (subject == "embedded systems") {
        window.location.href = "subjects.html#embedded-systems";
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