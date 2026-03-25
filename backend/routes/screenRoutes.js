const express = require("express");
const router = express.Router();

const { createScreen, getScreens, getScreenById } = require("../controllers/screenController");

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
 */
router.post("/screens", createScreen);


/**
 * @swagger
 * /api/screens:
 *   get:
 *     summary: Get all cinema screens
 *     tags: [Screens]
 *     responses:
 *       200:
 *         description: List of all screens
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: number
 *                   example: 2
 *                 screens:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 65fabc1234abcd5678ef9012
 *                       name:
 *                         type: string
 *                         example: Screen 1
 */
router.get("/screens", getScreens);


/**
 * @swagger
 * /api/screens/{id}:
 *   get:
 *     summary: Get a single screen with its seats
 *     tags: [Screens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Screen ID
 *     responses:
 *       200:
 *         description: Screen details with seats
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 screen:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 65fabc1234abcd5678ef9012
 *                     name:
 *                       type: string
 *                       example: Screen 1
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
 *                       type:
 *                         type: string
 *                         example: regular
 *       404:
 *         description: Screen not found
 */
router.get("/screens/:id", getScreenById);


module.exports = router;