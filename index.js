const fs = require("fs");
const https = require("https");
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

// Load predefined data
// const data = JSON.parse(fs.readFileSync("data.json", "utf8"));

// Create Express app
const app = express();

// Security middleware
app.use(helmet()); // Set security HTTP headers
app.use(cors()); // Enable CORS with appropriate configuration
app.use(express.json()); // Parse JSON request bodies

// Rate limiting to protect against brute-force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Route to return predefined data
app.get("/permission", (req, res) => {
  res.json({permission: false});
});

// SSL/TLS configuration
const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.crt"),
};

// Create an HTTPS server
const server = https.createServer(options, app);

// Start the server
const PORT = 8443;
server.listen(process.env.PORT, () => {
  console.log(`Server running at https://localhost:${PORT}/`);
});
