import express from 'express';
import path from 'path';
import posts from './routes/posts.js';
import logger from './middleware/logger.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/error.js';
import { fileURLToPath } from 'url';

const port = process.env.PORT || 5000;
const app = express();

// Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger Middleware
app.use(logger);

// setup current file dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/posts', posts);

// catch all Error middleware
app.use(notFound);

// Error Handler
app.use(errorHandler);

app.listen(port, () => console.log(`server running on port ${port}`));