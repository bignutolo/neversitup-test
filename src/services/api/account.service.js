import { request } from "./util";
const END_POINT = "users";

class AccountService {
  async login(user) {
    const params = {
      username: user.username,
      password: user.password,
    };

    const config = {
      method: "post",
      url: `${END_POINT}/auth`,
      data: params,
      headers: {
        "content-type": "application/json",
      },
    };

    return request(config);
  }

  async register(user) {
    const params = {
      username: user.username,
      password: user.password,
    };

    const config = {
      method: "post",
      url: `${END_POINT}/register`,
      data: params,
      headers: {
        "content-type": "application/json",
      },
    };

    return request(config);
  }
}

export default new AccountService();
