class UserAPI {
  #axios;
  #accessToken = JSON.parse(localStorage.getItem("accessToken"));
  constructor(axios) {
    this.#axios = axios;
  }

  async getUser() {
    try {
      const response = await this.#axios.get("/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.#accessToken}`,
        },
      });
      const data = response.data;
      return data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        return null;
      }
    }
  }
  async addUser(userData) {
    try {
      const response = await this.#axios.post("/register", userData);
      const data = response.data;
      return data;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        throw error;
      }
    }
  }
  async logInUser(userData) {
    const response = await this.#axios.post("/login?expiresIn=10m", userData);
    const data = response.data;
    this.#accessToken = data.accessToken;
    localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
    return data;
  }

  async modifyUser(userData) {
    const response = await this.#axios.patch("/profile", userData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${this.#accessToken}`,
      },
    });
    const data = response.data;
    return data;
  }
}

export default UserAPI;
