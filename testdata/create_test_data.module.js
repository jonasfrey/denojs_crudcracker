import { a_o__testdata } from "./a_o__testdata.module.js";


import { f_o__execute_query__denoxmysql } from "../database/db_io.module.js";

import { a_o_database } from "../database/a_o_database.module.js";

import { Client } from "https://deno.land/x/mysql/mod.ts";

import { a_o_db_connection_info } from "../database/a_o_db_connection_info.gitignored.module.js";
import {
    O_api_request 
} from "./../models/classes/O_api_request.module.js"
import { 
    f_o_crud_operation_result, 
    f_o_api_response
} from "./../models/mod.module.js";

import { O_crud_operation_result } from "../models/classes/O_crud_operation_result.module.js";
import { O_crud_operation_request } from "../models/classes/O_crud_operation_request.module.js";

var f_create_test_data = async function(){
    for(var o_db_connection_info of a_o_db_connection_info){
        for(var o_database of a_o_database){
            // console.log(o_database)
            var o_db_client = await new Client().connect({
                hostname: o_db_connection_info.s_hostname, 
                port: o_db_connection_info.n_port,
                username: o_db_connection_info.s_username, 
                password: o_db_connection_info.s_password, 
            });
    
            await f_o__execute_query__denoxmysql(`USE ${o_database.s_name};`, o_db_client)
            console.log(o_database)
            for(var o of a_o__testdata){
                var s_model_name = o.constructor.name;
                var o_api_response = await f_o_api_response(
                    new O_api_request(
                        [
                            new O_crud_operation_request(
                                o, 
                                'create', 
                                o.constructor.name
                            )
                        ]
                    )
                )
                console.log(o_api_response);
            }
    
        }
    }

}
await f_create_test_data()