<template>
  <div class="list-article">
    <div class="content" v-for="item in listTodos" :key="item._id">
      <div @click="showCreateModal(item._id)" class="card-content">
        <div class="title">
          <h3>{{ item.title }}</h3>
        </div>
        <div class="description">
          {{ item.description }}
        </div>
        <div class="date-create">{{ formatDate(item.updatedAt) }}</div>
      </div>
      <div class="close-icon" @click="showDeleteModal(item._id, item.title)">
        X
      </div>
    </div>
    <div class="footer text-center">
      <button
        class="btn btn-outline-success btn-create"
        @click="showCreateModal()">
        + Create
      </button>
    </div>
    <createModal
      ref="modal"
      :id="todoId"
      @hideModal="hideCreateModal"
      @createTodo="createTodo"
      @editTodo="editTodo" />
    <deleteModal
      ref="confirm-delete"
      :title="todoTitle"
      :id="todoId"
      @closeDeleteModal="closeDeleteModal"
      @deleteTodo="deleteTodo" />
  </div>
</template>

<script>
import moment from "moment";
import todoService from "@/services/api/todo.service.js";
import createModal from "@/components/CreateModal.vue";
import deleteModal from "@/components/ConfirmDelete.vue";
export default {
  components: {
    createModal,
    deleteModal,
  },
  data() {
    return {
      listTodos: [],
      todoId: null,
      todoTitle: "",
    };
  },
  mounted() {
    this.getListTodos();
  },
  methods: {
    async getListTodos() {
      await todoService
        .getListTodos()
        .then((res) => {
          const data = res.data;
          this.listTodos = data;
        })
        .catch((err) => {
          console.log("Error: ", err.response);
        });
    },
    formatDate(date) {
      console.log(date);
      return moment(date).format("DD-MM-YYYY");
    },
    async createTodo(val) {
      const body = val;
      await todoService
        .createTodo(body)
        .then(() => {
          this.getListTodos();
          this.hideCreateModal();
        })
        .catch((err) => {
          console.log("Error: ", err.response);
        });
    },
    async editTodo(val) {
      const id = val.id;
      const body = {
        title: val.title,
        description: val.description,
      };

      await todoService
        .updateTodo(body, id)
        .then(() => {
          this.getListTodos();
          this.hideCreateModal();
        })
        .catch((err) => {
          console.log("Error: ", err.response);
        });
    },
    async deleteTodo(id) {
      await todoService
        .deleteTodo(id)
        .then(() => {
          this.getListTodos();
          this.closeDeleteModal();
        })
        .catch((err) => {
          console.log("Error: ", err.response);
        });
    },
    showCreateModal(id) {
      this.todoId = id;
      this.$nextTick(() => {
        const refModal = this.$refs["modal"];
        refModal.$refs["create-modal"].show();
      });
    },
    hideCreateModal() {
      this.todoId = null;
      this.$nextTick(() => {
        const refModal = this.$refs["modal"];
        refModal.$refs["create-modal"].hide();
      });
    },
    showDeleteModal(id, title) {
      this.todoId = id;
      this.todoTitle = title;
      this.$nextTick(() => {
        const refModal = this.$refs["confirm-delete"];
        refModal.$refs["confirm-delete-modal"].show();
      });
    },
    closeDeleteModal() {
      this.$nextTick(() => {
        const refModal = this.$refs["confirm-delete"];
        refModal.$refs["confirm-delete-modal"].hide();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.list-article {
  text-align: center;
  .content {
    display: block;
    text-align: center;
    margin: 2rem 5rem 1rem 5rem;
    .card-content {
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      border-radius: 10px;
      margin-top: 1rem;
      cursor: pointer;
      .title {
        display: flex;
        justify-content: space-between;
        padding: 1rem 1rem 0 1rem;
      }
      .description {
        text-align: left;
        padding: 1rem 1rem;
      }
      .date-create {
        text-align: right;
        padding: 1rem 1rem;
        color: #808080;
      }
    }
    .close-icon {
      position: relative;
      color: red;
      cursor: pointer;
      top: -165px;
      left: 95%;
      width: 5%;
    }
  }
}

.footer {
  position: relative;
  clear: both;
  margin: 1rem;
  .btn-create {
    width: 100%;
    max-width: 160px;
  }
}
</style>
