

var o_s_crud_operation_callback_name_f = {

    f_crud_operation_callback__before_f_a_o_validation_error__o_model : function(
        o_crud_operation_request, 
        o_crud_operation_result
    ){
    
    },
    f_crud_operation_callback__after_f_a_o_validation_error__o_model : function(
        o_crud_operation_request, 
        o_crud_operation_result
    ){
    
    },
    f_crud_operation_callback__before_f_a_o_crud_in_db : function(
        o_crud_operation_request, 
        o_crud_operation_result
    ){
    
        // console.log("O_crud_operation_callback.f_callback was called!")
        // // do this only for the model O_user for example
        // if(o_crud_operation_request.s_model_name == "O_user"){
        //     // as an example this will automatically set an id
        //     // which satisfies (mod(x,2)==0)
        //     var s_table_name = f_s_table_name_from_o_model(this);
        //     var s_query = `SELECT MAX(Id) as n_id_max FROM ${s_table_name}`;
        //     var o_result = f_o__execute_query__denoxmysql(s_query, o_db_client);
        //     var n_id_max = o_result.rows[0].n_id_max;
        //     var n_id_new = n_id_max+=2;
        //     o_instance.n_id = n_id_new;
        // }
    },
    f_crud_operation_callback__after_f_a_o_crud_in_db : function(
        o_crud_operation_request, 
        o_crud_operation_result
    ){
        // console.log(o_crud_operation_request.s_crud_operation_name)
        if(o_crud_operation_request.s_crud_operation_name == "read"){
            // do this only for the model O_user for example
            if(o_crud_operation_request.s_model_name == "O_user"){
                // for example format the timestamp

                for(var o of o_crud_operation_result.a_o_instance_from_db){
                    var n_ts = o.n_ts_sec_lt__created
                    if(n_ts){
                        o["__n_ts_sec_lt__created_formatted_after_read"] = new Date(n_ts).toString()
                    }
                }
                // console.log(o_crud_operation_result)
                // Deno.exit()
            }
        }
    }, 

}
export {
    o_s_crud_operation_callback_name_f
}