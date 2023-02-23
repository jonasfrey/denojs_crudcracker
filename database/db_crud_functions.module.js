import {
    a_o_model
} from "./../models/model_classes/a_o_model.module.js"

import { 
    escape as f_v_escaped_for_sql,
    escapeId as f_v_escaped_for_sql_id,
    format
} from "https://deno.land/x/sail_sqlstring@v1.0.0/mod.ts";
// f_v_escaped_for_sql(2) // 2
// f_v_escaped_for_sql("2 'OR 1=1'") // "2 \'OR 1=1\'"
// f_v_escaped_for_sql_id("a_o_user") // "`a_o_user`"

import {
    O_crud_operation_request,
} from "./../models/classes/a_o_class.module.js"

// import {
//     o
// } from "./../models/mod.module.js";

import {
    o_s_table_name_s_id_name, 
    a_o_database, 
    f_o__execute_query__denoxmysql,
    f_o_command__execute_query_terminalcommand, 
    a_o_db_connection_info, 
    f_s_where_query_from_array
} from "./../database/mod.module.js"

import { Client, configLogger } from "https://deno.land/x/mysql/mod.ts";
await configLogger({ enable: false });

class O_query_data{
    constructor(o){
        this.a_s_prop_name = []
        this.a_value = []
        // console.log(o)
        for(var s_prop_name in o){
            var value = o[s_prop_name];
            if(
                false
                //value == undefined //we skip undefined values by default
                // || value == null // we could also skip null values
                ){
                continue;
            }
            this.a_s_prop_name.push((s_prop_name));
            this.a_value.push((value))
        }
        // console.log("this.a_s_prop_name");
        // console.log(this.a_s_prop_name);
        // console.log(this.a_s_prop_name.length);
        if(this.a_s_prop_name.length == 0){
            var s_error = `${o}: object must at least have one property which has a value that is not undefined`
            // console.log("deno exti")
            throw new Error(s_error)

        }
    }
}
var f_a_s_prop_escaped = function(
    o_data, 
){
    var o_query_data = new O_query_data(o_data);
    return o_query_data.a_s_prop_name.map(s=>f_v_escaped_for_sql_id(s));
}
var f_a_value_escaped = function(
    o_data, 
){
    var o_query_data = new O_query_data(o_data);
    return o_query_data.a_value.map(v=>f_v_escaped_for_sql(v));
}
var f_a_s_prop_eq_val_escaped = function(
    o_data, 
){
    var o_query_data = new O_query_data(o_data);
    var a_s_prop_eq_val_escaped = []
    for(var n_idx_a_s_prop_name in o_query_data.a_s_prop_name){
        var s_prop_name = o_query_data.a_s_prop_name[n_idx_a_s_prop_name];
        var value = o_query_data.a_value[n_idx_a_s_prop_name];
        a_s_prop_eq_val_escaped.push(
            `${f_v_escaped_for_sql_id(s_prop_name)} = ${f_v_escaped_for_sql(value)}`
        )
    }
    return a_s_prop_eq_val_escaped
}
var f_s_where_statement = function(a_search_conditions_multidimensional_for_read_or_update_or_delete){
    try {
        var s_where_statement = `WHERE ${f_s_where_query_from_array(a_search_conditions_multidimensional_for_read_or_update_or_delete)}`;
    } catch (o_e) {
        console.log(a_search_conditions_multidimensional_for_read_or_update_or_delete)
        throw `${a_search_conditions_multidimensional_for_read_or_update_or_delete} is wrong formatted`;
    }
    return s_where_statement;
    // var s_sql = `where \n`
    // var a_s_prop_eq_val_escaped = f_a_s_prop_eq_val_escaped(o_data);
    // s_sql += a_s_prop_eq_val_escaped.join("\n and ");
    // return s_sql;
}
var f_s_set_statement = function(o_data){
    var s_sql = `set \n`
    var a_s_prop_eq_val_escaped = f_a_s_prop_eq_val_escaped(o_data);
    s_sql += a_s_prop_eq_val_escaped.join("\n , ");
    return s_sql;
}
var o_database__last_used = null;

var f_a_o_read_indb = async function(
    a_search_conditions_multidimensional,
    s_table_name,
    o_db_client
){
    var s_query = `
select
*
from
${f_v_escaped_for_sql_id(s_table_name)}
${f_s_where_statement(a_search_conditions_multidimensional)}
    `;
    var o_result = await f_o__execute_query__denoxmysql(s_query, o_db_client);

    return o_result.rows;
}

var f_a_o_create_indb = async function(
    o_data,
    s_table_name,
    o_db_client
){
    var s_query = `
insert into
${f_v_escaped_for_sql_id(s_table_name)}
(${f_a_s_prop_escaped(o_data).join(',')})
values
(${f_a_value_escaped(o_data).join(',')})
`;    
    var o_result = await f_o__execute_query__denoxmysql(s_query, o_db_client);

    var s_name_id = o_s_table_name_s_id_name[s_table_name]; 
    if(!s_name_id){
        s_name_id = "n_id"
    }
    var a_o = await f_a_o_read_indb(
        [
            s_name_id, "=", o_result.lastInsertId
        ],
        s_table_name,
        o_db_client
    )
    if(a_o.length == 0){
        return [o_result]
    }
    
    return a_o;
}
var f_a_o_update_indb = async function(
    o_data, 
    a_search_conditions_multidimensional,
    s_table_name,
    o_db_client
){
    var s_query = `
update
${f_v_escaped_for_sql_id(s_table_name)}
${f_s_set_statement(o_data)}
${f_s_where_statement(a_search_conditions_multidimensional)}
`;
    var o_result = await f_o__execute_query__denoxmysql(s_query, o_db_client);
    return o_result.rows;
}
var f_a_o_delete_indb = async function(
    a_search_conditions_multidimensional,
    s_table_name, 
    o_db_client
){
    var s_query = `
delete from
${f_v_escaped_for_sql_id(s_table_name)}
${f_s_where_statement(a_search_conditions_multidimensional)}
`;
    // var a_o = await f_a_o_read_indb(o_crud_operation_request, s_table_name, o_db_client);
    var o_result = await f_o__execute_query__denoxmysql(s_query, o_db_client);
    // console.log(o_result)
    // Deno.exit()
    // return a_o;
    return []// we do not return the deleted entries on purpos we just return an empty array
}

if(
    Deno.args[0] == "test"
    &&
    import.meta.main
){
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
        ["s_name", "=", "hans"], 
        s_table_name,
        o_db_client
    );
    // Deno.exit()
    console.log(o_result);
    
    // Deno.exit();
    
    o_result = await f_a_o_read_indb(
        ["s_name", "=", "juergen"],
        s_table_name,
        o_db_client
    );

    console.log(o_result);
    console.log("create")

    o_result = await f_a_o_create_indb(
        {s_name: "juergen"},
        s_table_name,
        o_db_client
    );

    console.log(o_result);
    console.log("update");

    o_result = await f_a_o_update_indb(
        {s_name:"pikkachu"},
        ["s_name", "=", "juergen"],
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
        ["s_name", "=", "pikkachu"],
        s_table_name,
        o_db_client
    );
    console.log(o_result);

    o_result = await f_a_o_delete_indb(
        ["s_name", "=", "pikkachu"],
        s_table_name,
        o_db_client
    );
    console.log(o_result);


    o_result = await f_a_o_read_indb(
        ["n_id", ">", "0"],
        s_table_name,
        o_db_client
    );

    console.log(o_result);

    o_db_client.close();
    console.log("test successfull")
}
export {
    f_a_o_read_indb,
    f_a_o_create_indb,
    f_a_o_update_indb,
    f_a_o_delete_indb
}