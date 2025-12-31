require("dotenv/config");
const fastify = require("fastify")({
  logger: true,
});

const mongoose = require("mongoose");

fastify.register(require("@fastify/swagger"), {
  openapi: {
    info: {
      title: "Booking API",
      description: "API documentation for the Booking service",
      version: "1.0.0",
    },
  },
});

fastify.register(require("@fastify/swagger-ui"), {
  routePrefix: "/swagger",
});

fastify.register(require("@fastify/cors"), {
  origin: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
});

//Database
mongoose
  .connect(process.env.DB_URI, {
    dbName: "booking-database",
  })
  .then(() => {
    console.log("Database Connection established!");
  })
  .catch((err) => {
    console.log(err);
  });

//Routes
fastify.register(require("./routes/booking-route"));

//Global Error Handler
fastify.setErrorHandler(function (error, req, res) {
  this.log.error(error);
  res.status(500).send({ error: "Internal Server Error" });
});




//Server
fastify.listen({ port: process.env.PORT || 3001 }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
});


module.exports = fastify;