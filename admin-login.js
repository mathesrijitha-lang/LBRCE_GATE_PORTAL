import { auth } from "./firebase-config.js";

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const ADMIN_EMAIL = "srijithamathe03@gmail.com";

const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const message = document.getElementById("message");

loginBtn.addEventListener("click", async () => {

  if (email.value.trim() === "" || password.value.trim() === "") {
    message.innerHTML = "Please enter Email and Password.";
    return;
  }

  try {

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    if (userCredential.user.email === ADMIN_EMAIL) {

      window.location.href = "admin.html";

    } else {

      message.innerHTML = "Access Denied! This is not an admin account.";

    }

  } catch (error) {

    message.innerHTML = error.message;

  }

});