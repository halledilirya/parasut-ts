import fetch from "node-fetch";
import { validateAccessToken } from "./token";

export const send = async ({
  path,
  method,
  body,
  depth = 0,
}: {
  path: string;
  method: string;
  body?: any;
  depth?: number;
}) => {
  if (depth > 3) {
    return {
      errors: [
        {
          title: "Max depth reached",
          detail: "Max depth reached",
        },
      ],
    };
  }

  const { accessToken } = await validateAccessToken();
  if (!accessToken) {
    return {
      errors: [
        {
          title: "Access token not found",
          detail: "Access token not found",
        },
      ],
    };
  }
  const { base_url, firm_id } = global.user;

  const controller = new AbortController();
  const { signal } = controller;
  setTimeout(() => controller.abort(), 5000);

  const response = await new Promise((resolve, reject) => {
    fetch(`${base_url}/v4/${firm_id}` + path, {
      method,
      signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      ...(body && { body: JSON.stringify(body) }),
    })
      .then(async (res) => {
        if (res.status === 401) {
          return await send({ path, method, body, depth: depth + 1 });
        }
        if (method === "DELETE") {
          res.status === 204 ? resolve({}) : resolve(await res.json());
        } else {
          resolve(await res.json());
        }
      })
      .catch((err) => {
        const { type } = JSON.parse(JSON.stringify(err));
        if (type && type === "aborted") {
          resolve({
            errors: [
              {
                title: "Request timed out",
                detail: "Request timed out",
              },
            ],
          });
        }
        resolve({
          errors: [
            {
              title: "Request failed",
              detail: "Request failed",
            },
          ],
        });
      });
  });
  return response;
};

// export class Request {
//   private _tokenConfig: AccessTokenSuccessResponse | undefined = undefined;

//   constructor(private _userConfig: ParasutConfig) {}

//   async getAccessToken(): Promise<AccessTokenSuccessResponse> {
//     console.log("GET ACCESS TOKEN");
//     const { email, password, client_id, client_secret, redirect_uri } =
//       this._userConfig;
//     const config = {
//       username: email,
//       password,
//       client_id,
//       client_secret,
//       redirect_uri,
//     };
//     const response = (await new Promise((resolve, reject) => {
//       fetch(this._userConfig.base_url + "/oauth/token", {
//         method: "POST",
//         body: JSON.stringify({
//           ...config,
//           grant_type: "password",
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//         .then(async (res) => {
//           resolve(await res.json());
//         })
//         .catch((err) => {
//           resolve(err);
//         });
//     })) as AccessTokenResponse;

//     if ("error" in response) {
//       throw new Error(response.error_description);
//     }

//     this._tokenConfig = {
//       ...response,
//     };

//     return response;
//   }

//   async validateAccessToken(): Promise<{
//     accessToken: string;
//   }> {
//     if (!this._tokenConfig) {
//       const res = await this.getAccessToken();
//       return { accessToken: res.access_token };
//     }
//     const { access_token, refresh_token, expires_in, created_at } =
//       this._tokenConfig;
//     this._tokenConfig;
//     const now = Math.floor(Date.now() / 1000);

//     if (
//       created_at &&
//       expires_in &&
//       access_token &&
//       now - created_at < expires_in - 7150
//     ) {
//       return { accessToken: access_token };
//     }

//     const { client_id, client_secret } = this._userConfig;
//     const response = await fetch(this._userConfig.base_url + "/oauth/token", {
//       method: "POST",
//       body: JSON.stringify({
//         grant_type: "refresh_token",
//         refresh_token,
//         client_id,
//         client_secret,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       const response = await this.getAccessToken();
//       return {
//         accessToken: response.access_token,
//       };
//     }

//     const data = (await response.json()) as AccessTokenSuccessResponse;
//     this._tokenConfig = {
//       ...data,
//     };
//     return {
//       accessToken: data.access_token,
//     };
//   }

//   async send({
//     path,
//     method,
//     body,
//   }: {
//     path: string;
//     method: string;
//     body?: any;
//   }) {
//     const { accessToken } = await this.validateAccessToken();
//     const { base_url, firm_id } = this._userConfig;
//     const response = await new Promise((resolve, reject) => {
//       fetch(`${base_url}/v4/${firm_id}` + path, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//         ...(body && { body: JSON.stringify(body) }),
//       })
//         .then(async (res) => {
//           if (res.status === 401) {
//             return await this.send({ path, method, body });
//           }
//           if (method === "DELETE") {
//             res.status === 204 ? resolve({}) : resolve(await res.json());
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
