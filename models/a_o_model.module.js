import { O_model } from "./O_model.module.js"
import { 
    O_model_property,
    O_model_property_key
} from "./O_model_property.module.js"

console.log("note: re-naming of o_model_property is not possible automatically, if you want to rename a table column you have to rename it manually via sql by using a sql query similar to: `ALTER TABLE table_name RENAME COLUMN old_name TO new_name;`")

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
    null, 
    null, 
    null,
    true, 
    o_model_property_key__default_primary
);

var f_s_foreign_key_name_from_o_model = function(o_model){
    return `n_${o_model.s_name.toLowerCase()}_n_id`;
}
var f_o_model_property__foreign_key = function(o_model){

    return new O_model_property(
        f_s_foreign_key_name_from_o_model(o_model),
        "integer",
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
    null, 
    null, 
    null,
    null, 
    null
);
var o_model_property__s_modified_ts_lt = new O_model_property(
    "s_modified_ts_lt", 
    "string",
    false, 
    null, 
    null, 
    null,
    null, 
    null
);

var o_model__O_user = new O_model(
    "O_user",
    [
        f_o__cloned(o_model_property__n_id_default_id),
        new O_model_property(
            "s_name", 
            "string",
        ),
        f_o__cloned(o_model_property__s_created_ts_lt),
        f_o__cloned(o_model_property__s_modified_ts_lt),
    ]
);
a_o_model.push(o_model__O_user);

var o_model__O_chatroom = new O_model(
    "O_chatroom",
    [
        f_o__cloned(o_model_property__n_id_default_id),
        new O_model_property(
            "s_name", 
            "string",
        ),
        f_o__cloned(o_model_property__s_created_ts_lt),
        f_o__cloned(o_model_property__s_modified_ts_lt),
    ]
);
a_o_model.push(o_model__O_chatroom);
var o_model__O_message = new O_model(
    "O_message",
    [
        f_o__cloned(o_model_property__n_id_default_id),
        new O_model_property(
            "s_markdown", 
            "string",
        ),
        f_o__cloned(o_model_property__s_created_ts_lt),
        f_o__cloned(o_model_property__s_modified_ts_lt),
    ]
);
a_o_model.push(o_model__O_message);


var o_model__O_user_o_message_o_chatroom = new O_model(
    "O_user_o_message_o_chatroom",
    [
        f_o__cloned(o_model_property__n_id_default_id), // n_id
        f_o_model_property__foreign_key(o_model__O_user), // n_o_user_n_id
        f_o_model_property__foreign_key(o_model__O_message), // n_o_message_n_id
        f_o_model_property__foreign_key(o_model__O_chatroom), // n_o_chatroom_n_id
        f_o__cloned(o_model_property__s_created_ts_lt),
        f_o__cloned(o_model_property__s_modified_ts_lt),
    ]
);
a_o_model.push(o_model__O_user_o_message_o_chatroom);

// for(let o_model of a_o_model){
//     var a_o_model__filtered = a_o_model.filter(o=>o.s_name == o_model.s_name);
//     if(a_o_model__filtered.length > 1){
//         var o_error = {
//             s_msg: 'o_model.s_name must be unique, two models with same name have been found'
//         }
//         throw Error(JSON.stringify(o_error));
//     }
// }
export {a_o_model}

