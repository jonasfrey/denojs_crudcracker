var s_location = './classes/O_api_request.module.js';

import { O_api_response } from "./classes/O_api_response.module.js";
import { O_api_request } from "./classes/O_api_request.module.js";

import { O_crud_operation_request } from "./classes/O_crud_operation_request.module.js";
import { O_crud_operation_result } from "./classes/O_crud_operation_result.module.js";

import {f_o__casted_to_class} from "https://deno.land/x/f_o__casted_to_class@0.6/f_o__casted_to_class.module.js"

import {f_o_command} from "https://deno.land/x/o_command@0.5/O_command.module.js"
import { f_o_api_response } from "./mod.module.js";
import { O_crud_operation_request__params } from "./classes/O_crud_operation_request__params.module.js";

let f_print_help = function(){

    console.log("usage: ")
    console.log("deno run -A scrpt.js 'O_api_request {...}'")

    console.log(`${s_location}:  location of O_api_request {}`)
    console.log('example of O_api_request:')
    var o_api_request = new O_api_request(
        [
            new O_crud_operation_request(
                {n_id: 12}, 
            )
        ]
    );
}

var s_arg = Deno.args[0];
var a_s_arg__help = ["help", "-h", "/h", "h", "info" ];
if(!s_arg || a_s_arg__help.includes(s_arg.toLowerCase()) ){
    f_print_help();
    Deno.exit(0)
}
if(Deno.args[0] == "test"){

    // it can be that we do not have the class O_api_request available for the current programming language, 
    // so we have to stricly follow the pattern of the class
    var o_api_request = {
        a_o_crud_operation_request:
        [
            { //            o_crud_operation_request: 
                o_crud_operation_request__params: {
                    o: {s_name: "lola"}, 
                    o_where: {}
                },
                s_crud_operation_name: "create", 
                s_model_name: "O_user",
                n_o_database_n_id: 1,
                n_o_db_connection_info_n_id: 1, 
                s_table_name: null
            }
        ]
    }

    var s_json = JSON.stringify(o_api_request);
    var s_path_file = import.meta.url.split("//").pop();
    var s_command = `deno run -A ${s_path_file} '${s_json}'`;
    // console.log("s_command", s_command);
    // Deno.exit()
    var o_command = await f_o_command(s_command.split(' '))

    console.log("o_command.s_stdout");
    console.log(o_command.s_stdout);
    var o_api_response = JSON.parse(o_command.s_stdout);
    console.log(o_api_response)
    console.log(o_api_response.s_message)
    Deno.exit(0)
}

var s_json = Deno.args[0];
var o = JSON.parse(s_json);
var o_api_request = o;
var o_api_response = await f_o_api_response(o_api_request);

var s_json = JSON.stringify(o_api_response)
console.log(s_json)

