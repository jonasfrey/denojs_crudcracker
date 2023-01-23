import { a_o_model } from "../models/a_o_model.module.js";
import { a_o_database } from "./a_o_database.module.js";

import {
    f_o__execute_query__denoxmysql,
    f_o_command__execute_query_terminalcommand
} from "./db_io.module.js"
import { a_o_db_connection_info } from "../database/a_o_db_connection_info.gitignored.module.js";


import { Client } from "https://deno.land/x/mysql/mod.ts";

var f_create = async function(s_model_name, o_model_instance ,o_db_client , o_database = null,){
    var s_table_name = "a_"+s_model_name.toLowerCase();

    if(s_table_name == "object"){
        console.log(`${o_model_instance}: must by an instance of a model which has to be defined in a_o_model.module.js`)
        return 1
    }
    
    var o_model = a_o_model.filter(o=> o.s_name == s_model_name)[0];
    if(!o_model){
        console.log(`${s_model_name}: o_model does not exist in ${a_o_model}`)
        return 1
    }

    // console.log(o_model)
    var a_s_prop_name = []
    var a_value = []
    for(var o_model_property of o_model.a_o_model_property){
        if(o_model_property.b_auto_increment && o_model_instance[o_model_property.s_name] == 0){
            continue
        }
        if(o_model_instance.hasOwnProperty(o_model_property.s_name)){
            a_s_prop_name.push(o_model_property.s_name)
            a_value.push(o_model_instance[o_model_property.s_name])
        }
    }

    var s_query = `INSERT INTO ${s_table_name}(${a_s_prop_name.join(',')}) values(${a_value.map(v => `'${v.toString()}'`).join(',')})`;
    
    console.log(s_query)
    console.log(a_value)

    
    let o_result = await f_o__execute_query__denoxmysql(s_query, o_db_client);

    return o_result;
}

var f_read = async function(o_model_instance ,o_db_client , o_database = null){
    
}
var f_update = async function(o_model_instance ,o_db_client , o_database = null){
    
}
var f_delete = async function(o_model_instance ,o_db_client , o_database = null){
    
}

var f_s_where_statement = function(o_data){
    return `where ${Object.keys(o_data).map(s => `${s} = '${o_data[s]}'`).join("and")}`;
}
var f_s_set_statement = function(o_data){
    return `set ${Object.keys(o_data).map(s => `${s} = '${o_data[s]}'`).join(",")}`;
}
var f_a_o_read_indb = async function(
    o_data,
    s_table_name, 
    o_db_client
){
    var s_query = `
        select * from ${s_table_name}
        ${f_s_where_statement(o_data)}
    `;
    var o_result = await f_o__execute_query__denoxmysql(s_query, o_db_client);
    //
    return o_result.rows;
}
var f_a_o_create_indb = async function(
    o_data,
    s_table_name, 
    o_db_client
){
    var a_s_prop_name = Object.keys(o_data);
    var a_value = Object.values(o_data);
    var s_query = `insert into ${s_table_name}(${a_s_prop_name.join(',')}) values(${a_value.map(v => `'${v.toString()}'`).join(',')})`;
    var o_result = await f_o__execute_query__denoxmysql(s_query, o_db_client);
    //
    // console.log(o_result);
    return o_result.rows;
}
var f_a_o_update_indb = async function(
    o_data,
    o_data_where,
    s_table_name, 
    o_db_client
){
    var s_query = `
    update ${s_table_name}
    ${f_s_set_statement(o_data)}
    ${f_s_where_statement(o_data_where)}
    `;
    var o_result = await f_o__execute_query__denoxmysql(s_query, o_db_client);
    //
    return o_result.rows;

}
var f_a_o_delete_indb = async function(
    o_data,
    s_table_name, 
    o_db_client
){
    var s_query = `
    delete from ${s_table_name}
    ${f_s_where_statement(o_data)}
    `;
    var a_o = await f_a_o_read_indb(o_data, s_table_name, o_db_client);
    var o_result = await f_o__execute_query__denoxmysql(s_query, o_db_client);
    
    return a_o;
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
    var o_result = f_o__execute_query__denoxmysql(`use  ${o_database.s_name}`, o_db_client);
    console.log("read");
    o_result = await f_a_o_read_indb({s_name:"hans"}, s_table_name, o_db_client);
    console.log(o_result);
    o_result = await f_a_o_read_indb({s_name:"juergen"}, s_table_name, o_db_client);
    console.log(o_result);
    console.log("create")
    o_result = await f_a_o_create_indb({s_name:"juergen"}, s_table_name, o_db_client);
    console.log(o_result);

    console.log("update")
    o_result = await f_a_o_update_indb({s_name:"pikkachu"}, {s_name:"juergen"}, s_table_name, o_db_client);
    console.log(o_result);

    var o_result = await f_o__execute_query__denoxmysql(
        `select * from ${s_table_name}`,
        o_db_client);

    console.log(o_result.rows);

    console.log("delete")
    o_result = await f_a_o_delete_indb({s_name:"pikkachu"}, s_table_name, o_db_client);
    console.log(o_result);

    o_result = await f_a_o_delete_indb({s_name:"pikkachu"}, s_table_name, o_db_client);
    console.log(o_result);


    o_db_client.close();

}
export {
    f_create, 
    f_read, 
    f_update, 
    f_delete, 
}