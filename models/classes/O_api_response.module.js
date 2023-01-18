class O_api_response{
    constructor(
        b_success, 
        s_message,
        a_o_crud_operation_result
    ){
        this.b_success = b_success
        this.s_message = s_message
        this.a_o_crud_operation_result = a_o_crud_operation_result
    }
}
export { O_api_response }