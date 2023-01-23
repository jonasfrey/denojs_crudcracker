import {a_o_model} from "./a_o_model.module.js";
import 
    * as o_mod__db_crud_functions
    from "../database/db_crud_functions.module.js"
import { a_o_crud_operation_callback } from "./a_o_crud_operation_callback.module.js";
import {f_a_o_validation_error__o_model} from "./validaton.module.js";

import { O_api_response } from "./classes/O_api_response.module.js";
import { O_api_request } from "./classes/O_api_request.module.js";

import { O_crud_operation_request } from "./classes/O_crud_operation_request.module.js";
import { O_crud_operation_result } from "./classes/O_crud_operation_result.module.js";

var f_o_model_related = function(s_prop_name){
    // n_o_finger_n_id -> 'n_', 'o_finger_', 'n_id'
    var s_start = "n_"; 
    var s_end = "_n_id";
    var n_index_start = s_prop_name.indexOf(s_start);
    if(
        n_index_start == 0
        &&
        s_prop_name.endsWith(s_end)
        ){
            var s_model_name_lowercase = s_prop_name.substring(s_start.length, (s_prop_name.length - s_end.length))
    }else{ 
        return undefined
    }
    var a_o_model_filtered = a_o_model.filter(
        function(obj_model){
            return obj_model.s_name.toLowerCase() == s_model_name_lowercase
        }
    )
    return a_o_model_filtered[0]
}

var f_a_o_model_filtered__child_model = function(o_model){

    var s_model_name_lowercase = o_model.s_name.toLowerCase();
    // model : O_hand -> { n_id:... }
    // 'child' model, (one hand has many fingers), 
    // child_model: O_finger -> { n_id:..., n_o_hand_n_id:... }
    // n_o_hand_n_id;
    var s_prop_name_foreign_key = `n_${s_model_name_lowercase}_n_id`;

    var a_o_model_filtered__child_model = a_o_model.filter(
        function(o_model__2){
            return o_model__2.a_o_model_property.map(o=>o.s_name).includes(s_prop_name_foreign_key);
        }
    );
    return a_o_model_filtered__child_model;

}

var f_o_model_filtered__parent_model = function(s_prop_name){
    
    return f_o_model_related(s_prop_name);
}


var f_s_model_name_camel_case = function(s_model_name_snake_case){
    var a_s = s_model_name_snake_case.split("_");
    a_s.map(s=>s[0].toUpperCase()+s.slice(1));
    return a_s.join()
}
var f_s_model_name_snake_case = function(s_model_name_camel_case){
    console.log("beware, the definitve snake case name cannot be constructed and the return of this function might be wrong");

    var a_s = [];
    var s_part = ''; 
    for(var n_index in s_model_name_camel_case){
        var s = s_model_name_camel_case[n_index]
        if(s == s.toUpperCase()){
            if(s_part != ''){
                a_s.push(s_part)
                s_part = ''
            }
        }
        s_part+=s;
    }
    var s_model_name_snake_case = a_s.join("_");
    return s_model_name_camel_case;
}
var f_o__casted_to_class = function(
    o_object,
    o_class
){
    var o_class_instance = new o_class();
    for(var s_prop_name in o_class_instance){
        if(!o_object.hasOwnProperty(s_prop_name)){
            var s_msg = `'${s_prop_name}': property is not set on the object / object must be instance of class ${o_class}`
            throw s_msg;
        }else{
            o_class_instance[s_prop_name] = o_object[s_prop_name]
        }
    } 
    for(var s_prop_name in o_object){
        if(!o_class_instance.hasOwnProperty(s_prop_name)){
            var s_msg = `'${s_prop_name}': property is not existing in the class ${o_class} and therefore ignored`
            throw s_msg;
        }
    }
    return o_class_instance
}

// crud functions

var f_o_api_request = function(
    o_request
){
    if(o_request instanceof O_api_request){
        return o_request
    }
    var o_api_request = f_o__casted_to_class(
        o_request,
        O_api_request
    );
    for(var n_index in o_api_request.a_o_crud_operation_request){
        var o_crud_operation_request = f_o__casted_to_class(
            o_api_request.a_o_crud_operation_request[n_index],
            O_crud_operation_request
        );
        o_api_request.a_o_crud_operation_request[n_index] = o_crud_operation_request;
    }
    return o_api_request;
}
let f_o_api_response = async function(
    o_api_request
){
    var o_api_response = new O_api_response();
    var a_s_msg_error = [];
    try{
        var b_echo_json = false; 
        o_api_response.a_o_crud_operation_result = []
        var o_api_request = f_o_api_request(o_api_request);
        o_api_response.o_api_request = o_api_request
        for(let o_crud_operation_request of o_api_request.a_o_crud_operation_request){
            let o_crud_operation_result = f_o_crud_operation_result(o_crud_operation_request);
        }
        if(o_crud_operation_request.a_o_validation_error.length != 0){
            o_api_response.b_succuess = false; 
            a_s_msg_error.push("there has been at least one validation error")
        }
        o_api_response.a_o_crud_operation_result.push(
            o_crud_operation_result
        );
    }catch(e){
        o_api_request.b_succuess = false;
        a_s_msg_error.push(e.message)
    }
    o_api_response.s_message = a_s_msg_error.join("\n,");
    
    return o_api_response;
}



let f_o_crud_operation_result = function(
    o_crud_operation_request,
){
    let s_model_name_camel_case = f_s_model_name_camel_case(o_crud_operation_request.s_model_name);
    var o_crud_operation_result = new O_crud_operation_result()
    o_crud_operation_result.a_o_validation_error = []
    o_crud_operation_result.a_o_instance_from_db = []


    let f = f_a_o_validation_error__o_model;
    f_call_all_o_crud_operation_callback_f_callback(
        true, 
        f, 
        o_crud_operation_request,
        o_crud_operation_result,
    );

    if(
        s_crud_operation_name == "create"
        ||
        s_crud_operation_name == "update"
    ){
        o_crud_operation_result.a_o_validation_error = f(o_instance, s_model_name);
        f_call_all_o_crud_operation_callback_f_callback(
            false, 
            f, 
            o_crud_operation_request,
            o_crud_operation_result,
        );
    
    }

    if(empty($a_o_validation_error)){

        let f = f_a_o_crud_in_db;

        f_call_all_o_crud_operation_callback_f_callback(
            true, 
            f, 
            o_crud_operation_request,
            o_crud_operation_result,
        );

        a_o_instance_from_db = f(o_instance, s_table_name);
        
        f_call_all_o_crud_operation_callback_f_callback(
            true, 
            f, 
            o_crud_operation_request,
            o_crud_operation_result,
        );
    }

    return new O_crud_operation_result(
        a_o_validation_error,
        o_instance,
        a_o_instance_from_db 
    );

}
var f_call_all_o_crud_operation_callback_f_callback = function(
    b_execute_callback_before, 
    f_function_inside_crud_operation_process, 

    o_crud_operation_request,
    o_crud_operation_result,
){
    let a_o_crud_operation_callback__filtered = a_o_crud_operation_callback.filter(
        o=> o.b_execute_callback_before == b_execute_callback_before && o.f_function_inside_crud_operation_process == f_function_inside_crud_operation_process
    );
    for(var o_crud_operation_request of a_o_crud_operation_callback__filtered){
        o_crud_operation_request.f_callback(
            o_crud_operation_request,
            o_crud_operation_result,
        )
    }
}
let f_a_o_crud_in_db = function(
    o_instance, 
    s_model_name, 
    s_table_name,
    s_crud_operation_name
){
    var s_function_name_db_crud_operation = `f_a_o_${s_crud_operation_name}_indb` 
    return o_mod__db_crud_functions[s_function_name_db_crud_operation](
        o_instance, 
        s_table_name
    );
}

if(
    Deno.args[0] == "test"
){
    
}

var o_s_fname_f_function_inside_crud_operation_process = {
    [`f_a_o_validation_error__o_model`] : f_a_o_validation_error__o_model, 
    [`f_a_o_crud_in_db`] : f_a_o_crud_in_db,
}

export {
    o_s_fname_f_function_inside_crud_operation_process, 
    f_o__casted_to_class, 
    f_s_model_name_camel_case,
    f_s_model_name_snake_case, 
    f_o_model_related,
    f_a_o_model_filtered__child_model, 
    f_o_model_filtered__parent_model, 
    f_o_crud_operation_result, 
    f_o_api_response
}