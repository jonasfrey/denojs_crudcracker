import {o_s_fname_f_function_inside_crud_operation_process} from "./mod.module.js"
import {O_crud_operation_callback} from "./classes/O_crud_operation_callback.module.js"

console.log(o_s_fname_f_function_inside_crud_operation_process)
let a_o_crud_operation_callback = []
// let a_o_crud_operation_callback = [
//     new O_crud_operation_callback(
//         true,
//         o_s_fname_f_function_inside_crud_operation_process.f_a_o_create_indb,
//         function(
//             o_crud_operation_request, 
//             o_crud_operation_result
//         ){

//             // do this only for the model O_user for example
//             if(s_model_name == "O_user"){
//                 // as an example this will automatically set an id
//                 // which satisfies (mod(x,2)==0)
//                 var s_table_name = f_s_table_name_from_o_model(this);
//                 var s_query = `SELECT MAX(Id) as n_id_max FROM ${s_table_name}`;
//                 var o_result = f_o__execute_query__denoxmysql(s_query, o_db_client);
//                 var n_id_max = o_result.rows[0].n_id_max;
//                 var n_id_new = n_id_max+=2;
//                 o_instance.n_id = n_id_new;
//             }
//         }
//     ),
//     new O_crud_operation_callback(
//         false,
//         o_s_fname_f_function_inside_crud_operation_process.f_a_o_create_indb,
//         function(
//             o_crud_operation_request,
//             o_crud_operation_result
//         ){
//             if(o_crud_operation_request.s_crud_operation_name == "read"){
//                 // do this only for the model O_user for example
//                 if(s_model_name == "O_user"){
//                     // for example format the timestamp
//                     for(var o of o_crud_operation_result.a_o_instance_from_db){
//                         var n_ts = o.n_ts_sec_lt__created
//                         if(n_ts){
//                             o["__n_ts_sec_lt__created_formatted_after_read"] = new Date(n_ts).toString()
//                         }
//                     }
                    
//                 }
//             }
//         }
//     )
// ]
export {a_o_crud_operation_callback}