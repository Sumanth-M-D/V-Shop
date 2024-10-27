export default async function apiRequest(
  url, // URL of the API endpoint
  method, // HTTP method (GET, POST, etc.)
  body = null, // Optional body of the request for methods like POST or PUT
  withCredentials = false // Whether to include credentials (like cookies)
) {
  // Define options for the fetch request
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: withCredentials ? "include" : undefined,
  };

  // Make the fetch request and store the response
  const res = await fetch(url, options);

  // Check if the response is not OK (status outside the 200-299 range)
  // Extract the error message from response, if available, and throw an error
  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message || "An error occured");
  }

  // Parse and return the response data as JSON if no error is thrown
  const data = await res.json();
  return data;
}
