import express from 'express';
import cookieParser from 'cookie-parser';
import apiRouter from './api';
import helmet from 'helmet';

const port = process.env.PORT || 5000;
const dev = process.env.NODE_ENV !== 'production';

const server = express();

server.use(helmet());

server.use(cookieParser());

server.use(express.json());

server.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

server.use("/api/v1", apiRouter);


server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});