<template>
  <div>
    <v-form>
      <h1>Login</h1>
      <v-text-field v-model="email" label="Mail"></v-text-field>
      <v-text-field v-model="password" label="Mot de passe"></v-text-field>
      <v-btn @click="submit">Connexion</v-btn>
    </v-form>
    <v-btn @click="loginWithGoogle">Google</v-btn>
    <v-btn @click="loginWithFB">Facebook</v-btn>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    loginWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(async (user) => {
          let idToken;
          await firebase
            .auth()
            .currentUser.getIdToken(true)
            .then((res) => (idToken = res));
          console.log(idToken);
        });
    },
    loginWithFB() {
      const provider = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(async (user) => {
          let idToken;
          await firebase
            .auth()
            .currentUser.getIdToken(true)
            .then((res) => (idToken = res));
          console.log(idToken);
        });
    },
    submit() {
      // [START auth_signin_password]
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          // Signed in
          let user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          let errorCode = error.code;
          let errorMessage = error.message;
          console.log(error);
        });
      // [END auth_signin_password]
    },
  },
};
</script>

<style>
</style>