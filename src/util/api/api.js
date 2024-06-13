import axios from "axios";
import RecordsAPI from "./records.api";
import UserAPI from "./user.api";

export const BASE_URL = "https://moneyfulpublicpolicy.co.kr";

export const RECORD_URL = "https://gray-fuzzy-bear.glitch.me";
class API {
  #baseURL = BASE_URL;
  #recordURL = RECORD_URL;
  #client;
  #expense;
  records;
  user;

  constructor() {
    this.#client = axios.create({ baseURL: this.#baseURL });
    this.#expense = axios.create({ baseURL: this.#recordURL });
    this.records = new RecordsAPI(this.#expense);
    this.user = new UserAPI(this.#client);
  }
}

const api = new API();

export default api;
