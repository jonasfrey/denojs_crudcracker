class O_crud_operation_result{
    constructor(
        a_o_validation_error,
        o_instance,
        a_o_instance_from_db,
    ){
        this.a_o_validation_error = a_o_validation_error
        this.o_instance = o_instance
        this.a_o_instance_from_db = a_o_instance_from_db
    }
}
export { O_crud_operation_result }