import { a_o__testdata } from "./a_o__testdata.module.js";


import { f_o__execute_query__denoxmysql } from "../database/mod.module.js";

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
            for(var o of a_o__testdata){
                if(o.n_id == undefined || o.n_id == null){
                    var o_api_request = new O_api_request(
                        [
                            new O_crud_operation_request(
                                o, 
                                'create',
                                o.constructor.name,
                                o_database.n_id,
                                o_db_connection_info.n_id, 
                            )
                        ]
                    );
                    var o_api_response = await f_o_api_response(
                        o_api_request
                    );
    
                    if(!o_api_response.b_success){
                        console.log(o_api_response.s_message)
                        Deno.exit()
                    }
                    var a_o = o_api_response.a_o_crud_operation_result[0].a_o_instance_from_db;
                    console.log(a_o)
                    continue;
                }
                var o_api_request = new O_api_request(
                    [
                        new O_crud_operation_request(
                            {n_id: o.n_id}, 
                            'read',
                            o.constructor.name,
                            o_database.n_id,
                            o_db_connection_info.n_id, 
                        )
                    ]
                );
                var o_api_response = await f_o_api_response(
                    o_api_request
                );
                
                if(!o_api_response.b_success){
                    console.log(o_api_response.s_message)
                    Deno.exit()
                }
                var a_o = o_api_response.a_o_crud_operation_result[0].a_o_instance_from_db;
                
                if(a_o.length == 0){
                    o_api_request.a_o_crud_operation_request[0].s_crud_operation_name = 'create';
                    o_api_request.a_o_crud_operation_request[0].o = o;
                    var o_api_response = await f_o_api_response(o_api_request);
                    if(!o_api_response.b_success){
                        console.log(o_api_response.s_message)
                        Deno.exit()
                    }
                    console.log(o_api_response)
                }
                console.log(a_o)
            }
    
        }
    }
    console.log("testdata successfully read/write")

}
await f_create_test_data()