/**
 * Ticket routes
 */

const express = require("express");
const router = express.Router();
const { purchaseTicket, verifyTicket, getTicket, getAllTickets } = require("../controllers/ticketController");

/**
 * @swagger
 * /api/tickets:
 *   post:
 *     summary: Purchase a new ticket
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - event
 *               - seat
 *               - buyer_email
 *             properties:
 *               event:
 *                 type: string
 *                 description: ID of the event
 *                 example: 65e1234567890abcdef12345
 *               seat:
 *                 type: object
 *                 description: Seat object with row and number
 *                 properties:
 *                   row:
 *                     type: string
 *                     description: Seat row identifier
 *                     example: B
 *                   number:
 *                     type: integer
 *                     description: Seat number
 *                     example: 10
 *               buyer_email:
 *                 type: string
 *                 format: email
 *                 description: Email of the ticket buyer
 *                 example: user@entryhub.com
 *     responses:
 *       201:
 *         description: Ticket initiated successfully.
 *       500:
 *         description: Server error.
 */
router.post("/tickets", purchaseTicket);

/**
 * @swagger
 * /api/tickets/verify/{token}:
 *   get:
 *     summary: Verify a ticket
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Ticket unique token
 *     responses:
 *       200:
 *         description: Ticket verified successfully
 *       400:
 *         description: Ticket already used or payment pending
 *       404:
 *         description: Ticket not found
 */
router.get("/tickets/verify/:token", verifyTicket);

/**
 * @swagger
 * /api/tickets/{id}:
 *   get:
 *     summary: Get a ticket by ID
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ticket ID
 *     responses:
 *       200:
 *         description: Ticket details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 event:
 *                   type: string
 *                   description: Name of the event
 *                   example: Movie Night
 *                 seat:
 *                   type: object
 *                   properties:
 *                     row:
 *                       type: string
 *                       example: B
 *                     number:
 *                       type: integer
 *                       example: 10
 *                 payment_status:
 *                   type: string
 *                   example: paid
 *                 qr_image:
 *                   type: string
 *                   description: QR code as Data URL
 *                   example: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
 *       404:
 *         description: Ticket not found
 *       500:
 *         description: Server error
 */
router.get("/tickets/:id", getTicket);

/**
 * @swagger
 * /api/tickets:
 *   get:
 *     summary: Get all tickets
 *     tags: [Tickets]
 *     responses:
 *       200:
 *         description: List of all tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 tickets:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       event:
 *                         type: string
 *                       seat:
 *                         type: object
 *                         properties:
 *                           row:
 *                             type: string
 *                           number:
 *                             type: integer
 *                       buyer_email:
 *                         type: string
 *                       payment_status:
 *                         type: string
 *                       qr_token:
 *                         type: string
 *                       qr_image:
 *                         type: string
 *                       is_used:
 *                         type: boolean
 *                       scanned_at:
 *                         type: string
 */
router.get("/tickets", getAllTickets);

module.exports = router;