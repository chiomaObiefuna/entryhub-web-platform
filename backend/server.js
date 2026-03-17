require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Routes
const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", eventRoutes);
app.use("/api/auth", authRoutes);

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EventHub API",
      version: "1.0.0",
      description: "API documentation for EventHub ticketing app"
    },
    servers: [
      { url: "http://localhost:5000" },
      { url: "https://eventhub-backend-pxoz.onrender.com" }
    ]
  },
  apis: ["./routes/*.js"]
};

const specs = swaggerJsdoc(options);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(specs);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));