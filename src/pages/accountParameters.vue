<template>
  <div class="mt-10">
    <!-- A preview of the image. -->
    <v-row justify="center">
      <v-badge bordered color="transparent" offset-x="10" offset-y="10">
        <v-btn
          slot="badge"
          fab
          small
          style="z-index: 1"
          @click="launchImageFile"
          :disabled="isUploadingImage"
          type="button"
        >
          <v-icon> mdi-pen </v-icon>
        </v-btn>
        <v-avatar size="200">
          <v-img
            :src="$store.state.photoURL"
            aspect-ratio="1"
            rounded
            @click="launchImageFile"
            :disabled="isUploadingImage"
            type="button"
          />
        </v-avatar>
      </v-badge>
    </v-row>
    <!-- Delete button for deleting the image. -->
    <!-- <button
      v-if="$store.state.photoURL"
      @click="deleteImage"
      :disabled="isDeletingImage"
      type="button"
      class="bg-red-500 border-red-300 text-white"
    >
      {{ isDeletingImage ? "Deleting..." : "Delete" }}
    </button> -->

    <!-- Clicking this button triggers the "click" event of the file input. -->
    <!-- <button @click="launchImageFile" :disabled="isUploadingImage" type="button">
      {{ isUploadingImage ? "Uploading..." : "Upload" }}
    </button> -->
    <!-- This is the real file input element. -->
    <input
      ref="imageFile"
      @change.prevent="uploadImageFile($event.target.files)"
      type="file"
      accept="image/png, image/jpeg"
      class="hidden"
      style="display: none"
    />
    <v-text-field
      v-model="$store.state.email"
      readonly
      label="Email"
      class="mt-5"
    ></v-text-field>
    <v-text-field
      v-model="displayName"
      label="Pseudo"
    ></v-text-field>
    <v-btn @click="setDisplayName">Enregistrer</v-btn>
    <v-btn @click="logout"> Déconnexion </v-btn>
  </div>
</template>
<script>
import { getStorage, ref } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import firebase from "firebase/app";

export default {
  data() {
    return {
      isUploadingImage: false,
      isDeletingImage: false,
      displayName:this.$store.state.displayName
    };
  },
  methods: {
    launchImageFile() {
      // Trigger the file input click event.
      this.$refs.imageFile.click();
    },
    uploadImageFile(files) {
      if (!files.length) {
        return;
      }
      const file = files[0];

      if (!file.type.match("image.*")) {
        alert("Please upload an image.");
        return;
      }

      const metadata = {
        contentType: file.type,
      };

      this.isUploadingImage = true;

      // Create a reference to the destination where we're uploading
      // the file.
      const storage = firebase.storage();
      const imageRef = storage.ref(`images/${file.name}`);
      const uploadTask = imageRef
        .put(file, metadata)
        .then((snapshot) => {
          // Once the image is uploaded, obtain the download URL, which
          // is the publicly accessible URL of the image.
          return snapshot.ref.getDownloadURL().then((url) => {
            return url;
          });
        })
        .catch((error) => {
          console.error("Error uploading image", error);
        });

      // When the upload ends, set the value of the blog image URL
      // and signal that uploading is done.
      uploadTask.then((url) => {
        const user = firebase.auth().currentUser;
        user
          .updateProfile({
            photoURL: url,
          })
          .then(() => {
            this.$store.commit("setPhoto", url);
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
        this.isUploadingImage = false;
      });
    },
    deleteImage() {
      firebase
        .storage()
        .ref(this.$store.state.authUser.photoURL)
        .delete()
        .then(() => {
          this.$store.commit("setPhoto", "");
        })
        .catch((error) => {
          console.error("Error deleting image", error);
        });
    },
    setDisplayName() {
      const user = firebase.auth().currentUser;
      user
        .updateProfile({
          displayName: this.displayName,
        })
        .then(() => {
          this.$store.commit("setDisplayName", this.displayName);
        });
    },
  },
};
</script>
</script>
