class O_crud_operation_request{
    constructor(
        o,
        s_crud_operation_name,
        s_model_name,
        n_o_database_n_id,
        n_o_db_connection_info_n_id,
        s_table_name,
    ){
        this.o = o
        this.s_crud_operation_name = s_crud_operation_name
        this.s_model_name = s_model_name
        this.n_o_database_n_id = n_o_database_n_id
        this.n_o_db_connection_info_n_id = n_o_db_connection_info_n_id
        this.s_table_name = s_table_name
    }
}
var o_s_crud_operation_name = {
    s_create: "create",
    s_create: "read",
    s_create: "update",
    s_create: "delete",
}
export { O_crud_operation_request }