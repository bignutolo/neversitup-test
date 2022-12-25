<template>
  <div>
    <h1 class="text-center">Register</h1>
    <form @submit.prevent="register" class="form-register">
      <div class="username">
        <label for="username">Username</label>
        <input
          class="form-control"
          id="username"
          type="text"
          v-model="username" />
      </div>
      <div class="password mt-3">
        <label for="password">Password</label>
        <input
          class="form-control"
          id="password"
          type="password"
          v-model="password" />
      </div>
      <div class="text-center mt-5">
        <button
          type="submit"
          class="btn btn-outline-success"
          :disabled="username === '' || password === ''"
          style="width: 30%">
          Save
        </button>
      </div>
      <div class="text-center mt-3">
        <button
          type="submit"
          class="btn btn-outline-dark"
          style="width: 30%"
          @click="() => $router.push({ name: 'Login' })">
          Back
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import AccountService from "@/services/api/account.service";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async register() {
      if (this.username === "" || this.password === "") {
        return;
      }
      const credentials = {
        username: this.username,
        password: this.password,
      };
      await AccountService.register(credentials)
        .then((res) => {
          const data = res.data;
          console.log("Result: ", data);
          alert("Register success.");
          this.$router.push({ name: "Login" });
        })
        .catch((err) => {
          console.log("Error: ", err.response);
          alert("Can't Register.");
        });
    },
    clearData() {
      this.username = "";
      this.password = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.form-register {
  position: absolute;
  width: 30%;
  top: 10%;
  left: 35%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 1.5rem;
  border-radius: 15px;
}
</style>
