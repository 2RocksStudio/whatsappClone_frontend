import axios from "axios";
const instance = axios.create({
  baseURL:
    window.location.hostname == "localhost"
      ? "http://localhost:9000"
      : "https://whatsappclone2020.herokuapp.com/",
});
export default instance;
