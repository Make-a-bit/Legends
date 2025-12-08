import dotenv from "dotenv"  // ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV, SHOULD BE AT TOP
import express from "express";

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Middleware
// parse json bodies in the request object
app.use(express.json());

// Set headers to allow cross-origin requests (CORS)
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Content-type", "application/json");

    // Pass to next layer of middleware
    next();
});

// Load routes 
import achievementRoutes from "./routes/achievementRoutes.js";
import achievementTypeRoutes from "./routes/achievementTypeRoutes.js";
import athleteRoutes from "./routes/athleteRoutes.js";
import competitionRoutes from "./routes/competitionRoutes.js";
import competitionTypeRoutes from "./routes/competitionTypeRoutes.js";
import countryRoutes from "./routes/countryRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import sportRoutes from "./routes/sportRoutes.js";

app.use("/achievements", achievementRoutes);
app.use("/achievementTypes", achievementTypeRoutes);
app.use("/athletes", athleteRoutes);
app.use("/competitions", competitionRoutes);
app.use("/competitionTypes", competitionTypeRoutes);
app.use("/countries", countryRoutes); 
app.use("/events", eventRoutes);
app.use("/sports", sportRoutes);


// Global Error Handler. IMPORTANT function params MUST start with err
app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({
        message: "Something went wrong:",
        error: err
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});