import server from "./server";

const port = process.env.PORT || 8080;
const dev = process.env.NODE_ENV !== 'production';

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
