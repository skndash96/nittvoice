import express from 'express';
import cookieParser from 'cookie-parser';
import apiRouter from './api';
import helmet from 'helmet';
import cors from 'cors';

const server = express();

server.use(cors({
    origin: ["https://nittvoice.vercel.app", "http://localhost:5173"],
    credentials: true
}));

server.use(helmet());

server.use(cookieParser());

server.use(express.json());

server.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

server.get("/", (_, res) => {
    res.send("Hello World!");
});

server.use("/api/v1", apiRouter);

export default server;