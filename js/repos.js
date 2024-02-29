// repos.js
import { Octokit } from "https://cdn.skypack.dev/octokit";
import { config } from "./config.js"; // Asegúrate de tener un archivo config.js con tu clave de API
const GIT_KEY = config.API_KEY;
export const octokit = new Octokit({ auth: GIT_KEY });

// Ejemplo de uso: obtener repositorios de GitHub
const repo = await octokit.request("GET /users/{username}/repos", {
  username: "tu_nombre_de_usuario",
});
console.log(repo);
