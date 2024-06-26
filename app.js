/**
 * This is the main file for the server application.
 * It sets up the server, connects to the database, and defines routes and middleware.
 */
// app.js

import express from 'express';
import connectDatabase from './src/config/database.js';
import authRoutes from './src/api/routes/auth.route.js';
import userRoutes from './src/api/routes/user.route.js';
import mediaRoutes from './src/api/routes/media.route.js';
import chatRoutes from './src/api/routes/chat.route.js';
import passport from 'passport';
import './src/config/passport-setup.js';
import cors from 'cors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const createApp = () => {
    const app = express();

    // Connect to MongoDB
    connectDatabase();

    // Middleware setup
    app.use(express.json());
    app.use(cors());
    app.use(passport.initialize());

    // Define routes
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/media', mediaRoutes);
    app.use('/api/chat', chatRoutes);

    // Swagger setup
    const swaggerOptions = {
        swaggerDefinition: {
            openapi: '3.0.0',
            info: {
                title: 'HoneyCup API',
                version: '1.0.0',
                description: 'Documentation for the HoneyCup API',
            },
        },
        apis: ['./src/api/routes/*.js'],
    };

    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    return app;
};

const app = createApp();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
