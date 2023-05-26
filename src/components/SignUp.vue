<template>
  <div class="signup">
    <h1>Sign Up</h1>
    <form @submit.prevent="register" v-if="!registered">
      <input v-model="username" type="text" placeholder="Username" required>
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button type="submit">Register</button>
      <button type="button" @click="openCamera">QR Code</button>
      <input type="file" accept="image/*" capture="camera" ref="cameraInput" style="display: none" />
    </form>
    <CinemaMenu v-if="registered" />
  </div>
</template>


<script>
import CinemaMenu from './CinemaMenu.vue';

export default {
  name: 'SignUp',
  components: {
    CinemaMenu
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      registered: false,
    }
  },
  methods: {
    register() {
      const user = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      console.log(user);
      this.$router.push('/CinemaMenu');
      this.registered = true;
    },
    openCamera() {
      this.$refs.cameraInput.click();
    }
  }
}
</script>

<style src="../styles/SignUp.css" lang="css"></style>
