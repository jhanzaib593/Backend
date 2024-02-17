const express = require("express");
const cors = require("cors");
const color = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//env config
dotenv.config();

//route import
const userRouter = require("./router/userRoutes");
const blogRountes = require("./router/blogRoute");

//mongodb connect
connectDB();

//rest object

const app = express();

app.use(cors());
app.use(express.json());

//api
// app.get("/", function (req, res) {
//   res.status(200).send({ message: "Node Server" });
// });

app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRountes);

//Port

const PORT = process.env.PORT || 3030;

//listen

app.listen(PORT, () => {
  console.log(
    `Server Running ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white
  );
});
