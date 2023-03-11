import express from "express";
import cors from "cors";
import { routers } from "./routes/Routes.js";



export class App {
    app = express();
    configure():void {
        const corOptions:cors.CorsOptions = { origin:"*"};
       this.app.use(cors(corOptions));   
       this.app.use(express.json());
       this.app.use(routers);
    }

}


