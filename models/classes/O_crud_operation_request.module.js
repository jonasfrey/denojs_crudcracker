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
export { O_crud_operation_request }