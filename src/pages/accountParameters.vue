<template>
  <div class="mb-4">
    <label for="imageUrl">Image</label>
    <div v-if="$store.state.photoURL">
      <!-- A preview of the image. -->
      <img
        :src="$store.state.photoURL"
        class="w-24 md:w-32 h-auto object-cover inline-block"
        alt=""
      />
      <!-- Delete button for deleting the image. -->
      <button
        v-if="$store.state.photoURL"
        @click="deleteImage"
        :disabled="isDeletingImage"
        type="button"
        class="bg-red-500 border-red-300 text-white"
      >
        {{ isDeletingImage ? "Deleting..." : "Delete" }}
      </button>
    </div>

    <!-- Clicking this button triggers the "click" event of the file input. -->
    <button @click="launchImageFile" :disabled="isUploadingImage" type="button">
      {{ isUploadingImage ? "Uploading..." : "Upload" }}
    </button>
    <!-- This is the real file input element. -->
    <input
      ref="imageFile"
      @change.prevent="uploadImageFile($event.target.files)"
      type="file"
      accept="image/png, image/jpeg"
      class="hidden"
    />
      <v-text-field v-model="$store.state.email" label="email"></v-text-field>
  <v-text-field v-model="$store.state.displayName" label="name"></v-text-field>
  <v-btn @click="setDisplayName">Enregistrer</v-btn>
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
    setDisplayName(){
      const user = firebase.auth().currentUser;
        user
          .updateProfile({
            displayName: this.$store.state.displayName,
          })
          .then(() => {
            this.$store.commit("setDisplayName", this.$store.state.displayName);
          })

    }
  },
};
</script>
</script>
