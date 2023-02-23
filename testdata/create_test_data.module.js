import { a_o__testdata } from "./a_o__testdata.module.js";

import {
    O_api_request,
    O_crud_operation_result,
    O_crud_operation_request,
} from "./../models/classes/a_o_class.module.js"

import { 
    f_o_crud_operation_result, 
    f_o_api_response
} from "./../models/mod.module.js";

import {
    a_o_db_connection_info, 
    a_o_database,
    f_o__execute_query__denoxmysql
} from "./../database/mod.module.js"

let f_print_o_api_response = function(o_api_response){
    // console.log(o_api_response);
    if(!o_api_response.b_success){
        console.log("o_api_response.s_message")
        console.log(o_api_response.s_message)
        for(var o_crud_operation_result of o_api_response.a_o_crud_operation_result){
            // console.log(o_crud_operation_result)
            console.log("o_crud_operation_result.a_o_validation_error:")
            console.log(o_crud_operation_result.a_o_validation_error)
        }
    }
}

var f_create_test_data = async function(){
    for(var o_db_connection_info of a_o_db_connection_info){
        for(var o_database of a_o_database){
            for(var o of a_o__testdata){
                
                console.log("testobject o:")
                console.log(o)

                if(!o.n_id){
                    var o_api_request = new O_api_request(
                        [
                            new O_crud_operation_request(
                                o,
                                null,
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
                    f_print_o_api_response(o_api_response)
                    continue;
                }
                if(o.n_id){
                    var o_api_request = new O_api_request(
                        [
                            new O_crud_operation_request(
                                null,
                                [
                                    "n_id", "=", o.n_id
                                ],
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
                    console.log(o_api_response);
                    Deno.exit()
                    if(o_api_response.a_o_crud_operation_result[0].a_o_instance_from_db.length == 0){
                        var o_api_request = new O_api_request(
                            [
                                new O_crud_operation_request(
                                    o,
                                    null,
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
                        f_print_o_api_response(o_api_response)
                    }
                }
            }
        }
    }
    console.log("testdata successfully read/write")

}
await f_create_test_data()