const express = require("express");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const path = require("path");

connectDB = require("./lib/db.js")
const authRoutes = require("./routes/auth.route.js");
const messageRoutes = require("./routes/message.route.js");
const {app, server} = require("./lib/socket.js");

const port = process.env.PORT || 5000;
const _dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(_dirname,"../frontend/dist"))); 

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connectDB();
});