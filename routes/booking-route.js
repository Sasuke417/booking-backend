const Booking = require("../models/booking");

async function bookingRoutes(fastify, options) {
  fastify.post(
    "/bookings",
    {
      schema: {
        body: {
          type: "object",
          required: ["customerName", "date"],
          properties: {
            customerName: {
              type: "string",
            },
            date: {
              type: "string",
              format: "date-time",
            },
            status: {
              type: "string",
              enum: ["pending", "confirmed", "cancelled"],
            },
          },
        },
      },
    },
    async (req, res) => {
      try {
        const booking = new Booking(req.body);
        const savedBooking = await booking.save();
        res.code(201).send(savedBooking);
      } catch (err) {
        res.code(400).send({ error: err.message });
      }
    }
  );

  fastify.get("/bookings", async (req, res) => {
    try {
      const bookings = await Booking.find();
      res.send(bookings);
    } catch (err) {
      res.code(500).send({ error: err.message });
    }
  });

  fastify.patch(
    "/bookings/:id",
    {
      schema: {
        
          params: {
            type: "object",
            properties: {
              id: { type: "string" },
            },
          },
          body: {
            type: "object",
            required: ["status"],
            additionalProperties: false,
            properties: {
              status: {
                type: "string",
                enum: ["pending", "confirmed", "cancelled"],
              },
            },
          },
        },
      
    },
    async (req, res) => {
      try {
        const status = req.body.status;

        const updatedBooking = await Booking.findByIdAndUpdate(
          req.params.id,
          {
            $set: { status: status },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        if (!updatedBooking) {
          return res.code(404).send({ error: "Booking not found" });
        }
        res.send(updatedBooking);
      } catch (err) {
        res.code(400).send({ error: err.message });
      }
    }
  );
}

module.exports = bookingRoutes;
