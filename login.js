import { auth, db } from "./firebase-config.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const message = document.getElementById("message");

// SIGN UP
document.getElementById("signupBtn").addEventListener("click", async () => {

  try {

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    await sendEmailVerification(userCredential.user);

    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: userCredential.user.email,
      name: "",
      rollNo: "",
      branch: "",
      phone: "",
      loginTime: null,
      logoutTime: null,
      status: "Registered"
    });

    message.innerHTML =
      "✅ Account created successfully. Please verify your email before logging in.";

  } catch (error) {

    message.innerHTML = error.message;

  }

});

// LOGIN
document.getElementById("loginBtn").addEventListener("click", async () => {

  try {

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    if (!userCredential.user.emailVerified) {
      message.innerHTML = "⚠️ Please verify your email first.";
      return;
    }

    await setDoc(
      doc(db, "users", userCredential.user.uid),
      {
        email: userCredential.user.email,
        loginTime: serverTimestamp(),
        logoutTime: null,
        status: "Online"
      },
      { merge: true }
    );

    message.innerHTML = "🎉 Login Successful";

    if (userCredential.user.email === "srijithamathe03@gmail.com") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "dashboard.html";
    }

  } catch (error) {

    message.innerHTML = error.message;

  }

});