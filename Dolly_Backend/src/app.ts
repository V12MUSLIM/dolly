import express from "express";
import { type Request, type Response } from "express";
const app = express();

app.get("/todos", (req: Request, res: Response) => {
  res.send("Backend is working :)");
});
app.post("/user", (req: Request, res: Response) => {
  res.send("Backend is working and this a POST req :)");
});
app.put("/", (req: Request, res: Response) => {
  res.send("Backend is working and this a PUT req :)");
});
app.delete("/user", (req: Request, res: Response) => {
  res.send("Backend is working and this a DELETE req for '/user' :)");
});

export default app;
