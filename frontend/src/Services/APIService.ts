import axios from "axios";
import { User } from "../utils/Interface";

export class APIService {
  static config = {
    maxBodyLength: Infinity,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  };
  static getUserInfo() : Promise<User|undefined> {
    return new Promise((resolve, reject) => {
      axios
        .get(`${process.env.BACKEND_URL}/user`, this.config)
        .then((response) => {
          resolve(response.data['logged_in_as']);
          console.log("USER", response.data['logged_in_as']);
        })
        .catch((error) => {reject(new Error(error?.toString()))});
    });
  }
}
