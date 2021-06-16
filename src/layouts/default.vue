<template>
  <v-app dark>
    <!-- <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-app-bar :clipped-left="clipped" fixed app>
      <nuxt-link to="/newsFeed"
        ><v-app-bar-title style="width: 500px">SPORTBASE</v-app-bar-title>
      </nuxt-link>
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <v-spacer></v-spacer>
      <v-row justify="end" align="center" class="mr-5"
        ><v-col cols="2" justify="center">
          <v-row>
            <v-btn icon class="ma-auto"
              ><v-icon>mdi-plus-circle-outline</v-icon></v-btn
            ></v-row
          ><v-row justify="center"> <p>Nouveau</p></v-row>
        </v-col>
        <v-col cols="2">
          <v-row>
            <v-btn icon class="ma-auto"><v-icon>mdi-home</v-icon></v-btn></v-row
          ><v-row justify="center"> <p>Accueil</p></v-row>
        </v-col>
        <v-col cols="2">
          <v-row
            ><v-btn icon class="ma-auto" to="/accountParameters" nuxt><v-icon>mdi-account</v-icon></v-btn></v-row
          ><v-row justify="center"> <p>Compte</p></v-row>
        </v-col>
        <v-col cols="2">
          <v-row>
            <v-btn icon class="ma-auto"><v-icon>mdi-magnify</v-icon></v-btn></v-row
          ><v-row justify="center"> <p>Rechercher</p></v-row>
        </v-col>
      </v-row>
      <!-- <v-btn @click="logout"> Déconnexion </v-btn> -->
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
        {
          icon: "mdi-account",
          title: "Login",
          to: "/login",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "SportBase",
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit("logout");
          this.$router.push("/signIn");
        })
        .catch((error) => {
          alert(error.message);
          this.$router.push("/signIn");
        });
    },
  },
};
</script>
<style scoped>
.v-application a {
  text-decoration: none !important;
  color: #007991 !important;
}
p {
  margin-top: -10px;
  text-align: center;
}
</style>
