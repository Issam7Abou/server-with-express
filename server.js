import express from 'express';
import path from 'path';
import posts from './routes/posts.js';

const port = process.env.PORT || 5000;
const app = express();

// Routes
app.use('/api/posts', posts);

app.listen(port, ()=> console.log(`server running on port ${port}`));