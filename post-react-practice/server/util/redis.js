import redis, { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();
const client = redis.createClient({ socket: { port: 6379 } });

client.connect();

client.on("connect", () => {
  console.log("connected");
});
export default client;
