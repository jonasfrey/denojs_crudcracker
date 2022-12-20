class O_validation_error__o_model{
    constructor(
        s_message,
        s_model_name,
        o_model,
        o_value,
        a_o_validation_error__o_model_property,
    ){
        this.s_message = s_message
        this.s_model_name = s_model_name
        this.o_model = o_model
        this.o_value = o_value, 
        this.a_o_validation_error__o_model_property = a_o_validation_error__o_model_property
        var o_date = new Date();
        this.s_ts_lt = o_date.toString();
        this.n_ts_lt = o_date.getTime();
    }
}
export {
    O_validation_error__o_model
}