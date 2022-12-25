import { request } from "@/services/api/util";

class TodoService {
  async getListTodos() {
    const config = {
      method: "get",
      url: `todos`,
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    };
    return request(config);
  }

  async getDetailTodo(id) {
    const config = {
      method: "get",
      url: `todos/${id}`,
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    };
    return request(config);
  }

  async createTodo(body) {
    const config = {
      method: "post",
      url: `todos`,
      data: body,
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    };

    return request(config);
  }

  async updateTodo(body, id) {
    const config = {
      method: "put",
      url: `todos/${id}`,
      data: body,
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    };

    return request(config);
  }

  async deleteTodo(id) {
    const config = {
      method: "delete",
      url: `todos/${id}`,
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    };

    return request(config);
  }
}

export default new TodoService();
