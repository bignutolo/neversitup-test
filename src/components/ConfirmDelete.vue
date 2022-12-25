<template>
  <b-modal
    ref="confirm-delete-modal"
    hide-footer
    hide-header
    no-close-on-backdrop>
    <div class="row pt-3">
      <div class="col">
        <h3>ต้องการลบ {{ title }} ?</h3>
      </div>
    </div>
    <div class="d-flex justify-content-center py-3">
      <button class="btn btn-outline-danger mr-5" @click="hideModal">
        Cancel
      </button>
      <button class="btn btn-outline-success" @click="deleteTodo">
        Confirm
      </button>
    </div>
  </b-modal>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
  },
  methods: {
    hideModal() {
      this.$emit("closeDeleteModal");
    },
    deleteTodo() {
      this.$emit("deleteTodo", this.id);
    },
  },
};
</script>

<style></style>
