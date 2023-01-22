class O_crud_operation_callback{
    constructor(
        b_execute_callback_before,
        f_function_inside_crud_operation_process,
        f_callback
    ){
        this.b_execute_callback_before = b_execute_callback_before
        this.f_function_inside_crud_operation_process = f_function_inside_crud_operation_process
        this.f_callback = f_callback
    }
}
export { O_crud_operation_callback }