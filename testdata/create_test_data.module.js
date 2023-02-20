import { a_o__testdata } from "./a_o__testdata.module.js";

import {
    O_api_request,
    O_crud_operation_result,
    O_crud_operation_request,
    O_crud_operation_request__params,
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


var f_create_test_data = async function(){
    for(var o_db_connection_info of a_o_db_connection_info){
        for(var o_database of a_o_database){
            for(var o of a_o__testdata){


                console.log("testing read") 
                var o_api_request__read = new O_api_request(
                    [
                        new O_crud_operation_request(
                            new O_crud_operation_request__params(
                                {n_id: o.n_id}, 
                            ),
                            'read',
                            o.constructor.name,
                            o_database.n_id,
                            o_db_connection_info.n_id, 
                        )
                    ]
                );
                var o_api_response__read = await f_o_api_response(
                    o_api_request__read
                );
                if(!o_api_response__read.b_success){
                    console.log(o_api_response__read)
                    Deno.exit()
                }

                // testing delete 
                console.log("testing delete") 

                var o_api_request__delete = new O_api_request(
                    [
                        new O_crud_operation_request(
                            new O_crud_operation_request__params(
                                {n_id: o.n_id}, 
                            ),
                            'delete',
                            o.constructor.name,
                            o_database.n_id,
                            o_db_connection_info.n_id, 
                        )
                    ]
                );
                var o_api_response__delete = await f_o_api_response(
                    o_api_request__delete
                );


                //testing create
                console.log("testing create") 
                var o_api_request__create = new O_api_request(
                    [
                        new O_crud_operation_request(
                            new O_crud_operation_request__params(
                                o
                            ),
                            'create',
                            o.constructor.name,
                            o_database.n_id,
                            o_db_connection_info.n_id, 
                        )
                    ]
                );
                var o_api_response__create = await f_o_api_response(
                    o_api_request__create
                );
                if(!o_api_response__create.b_success){
                    console.log("o_api_response__create")
                    console.log(o_api_response__create.s_message)
                    // console.log(o_api_response__create.o_api_request)
                    console.log(o_api_response__create.a_o_crud_operation_result)
                    Deno.exit()
                }


                //testing update
                console.log("testing update") 
                var o_api_request__update = new O_api_request(
                    [
                        new O_crud_operation_request(
                            new O_crud_operation_request__params(
                                {
                                    s_name: `this value has been changed from ${o.s_name} to what you're reading now`
                                },
                                {n_id: o.n_id}, 
                            ),
                            'update',
                            o.constructor.name,
                            o_database.n_id,
                            o_db_connection_info.n_id, 
                        )
                    ]
                );
                var o_api_response__update = await f_o_api_response(
                    o_api_request__update
                );
                if(!o_api_response__update.b_success){
                    console.log(o_api_response__update)
                    Deno.exit()
                }


            }
    
        }
    }
    console.log("testdata successfully read/write")

}
await f_create_test_data()