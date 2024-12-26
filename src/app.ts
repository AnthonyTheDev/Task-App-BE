import express, { Request, Response } from "express";
import { readdirSync } from "fs";
import { join } from "path";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript Express!");
});

const routesPath = join(__dirname, "routes");

readdirSync(routesPath).forEach((file) => {
  if (file.endsWith("Route.ts") || file.endsWith("Route.js")) {
    const route = require(join(routesPath, file)).default;
    app.use(route);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
