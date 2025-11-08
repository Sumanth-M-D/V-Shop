import { HttpMethod, ApiResponse } from "../types/api.types";

export default async function apiRequest<T = any>(
  url: string,
  method: HttpMethod,
  body: any = null
): Promise<ApiResponse<T>> {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message || "An error occured");
  }

  const data = await res.json();
  return data;
}
