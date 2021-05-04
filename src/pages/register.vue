<template>
  <div>
    <v-form @submit.prevent="register">
      <h2>Register</h2>
      <v-text-field type="email" label="Adresse email" v-model="email" />
      <v-text-field type="password" label="Mot de passe" v-model="password" />
      <v-btn type="submit">Register</v-btn>
    </v-form>
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
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(error.message);

          // ..
        });
    },
  },
};
</script>
