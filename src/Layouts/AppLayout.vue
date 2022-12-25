<template>
  <div>
    <div class="d-flex m-3 justify-content-end">
      <button class="btn btn-outline-danger" @click="logout">Logout</button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { TokenService } from "@/services/storage.service";
export default {
  methods: {
    logout() {
      TokenService.removeToken();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style></style>
