const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

class GlobalApi {
  constructor() {
    this.baseURL = `${BACKEND_URL}/api`;
  }

  async #request(method, endpoint, data = null, customOptions = {}) {
    const url = `${this.baseURL}${endpoint}`;

    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(customOptions.headers || {}),
        },
      };

      if (data && method !== "GET" && method !== "DELETE") {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(url, options);

      if (response.status === 204) return true;

      const text = await response.text();
      const result = text ? JSON.parse(text) : null;

      if (!response.ok) {
        throw new Error(
          result?.message || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      return result;
    } catch (error) {
      console.error("API Error:", error.message);
      throw error;
    }
  }
  //GET
  get(endpoint, options = {}) {
    return this.#request("GET", endpoint, null, options);
  }
  //POST
  post(endpoint, data, options = {}) {
    return this.#request("POST", endpoint, data, options);
  }
  //UPDATE
  put(endpoint, data, options = {}) {
    return this.#request("PUT", endpoint, data, options);
  }
  // DELETE
  delete(endpoint, options = {}) {
    return this.#request("DELETE", endpoint, null, options);
  }
}

const api = new GlobalApi();
export default api;
