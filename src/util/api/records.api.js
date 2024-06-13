class RecordsAPI {
  #axios;
  constructor(axios) {
    this.#axios = axios;
  }

  async getRecords() {
    try {
      const response = await this.#axios.get("/expenses");
      const data = response.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  async getRecord(queryKey) {
    try {
      const response = await this.#axios.get(`/expenses/${queryKey}`);
      const data = response.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  async addRecord(formData) {
    try {
      const response = await this.#axios.post("/expenses", formData);
      const data = response.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  async deleteRecord(queryKey) {
    try {
      const response = await this.#axios.delete(`/expenses/${queryKey}`);
      const data = response.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  async modifyRecord(updatedRecord) {
    try {
      const { id, ...rest } = updatedRecord;
      const response = await this.#axios.put(`/expenses/${id}`, rest);
      const data = response.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}
export default RecordsAPI;
