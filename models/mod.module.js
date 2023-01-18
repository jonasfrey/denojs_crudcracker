import {a_o_model} from "./a_o_model.module.js";

var f_o_model_related = function(s_prop_name){
    // n_o_finger_n_id -> 'n_', 'o_finger_', 'n_id'
    var s_start = "n_"; 
    var s_end = "_n_id";
    var n_index_start = s_prop_name.indexOf(s_start);
    if(
        n_index_start == 0
        &&
        s_prop_name.endsWith(s_end)
        ){
            var s_model_name_lowercase = s_prop_name.substring(s_start.length, (s_prop_name.length - s_end.length))
    }else{ 
        return undefined
    }
    var a_o_model_filtered = a_o_model.filter(
        function(obj_model){
            return obj_model.s_name.toLowerCase() == s_model_name_lowercase
        }
    )
    return a_o_model_filtered[0]
}

var f_a_o_model_filtered__child_model = function(o_model){

    var s_model_name_lowercase = o_model.s_name.toLowerCase();
    // model : O_hand -> { n_id:... }
    // 'child' model, (one hand has many fingers), 
    // child_model: O_finger -> { n_id:..., n_o_hand_n_id:... }
    // n_o_hand_n_id;
    var s_prop_name_foreign_key = `n_${s_model_name_lowercase}_n_id`;

    var a_o_model_filtered__child_model = a_o_model.filter(
        function(o_model__2){
            return o_model__2.a_o_model_property.map(o=>o.s_name).includes(s_prop_name_foreign_key);
        }
    );
    return a_o_model_filtered__child_model;

}

var f_o_model_filtered__parent_model = function(s_prop_name){
    
    return f_o_model_related(s_prop_name);
}


var f_s_model_name_camel_case = function(s_model_name_snake_case){
    var a_s = s_model_name_snake_case.split("_");
    a_s.map(s=>s[0].toUpperCase()+s.slice(1));
    return a_s.join()
}
var f_s_model_name_snake_case = function(s_model_name_camel_case){
    console.log("beware, the definitve snake case name cannot be constructed and the return of this function might be wrong");

    var a_s = [];
    var s_part = ''; 
    for(var n_index in s_model_name_camel_case){
        var s = s_model_name_camel_case[n_index]
        if(s == s.toUpperCase()){
            if(s_part != ''){
                a_s.push(s_part)
                s_part = ''
            }
        }
        s_part+=s;
    }
    var s_model_name_snake_case = a_s.join("_");
    return s_model_name_camel_case;
}
var f_o__casted_to_class = function(
    o_object,
    o_class
){
    var o_class_instance = new o_class();
    for(var s_prop_name in o_class_instance){
        if(!o_object.hasOwnProperty(s_prop_name)){
            var s_msg = `'${s_prop_name}': property is not set on the object / object must be instance of class ${o_class}`
            throw s_msg;
        }else{
            o_class_instance[s_prop_name] = o_object[s_prop_name]
        }
    } 
    for(var s_prop_name in o_object){
        if(!o_class_instance.hasOwnProperty(s_prop_name)){
            var s_msg = `'${s_prop_name}': property is not existing in the class ${o_class} and therefore ignored`
            throw s_msg;
        }
    }
    return o_class_instance
}

export {
    f_o__casted_to_class, 
    f_s_model_name_camel_case,
    f_s_model_name_snake_case, 
    f_o_model_related,
    f_a_o_model_filtered__child_model, 
    f_o_model_filtered__parent_model
}