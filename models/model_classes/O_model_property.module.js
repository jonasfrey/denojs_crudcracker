class O_validation_error{
    constructor(
        s_message
    ){
        this.s_message = s_message
        var o_date = new Date();
        this.s_ts_lt = o_date.toString();
        this.n_ts_lt = o_date.getTime();
    }
}

var o_s_type = {
    s_string: "string", 
    s_integer: "integer",
    s_float: "float"
}

class O_model_property{
    constructor(
        s_name,
        s_type,
        b_auto_increment = false,
        b_private = false,
        o_model_property_validation = null,
        default_value = null, 
        b_required = null, 
        b_unique = null,
        o_model_property_key = null
    ){
        this.s_name = s_name
        var a_s_type = Object.values(o_s_type);
        if(!a_s_type.includes(s_type)){
            var s_msg = `${s_type}: is not a valid s_type, s_type must be one of ${a_s_type.join(',')}`;
            // console.log(s_msg);
            throw Error(s_msg)
            return 1;
        }
        this.s_type = s_type
        this.b_auto_increment = b_auto_increment
        this.b_private = b_private
        this.o_model_property_validation = o_model_property_validation
        this.default_value = default_value
        this.b_required = b_required
        this.b_unique = b_unique
        this.o_model_property_key = o_model_property_key
    }
    f_b_signed(){
        return (this?.o_model_property_validation?.n_minimum_number < 0);
    }

}
class O_model_property_validation{
    constructor(
        n_minimum_number = null, 
        n_maximum_number = null, 
        n_minimum_string_length_in_bytes = null, 
        n_maximum_string_length_in_bytes = null, 
        s_regex = null,
    ){
        this.n_minimum_number = n_minimum_number
        this.n_maximum_number = n_maximum_number
        this.n_minimum_string_length_in_bytes = n_minimum_string_length_in_bytes
        this.n_maximum_string_length_in_bytes = n_maximum_string_length_in_bytes
        this.s_regex = s_regex
    }
}
class O_model_property_key{
    constructor(
        b_primary = false,
        o_model__foreign = null,
        o_model_property__foreign = null,
        b_cascade_on_update = false, 
        b_cascade_on_delete = false,
    ){
        this.b_primary = b_primary
        this.o_model__foreign = o_model__foreign
        this.o_model_property__foreign = o_model_property__foreign
        this.b_cascade_on_update = b_cascade_on_update
        this.b_cascade_on_delete = b_cascade_on_delete
    }
}


export {
    O_model_property,
    O_model_property_validation,
    O_model_property_key, 
    o_s_type
}