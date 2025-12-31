require('dotenv/config');
import { test, expect, beforeAll, afterAll } from 'vitest';
const fastify = require('../server');
const mongoose = require('mongoose');

const Booking = require('../models/booking');

beforeAll(async () => {
    await fastify.ready();
    await mongoose.connect(process.env.DB_URI, {
        dbName: 'booking-database-test',
    });
});

afterAll(async () => {
    await Booking.deleteMany({});
    await mongoose.disconnect();
    await fastify.close();
});

test('Create a new booking', async () => {
    const response = await fastify.inject({
        method: 'POST',
        url: '/bookings',
        payload: {
            customerName: 'John Doe',
            date: new Date().toISOString(),
        },
    });
    expect(response.statusCode).toBe(201);
    const body = JSON.parse(response.payload);
    expect(body).toHaveProperty('_id');
    expect(body.customerName).toBe('John Doe');
    expect(body.status).toBe('pending');
});

test('Get all bookings', async () => {
    const response = await fastify.inject({
        method: 'GET',
        url: '/bookings',
    });
    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.payload);
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
});

test('Update booking status', async () => {
    const booking = new Booking({
        customerName: 'Jane Doe',
        date: new Date(),
    });
    await booking.save();
    const response = await fastify.inject({
        method: 'PATCH',
        url: `/bookings/${booking._id}`,
        payload: {
            status: 'confirmed',
        },
    });
    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.payload);
    expect(body.status).toBe('confirmed');
});