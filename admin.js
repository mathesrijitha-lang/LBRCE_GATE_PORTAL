import { auth, db } from "./firebase-config.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
  collection,
  getDocs,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// Admin Email
const ADMIN_EMAIL = "srijithamathe03@gmail.com";

// HTML Elements
const table = document.getElementById("studentTable");
const searchBox = document.getElementById("searchBox");
const searchBtn = document.getElementById("searchBtn");
const showAllBtn = document.getElementById("showAllBtn");
const logoutBtn = document.getElementById("logoutBtn");

const announcement = document.getElementById("announcement");
const postBtn = document.getElementById("postBtn");

// Check Admin
onAuthStateChanged(auth, async (user) => {

  if (!user) {
    alert("Please login first.");
    window.location.href = "login.html";
    return;
  }

  if (user.email !== ADMIN_EMAIL) {
    alert("Access Denied! Admin only.");
    window.location.href = "dashboard.html";
    return;
  }

  loadStudents();

});

// Load Students
async function loadStudents(searchEmail = "") {

  const querySnapshot = await getDocs(collection(db, "users"));

  table.innerHTML = "";

  let total = 0;
  let online = 0;
  let offline = 0;

  querySnapshot.forEach((student) => {

    const data = student.data();

    total++;

    if (data.status === "Online") {
      online++;
    } else {
      offline++;
    }

    if (
      searchEmail === "" ||
      (data.email &&
       data.email.toLowerCase().includes(searchEmail.toLowerCase()))
    ) {

      table.innerHTML += `
      <tr>
        <td>${data.email || "-"}</td>
        <td>${data.status || "-"}</td>
        <td>${data.loginTime ? data.loginTime.toDate().toLocaleString() : "-"}</td>
        <td>${data.logoutTime ? data.logoutTime.toDate().toLocaleString() : "-"}</td>
      </tr>
      `;

    }

  });

  document.getElementById("studentCount").innerHTML =
    "Registered Students : " + total;

  document.getElementById("onlineCount").innerHTML =
    "🟢 Online Students : " + online;

  document.getElementById("offlineCount").innerHTML =
    "🔴 Offline Students : " + offline;

}

// Search
searchBtn.addEventListener("click", () => {
  loadStudents(searchBox.value);
});

// Show All
showAllBtn.addEventListener("click", () => {
  searchBox.value = "";
  loadStudents();
});

// Post Announcement
postBtn.addEventListener("click", async () => {

  if (announcement.value.trim() === "") {
    alert("Please enter an announcement.");
    return;
  }

  await setDoc(doc(db, "portal", "announcement"), {
    message: announcement.value,
    time: serverTimestamp()
  });

  alert("Announcement posted successfully!");

  announcement.value = "";

});

// Logout
logoutBtn.addEventListener("click", async () => {

  await signOut(auth);

  window.location.href = "login.html";

});