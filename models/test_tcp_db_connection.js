// var n_port_mysql_default = 3306;
// const c=await Deno.connect({
//     transport: "tcp",
//     port: n_port_mysql_default
// });

// while(true){
//     var a_nu8_data = new TextEncoder().encode("hello1234");
//     await c.write(a_nu8_data);
//     var n_i = 0;
//     while(n_i < 1000){
//         n_i+=1;
//     }
//     // setInterval(function(){
//     //     const d=new TextEncoder().encode('asdf1234');
        
//     //     c.write(d);
//     // },500)
// }
// console.log(c)


// const b=new Uint8Array(111);
// const n=await c.read(b);
// console.log(n)

import { Client } from "https://deno.land/x/mysql/mod.ts";
const client = await new Client().connect({
  hostname: "127.0.0.1",
  port: 3306, 
  username: "admin",
  password: "Test1234",
});
console.log(client)
var result =
console.log(result);
result =  await client.execute(`CREATE DATABASE IF NOT EXISTS enok`);
result =  await client.execute(`DROP DATABASE enok`);
result =  await client.execute(`create database enok`);
console.log(result);
result =  await client.execute(`USE enok`);
console.log(result);
result =  await client.execute(`SHOW tables`);
console.log(result);
result =  await client.execute(`CREATE TABLE IF NOT EXISTS MyGuests (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    email VARCHAR(50),
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);

console.log(result);
result =  await client.execute(`INSERT INTO MyGuests (firstname, lastname, email)
VALUES ('John', 'Doe', 'john@example.com')`);
console.log(result);
result =  await client.execute(`select * from MyGuests`);
console.log(result);

var s_query_create_table1 = `
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY
);
`
var s_query_create_table2 = `
CREATE TABLE IF NOT EXISTS tasks2 (
    id INT AUTO_INCREMENT PRIMARY KEY
);
`

// executing the querys one by one works

//  result = await client.execute(s_query_create_table1)
//  result = await client.execute(s_query_create_table2)
// executing both querys at the same time does not work 

result = await client.query(`${s_query_create_table1};${s_query_create_table2}`)
console.log(result)