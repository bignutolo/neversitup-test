<template>
  <b-modal ref="create-modal" hide-footer hide-header no-close-on-backdrop>
    <div class="row pt-3">
      <div class="col">
        <label for="title">Title</label>
        <input class="form-control" type="text" v-model="title" />
      </div>
    </div>
    <div class="row pt-3">
      <div class="col">
        <label for="title">Description</label>
        <textarea
          class="form-control"
          type="text"
          rows="4"
          v-model="description"></textarea>
      </div>
    </div>
    <div class="d-flex justify-content-center py-3">
      <button class="btn btn-outline-danger mr-5" @click="hideModal">
        Cancel
      </button>
      <button
        v-if="!id"
        class="btn btn-outline-success"
        :disabled="title === '' || description === ''"
        @click="create">
        Create
      </button>
      <button
        v-else
        class="btn btn-outline-success"
        :disabled="title === '' || description === ''"
        @click="update">
        Edit
      </button>
    </div>
  </b-modal>
</template>

<script>
import todoService from "@/services/api/todo.service.js";
export default {
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      title: "",
      description: "",
    };
  },
  watch: {
    id(val) {
      if (val) {
        this.getDetailTodo();
      }
    },
  },
  methods: {
    async getDetailTodo() {
      await todoService
        .getDetailTodo(this.id)
        .then((res) => {
          const data = res.data;
          this.title = data.title;
          this.description = data.description;
        })
        .catch((err) => {
          console.log("Error: ", err.response);
        });
    },
    hideModal() {
      this.$emit("hideModal");
      this.resetForm();
    },
    create() {
      const val = {
        title: this.title,
        description: this.description,
      };
      this.$emit("createTodo", val);
      this.resetForm();
    },
    update() {
      const val = {
        id: this.id,
        title: this.title,
        description: this.description,
      };
      this.$emit("editTodo", val);
      this.resetForm();
    },
    resetForm() {
      this.title = "";
      this.description = "";
    },
  },
};
</script>

<style></style>
