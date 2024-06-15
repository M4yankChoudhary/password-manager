import axios from "axios";
import { User, Vault } from "../utils/Interface";

export class APIService {
  static config = {
    maxBodyLength: Infinity,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  };
  static getUserInfo(): Promise<User> {
    return new Promise((resolve, reject) => {
      axios
        .get(`${process.env.BACKEND_URL}/user`, this.config)
        .then((response) => {
          resolve(response.data["logged_in_as"]);
          console.log("USER", response.data["logged_in_as"]);
        })
        .catch((error) => {
          reject(new Error(error?.toString()));
        });
    });
  }
  static getAllVaults(): Promise<Vault[]> {
    return new Promise((resolve, reject) => {
      axios
        .get(`${process.env.BACKEND_URL}/vaults`, this.config)
        .then((response) => {
          resolve(response.data["data"]);
          console.log("vaults", response.data["data"]);
        })
        .catch((error) => {
          reject(new Error(error?.toString()));
        });
    });
  }
}
