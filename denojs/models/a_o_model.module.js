import { O_model } from "./O_model.module.js"
import { 
    O_model_property, 
    O_model_property_validation, 
    O_model_property_key
} from "./O_model_property.module.js"

var f_o__cloned = function(o){
    return Object.assign(Object.create(Object.getPrototypeOf(o)), o);
}

var a_o_model = [];
var o_model_property_key__default_primary = new O_model_property_key(
    true, 
    null, 
    true,
    true
)

var o_model_property__n_id_default_id = new O_model_property(
    "n_id", 
    "integer",
    false, 
    false, 
    null, 
    null, 
    null,
    true, 
    o_model_property_key__default_primary
);

var f_o_model_property__foreign_key = function(o_model){
    return new O_model_property(
        `n_${o_model.s_name}_n_id`,
        "integer",
        false,
        false, 
        null, 
        null, 
        true, 
        false, 
        new O_model_property_key(
            false, 
            o_model.a_o_model_property.filter(
                o=>o.s_name == o_model_property__n_id_default_id.s_name
            )[0],
            true, 
            true
        )
    )
}
var o_model_property__s_created_ts_lt = new O_model_property(
    "s_created_ts_lt", 
    "string",
    false, 
    false, 
    null, 
    null, 
    null,
    null, 
    null
);
var o_model_property__s_modified_ts_lt = new O_model_property(
    "s_created_ts_lt", 
    "string",
    false, 
    false, 
    null, 
    null, 
    null,
    null, 
    null
);

var o_model__o_hand = new O_model(
    "O_hand",
    [
        f_o__cloned(o_model_property__n_id_default_id),
        new O_model_property(
            "s_side", 
            "string",
        ),
        f_o__cloned(o_model_property__s_created_ts_lt),
        f_o__cloned(o_model_property__s_modified_ts_lt),
    ]
);
a_o_model.push(o_model__o_hand);

var o_model__o_finger = new O_model(
    "O_finger",
    [
        f_o__cloned(o_model_property__n_id_default_id), // n_id
        f_o_model_property__foreign_key(o_model__o_hand), // n_o_hand_n_id
        new O_model_property(
            "s_name", 
            "string",
        ),
        f_o__cloned(o_model_property__s_created_ts_lt),
        f_o__cloned(o_model_property__s_modified_ts_lt),
    ]
);
a_o_model.push(o_model__o_finger);

export {a_o_model}
