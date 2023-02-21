
import {
    O_api_request,
    O_crud_operation_result,
    O_crud_operation_request,
    O_crud_operation_request__params,
} from "../models/classes/a_o_class.module.js"

import { 
    f_o_crud_operation_result, 
    f_o_api_response
} from "../models/mod.module.js";

import {
    a_o_db_connection_info, 
    a_o_database,
    f_o__execute_query__denoxmysql
} from "./mod.module.js"

for(var o_db_connection_info of a_o_db_connection_info){
    for(var o_database of a_o_database){
                    
            // console.log("test with bad data");
            // var o_api_response = await f_o_api_response("lol this is really really wrong");
            // console.log(o_api_response);
            // console.log(o_api_response.s_message);


            // console.log("test with bad data");
            // var o_api_request = new O_api_request(
            //     "lol this is really wrong"
            // );
            // var o_api_response = await f_o_api_response(o_api_request);
            // console.log(o_api_response);
            // console.log(o_api_response.s_message);


            // console.log("test with bad data");
            // var o_api_request = new O_api_request(
            //     [
            //         "tihsi is only a bit wrong"

            //     ]   
            // );
            // var o_api_response = await f_o_api_response(o_api_request);
            // console.log(o_api_response);
            // console.log(o_api_response.s_message);


            // console.log("test with empty O_crud_operation_request__params");
            // var o_api_request = new O_api_request(
            //     [
            //         new O_crud_operation_request(
            //             // it gets better
            //             new O_crud_operation_request__params(
            //                 {},
            //                 {} 
            //             ),
            //             'read',
            //             "O_user",
            //             o_database.n_id,
            //             o_db_connection_info.n_id, 
            //         )
            //     ]   
            // );
            // var o_api_response = await f_o_api_response(o_api_request);
            // console.log(o_api_response);
            // console.log(o_api_response.s_message);


            console.log("test with empty O_crud_operation_request__params.o_where");
            var o_api_request = new O_api_request(
                [
                    new O_crud_operation_request(
                        // it gets better
                        new O_crud_operation_request__params(
                            {n_id:2},
                            {}
                        ),
                        'update',
                        "O_user",
                        o_database.n_id,
                        o_db_connection_info.n_id, 
                    )
                ]   
            );
            var o_api_response = await f_o_api_response(o_api_request);
            console.log(o_api_response);
            console.log(o_api_response.s_message);



            console.log("test with no error");
            var a_s_name = ['jens', 'fridola', 'albert', 'agnes'];
            var o_api_request = new O_api_request(
                new Array(10).fill(0).map(
                    function(){
                        var o = {s_name: a_s_name[parseInt(Math.random()*a_s_name.length-1)]+" geboren am "+new Date().toString()};
                        console.log(o)

                        return new O_crud_operation_request(
                            // it gets better
                            new O_crud_operation_request__params(
                                o
                            ),
                            'create',
                            "O_user",
                            o_database.n_id,
                            o_db_connection_info.n_id, 
                        )
                    }
                )
                
            );
            var o_api_response = await f_o_api_response(o_api_request);
            console.log(o_api_response);
            console.log(o_api_response.s_message);
            console.log(o_api_response.a_o_crud_operation_result);

    }
}
