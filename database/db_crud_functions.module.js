import {
    a_o_model
} from "./../models/a_o_model.module.js"

import {
    O_crud_operation_request,
    O_crud_operation_request__params,
} from "./../models/classes/a_o_class.module.js"


import { escapeSql } from "https://deno.land/x/escape@1.4.2/mod.ts";

// import {
//     o
// } from "./../models/mod.module.js";

import {
    o_s_table_name_s_id_name, 
    a_o_database, 
    f_o__execute_query__denoxmysql,
    f_o_command__execute_query_terminalcommand, 
    a_o_db_connection_info
} from "./../database/mod.module.js"

import { Client } from "https://deno.land/x/mysql/mod.ts";

class O_query_data{
    constructor(o){
        this.a_s_prop_name = []
        this.a_value = []
        console.log(o)
        for(var s_prop_name in o){
            var value = o[s_prop_name];
            if(
                value == undefined 
                // || value == null
                ){
                continue;
            }
            this.a_s_prop_name.push(escapeSql(s_prop_name));
            this.a_value.push(escapeSql(value))
        }
    }
}


var f_s_where_statement = function(o_data){
    var o_query_data = new O_query_data(o_data);
    return `where ${o_query_data.a_s_prop_name.map(s => `${escapeSql(s)} = ${escapeSql(o_data[s])}`).join(" and ")}`;
}
var f_s_set_statement = function(o_data){
    var o_query_data = new O_query_data(o_data);
    return `set ${o_query_data.a_s_prop_name.map(s => `${escapeSql(s)} = ${escapeSql(o_data[s])}`).join(" , ")}`;
}
var o_database__last_used = null;

var f_a_o_read_indb = async function(
    o_crud_operation_request__params,
    s_table_name,
    o_db_client
){
    var s_query = `
        select * from ${escapeSql(s_table_name)}
        ${f_s_where_statement(o_crud_operation_request__params.o)}
    `;
    // console.log(o_crud_operation_request__params)
    
    var o_result = await f_o__execute_query__denoxmysql(s_query, o_db_client);
    //
    // console.log(o_result)
    return o_result.rows;
}
var f_a_o_create_indb = async function(
    o_crud_operation_request__params,
    s_table_name,
    o_db_client
){
    var o_query_data = new O_query_data(o_crud_operation_request__params.o);

    var s_query = `insert into ${escapeSql(s_table_name)}(${o_query_data.a_s_prop_name.join(',')}) values(${o_query_data.a_value.map(v => `${escapeSql(v.toString())}`).join(',')})`;
    var o_result = await f_o__execute_query__denoxmysql(s_query, o_db_client);

    var s_name_id = o_s_table_name_s_id_name[s_table_name]; 
    if(!s_name_id){
        s_name_id = "n_id"
    }
    var a_o = await f_a_o_read_indb(
        new O_crud_operation_request__params(
            {[s_name_id]: o_result.lastInsertId},
            {}, 
        ),
        s_table_name,
        o_db_client
    )
    if(a_o.length == 0){
        return [o_result]
    }
    
    return a_o;
}
var f_a_o_update_indb = async function(
    o_crud_operation_request__params,
    s_table_name,
    o_db_client
){
    var s_query = `
    update ${escapeSql(s_table_name)}
    ${f_s_set_statement(o_crud_operation_request__params.o)}
    ${f_s_where_statement(o_crud_operation_request__params.o_where)}
    `;
    var o_result = await f_o__execute_query__denoxmysql(s_query, o_db_client);
    //
    return o_result.rows;

}
var f_a_o_delete_indb = async function(
    o_crud_operation_request__params,
    s_table_name, 
    o_db_client
){
    var s_query = `
    delete from ${escapeSql(s_table_name)}
    ${f_s_where_statement(o_crud_operation_request__params.o)}
    `;
    // var a_o = await f_a_o_read_indb(o_crud_operation_request__params, s_table_name, o_db_client);
    var o_result = await f_o__execute_query__denoxmysql(s_query, o_db_client);
    // console.log(o_result)
    // Deno.exit()
    // return a_o;
    return []// we do not return the deleted entries on purpos we just return an empty array
}
if(Deno.args[0] == "test"){
    var o_db_connection_info = a_o_db_connection_info[0];
    var o_db_client = await new Client().connect({
        hostname: o_db_connection_info.s_hostname, 
        port: o_db_connection_info.n_port,
        username: o_db_connection_info.s_username, 
        password: o_db_connection_info.s_password, 
    });
    var s_table_name = "a_o_user";
    var o_database = a_o_database[0];
    var o_result = f_o__execute_query__denoxmysql(
        `use  ${o_database.s_name}`,
        o_db_client
    );
    console.log("read");
    o_result = await f_a_o_read_indb(
        new O_crud_operation_request__params({s_name:"hans"}),
        s_table_name,
        o_db_client
    );
    console.log(o_result);
    o_result = await f_a_o_read_indb(
        new O_crud_operation_request__params({s_name:"juergen"}),
        s_table_name,
        o_db_client
    );
    console.log(o_result);
    console.log("create")
    o_result = await f_a_o_create_indb(
        new O_crud_operation_request__params({s_name:"juergen"}),
        s_table_name,
        o_db_client
    );
    console.log(o_result);

    console.log("update")
    o_result = await f_a_o_update_indb(
        new O_crud_operation_request__params(
            {s_name:"pikkachu"},
            {s_name:"juergen"}
        ),
        s_table_name,
        o_db_client
        );
    console.log(o_result);

    var o_result = await f_o__execute_query__denoxmysql(
        `select * from ${s_table_name}`,
        o_db_client);

    console.log(o_result.rows);

    console.log("delete")
    o_result = await f_a_o_delete_indb(
        new O_crud_operation_request__params({s_name:"pikkachu"}),
        s_table_name,
        o_db_client
    );
    console.log(o_result);

    o_result = await f_a_o_delete_indb(
        new O_crud_operation_request__params({s_name:"pikkachu"}),
        s_table_name,
        o_db_client
    );
    console.log(o_result);

    o_db_client.close();

}
export {
    f_a_o_read_indb,
    f_a_o_create_indb,
    f_a_o_update_indb,
    f_a_o_delete_indb
}