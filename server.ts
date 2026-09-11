import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import readingHandler from "./api/reading.js";
import readingsHandler from "./api/readings/index.js";
import readingByIdHandler from "./api/readings/[id].js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/api/reading", readingHandler);

app.all("/api/reading", (req, res) => {
  return res.status(405).json({
    error: "Method not allowed. Use POST /api/reading.",
  });
});

app.post("/api/readings", readingsHandler);
app.get("/api/readings/:id", (req, res) => {
  req.query = req.query || {};
  req.query.id = req.params.id;
  return readingByIdHandler(req, res);
});
app.get("/api/readings", readingsHandler);

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");

    app.use(express.static(distPath));

    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Tarot server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();