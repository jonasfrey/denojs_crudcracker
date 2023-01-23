class O_crud_operation_request{
    constructor(
        o_instance,
        s_crud_operation_name,
        s_model_name,
        s_table_name,
    ){
        this.o_instance = o_instance
        this.s_crud_operation_name = s_crud_operation_name
        this.s_model_name = s_model_name
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