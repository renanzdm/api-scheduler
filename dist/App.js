import express from "express";
import cors from "cors";
import { routers } from "./routes/Routes.js";
export class App {
    constructor() {
        this.app = express();
    }
    configure() {
        const corOptions = { origin: "*" };
        this.app.use(cors(corOptions));
        this.app.use(express.json());
        this.app.use(routers);
    }
}
//# sourceMappingURL=App.js.map