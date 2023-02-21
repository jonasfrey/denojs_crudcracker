import {f_o_command} from "https://deno.land/x/o_command@0.5/O_command.module.js"
import * as mysql2 from "https://deno.land/x/mysql2/mod.ts";
import { escapeSql } from "https://deno.land/x/escape@1.4.2/mod.ts";

var f_o__execute_one_query_escaped__denoxmysql = async function(
    s_query, 
    o_db_client,
    o_database = null,
){
    var s_query_escaped = escapeSql(s_query);
    return f_o__execute_query__denoxmysql(
        s_query_escaped, 
        o_db_client,
        o_database 
    )
}
var f_o__execute_query__denoxmysql = async function(
    s_query, 
    o_db_client,
    o_database = null, 
){

    // since the library can only run one statement at the time
    var a_s_sql_statement = s_query.split(';');
    a_s_sql_statement = a_s_sql_statement.filter(s => s.trim() != '');


    // console.log(a_s_sql_statement)
    if(o_database != null){
        var result = await o_db_client.execute(`USE ${o_database.s_name}`);
    }
    for(let s_sql_statement of a_s_sql_statement){
        try {


            // const pool = mysql2.createPool({
            // host: "127.0.0.1",
            // port: 3306,
            // user: "root",
            // password: "Test1234",
            // database: "test_database",
            // connectionLimit: 4,
            // });
            // const result = await pool.query(s_sql_statement);
            // //console.log(result[0]); // [ { "1": 1 } ]
            // await pool.end();
            // console.log(`f_o__execute_query__denoxmysql: trying query: ${s_sql_statement}`)
            var result = await o_db_client.execute(s_sql_statement);
        } catch (o_e) {
            console.log(`${s_sql_statement}: there occured an error when executing the query, check if the username/password/host/port are correct, some libraries do not correctly throw an error when trying to connect to the db!`)
            // console.log(o_e.message)
            throw o_e;
        }
    }
    return result;
}
var f_o_command__execute_query_terminalcommand = async function(
    s_query, 
    o_db_connection_info,
    o_database = null,
){
    s_query = `-e "${s_query}"`

    if(o_database != null){
        var s_query = `-e "use ${o_database.s_name}; ${s_query}"`
    }

    var s_path_file__db_connection_info = `./tmpcnf_from_f_execute_query.cnf`;
    await f_write_file(
        s_path_file__db_connection_info, 
        `
[client]
user = "${o_db_connection_info.username}"
password = "${o_db_connection_info.password}"
host = "${o_db_connection_info.hostname}"        
`);

    var s_command = `mysql --defaults-extra-file=${s_path_file__db_connection_info} ${s_query}`;
    var o_command = await f_o_command(s_command.split(' '));

    // console.log(o_command);
    // if(o_command?.s_stderr != ''){
    //     console.log(o_command.s_stderr)
    // }
    // console.log(o_command.s_stdout)
    Deno.remove(s_path_file__db_connection_info);

    return o_command;
}



class O_database{
    constructor(
        n_id,
        s_name
    ){
        this.n_id = n_id
        this.s_name = s_name;
    }
}
var a_o_database = [
    new O_database(
        1,
        'test_database'
    )
];




let o_s_table_name_s_id_name = {
    // 'a_o_chatroom': 'n_id', // useless because 'n_id' is default id name  
    'wp_users': "userID"// special unusual id's can be specified here
}
import {O_db_connection_info} from "./O_db_connection_info.module.js"
import { a_o_db_connection_info } from "./a_o_db_connection_info.gitignored.module.js";

export {

    f_o__execute_query__denoxmysql,
    f_o__execute_one_query_escaped__denoxmysql,
    f_o_command__execute_query_terminalcommand,
    O_database,
    a_o_database,
    a_o_db_connection_info, 
    O_db_connection_info,
    o_s_table_name_s_id_name
}