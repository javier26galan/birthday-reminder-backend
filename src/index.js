const server = require("./server/server");
const environment = require("./config/environment");
const connectDB = require("./config/db");

const PORT = environment.port;
const DB = environment.db;
connectDB(`${DB}`);

server.listen(PORT, () => {
    console.log("server runing in port:", environment.port);
});
