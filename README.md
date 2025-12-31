# Booking System API (Fastify)

A robust backend service designed for high-performance booking management.

## 🚀 Requirements Fulfilled
- **Framework**: Built with **Node.js (Fastify)** for superior speed and low overhead.
- **Endpoints**:
  - `POST /bookings`: Create a booking with automated schema validation.
  - `GET /bookings`: Retrieve a complete list of bookings from MongoDB.
  - `PATCH /bookings/:id`: Strict status-only updates (enforced by JSON Schema).
- **Database**: **MongoDB** integration using Mongoose for document modeling.
- **Validation**: Strict **Ajv** validation for input data (including `date-time` formats).
- **Documentation**: Fully interactive **Swagger/OpenAPI** documentation.
- **Testing**: Integration tests using **Vitest** to ensure endpoint reliability.

## 🛠️ Setup & Installation

1. **Install Dependencies**:
   ```bash
   npm install