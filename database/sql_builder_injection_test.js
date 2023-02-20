import { Query } from "https://deno.land/x/sql_builder@v1.9.2/mod.ts";

var builder = new Query();
var records = [
  {
    name: `Enok" OR 1=1"`,
    password: "foo",
    id: 1
  },
  {
    id: 2,
    name: "Man",
    password: "bar"
  }
];

var sql = builder
  .table("users")
  .insert(records)
  .build();

//   console.log(sql)

  var record = {
    name: "Enok",
    password: "foo",
    id: 1
  };
  var s_value_entered_by_user = '1 OR 1=1';
  var sql = builder
    .table("a_o_user")
    .where("n_id", "=", s_value_entered_by_user)
    // .where("name", "like", "%n%")
    .update({
        s_name: "overwritten!"
    })
    .build();

console.log(sql)

import { escape, escapeId, format } from "https://deno.land/x/sail_sqlstring@v1.0.0/mod.ts";
import { escapeSql } from "https://deno.land/x/escape/mod.ts";

var userId = "1' 'OR 1=1";
// var userId = "1";
var sql = `select * from user where id = ${ escape(userId) }`;
console.log(sql)
var sql = `select * from user where id = ${ escapeSql(userId) }`;
console.log(sql)
// assertEquals(sql, "select * from user where id = '1'");
console.log(sql)

console.log(escape("test asdfg"))
console.log(escapeSql("test asdfg"))
console.log(escape(2))
console.log(escapeSql(2))

