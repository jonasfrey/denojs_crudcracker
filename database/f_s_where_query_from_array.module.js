
import { 
    escape as f_v_escaped_for_sql,
    escapeId as f_v_escaped_for_sql_id,
    format
} from "https://deno.land/x/sail_sqlstring@v1.0.0/mod.ts";
// &	Bitwise AND		
// >	Greater than operator		
// >>	Right shift		
// >=	Greater than or equal operator		
// <	Less than operator		
// <>, !=	Not equal operator		
// <<	Left shift		
// <=	Less than or equal operator		
// <=>	NULL-safe equal to operator		
// %, MOD	Modulo operator		
// *	Multiplication operator		
// +	Addition operator		
// -	Minus operator		
// -	Change the sign of the argument		
// ->	Return value from JSON column after evaluating path; equivalent to JSON_EXTRACT().		
// ->>	Return value from JSON column after evaluating path and unquoting the result; equivalent to JSON_UNQUOTE(JSON_EXTRACT()).		
// /	Division operator		
// :=	Assign a value		
// =	Assign a value (as part of a SET statement, or as part of the SET clause in an UPDATE statement)		
// =	Equal operator		
// ^	Bitwise XOR		
// AND, &&	Logical AND		
// BETWEEN ... AND ...	Whether a value is within a range of values		
// BINARY	Cast a string to a binary string		8.0.27
// CASE	Case operator		
// DIV	Integer division		
// IN()	Whether a value is within a set of values		
// IS	Test a value against a boolean		
// IS NOT	Test a value against a boolean		
// IS NOT NULL	NOT NULL value test		
// IS NULL	NULL value test		
// LIKE	Simple pattern matching		
// MEMBER OF()	Returns true (1) if first operand matches any element of JSON array passed as second operand, otherwise returns false (0)	8.0.17	
// NOT, !	Negates value		
// NOT BETWEEN ... AND ...	Whether a value is not within a range of values		
// NOT IN()	Whether a value is not within a set of values		
// NOT LIKE	Negation of simple pattern matching		
// NOT REGEXP	Negation of REGEXP		
// OR, ||	Logical OR		
// REGEXP	Whether string matches regular expression		
// RLIKE	Whether string matches regular expression		
// SOUNDS LIKE	Compare sounds		
// XOR	Logical XOR		
// |	Bitwise OR		
// ~
let f_s_operator_escaped = function(s_operator){

    var a_s_operator_allowed = ['&', '>', '>>', '>=', '<', '<>, !=', '<<', '<=', '<=>', '%, MOD', '*', '+', '-', '-', '->', '->>', '/', ':=', '=', '=', '^', 'AND, &&', 'BETWEEN ... AND ...', 'BINARY', 'CASE', 'DIV', 'IN()', 'IS', 'IS NOT', 'IS NOT NULL', 'IS NULL', 'LIKE', 'MEMBER OF()', 'NOT, !', 'NOT BETWEEN ... AND ...', 'NOT IN()', 'NOT LIKE', 'NOT REGEXP', 'OR, ||', 'REGEXP', 'RLIKE', 'SOUNDS LIKE', 'XOR', '|', '~'];
    var s_op_to_upper_trimmed = s_operator.trim().toUpperCase();
    if(a_s_operator_allowed.includes(s_op_to_upper_trimmed)){
        return s_operator.trim().toUpperCase()
    }
}
let f_b_jsobject = function(value){
    return typeof value === 'object' && value !== null;
}
let f_a_escaped = function(a){
    var a_s_operator_allowed = [
        "and", 
        "or"
    ]
    for(var val of a){
        if(
            !Array.isArray(val)
            && 
            !f_b_jsobject(val)
        ){
            if(!a_s_operator_allowed.includes(val.toString())){
                //operator is not allowed
            }
        }
        if(Array.isArray(val)){
            if(val.length == 3){
                val[0] = f_v_escaped_for_sql_id(val[0]), 
                val[1] = f_s_operator_escaped(val[1]),
                val[2] = f_v_escaped_for_sql(val[2])
            }
            if(val.length > 3){
                val = f_a_escaped(val)
            }
        }

    }
    return a
}
let f_b_contains_array = function(a){
    for(var val of a){
        if(Array.isArray(val)){
            return true
        }
    }
    return false
}
let f_s_escaped = function(a){
    var s = ``
    var n_indent = 0;
    var a_s_operator_allowed = [
        "and", 
        "or"
    ]
    for(var val of a){
        if(
            !Array.isArray(val)
            && 
            !f_b_jsobject(val)
        ){
            if(!a_s_operator_allowed.includes(val.toString().toLowerCase())){
                //operator is not allowed
            }else{
                s += ` ${val} `
            }
        }
        if(Array.isArray(val)){
            // console.log(val)
            if(f_b_contains_array(val)){
                var s_tmp = f_s_escaped(val)
                s += ` (${s_tmp}) `
            }else{

                val[0] = f_v_escaped_for_sql_id(val[0]), 
                val[1] = f_s_operator_escaped(val[1]),
                val[2] = f_v_escaped_for_sql(val[2])
                var s_tmp = `${val[0]} ${val[1]} ${val[2]} `

                s+=s_tmp
                
            }

        }

    }
    return s
}

// [
//     ["id", ">", 5] 
//     "and", 
//     [
//         ["name", "like", "%hans%"], 
//         "or",
//         ["name", "like", "%hans%"]
//     ]
// ]

// should become 

// id > 5
// and
// (
//     name like %hans% 
//     or
//     name like %peter%
// )

let f_s_where_query_from_array = function(a){
    var s = ``;
    if(!f_b_contains_array(a)){
        a = [a]
    }
    // var a_escaped = f_a_escaped(a);
    // var s_json_a_escaped = JSON.stringify(a_escaped);
    // var s_where_statement = s_json_a_escaped.replaceAll("[", "(")
    // s_where_statement = s_where_statement.replaceAll("]", ")");
    // return s_where_statement
    return f_s_escaped(a);

}

if(
    Deno.args[0] == "test" 
    &&
    import.meta.main
){
    var a = [
        'name' , "like", "%hans%"
    ]
    var s = f_s_where_query_from_array(a);
    console.log(`
        ${s}
    `)

    var a =  [
            ["id", ">", 5], 
            "and",
            [
                ["name", "like", "%hans%"], 
                "or",
                ["name", "like", "%peter%"]
            ]
    ]
    var s = f_s_where_query_from_array(a);
    console.log(`
        ${s}
    `)

    var a =  [
            ["id", ">", 5], 
            "and",
            [
                ["name", "like", "%hans%"], 
                "or",
                [
                    ["date", ">", "2020"], 
                    "and", 
                    ["date", "<", "2022"]
                ]
            ]
    ]
    var s = f_s_where_query_from_array(a);
    console.log(`
        ${s}
    `)
}
export { f_s_where_query_from_array }