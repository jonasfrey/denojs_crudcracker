import {o_db_client} from "./o_db_client.gitignored.module.js"
import { a_o_database } from "./a_o_database.module.js";
import { a_o_model } from "./a_o_model.module.js";

function f_n_numerus_base_2(n) {
    return Math.log(n) / Math.log(2);
}
function f_n_bits_required(n){
    return Math.ceil(f_n_numerus_base_2(Math.abs(n)));
}
var f_s_table_name_from_o_model = function(o_model){
    // console.log(o_model)
    return `a_${o_model.s_name.toLowerCase()}`;
}
var f_s_mysql_type = function(o_model_property){


    // CHAR(size)                       A FIXED length string (can contain letters, numbers, and special characters). The size parameter specifies the column length in characters - can be from 0 to 255. Default is 1
    // VARCHAR(size)                    A VARIABLE length string (can contain letters, numbers, and special characters). The size parameter specifies the maximum string length in characters - can be from 0 to 65535
    // BINARY(size)                     Equal to CHAR(), but stores binary byte strings. The size parameter specifies the column length in bytes. Default is 1
    // VARBINARY(size)                  Equal to VARCHAR(), but stores binary byte strings. The size parameter specifies the maximum column length in bytes.
    // TINYBLOB                         For BLOBs (Binary Large Objects). Max length: 255 bytes
    // TINYTEXT                         Holds a string with a maximum length of 255 characters
    // TEXT(size)                       Holds a string with a maximum length of 65,535 bytes
    // BLOB(size)                       For BLOBs (Binary Large Objects). Holds up to 65,535 bytes of data
    // MEDIUMTEXT                       Holds a string with a maximum length of 16,777,215 characters
    // MEDIUMBLOB                       For BLOBs (Binary Large Objects). Holds up to 16,777,215 bytes of data
    // LONGTEXT                         Holds a string with a maximum length of 4,294,967,295 characters
    // LONGBLOB                         For BLOBs (Binary Large Objects). Holds up to 4,294,967,295 bytes of data
    // ENUM(val1, val2, val3, ...)      A string object that can have only one value, chosen from a list of possible values. You can list up to 65535 values in an ENUM list. If a value is inserted that is not in the list, a blank value will be inserted. The values are sorted in the order you enter them
    // SET(val1, val2, val3, ...)       A string object that can have 0 or more values, chosen from a list of possible values. You can list up to 64 values in a SET list

    var s_mysql_type = `UNDEFINED`;
    if(
        o_model_property.s_type == "string"
    ){
        s_mysql_type = `VARCHAR(65535)`;//default
        var n_maximum_string_length_in_bytes = o_model_property?.o_model_property_validation?.n_maximum_string_length_in_bytes;
        if(n_maximum_string_length_in_bytes){
            var o__s_mysql_type__n_max_s_len_byte = {
                //"TINYTEXT": Math.pow(2,8)-1, 
                //[`TEXT(${n_maximum_string_length_in_bytes})`]: Math.pow(2,16)-1,
                [`CHAR(${n_maximum_string_length_in_bytes})`]: Math.pow(2,8)-1,
                [`VARCHAR(${n_maximum_string_length_in_bytes})`]: Math.pow(2,16)-1,
                [`MEDIUMTEXT(${n_maximum_string_length_in_bytes})`]: Math.pow(2,24)-1,
                [`LONGTEXT(${n_maximum_string_length_in_bytes})`]: Math.pow(2,32)-1,
            };
            for(var s_mysql_type in o__s_mysql_type__n_max_s_len_byte){
                var n_max_s_len_byte = o__s_mysql_type__n_max_s_len_byte[s_mysql_type];
                if(n_maximum_string_length_in_bytes <= n_max_s_len_byte){
                    s_mysql_type = s_mysql_type;
                }
            }
        }
    }

    // BIT(size)                        A bit-value type. The number of bits per value is specified in size. The size parameter can hold a value from 1 to 64. The default value for size is 1.
    // TINYINT(size)                    A very small integer. Signed range is from -128 to 127. Unsigned range is from 0 to 255. The size parameter specifies the maximum display width (which is 255)
    // BOOL                             Zero is considered as false, nonzero values are considered as true.
    // BOOLEAN                          Equal to BOOL
    // SMALLINT(size)                   A small integer. Signed range is from -32768 to 32767. Unsigned range is from 0 to 65535. The size parameter specifies the maximum display width (which is 255)
    // MEDIUMINT(size)                  A medium integer. Signed range is from -8388608 to 8388607. Unsigned range is from 0 to 16777215. The size parameter specifies the maximum display width (which is 255)
    // INT(size)                        A medium integer. Signed range is from -2147483648 to 2147483647. Unsigned range is from 0 to 4294967295. The size parameter specifies the maximum display width (which is 255)
    // INTEGER(size)                    Equal to INT(size)
    // BIGINT(size)                     A large integer. Signed range is from -9 223 372 036 854 775 808 to 9223372036854775807. Unsigned range is from 0 to 18446744073709551615. The size parameter specifies the maximum display width (which is 255)
    // FLOAT(size, d)                   A floating point number. The total number of digits is specified in size. The number of digits after the decimal point is specified in the d parameter. This syntax is deprecated in MySQL 8.0.17, and it will be removed in future MySQL versions
    // FLOAT(p)                         A floating point number. MySQL uses the p value to determine whether to use FLOAT or DOUBLE for the resulting data type. If p is from 0 to 24, the data type becomes FLOAT(). If p is from 25 to 53, the data type becomes DOUBLE()
    // DOUBLE(size, d)                  A normal-size floating point number. The total number of digits is specified in size. The number of digits after the decimal point is specified in the d parameter
    // DOUBLE PRECISION(size, d)
    // DECIMAL(size, d)                 An exact fixed-point number. The total number of digits is specified in size. The number of digits after the decimal point is specified in the d parameter. The maximum number for size is 65. The maximum number for d is 30. The default value for size is 10. The default value for d is 0.
    // DEC(size, d)                     Equal to DECIMAL(size,d)
    if(
        o_model_property.s_type == "integer"
    ){
        var n_maximum_number = o_model_property?.o_model_property_validation?.n_maximum_number;
        var n_minimum_number = o_model_property?.o_model_property_validation?.n_minimum_number;
        var n_bits_required__n_maximum_number = f_n_bits_required(n_maximum_number);
        var n_bits_required__n_minimum_number = f_n_bits_required(n_minimum_number);
        if(n_bits_required__n_maximum_number == undefined){
            n_bits_required__n_maximum_number = 0;
        }
        if(n_bits_required__n_minimum_number == undefined){
            n_bits_required__n_minimum_number = 0;
        }
        var n_bits_required = 0;
        var b_signed = (n_minimum_number < 0);
        // case1: min: 20,      max:null
        // case2: min: null     max: 10'000
        // case3: min: -300     max: null
        // case4: min: -300     max: 100'000
        n_bits_required = Math.max(n_bits_required__n_maximum_number , n_bits_required__n_minimum_number);
        
        var n_display_width = ``; //i dont know wtf this is for
        var o__s_mysql_type__n_bits_required = {
            //"TINYTEXT": Math.pow(2,8)-1, 
            //[`TEXT(${n_maximum_string_length_in_bytes})`]: Math.pow(2,16)-1,
            [`TINYINT(${n_display_width})`]: 8,//2^8
            [`SMALLINT(${n_display_width})`]: 16,// 2^16
            [`MEDIUMINT(${n_display_width})`]: 24, // 2^24
            [`INT(${n_display_width})`]: 32, // 2^32
            [`BIGINT(${n_display_width})`]: 64, // 2^64
        };
        s_mysql_type = `INT()`;//default
        for(var s_mysql_type in o__s_mysql_type__n_bits_required){
            var n_bits_type = o__s_mysql_type__n_bits_required[s_mysql_type];
            if(n_bits_required <= n_bits_type){
                s_mysql_type = s_mysql_type;
            }
        }
    }

    if(
        o_model_property.s_type == "float"
    ){
        // todo, for the moment this is only double
        s_mysql_type = `DOUBLE()`;//default
    }
    return s_mysql_type;
}
var f_b_foreign_key = function(o_model_property){
    return o_model_property?.o_model_property_key?.b_primary == false;
}
var f_b_primary_key = function(o_model_property){
    return o_model_property?.o_model_property_key?.b_primary;
}
var f_b_auto_increment = function(o_model_property){
    // todo: for the moment if property is primary key it also is autoincrement
    return f_b_primary_key(o_model_property);
}
var f_a_o_model_from_o_model_property = function(o_model_property){
    // console.log(o_model_property)
    var a_o_model__filtered = a_o_model.filter(
        o =>
        o.a_o_model_property.includes(o_model_property)
    );
    return a_o_model__filtered;
}
var f_o_model_property__primary_key = function(o_model){
    return o_model.a_o_model_property.filter(o=> f_b_primary_key(o))[0];
}
var f_s_query_create_table = function(
    o_model, 
    o_db_client
){
    var s_query = ``;
    s_query += `
    CREATE TABLE ${f_s_table_name_from_o_model(o_model)} (
    `;
    for(var o_model_property of o_model.a_o_model_property){
        var s_mysql_type = f_s_mysql_type(o_model_property);
        var s_auto_increment = (f_b_auto_increment(o_model_property))?'AUTO_INCREMENT': '';
        var s_not_null = ((o_model_property.b_required))?'NOT NULL': '';
        // console.log(s_mysql_type)
        s_query += `${o_model_property.s_name} ${s_mysql_type} ${s_not_null} ${s_auto_increment} \n`
    }
    var o_model_property__primary_key = f_o_model_property__primary_key(o_model);
    if(o_model_property__primary_key){
        s_query += `PRIMARY KEY (${o_model_property__primary_key.s_name})`;
    }
    s_query+=`) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;

    var a_o_model_property__foreign_key = o_model.a_o_model_property.filter(o=> f_b_foreign_key(o));
    for(var o_model_property__foreign_key of a_o_model_property__foreign_key){
        var a_o_model__foreign = f_a_o_model_from_o_model_property(o_model_property__foreign_key);
        var o_model__foreign = a_o_model__foreign[0];
        var s_name__model_property_foreign = o_model_property__foreign_key.o_model_property_key.o_model_property__foreign?.s_name;

        var s_cascade_on_delete = o_model_property__foreign_key.o_model_property_key?.b_cascade_on_delete;
        var s_cascade_on_update = o_model_property__foreign_key.o_model_property_key?.b_cascade_on_update;
        if(o_model__foreign && s_name__model_property_foreign){
            s_query += `
                FOREIGN KEY (${o_model_property__foreign_key.s_name}) REFERENCES ${f_s_table_name_from_o_model(o_model__foreign)} (${s_name__model_property_foreign})
                ${(s_cascade_on_delete)?'ON DELETE CASCADE': ''}
                ${(s_cascade_on_update)?'ON UPDATE CASCADE': ''}
            `;
        }
    }

    s_query += `
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `
    return s_query;
}
var f_autogenerate_databases_and_tables = async function(){
    for(var o_database in a_o_database){
        await o_db_client.execute(`CREATE DATABASE IF NOT EXISTS ${o_database.s_name}`);
        await o_db_client.execute(`USE ${o_database.s_name}`);

        for(var o_model of a_o_model){
            var s_query_create_table = f_s_query_create_table(o_model, o_db_client);
            console.log(s_query_create_table);
            // await client.execute(s_query_create_table);
        }
    }
}


export {
    f_autogenerate_databases_and_tables,
}