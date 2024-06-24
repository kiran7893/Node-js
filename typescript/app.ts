import express from "express";
import router from "./route/todos";

const app = express();

app.use(router);

app.listen({ port: 3000 });
