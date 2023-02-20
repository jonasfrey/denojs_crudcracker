import {
    f_drop_databases
} from "./f_autogenerate_databases_and_tables.module.js"


var s_confimation_required = `drop_all_databases`;

const s_confimation = prompt(`to really DROP/DELETE ! all databases enter '${s_confimation_required}':`);

var b_drop = s_confimation == s_confimation_required;
if(!b_drop){
    console.log(`DB's are not beeing deleted, you entered: '${s_confimation}'`);
}
if(b_drop){
    await f_drop_databases()
}