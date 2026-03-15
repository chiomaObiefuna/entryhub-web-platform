require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

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
      { url: `http://localhost:${PORT}` }
    ]
  },
  apis: ["./routes/*.js"] // where your routes are defined
};

const specs = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));