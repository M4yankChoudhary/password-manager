import axios from "axios";
import {
  CreateVaultInput,
  Password,
  PasswordFindArgs,
  User,
  Vault,
} from "../utils/interface/Interface";
import { handleAxiosError } from "../utils/extensions";

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
  static createVault(vault: CreateVaultInput): Promise<Vault> {
    return new Promise((resolve, reject) => {
      axios
        .post(`${process.env.BACKEND_URL}/vault`, vault, this.config)
        .then((response) => {
          resolve(response.data["data"]);
          console.log("vault create", response.data["data"]);
        })
        .catch((error) => {
          reject(handleAxiosError(error)?.message);
        });
    });
  }
  static getPasswords(vaultId: string): Promise<Password[]> {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${process.env.BACKEND_URL}/passwords/vault/${vaultId}`,
          this.config
        )
        .then((response) => {
          resolve(response.data["data"]);
          console.log("passwords list", response.data["data"]);
        })
        .catch((error) => {
          reject(handleAxiosError(error)?.message);
        });
    });
  }
  static deleteVault(vaultId: string) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${process.env.BACKEND_URL}/vault/${vaultId}`, this.config)
        .then((response) => {
          resolve(response.data);
          console.log("vault delete", response.data);
        })
        .catch((error) => {
          reject(handleAxiosError(error)?.message);
        });
    });
  }
  static createPassword(password: Password) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${process.env.BACKEND_URL}/password`, password, this.config)
        .then((response) => {
          resolve(response.data);
          console.log("password create", response.data);
        })
        .catch((error) => {
          reject(handleAxiosError(error)?.message);
        });
    });
  }
  static getPasswordUsingMasterKey(passwordFindArgs: PasswordFindArgs): Promise<Password> {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${process.env.BACKEND_URL}/password/${passwordFindArgs._id}`,
          {
            master_key: passwordFindArgs.master_key,
          },
          this.config
        )
        .then((response) => {
          resolve(response.data['data']);
          console.log("password create", response.data['data']);
        })
        .catch((error) => {
          reject(handleAxiosError(error)?.message);
        });
    });
  }
}
