const express = require("express");
const router = express.Router();

const { createScreen } = require("../controllers/screenController");

/**
 * @swagger
 * tags:
 *   name: Screens
 *   description: Cinema screen and seating management
 */

/**
 * @swagger
 * /api/screens:
 *   post:
 *     summary: Create a new cinema screen with generated seats
 *     tags: [Screens]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Screen 1
 *               totalRows:
 *                 type: number
 *                 example: 5
 *               seatsPerRow:
 *                 type: number
 *                 example: 10
 *             required:
 *               - name
 *               - totalRows
 *               - seatsPerRow
 *     responses:
 *       201:
 *         description: Screen created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 65fabc1234abcd5678ef9012
 *                 name:
 *                   type: string
 *                 totalRows:
 *                   type: number
 *                 seatsPerRow:
 *                   type: number
 *                 seats:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       row:
 *                         type: string
 *                         example: A
 *                       number:
 *                         type: number
 *                         example: 1
 */
router.post("/screens", createScreen);

module.exports = router;