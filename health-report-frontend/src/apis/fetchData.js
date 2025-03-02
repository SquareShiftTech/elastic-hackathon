const headers = { "Content-Type": "application/json" };

export const fetchData = async ({ url, body, method = "POST" }) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(body)
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`Error: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Request failed", error);
    throw error;
  }
};
