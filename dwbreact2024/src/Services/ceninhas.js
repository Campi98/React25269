export function getCenas() {
    return fetch("https://localhost:7182/api/firstapi", {
        method: "GET",
        Accept: "*",
        headers: {

            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
}
