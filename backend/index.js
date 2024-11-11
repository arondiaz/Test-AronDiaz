import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = 4044;

app.get("/api/usuarios", (req, res) => {
  fs.readFile("./data/users.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer el archivo JSON:", err);
      res.status(500).json({ error: "Error al leer los datos" });
      return;
    }
    res.status(200).json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
