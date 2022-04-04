const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

// import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const classroomRoutes = require("./routes/classroom");

// app
const app = express();

// connect db
mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log("DB connected :D"));

// middlewares
app.use(morgan("dev"));
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use(express.json({ limit: "25mb" }));

// apiDocs
app.get("/", (req, res) => {
    fs.readFile("docs/apiDocs.json", (err, data) => {
        if (err) {
            res.status(400).json({
                error: err,
            });
        }
        const docs = JSON.parse(data);
        res.json(docs);
    });
});

// routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", classroomRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});