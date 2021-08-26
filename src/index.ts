import express from "express";
import "express-async-errors";
import cookiesSession from "cookie-session";
import * as dotenv from "dotenv";
import { db } from "./models";
import { DatabaseError } from "./errors/database-error";
import path from "path";
import { UserAuthRouter } from "./routes/user-auth";
import { errorHandler } from "./middlewares/error-handler";

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
// i use cookie session to handle jwt token routes authorization
app.use(cookiesSession({ signed: false }));

app.get("/", (req, res) => res.send("server is up"));
app.use("/auth", UserAuthRouter);

app.use(errorHandler);

db.sequelize
  .authenticate()
  .then(() => console.log("DB Connected.."))
  .catch(() => {
    throw new DatabaseError("Error connecting to db");
  });

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
