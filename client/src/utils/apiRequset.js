export default async function apiRequest(
  url,
  method,
  body = null,
  withCredentials = false,
  rejectWithValue
) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: withCredentials ? "include" : undefined,
  };

  try {
    const res = await fetch(url, options);
    console.log(res);
    if (!res.ok) {
      const errorData = await res.json();
      console.log(errorData);
      return rejectWithValue(errorData);
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    return rejectWithValue(error.message || "Network error occurred");
  }
}
