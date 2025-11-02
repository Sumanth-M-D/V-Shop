export default async function apiRequest(url, method, body = null) {
  const options = {
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
