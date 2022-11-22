import type { AccessTokenSuccessResponse, AccessTokenResponse } from "types";
import fetch from "node-fetch";

export const getAccessToken = async (
  base_url: string
): Promise<AccessTokenSuccessResponse> => {
  const { user } = global;
  const {
    username,
    password,
    client_id,
    client_secret,
    redirect_uri,
    grant_type,
  } = user;
  const config = {
    username,
    password,
    client_id,
    client_secret,
    redirect_uri,
    grant_type,
  };
  const response = (await new Promise((resolve, reject) => {
    fetch(base_url + "/oauth/token", {
      method: "POST",
      body: JSON.stringify(config),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        resolve(await res.json());
      })
      .catch((err) => {
        resolve(err);
      });
  })) as AccessTokenResponse;
  if ("error" in response) {
    throw new Error(response.error_description);
  }
  global.token = {
    ...response,
  };
  return response;
};

export const validateAccessToken = async (): Promise<{
  accessToken: string;
}> => {
  const { token, user } = global;
  if (!user) throw new Error("User not found");
  const { base_url } = user;
  if (!token) {
    const res = await getAccessToken(base_url);
    return { accessToken: res.access_token };
  }
  const { access_token, refresh_token, expires_in, created_at } = token;
  const { client_id, client_secret } = user;
  const now = Math.floor(Date.now() / 1000);

  if (now - created_at < expires_in - 200) {
    return { accessToken: access_token };
  }

  const response = await fetch(`${base_url}/oauth/token`, {
    method: "POST",
    body: JSON.stringify({
      client_id,
      client_secret,
      grant_type: "refresh_token",
      refresh_token,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = (await response.json()) as AccessTokenResponse;
  if ("error" in data) throw new Error(data.error_description);
  global.token = {
    ...data,
  };
  return { accessToken: data.access_token };
};
