import fetch from "node-fetch";
import { validateAccessToken } from "./token";

export const send = async ({
  path,
  method,
  body,
}: {
  path: string;
  method: string;
  body?: any;
}) => {
  const { accessToken } = await validateAccessToken();
  const { base_url, firm_id } = global.user;
  const response = await new Promise((resolve, reject) => {
    fetch(`${base_url}/v4/${firm_id}` + path, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      ...(body && { body: JSON.stringify(body) }),
    })
      .then(async (res) => {
        if (method === "DELETE") {
          res.status === 204 ? resolve({}) : resolve(await res.json());
        } else {
          resolve(await res.json());
        }
      })
      .catch((err) => {
        resolve(err);
      });
  });
  return response;
};

// export class Requests {
//   constructor() {}

//   async get({ url }: { url: string }) {
//     const tokenRes = token.findOne({ name: "token_info" });
//     if (!tokenRes) {
//       throw new Error("Token not found");
//     }
//     const response = await new Promise((resolve, reject) => {
//       fetch(tokenRes.base_url + url, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token && { Authorization: `Bearer ${token}` }),
//         },
//       })
//         .then(async (res) => {
//           resolve(await res.json());
//         })
//         .catch((err) => {
//           resolve(err);
//         });
//     });
//     return response;
//   }

//   async post({ url, data }: { url: string; data: any }) {
//     const tokenRes = token.findOne({ name: "token_info" });
//     if (!tokenRes) {
//       throw new Error("Token not found");
//     }
//     const accessToken = await validateAccessToken();
//     const response = await new Promise((resolve, reject) => {
//       fetch(tokenRes.base_url + url, {
//         method: "POST",
//         body: JSON.stringify(data),
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//         .then(async (res) => {
//           resolve(await res.json());
//         })
//         .catch((err) => {
//           resolve(err);
//         });
//     });
//     return response;
//   }

//   async put({ url, data }: { url: string; data: any }) {
//     const tokenRes = token.findOne({ name: "token_info" });
//     if (!tokenRes) {
//       throw new Error("Token not found");
//     }
//     const response = await new Promise((resolve, reject) => {
//       fetch(tokenRes.base_url + url, {
//         method: "PUT",
//         body: JSON.stringify(data),
//         headers: {
//           "Content-Type": "application/json",
//           ...(token && { Authorization: `Bearer ${token}` }),
//         },
//       })
//         .then(async (res) => {
//           resolve(await res.json());
//         })
//         .catch((err) => {
//           resolve(err);
//         });
//     });
//     return response;
//   }

//   async delete({ url }: { url: string }) {
//     const tokenRes = token.findOne({ name: "token_info" });
//     if (!tokenRes) {
//       throw new Error("Token not found");
//     }
//     const response = await new Promise((resolve, reject) => {
//       fetch(tokenRes.base_url + url, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token && { Authorization: `Bearer ${token}` }),
//         },
//       })
//         .then(async (res) => {
//           if (res.status === 204) {
//             resolve({ status: "success" });
//           } else {
//             resolve(await res.json());
//           }
//         })
//         .catch((err) => {
//           resolve(err);
//         });
//     });
//     return response;
//   }
// }
