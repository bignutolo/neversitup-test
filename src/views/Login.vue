<template>
  <div>
    <form @submit.prevent="login" class="form-login">
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
          class="btn btn-outline-primary"
          :disabled="username === '' || password === ''"
          style="width: 30%">
          Login
        </button>
      </div>
      <div class="text-center mt-3">
        <button
          type="button"
          class="btn btn-outline-dark"
          style="width: 30%"
          @click="() => $router.push({ name: 'Register' })">
          Register
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      if (this.username === "" || this.password === "") {
        return;
      }
      const credentials = {
        username: this.username,
        password: this.password,
      };
      this.$store
        .dispatch("account/login", credentials)
        .then(
          async (res) => {
            if (res) {
              this.$store.commit("account/saveLocalToken");
              this.clearData();
              this.$router.push({ name: "ListTodo" });
            }
          },
          (error) => {
            console.log("error", error);
            alert("error: Can't Login.");
          }
        )
        .catch((error) => {
          //alert
          console.log("login:catch", error);
          alert("login:catch", error);
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
.form-login {
  position: absolute;
  width: 30%;
  top: 10%;
  left: 35%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 1.5rem;
  border-radius: 15px;
}
</style>
