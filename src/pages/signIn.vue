<template>
  <div>
    <v-form>
      <v-row class="ma-5" justify="center">
        <v-btn @click="loginWithGoogle">Connexion Google</v-btn>
      </v-row>
      <v-row class="ma-5" justify="center">
        <v-btn @click="loginWithFB">Connexion Facebook</v-btn>
      </v-row>
      <v-text-field v-model="email" label="Mail"></v-text-field>
      <v-text-field v-model="password" label="Mot de passe"></v-text-field>
      <v-btn @click="submit">Connexion</v-btn>
    </v-form>
    <v-btn class="mt-5" to="/signUp" nuxt>Inscription</v-btn>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  layout: "auth",
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
        .then(async (userCredential) => {
          // Signed in
          let user = userCredential.user;
          let idToken;
          await firebase
            .auth()
            .currentUser.getIdToken(true)
            .then((res) => (idToken = res));
          console.log(idToken);
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
