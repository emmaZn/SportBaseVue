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
        .then(async (userCredentials) => {
          let idToken;
          await firebase
            .auth()
            .currentUser.getIdToken(true)
            .then((res) => {
              idToken = res;
              console.log(userCredentials.user, idToken);
              let user = {
                uid: userCredentials.user.uid,
                email: userCredentials.user.email,
                emailVerified: userCredentials.user.emailVerified,
                displayName: userCredentials.user.displayName,
                photoURL: userCredentials.user.photoURL,
                isAdmin: userCredentials.user.isAdmin,
              };
              this.$store.commit("setUser", user);
              if (userCredentials.additionalUserInfo.isNewUser)
              return this.$nuxt.$options.router.push("accountParameters");
              this.$nuxt.$options.router.push("newsFeed");
            });
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
            .then((res) => {
              idToken = res;
              console.log(user, idToken);
              let user = {
                uid: userCredentials.user.uid,
                email: userCredentials.user.email,
                emailVerified: userCredentials.user.emailVerified,
                displayName: userCredentials.user.emailVerified,
                photoURL: userCredentials.user.emailVerified,
                isAdmin: userCredentials.user.emailVerified,
              };
              this.$store.commit("setUser", user);
              if (userCredentials.additionalUserInfo.isNewUser)
              return this.$nuxt.$options.router.push("accountParameters");
              return this.$nuxt.$options.router.push("newsFeed");

            });
        });
    },
    submit() {
      // [START auth_signin_password]
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((userCredentials) => {
          console.log("user", userCredentials, userCredentials.user);
          let user = {
            uid: userCredentials.user.uid,
            email: userCredentials.user.email,
            emailVerified: userCredentials.user.emailVerified,
            displayName: userCredentials.user.emailVerified,
            photoURL: userCredentials.user.emailVerified,
            isAdmin: userCredentials.user.emailVerified,
          };
          this.$store.commit("setUser", user);
          this.$nuxt.$options.router.push()("newsFeed");
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
