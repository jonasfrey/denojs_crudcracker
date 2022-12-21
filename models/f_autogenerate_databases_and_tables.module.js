import {o_db_client} from "./o_db_client.gitignored.module.js"
import { a_o_database } from "./a_o_database.module.js";
import { a_o_model } from "./a_o_model.module.js";

function f_n_numerus_base_2(n) {
    return Math.log(n) / Math.log(2);
}
function f_n_bits_required(n){
    return Math.ceil(f_n_numerus_base_2(Math.abs(n)));
}

var f_s_sql_type = function(o_model_property){


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

    var s_mysql_type = ``;
    if(
        o_model_property.s_type == "string"
    ){
        var s_mysql_type = `VARCHAR(65535)`;//default
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
    // BIGINT(size)                     A large integer. Signed range is from -9223372036854775808 to 9223372036854775807. Unsigned range is from 0 to 18446744073709551615. The size parameter specifies the maximum display width (which is 255)
    // FLOAT(size, d)                   A floating point number. The total number of digits is specified in size. The number of digits after the decimal point is specified in the d parameter. This syntax is deprecated in MySQL 8.0.17, and it will be removed in future MySQL versions
    // FLOAT(p)                         A floating point number. MySQL uses the p value to determine whether to use FLOAT or DOUBLE for the resulting data type. If p is from 0 to 24, the data type becomes FLOAT(). If p is from 25 to 53, the data type becomes DOUBLE()
    // DOUBLE(size, d)                  A normal-size floating point number. The total number of digits is specified in size. The number of digits after the decimal point is specified in the d parameter
    // DOUBLE PRECISION(size, d)
    // DECIMAL(size, d)                 An exact fixed-point number. The total number of digits is specified in size. The number of digits after the decimal point is specified in the d parameter. The maximum number for size is 65. The maximum number for d is 30. The default value for size is 10. The default value for d is 0.
    // DEC(size, d)                     Equal to DECIMAL(size,d)
    if(
        o_model_property.s_type == "integer"
        ||
        o_model_property.s_type == "float"
    ){
        var s_mysql_type = `INT`;//default
        var n_maximum_number = o_model_property?.o_model_property_validation?.n_maximum_number;
        var n_minimum_number = o_model_property?.o_model_property_validation?.n_minimum_number;
        var n_bits_required__n_maximum_number = f_n_bits_required(n_maximum_number);
        var n_bits_required__n_minimum_number = f_n_bits_required(n_minimum_number);
        var b_signed = (n_minimum_number < 0);
        if(n_maximum_number){

        };
            var o__s_mysql_type__n_max_s_len_byte = {
                //"TINYTEXT": Math.pow(2,8)-1, 
                //[`TEXT(${n_maximum_string_length_in_bytes})`]: Math.pow(2,16)-1,
                [`CHAR(${n_maximum_string_length_in_bytes})`]: Math.pow(2,8)-1,
                [`VARCHAR(${n_maximum_string_length_in_bytes})`]: Math.pow(2,16)-1,
                [`MEDIUMTEXT(${n_maximum_string_length_in_bytes})`]: Math.pow(2,24)-1,
                [`LONGTEXT(${n_maximum_string_length_in_bytes})`]: Math.pow(2,32)-1,
            };
            var s_mysql_type = `VARCHAR()`;//default
            for(var s_mysql_type in o__s_mysql_type__n_max_s_len_byte){
                var n_max_s_len_byte = o__s_mysql_type__n_max_s_len_byte[s_mysql_type];
                if(n_maximum_string_length_in_bytes <= n_max_s_len_byte){
                    s_mysql_type = s_mysql_type;
                }
            }
        }
    }

}

var f_create_table = async function(
    o_model, 
    o_db_client
){
    var s_query = ``;
    s_query += `
    CREATE TABLE a_${o_model.s_name.toLowerCase()} (
    `;
    for(var o_model_property in o_model.a_o_model_property){
        s_query += `${o_model_property.s_name}} int(11) NOT NULL AUTO_INCREMENT`
    }
    await client.execute(`DROP TABLE IF EXISTS users`);
    await client.execute(`
            id int(11) NOT NULL AUTO_INCREMENT,
            name varchar(100) NOT NULL,
            created_at timestamp not null default current_timestamp,
            PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `);
}
var f_autogenerate_databases_and_tables = async function(){
    for(var o_database in a_o_database){
        await o_db_client.execute(`CREATE DATABASE IF NOT EXISTS ${o_database.s_name}`);
        await o_db_client.execute(`USE ${o_database.s_name}`);

        for(var o_model in a_o_model){
            f_create_table(o_model, o_db_client);
        }
    }
}

export {
    f_autogenerate_databases_and_tables,
}