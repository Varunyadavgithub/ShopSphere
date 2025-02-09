import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import productRoute from "./routes/productRoutes.js";
import { sql } from "./config/connectDB.js";
import { aj } from "./lib/arcjet.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

// Middlewares
app.use(helmet()); //helmet is a security middleware that helps you to protect your app by setting various HTTP headers
app.use(morgan("dev")); //Log the requests.
app.use(express.json());

// Default route
app.get("/", (_, res) => {
  console.log(res.getHeaders());
  res.send("Hello from backend");
});

// apply arcjet rate-lemit to all routes
app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1, // specifies that each request consumes 1 token
    });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ message: "Too Many Requests" });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ message: "Bot access denied" });
      } else {
        res.status(403).json({ message: "Forbidden" });
      }
      return;
    }

    // check for spoofedd bots
    if (
      decision.results.some(
        (result) => result.reason.isBot() && result.reason.isSpoofed()
      )
    ) {
      return res.status(403).json({ message: "Spoofed bot detected" });
    }

    next();
  } catch (error) {
    console.log("Arcjet error: ", error);
    next(error);
  }
});

// Routes
app.use("/api/v1/products", productRoute);

// Initialize DB
async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log("Database initialized successfully.");
  } catch (error) {
    console.log("Error init: ", error);
  }
}

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
