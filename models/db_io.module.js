import {f_o_command} from "https://deno.land/x/o_command@0.5/O_command.module.js"

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
            var result = await o_db_client.execute(s_sql_statement);
        } catch (o_e) {
            console.log(`f_o__execute_query__denoxmysql: query: ${s_sql_statement}`)
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


export {
    f_o__execute_query__denoxmysql,
    f_o_command__execute_query_terminalcommand
}