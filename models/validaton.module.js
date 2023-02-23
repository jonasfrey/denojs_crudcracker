import {a_o_model} from "./model_classes/a_o_model.module.js"
import {O_validation_error__o_model} from "./classes/O_validation_error__o_model.module.js";
import {O_validation_error__o_model_property} from "./classes/O_validation_error__o_model_property.module.js";

let f_a_o_validation_error__o_model = function(
    o_value,
    s_model_name
){
    var a_o_validation_error__o_model = [];
    var a_o_validation_error__o_model_property = [];
    var o_model = a_o_model.filter(
        function(o){
            return o.s_name == s_model_name
        }
    )[0]
    if(!o_model){
        a_o_validation_error__o_model.push(new O_validation_error__o_model(
            `cannot validate object ${o_value}: cannot find model with name '${s_model_name}', make sure you provide a valid model name as the second argument`,
            s_model_name, 
            null, 
            o_value, 
            a_o_validation_error__o_model_property, 
        ))
        return a_o_validation_error__o_model
    }

    if(typeof o_value != 'object'){
        a_o_validation_error__o_model.push(new O_validation_error__o_model(
            `${o_value}: must be of type object`,
            s_model_name, 
            o_model, 
            o_value, 
            a_o_validation_error__o_model_property
        ));
        return a_o_validation_error__o_model
    }

    for(var s_property_name in o_value){
        var property_value = o_value[s_property_name];
        var o_model_property = o_model.a_o_model_property.filter(
            o=>o.s_name == s_property_name
        )[0];
        if(!o_model_property){
            a_o_validation_error__o_model_property.push(
                new O_validation_error__o_model_property(
                    `'${s_property_name}': o_model_property does not exist , therefore cannot be validated!`, 
                    s_property_name, 
                    null, 
                    property_value
                )
            )
        }else{
            a_o_validation_error__o_model_property.concat( 
    f_a_o_validation_error__o_model_property(
                    property_value,
                    o_model_property
                )
            )
        }
    }
    var a_o_model_property__not_existing_on_o_value = 
        o_model.a_o_model_property.filter(
            o=> !o_value.hasOwnProperty(o.s_name)
        )
    for(var o_model_property__not_existing_on_o_value in a_o_model_property__not_existing_on_o_value){
        a_o_validation_error__o_model_property.concat( 
    f_a_o_validation_error__o_model_property(
                undefined,
                o_model_property__not_existing_on_o_value
            )
        )
    }
    if(a_o_validation_error__o_model_property.length > 0){
        a_o_validation_error__o_model.push(
            new O_validation_error__o_model(
                `there is at least one o_validation_error__o_model_property`, 
                s_model_name, 
                o_model, 
                o_value, 
                a_o_validation_error__o_model_property
            )
        )
    }

    return a_o_validation_error__o_model_property;

}


let f_a_o_validation_error__o_model_property = function(
    property_value,
    o_model_property
){
    var a_o_validation_error__o_model_property_datacontent = f_a_o_validation_error__o_model_property_datacontent(
        property_value,
        o_model_property
    );
    var a_o_validation_error__o_model_property__datatype = f_a_o_validation_error__o_model_property__datatype(
        property_value,
        o_model_property
    );
    let a_o_validation_error__o_model_property = a_o_validation_error__o_model_property_datacontent.concat(
        a_o_validation_error__o_model_property__datatype
    );

    var b_valid = 
        a_o_validation_error__o_model_property.length == 0;

    return a_o_validation_error__o_model_property;

}
let f_a_o_validation_error__o_model_property_datacontent = function(
    property_value,
    o_model_property
){
    var a_o_validation_error__o_model_property_datacontent = [];
    // var a_s_validation_error = "";//if '' == valid, if any other string then invalid 
    if(o_model_property.o_model_property_validation == null){
        return a_o_validation_error__o_model_property_datacontent.join("\n");
    }

    if(o_model_property.b_required){
        if(
            property_value == undefined
            ||
            property_value == null
        ){
            a_o_validation_error__o_model_property_datacontent.push(
                new O_validation_error__o_model_property(
                    `'${o_model_property.s_name}:(${property_value})': is 'required' and cannot be 'undefined' or 'null'`,
                    o_model_property.s_name, 
                    o_model_property, 
                    property_value
                )
            )
            return; //continue
        }
    }
    if(typeof property_value != o_model_property.s_type){
        a_o_validation_error__o_model_property_datacontent.push(
            new O_validation_error__o_model_property(
                `'${o_model_property.s_name}:(${property_value})': has type "${typeof property_value}" but requires type "${o_model_property.s_type}"`,
                o_model_property.s_name, 
                o_model_property, 
                property_value
            )
        )
        return;
    }
    if(
        o_model_property.s_type == "integer"
        ||
        o_model_property.s_type == "float"
    ){
        if(o_model_property.n_minimum_number != null){
            if(property_value < o_model_property.n_minimum_number){
                a_o_validation_error__o_model_property_datacontent.push(new O_validation_error__o_model_property(
                    `'${o_model_property.s_name}:(${property_value})': number (${property_value}) is smaller than allowed minimum (${o_model_property.n_minimum_number})`,
                    o_model_property.s_name, 
                    o_model_property, 
                    property_value
                ))
            }
        }
        if(o_model_property.n_maximum_number != null){
            if(property_value > o_model_property.n_maximum_number){
                a_o_validation_error__o_model_property_datacontent.push(new O_validation_error__o_model_property(
                    `'${o_model_property.s_name}:(${property_value})': number (${property_value}) is bigger than allowed maximum (${o_model_property.n_maximum_number})`,
                    o_model_property.s_name, 
                    o_model_property, 
                    property_value
                ))
            }
        }
    }
    if(o_model_property.s_type == "string"){
        const o_text_encoder = new TextEncoder();
        const s_value_encoded = o_text_encoder.encode(property_value.length);
        var n_truncated_length = 10;
        var s_property_value_truncated = property_value.substring(0, Math.min(property_value.length, n_truncated_length))+(".".repeat((property_value.length>3) * 3))
        if(o_model_property.n_minimum_string_length_in_bytes != null){
            if(s_value_encoded.length < o_model_property.n_minimum_string_length_in_bytes){
                a_o_validation_error__o_model_property_datacontent.push(new O_validation_error__o_model_property(
                    `'${o_model_property.s_name}:(${property_value})': stringlength (${s_property_value_truncated}) is smaller than allowed minimum ascii length (${o_model_property.n_minimum_string_length_in_bytes})`,
                    o_model_property.s_name, 
                    o_model_property, 
                    property_value
                ))
            }
        }
        if(o_model_property.n_maximum_string_length_in_bytes != null){
            if(s_value_encoded.length < o_model_property.n_maximum_string_length_in_bytes){
                a_o_validation_error__o_model_property_datacontent.push(new O_validation_error__o_model_property(
                    `'${o_model_property.s_name}:(${property_value})': stringlength (${s_property_value_truncated}) is bigger than allowed maximum ascii length (${o_model_property.n_maximum_string_length_in_bytes})`,
                    o_model_property.s_name, 
                    o_model_property, 
                    property_value
                ))
            }
        }
        if(o_model_property.s_regex != null){
            var o_regex = new RegExp(o_model_property.s_regex);

            var b_match = o_regex.test(val_o_data_prop);
            if(!b_match){
                a_o_validation_error__o_model_property_datacontent.push(new O_validation_error__o_model_property(
                    `'${o_model_property.s_name}:(${val_o_data_prop})': regex (${o_model_property.s_regex}) does not match (${s_val_o_data_prop_truncated})`,
                    o_model_property.s_name, 
                    o_model_property, 
                    property_value
                ))
            }
        }
    }
    return a_o_validation_error__o_model_property_datacontent;

}
let f_a_o_validation_error__o_model_property__datatype = function(
    property_value,
    o_model_property
){
    var a_o_validation_error__o_model_property__datatype = [];
    var b_bool = true; 
    var n_numeric = 11235;
    var s = "teststrign";
    var o_map = {
        "bool": b_bool, 
        "boolean": b_bool, 
        "float": n_numeric, 
        "integer": n_numeric, 
        "string": s
    }
    // var stringObject = new String( "This is a String Object" );
    if(typeof property_value !== typeof o_map[o_model_property.s_type]){
        a_o_validation_error__o_model_property__datatype = new O_validation_error__o_model_property(
            `'${property_value}': value type is invalid, expected type is ${o_model_property.s_type}:${typeof[o_map[o_model_property.s_type]]}, actual type is ${typeof value}`,
            o_model_property.s_name,
            o_model_property, 
            property_value
        )
    }
    return a_o_validation_error__o_model_property__datatype;
}


export { 
    f_a_o_validation_error__o_model, 
    f_a_o_validation_error__o_model_property
}