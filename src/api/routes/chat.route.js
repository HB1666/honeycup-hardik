// src/api/routes/chat.route.js - with nlp import and all test working

import express from 'express';
import { createChatController } from '../controllers/chat.controller.js';
import { analyzeMessage } from '../../services/nlp.service.js';
import Message from '../../models/message.model.js';
import User from '../../models/user.model.js';

const router = express.Router();

// Create the chat controller instance with the necessary dependencies
const chatController = createChatController({ analyzeMessage, Message, User });

/**
 * @swagger
 * /api/chat/send:
 *   post:
 *     summary: Send a message
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sender:
 *                 type: string
 *                 description: The ID of the message sender.
 *               recipient:
 *                 type: string
 *                 description: The ID of the message recipient.
 *               content:
 *                 type: string
 *                 description: The content of the message.
 *               messageType:
 *                 type: string
 *                 description: The type of message (e.g., text, image).
 *     responses:
 *       201:
 *         description: Message sent successfully.
 *       400:
 *         description: Error sending message.
 */
router.post('/send', chatController.sendMessage);

/**
 * @swagger
 * /api/chat/messages/{messageId}:
 *   delete:
 *     summary: Delete a message
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the message to delete.
 *     responses:
 *       200:
 *         description: Message deleted successfully.
 *       404:
 *         description: Message not found.
 */
router.delete('/messages/:messageId', chatController.deleteMessage);

/**
 * @swagger
 * /api/chat/messages/{messageId}:
 *   put:
 *     summary: Edit/Update a message
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the message to edit/update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The updated content of the message.
 *     responses:
 *       200:
 *         description: Message edited/updated successfully.
 *       404:
 *         description: Message not found.
 */
router.put('/messages/:messageId', chatController.editMessage);

/**
 * @swagger
 * /api/chat/messages/{messageId}:
 *   get:
 *     summary: Get a message by ID
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the message to retrieve.
 *     responses:
 *       200:
 *         description: Message retrieved successfully.
 *       404:
 *         description: Message not found.
 */
router.get('/messages/:messageId', chatController.getMessage);

export default router;
