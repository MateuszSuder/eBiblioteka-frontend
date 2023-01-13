/**
 * Fetcher
 * @param {string} url
 * @param {"GET" | "POST" | "PUT" | "DELETE"} method
 * @param [body]
 * @return {Promise<Response>}
 */
export default async function fetcher(url, method, body) {
   const res = await fetch(`http://localhost/api/${url}`, {
        method,
        credentials: "include",
        body: JSON.stringify(body)
    })
    return res.json();
}