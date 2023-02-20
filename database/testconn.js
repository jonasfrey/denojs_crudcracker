import { Client } from "https://deno.land/x/mysql/mod.ts";
const client = await new Client().connect({
  hostname: "127.0.0.1",
  username: "testuser",
  password: "Test1234",
});

// // "127.0.0.1",
// // 3306,
// // "root2",
// // "Test1234",
// console.log(client)

await client.execute(`CREATE DATABASE IF NOT EXISTS enok`);