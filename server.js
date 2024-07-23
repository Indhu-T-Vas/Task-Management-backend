const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");

const app = express();
const port = 4500;

dotenv.config();

app.use(express.json()); // to accept JSON Data

app.use(cors());

// function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "*");
//   // res.header("Access-Control-Expose-Headers", "*");

//   next();
// }

app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);

//----------------------------------------Deployment-------------------------------------------------//

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use;
} else {
  app.get("/", (req, res) => {
    res.send("API is Running Successfully");
  });
}
//----------------------------------------Deployment-------------------------------------------------//

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4500;

app.listen(4500, console.log(`Server started on PORT ${PORT}`.yellow.bold));
