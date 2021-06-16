<template>
  <div>
    <v-card v-for="user in users">
      <v-card-title>{{ user.displayName }}</v-card-title>
      <v-avatar>
        <v-img :src="user.photoURL" aspect-ratio="1" />
      </v-avatar>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    // const allUsers = firebase.auth.UserRecord= [];

    // const listAllUsers = async () => {
    //   await firebase.auth().listUsers(1000, 10);
    //   allUsers.push(...res.users);
    //   if (res.pageToken) {
    //     await listAllUsers(res.pageToken);
    //   }
    // };

    // await listAllUsers();

    // console.log(allUsers);
  },
};
</script>

<style>
</style>