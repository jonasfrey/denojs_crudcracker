class O_validation_error__o_model_property{
    constructor(
        s_message,
        s_property_name,
        o_model_property, 
        property_value
    ){
        this.s_message = s_message
        this.s_property_name = s_property_name
        this.o_model_property = o_model_property, 
        this.property_value = property_value
        var o_date = new Date();
        this.s_ts_lt = o_date.toString();
        this.n_ts_lt = o_date.getTime();
    }
}
export {
    O_validation_error__o_model_property
}