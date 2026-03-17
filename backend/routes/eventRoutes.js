const express = require("express");
const router = express.Router();

const {
  createEvent,
  getEvents,
  getEventById,
  getEventsByCategory,
  updateEvent,
  deleteEvent,
  getEventSeats // 👈 NEW
} = require("../controllers/eventController");

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event management endpoints
 */

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create a new cinema event (show)
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Black Panther
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               category:
 *                 type: string
 *                 example: cinema
 *               screen:
 *                 type: string
 *                 description: Screen ID
 *             required:
 *               - title
 *               - date
 *               - category
 *               - screen
 *     responses:
 *       201:
 *         description: Event created successfully
 */
router.post("/events", createEvent);

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of events
 */
router.get("/events", getEvents);

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event found
 *       404:
 *         description: Event not found
 */
router.get("/events/:id", getEventById);

/**
 * @swagger
 * /api/events/category/{category}:
 *   get:
 *     summary: Get events by category
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: Event category
 *     responses:
 *       200:
 *         description: List of events in the category
 */
router.get("/events/category/:category", getEventsByCategory);

/**
 * @swagger
 * /api/events/{id}/seats:
 *   get:
 *     summary: Get seat availability for an event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Seat availability returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 seats:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       seat_id:
 *                         type: string
 *                       row:
 *                         type: string
 *                       number:
 *                         type: number
 *                       isBooked:
 *                         type: boolean
 */
router.get("/events/:id/seats", getEventSeats); // 👈 NEW CORE ENDPOINT

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Update an event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               date:
 *                 type: string
 *               category:
 *                 type: string
 *               screen:
 *                 type: string
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       404:
 *         description: Event not found
 */
router.put("/events/:id", updateEvent);

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Delete an event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 */
router.delete("/events/:id", deleteEvent);

module.exports = router;