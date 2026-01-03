// 🔥 Firebase Config (SAFE for frontend)
const firebaseConfig = {
  apiKey: "AIzaSyCi1vee1FzcYDgcdIO6UO-INpHnnPqCjAI",
  authDomain: "scrbbl-4d7c2.firebaseapp.com",
  databaseURL: "https://scrbbl-4d7c2-default-rtdb.firebaseio.com",
  projectId: "scrbbl-4d7c2",
  storageBucket: "scrbbl-4d7c2.firebasestorage.app",
  messagingSenderId: "98275658960",
  appId: "1:98275658960:web:f26c98566da1ebf742e2d5",
  measurementId: "G-KZB5M7FCMV"
}; 

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// Anonymous auth
auth.signInAnonymously();

// App ID (used like your __app_id)
const appId = "scrbbl-clone";

// Example: Create room
async function createRoom(playerName) {
  const user = auth.currentUser;

  const roomRef = await db
    .collection("rooms")
    .add({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      hostId: user.uid,
      status: "WAITING",
      currentWord: "",
      currentDrawer: user.uid,
      round: 1
    });

  await db
    .collection("rooms")
    .doc(roomRef.id)
    .collection("players")
    .doc(user.uid)
    .set({
      name: playerName,
      score: 0,
      id: user.uid
    });

  alert("Room created: " + roomRef.id);
}
