import { auth, db } from "./firebase-config.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const name = document.getElementById("name");
const rollNo = document.getElementById("rollNo");
const branch = document.getElementById("branch");
const phone = document.getElementById("phone");
const saveBtn = document.getElementById("saveBtn");

onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {

    const data = userSnap.data();

    name.value = data.name || "";
    rollNo.value = data.rollNo || "";
    branch.value = data.branch || "";
    phone.value = data.phone || "";

  }

  saveBtn.addEventListener("click", async () => {

    await updateDoc(userRef, {

      name: name.value,
      rollNo: rollNo.value,
      branch: branch.value,
      phone: phone.value

    });

    alert("✅ Profile Updated Successfully!");

    window.location.href = "dashboard.html";

  });

});