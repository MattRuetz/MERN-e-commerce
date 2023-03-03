// To use import here (ES) instead of = require() [common JS]
// I added "type" : "module" to root package.json
// ... now also have to put .js at the end of files
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// pull env variables
dotenv.config();

connectDB();

const app = express();

// to accept JSON in the body
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// app.get('/api/config/paypal', (req, res) =>
//     res.send(process.env.PAYPAL_CLIENT_ID)
// );

// allows uploads to be accessed in browser (static folder)
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// ----------- Middleware for custom error handlers -----------
// handle 404s
app.use(notFound);
// handle server errors
app.use(errorHandler);
// ------------------------------------------------------------

const PORT = process.env.PORT || 5000;

app.listen(
    5000,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan
            .bold
    )
);
