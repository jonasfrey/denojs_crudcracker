import { escapeSql } from "https://deno.land/x/escape@1.4.2/mod.ts";

var s_from_user = `12:40:25,02-20-2023; drop database test;`
var s = `'${s_from_user}'`;
var s_query = `select * from test_table where s_ts = ${s}`
var s_query_escpaed =  `select * from test_table where s_ts = ${escapeSql(s)}`
console.log(s_query)
console.log(s_query_escpaed)

import { Client } from "https://deno.land/x/mysql/mod.ts";
const client = await new Client().connect({
  hostname: "127.0.0.1",
  username: "admin",
  db: "test_database",
  password: "Test1234",
});

var o_user_input__harmless = {
    n_id: 2
}
var o_user_input__injectiontest = {
    n_id: '2; select * from a_o_user;'
}
var o_user_input__injectiontest2 = {
    ['n_id = 2; select * from']: 'a_o_user'
}
var o_user_input__injectiontest3 = {
    n_id: '2 OR 1=1'
}
var o_user_input__injectiontest3 = {
    n_id: `2' OR '1=1`
}
var o_user_input = o_user_input__injectiontest3;

var a_s_prop = Object.keys(o_user_input);
var a_s_val = Object.values(o_user_input);
var s_query = `select * from a_o_user where ${a_s_prop[0]} = ${a_s_val[0]}`;
var s_query_escaped_weak = `select * from a_o_user where ${a_s_prop[0]} = '${a_s_val[0]}'`;
var s_query_escaped_strong = `select * from a_o_user where ${a_s_prop[0]} = '${escapeSql(a_s_val[0])}'`;

console.log("s_query")
console.log(s_query)
console.log("s_query_escaped_weak")
console.log(s_query_escaped_weak)
console.log("s_query_escaped_strong")
console.log(s_query_escaped_strong)

var s_query_executed = s_query;
let result = await client.execute(
    // s_query,
    // s_query_escaped_weak
    // s_query_escaped_strong
    `select * from a_o_user where 'n_id' = 2`
);
console.log(result.rows)

const result2 = await client.query(
    "select ?? from ?? where ?? = ?",
    ["*", "a_o_user", "n_id",2],
  );
console.log(result2)

//try injection
const result3 = await client.query(
    "select ?? from ?? where ?? = ?",
    ["*", "a_o_user", "n_id", `2 OR 1=1`],
  );
console.log(result3)