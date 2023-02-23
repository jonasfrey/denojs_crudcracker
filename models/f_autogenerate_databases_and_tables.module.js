import { 
    a_o_database,
    a_o_db_connection_info,
    f_o__execute_query__denoxmysql,
    f_o_command__execute_query_terminalcommand
} from "./../database/mod.module.js";

import { a_o_model } from "./model_classes/a_o_model.module.js";
import { f_write_file } from "./f_write_file.module.js"
import { ensureFile } from "https://deno.land/std@0.170.0/fs/mod.ts";
import {f_o_command} from "https://deno.land/x/o_command@0.5/O_command.module.js"

import { Client } from "https://deno.land/x/mysql/mod.ts";
import { log } from "https://deno.land/x/mysql@v2.11.0/mod.ts";
const { error } = log;

var s_path_file__query_logs = "./query_logs_tmp.gitignored.sql"
var s_txt_query_logs = "-- "+new Date().toString()+"\n";
await ensureFile(s_path_file__query_logs);
await f_write_file(
    s_path_file__query_logs,
    //clear log
    ''
)

function f_s_repeated(n, s=' '){
    return new Array(n+1).join(s);
}
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
        s_mysql_type = `VARCHAR(512)`;//default
        var n_maximum_string_length_in_bytes = o_model_property?.o_model_property_validation?.n_maximum_string_length_in_bytes;
        if(n_maximum_string_length_in_bytes){

            // important !: 65535 bytes is the max row size for mysql. // see #mysql important in the ./readme.md
            var o__s_mysql_type__n_max_s_len_byte = {
                //"TINYTEXT": Math.pow(2,8)-1, 
                //[`TEXT(${n_maximum_string_length_in_bytes})`]: Math.pow(2,16)-1,
                // due to this error 'ERROR 1074 (42000) at line 4: Column length too big for column 's_name' (max = 21845); use BLOB or TEXT instead'
                [`CHAR(${n_maximum_string_length_in_bytes})`]: Math.pow(2,8)-1,
                [`VARCHAR(${n_maximum_string_length_in_bytes})`]: Math.pow(2,9)-1,//21845,//Math.pow(2,16)-1,
                [`MEDIUMTEXT`]: Math.pow(2,24)-1,
                [`LONGTEXT`]: Math.pow(2,32)-1,
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
        
        var n_display_width = 0; //i dont know wtf this is for
        var o__s_mysql_type__n_bits_required = {
            //"TINYTEXT": Math.pow(2,8)-1, 
            //[`TEXT(${n_maximum_string_length_in_bytes})`]: Math.pow(2,16)-1,
            [`TINYINT${(n_display_width == 0)? '':`(${n_display_width})`}`]: 8,//2^8
            [`SMALLINT${(n_display_width == 0)? '':`(${n_display_width})`}`]: 16,// 2^16
            [`MEDIUMINT${(n_display_width == 0)? '':`(${n_display_width})`}`]: 24, // 2^24
            [`INT${(n_display_width == 0)? '':`(${n_display_width})`}`]: 32, // 2^32
            [`BIGINT${(n_display_width == 0)? '':`(${n_display_width})`}`]: 64, // 2^64
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
    return o_model_property.b_auto_increment;
    // return f_b_primary_key(o_model_property);
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
var f_s_query_drop_table = function(o_model){
    return `DROP TABLE IF EXISTS ${o_model.s_name}`;
}
var f_s_query_drop_column = function(
    o_model, 
    o_model_property
    ){
    var s = `ALTER TABLE ${o_model.s_name}
    DROP COLUMN ${o_model_property.s_name};`
    return s;
}
var f_s_query_modify_table = function(
    a_o_with_index
){  
    var a_o_with_index__now = a_o_with_index.filter(o=> o.a_o == a_o_model);
    var a_o_with_index__last = a_o_with_index.filter(o=> !a_o_with_index__now.includes(o));
    console.log(a_o_with_index__now)
    console.log(a_o_with_index__last)
    
    var a_o_model_property__now = a_o_with_index__now[0].a_o_model_property;
    var a_o_model_property__last = a_o_with_index__now[0].a_o_model_property;

    var a_a_o_with_index__o_model_property = f_a_a_o_with_index__with_same_prop_val(
        [
            a_o_model_property__now,
            a_o_model_property__last
        ],
        's_name'
    );
    // you know what... 
    // just let it be...
    console.log(a_o_with_index);
    console.log("what");
    Deno.exit(-1);

    var s_query = '';
    if(
        o_objectrelation_with_same_prop_val.o_1
        && 
        o_objectrelation_with_same_prop_val.o_2
    ){
        var a_o_model_property = o_objectrelation_with_same_prop_val.o_1.a_o_model_property;
        var a_o_model_property__last = o_objectrelation_with_same_prop_val.o_2.a_o_model_property;

        // propertys that have not been added or removed 
        // but that may have changed position /index
        var a_o_objects_related = []
        for(var n_index_a_o_model_property in a_o_model_property){
            var o_model_property = a_o_model_property[n_index_a_o_model_property];
            var o_model_property__last = null;
            var n_index_a_o_model_property__last = null;
            for(var n in a_o_model_property__last){
                var o = a_o_model_property__last[n];
                if(o_model_property.s_name == o.s_name){
                    o_model_property__last = o;
                    n_index_a_o_model_property__last = n;
                    break;
                }
            }

            if(o_model_property__last){
                a_o_objects_related.push(
                    new O_with_index(
                        n_index_a_o_model_property, 
                        o_model_property
                    ),
                    new O_with_index(
                        n_index_a_o_model_property, 
                        o_model_property
                    )
                )
            }
        }
        console.log(a_o_objects_related)
        console.log("exit")
        Deno.exit()
        var a_o_with_index_with_same_prop_val = []
        for(var n_index in a_o_objectrelation_with_same_prop_val){
            var o_model_property = a_o_objectrelation_with_same_prop_val[n_index];
            a_o_with_index_with_same_prop_val.push(
                new O_with_index(
                    n_index, 
                    o_model_property
                )
            )
        }

        //propertys that existed before and are now not existing anymore
        var a_o_model_property__existed_before = 
            f_a_o_objectrelation_with_same_prop_val__not_existing_in_a2(
                a_o_model_property__last, 
                a_o_model_property,
                's_name'
            );

        //propertys that did not yet exist before and are existing now
        var a_o_model_property__not_existed_before = 
            f_a_o_objectrelation_with_same_prop_val__not_existing_in_a2(
                a_o_model_property,
                a_o_model_property__last, 
                's_name'
            );

        // check what changed 
        let o_models_propertys = null;
    }
    return s_query;
}
var f_s_query_create_table = function(
    o_model
){
    var s_query = ``;
    var n_spaces_per_tab = 4;
    var s_i1 = f_s_repeated(1*n_spaces_per_tab, ' ');
    var a_s_table_property = [];
    s_query += 
`
CREATE TABLE IF NOT EXISTS ${f_s_table_name_from_o_model(o_model)} (
`;
    for(var o_model_property of o_model.a_o_model_property){
        var s_mysql_type = f_s_mysql_type(o_model_property);
        var s_auto_increment = (f_b_auto_increment(o_model_property))?'AUTO_INCREMENT': '';
        var s_not_null = ((o_model_property.b_required))?'NOT NULL': '';
        // console.log(s_mysql_type)
        a_s_table_property.push(`${s_i1}${o_model_property.s_name} ${s_mysql_type} ${s_not_null} ${s_auto_increment}`)
    }
    var o_model_property__primary_key = f_o_model_property__primary_key(o_model);
    if(o_model_property__primary_key){
        a_s_table_property.push(`${s_i1}PRIMARY KEY (${o_model_property__primary_key.s_name})`);
    }


    var a_o_model_property__foreign_key = o_model.a_o_model_property.filter(o=> f_b_foreign_key(o));
    for(var o_model_property__foreign_key of a_o_model_property__foreign_key){
        var s_name__model_property_foreign = o_model_property__foreign_key.o_model_property_key.o_model_property__foreign?.s_name;

        var s_cascade_on_delete = o_model_property__foreign_key.o_model_property_key?.b_cascade_on_delete;
        var s_cascade_on_update = o_model_property__foreign_key.o_model_property_key?.b_cascade_on_update;
        var o_model_property_key = o_model_property__foreign_key.o_model_property_key;
        // console.log(o_model_property_key);
        // console.log(o_model_property_key.o_model__foreign);
        // console.log(o_model_property_key.o_model_property__foreign);
        // Deno.exit()
        a_s_table_property.push(
            `${s_i1}${s_i1}FOREIGN KEY (${o_model_property__foreign_key.s_name}) REFERENCES ${f_s_table_name_from_o_model(o_model_property_key.o_model__foreign)} (${o_model_property_key.o_model_property__foreign.s_name}) ${(s_cascade_on_delete)?'ON DELETE CASCADE': ''} ${(s_cascade_on_update)?'ON UPDATE CASCADE': ''}`
        );

    }
    s_query+=a_s_table_property.join(",\n");
    s_query+=`
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
    return s_query;
}
var f_s_query_create_database = function(o_database){
    var s_query = `CREATE DATABASE IF NOT EXISTS ${o_database.s_name}`;
    return s_query;
}
var f_s_query_drop_database = function(o_database){
    return `DROP DATABASE ${o_database.s_name}`
}

var s_path_file_last_a_o_model = "./.gitignored.a_o_model_backup/a_o_model.module.js";

var f_write_a_o_model__last = async function(){
    return f_write_file(
        s_path_file_last_a_o_model,
        JSON.stringify(a_o_model)
    )
}
var f_a_o_model__last = async function(){

    await ensureFile(s_path_file_last_a_o_model);
    var a_o_model__last = []
    try {
        var s_text = await Deno.readTextFile(s_path_file_last_a_o_model);
        // console.log(s_text)
        a_o_model__last = JSON.parse(s_text);
    } catch (error) {
        console.log(error)
    }
    if(!Array.isArray(a_o_model__last)){
        a_o_model__last = []
    }
    return a_o_model__last;
}

class O_objects_related{
    constructor(
        o = null,
        o__last = null, 
    ){
        this.o = o
        this.o__last = o__last
    }
}


class O_with_index{
    constructor(
        n_index, 
        a_o,
        o
    ){
        this.n_index = n_index, 
        this.a_o = a_o
        this.o = o
    }
}
class O_objects_with_same_prop_val{
    constructor(
        s_property_name,
        property_value,
        a_o_with_index
    ){
        this.s_property_name = s_property_name ,
        this.property_value = property_value ,
        this.a_o_with_index = a_o_with_index 
    }
}

var f_a_a_o_with_index__with_same_prop_val = function(
    a_a_o,
    s_property_name
){

    // looks for objects with same property name and value 
    // in multiple arrays
    var a_a_o_with_index = []
    var a_property_value__done = [];
    for(var a_o of a_a_o){
        for(var n_index in a_o){
            var o = a_o[n_index];
            var property_value = o[s_property_name]
            var a_o_with_index = [];
            if(a_property_value__done.includes(property_value)){continue}
            a_property_value__done.push(property_value)
            if(!o.hasOwnProperty(s_property_name)){continue}
            a_o_with_index.push(
                new O_with_index(
                    n_index, 
                    a_o, 
                    o
                )
            )
            for(var a_o2 of a_a_o){
                if(a_o2 == a_o){continue}
                a_o_with_index = a_o_with_index.concat(
                    a_o_with_index = f_a_o_with_index__same_prop_val(
                        s_property_name, 
                        property_value,
                        a_o2
                    )
                )
            }
            a_a_o_with_index.push(a_o_with_index)
        }
    }
    return a_a_o_with_index
}
var f_a_o_with_index__same_prop_val = function(
    s_property_name, 
    property_value, 
    a_o
){
    var a_o_with_index = [];
    for(var n_index in a_o){
        var o = a_o[n_index];
        if(o.hasOwnProperty(s_property_name)){
            if(o[s_property_name] == property_value){
                a_o_with_index.push(
                    new O_with_index(
                        n_index, 
                        a_o, 
                        o
                    )
                )
            }
        }
    }
    return a_o_with_index
}
class O_objectrelation_with_same_prop_val{
    constructor(
        s_property_name,
        property_value,
        o_with_index_1, 
        o_with_index_2
    ){
        this.s_property_name = s_property_name
        this.property_value = property_value
        this.o_with_index_1 = o_with_index_1
        this.o_with_index_2 = o_with_index_2
    }
}
var f_a_o_with_index__with_same_prop_val = function(
    a_o__1,
    a_o__2, 
    s_property_name
){
    console.log(a_o__1)
    console.log(a_o__2)
    var a_o_objectrelation_with_same_prop_val = []
    for(var o__1 of a_o__1){
        var a_o__2__filtered = a_o__2.filter(
            o=> o[s_property_name] == o_model[s_property_name]
        );
        a_o_objectrelation_with_same_prop_val.push(
            new O_objectrelation_with_same_prop_val(
                s_property_name, 
                o__1[s_property_name],
                new O_with_index(
                    a_o__1.indexOf(o__1), 
                    o__1
                ) ,
                new O_with_index(
                    a_o__2.indexOf(a_o__2__filtered[0]), 
                    a_o__2__filtered[0]
                )
                
            )
        );
    }
    return a_o_objectrelation_with_same_prop_val
}
var f_a_o___not_existing_in_a2 = function(
    a_o__1,
    a_o__2, 
    s_property_name
){
    var a_o = a_o__1.filter(
        o => a_o__2.filter(o2=> o2[s_property_name] == o[s_property_name]).length == 0
    )
    return a_o
}
var f_drop_databases = async function(){
    for(var o_db_connection_info of a_o_db_connection_info){
        var o_db_client = await new Client().connect({
            hostname: o_db_connection_info.s_hostname, 
            port: o_db_connection_info.n_port,
            username: o_db_connection_info.s_username, 
            password: o_db_connection_info.s_password, 
        });
        for(var o_database of a_o_database){
            var o_result__sql_query = await f_o__execute_query__denoxmysql(
                `drop database ${o_database.s_name}`,
                o_db_client,
                o_database,
            );
        }
        await o_db_client.close();
    }
}
var f_autogenerate_databases_and_tables = async function(){
    var a_o_model__last = await f_a_o_model__last();
    console.log(a_o_model__last)
    var a_a_o_with_index = f_a_a_o_with_index__with_same_prop_val(
        [a_o_model, a_o_model__last], 
        's_name'
    );

    var s_path_folder_backups = "./.gitignored.db_backups";

    // console.log(`! this will override the backup files in ${s_path_folder_backups} drop db tables and create them again !`)
    // var b_exit = prompt('continue?: [y/n]').toLowerCase() != 'y';
    // if(b_exit){
    //     return;
    // }
    var s_query = ``;
    var s_query__use_db = ``;
    var o_result__sql_query =  null; 
    var o_command__sql_query =  null;
    for(var o_db_connection_info of a_o_db_connection_info){
        var o_db_client = await new Client().connect({
            hostname: o_db_connection_info.s_hostname, 
            port: o_db_connection_info.n_port,
            username: o_db_connection_info.s_username, 
            password: o_db_connection_info.s_password, 
        });
        for(var o_database of a_o_database){
            
            var s_qry = `CREATE DATABASE IF NOT EXISTS ${o_database.s_name};`
            // create db if it not exists
            o_result__sql_query = await f_o__execute_query__denoxmysql(
                s_qry,
                o_db_client,
                null,
            );
            s_txt_query_logs+='\n'+s_qry;
            var s_name_file = `conn_${o_db_connection_info.s_hostname}_db_${o_database.s_name}_${new Date().getTime()}.sql`
            var s_path_name_file_name = `${s_path_folder_backups}/${s_name_file}`;
            
            await ensureFile(`${s_path_folder_backups}/conn_tmp_empty.sql`);

            var o_command = await f_o_command(
                ` rm ${s_path_folder_backups}/conn_*.sql`.split(' ')
            );
            var o_command = await f_o_command(
                [
                    ` mysqldump -u ${o_db_connection_info.s_username}`,
                    ` -p${o_db_connection_info.s_password}`, 
                    ` --port=${o_db_connection_info.n_port}`, 
                    ` -h ${o_db_connection_info.s_hostname}`, 
                    ` ${o_database.s_name} > ${s_path_name_file_name}`
                ].join('').split(' ')
            );
            console.log(o_command)

            
            s_query += s_query__use_db;
            
            // for(let a_o_with_index of a_a_o_with_index){
            //     if(a_o_with_index.length < 2){
            //         var o_with_index = a_o_with_index[0];
            //         if(o_with_index.a_o == a_o_model){
            //             //model is new 
            //             s_query += f_s_query_create_table(a_o_with_index[0].o);
            //         }else{
            //             //model has been removed
            //             s_query += f_s_query_drop_table(a_o_with_index[0].o);
            //         }
            //     }else{
            //         console.log(`'${a_o_with_index[0].o.s_name}': the model with this name may contain changes!`)
            //         console.log("   modifying / updating the this model changes in the db table is not implemented yet")
            //         console.log("   please update a sql table manually with sql and also add the updates to a_o_model.module.js")
            //         //s_query += f_s_query_modify_table(a_o_with_index);
            //     }
            //     //console.log(s_query_create_table);
            // }
            
            // for simplicity sake we don't care about removed or updated models, 
            // we just create every model if it is not existing yet
            for(var o_model of a_o_model){
                s_query += f_s_query_create_table(o_model);
            }
            o_result__sql_query = await f_o__execute_query__denoxmysql(
                s_query,
                o_db_client,
                o_database,
            );
            s_txt_query_logs+='\n'+s_query;


            console.log(o_result__sql_query)

            //     var s_sql_comment_prefix = '-- '// the space after '--' is important !
            //     var s_path_file = './autogenerated_sql_query.sql';
            //     var s_file_content = 
            // `${s_sql_comment_prefix}${f_s_file_autogenerated_comment(import.meta.url.split("/").pop())}
            // ${s_query}`;
            //     f_write_file(
            //         s_path_file, 
            //         s_file_content
            //     )

            //     await f_execute_query_on_specific_db(s_query, o_database)
        }
        await o_db_client.close();

    };
    await f_write_a_o_model__last();
    await f_write_file(
        s_path_file__query_logs,
        s_txt_query_logs
    );
    console.log(`db has successfully been updated! temp file of all queries executed can be found here: ${s_path_file__query_logs}`)
}


export {
    f_autogenerate_databases_and_tables,
    f_drop_databases
}