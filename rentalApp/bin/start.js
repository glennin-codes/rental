// #!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from "../app.js";
import createDebugger from "debug";
import http from "http";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import { log } from "console";

dotenv.config();
const debug = createDebugger('rental-app:server')

async function connectToMongoDB() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
    startServer();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

/**
 * Get port from environment and store in Express.
 */



function startServer() {
  /**
   * Get port from environment and store in Express.
   */
  const port = normalizePort(process.env.PORT || "3500");
  app.set("port", port);

  /**
   * Create HTTP server.
   */
  const server = http.createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);

  /**
   * Normalize a port into a number, string, or false.
   */
  function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

  /**
   * Event listener for HTTP server "error" event.
   */
  function onError(error) {
    if (error.syscall !== "listen") {
      throw error;
    }

    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */
  function onListening() {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);
    console.log(`server listenening on http://localhost:${port}`);
  }
}

// Call the connectToMongoDB function to connect to MongoDB
connectToMongoDB();

// #!/usr/bin/env node

/**
 * Module dependencies.
 */

// import app from "../app.js";
// import createDebugger from "debug";
// import http from "http";
// import { MongoClient } from "mongodb";

// const debug = createDebugger('rental-app:server');

// /**
//  * Get port from environment and store in Express.
//  */

// const port = normalizePort(process.env.PORT || "3000");
// app.set("port", port);

// /**
//  * Create HTTP server.
//  */

// const server = http.createServer(app);

// // MongoDB connection URI
// const mongoURI = "mongodb://mongodb-service:27017/rental-app"; // Update with your MongoDB connection details

// /**
//  * Connect to MongoDB before starting the server.
//  */
// MongoClient.connect(mongoURI, { useUnifiedTopology: true })
//   .then((client) => {
//     console.log("Connected to MongoDB");
//     const db = client.db(); // Specify your database name if it's different from the one in the connection URI
//     app.set("db", db); // Set the MongoDB client instance in the app

//     /**
//      * Listen on provided port, on all network interfaces.
//      */

//     server.listen(port);
//     server.on("error", onError);
//     server.on("listening", onListening);

//   })
//   .catch((error) => {
//     console.error("Failed to connect to MongoDB:", error);
//     process.exit(1);
//   });

// /**
//  * Normalize a port into a number, string, or false.
//  */

// function normalizePort(val) {
//   const port = parseInt(val, 10);

//   if (isNaN(port)) {
//     // named pipe
//     return val;
//   }

//   if (port >= 0) {
//     // port number
//     return port;
//   }

//   return false;
// }

// /**
//  * Event listener for HTTP server "error" event.
//  */

// function onError(error) {
//   if (error.syscall !== "listen") {
//     throw error;
//   }

//   const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case "EACCES":
//       console.error(bind + " requires elevated privileges");
//       process.exit(1);
//       break;
//     case "EADDRINUSE":
//       console.error(bind + " is already in use");
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// }

// /**
//  * Event listener for HTTP server "listening" event.
//  */

// function onListening() {
//   const addr = server.address();
//   const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
//   debug("Listening on " + bind);
// }
