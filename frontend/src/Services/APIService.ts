import axios from "axios";

export class APIService {
  static signInWithGoogle(code: string) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${process.env.BACKEND_URL}/login`,
          {
            code: code,
          },
          {
            headers: {
              withCredentials: true,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => reject(new Error(error?.toString())));
    });
  }
}
