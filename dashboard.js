import { auth, db } from "./firebase-config.js";

import {
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

alert("Dashboard JS Loaded");

onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // Student Details
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {

    const data = docSnap.data();

    document.getElementById("studentName").innerHTML =
      data.name || "Not Added";

    document.getElementById("studentRoll").innerHTML =
      data.rollNo || "Not Added";

    document.getElementById("studentBranch").innerHTML =
      data.branch || "Not Added";

    document.getElementById("studentPhone").innerHTML =
      data.phone || "Not Added";

    document.getElementById("studentEmail").innerHTML =
      data.email || "-";

    document.getElementById("studentStatus").innerHTML =
      data.status || "-";

  }

  // Announcement
  const announcementRef = doc(db, "portal", "announcement");
  const announcementSnap = await getDoc(announcementRef);

  if (announcementSnap.exists()) {
    document.getElementById("announcementBox").innerHTML =
      announcementSnap.data().message;
  }

});

// Logout
document.getElementById("logoutBtn").addEventListener("click", async () => {

  const user = auth.currentUser;

  if (user) {

    await updateDoc(doc(db, "users", user.uid), {
      logoutTime: serverTimestamp(),
      status: "Offline"
    });

  }

  await signOut(auth);

  window.location.href = "login.html";

});