import express from "express";
import { routers } from "./routes/Routes.js";
const app = express();
app.use(express.json());
app.use(routers);
export { app };
//# sourceMappingURL=App.js.map