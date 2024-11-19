import express from 'express';
import { getAstronauts, addAstronaut, updateAstronautsById, deleteAstronautsById } from '../api/astronautsApi';
import { healthCheck } from '../api/healthCheck';
import { validateRequest } from '../utils/validateRequest';
import { astronautSchema } from '../schemas/astronautSchema';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Astronauts
 *   description: API to manage astronauts.
 */

/**
 * @swagger
 * /health/check:
 *   get:
 *     summary: Health check endpoint
 *     description: Check if the API is running.
 *     responses:
 *       200:
 *         description: A success message.
 */
router.get('/health/check', healthCheck);

/**
 * @swagger
 * /astronauts:
 *   get:
 *     summary: Get a list of astronauts or a single astronaut
 *     description: Retrieve all astronauts or a specific astronaut by providing an ID as a query parameter.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: false
 *         description: The ID of the astronaut to retrieve (optional)
 *     responses:
 *       200:
 *         description: A list of astronauts or a single astronaut.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 astronauts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: John Doe
 *                       role:
 *                         type: string
 *                         example: Engineer
 *       404:
 *         description: Astronaut not found
 */
router.get('/astronauts/:id?', getAstronauts);

/**
 * @swagger
 * /astronaut:
 *   post:
 *     summary: Add a new astronaut
 *     description: Add a new astronaut to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               role:
 *                 type: string
 *                 example: Engineer
 *     responses:
 *       201:
 *         description: Astronaut added successfully.
 *       400:
 *         description: Invalid input.
 */
router.post('/astronaut', validateRequest(astronautSchema), addAstronaut);

/**
 * @swagger
 * /astronaut/{id}:
 *   put:
 *     summary: Update an astronaut by ID
 *     description: Update astronaut details by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the astronaut
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               role:
 *                 type: string
 *                 example: Engineer
 *     responses:
 *       200:
 *         description: Astronaut updated successfully.
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Astronaut not found.
 */
router.put('/astronaut/:id', validateRequest(astronautSchema), updateAstronautsById);

/**
 * @swagger
 * /astronaut/{id}:
 *   delete:
 *     summary: Delete an astronaut by ID
 *     description: Remove an astronaut from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the astronaut to delete
 *     responses:
 *       200:
 *         description: Astronaut deleted successfully.
 *       404:
 *         description: Astronaut not found.
 */
router.delete('/astronaut/:id', deleteAstronautsById);

export default router;
