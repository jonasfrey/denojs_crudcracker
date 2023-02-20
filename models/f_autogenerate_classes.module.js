import {a_o_model} from "./a_o_model.module.js"
import { f_s_file_autogenerated_comment } from "./f_s_file_autogenerated_comment.module.js"
import { f_write_file } from "./f_write_file.module.js"


var s_path_folder__classes = "./classes"

var f_autogenerate_classes = async function(){

    for(let o_model of a_o_model){
        f_autogenerate_class(o_model, "javascript")
        //f_autogenerate_class(o_model, "csharp")
    }

    // create also a single file which exports all the classes for an easy import of all the classes 
    var s_generated_by_line = f_s_file_autogenerated_comment(import.meta.url.split("/").pop());

    var s_path_folder_classes_with_public_and_private_properties = `${s_path_folder__classes}/./.`
    var s_path_folder_classes_with_only_public_properties = `${s_path_folder__classes}/./classes_with_only_public_properties`

    var s_file_name_all_classes = "a_o_class.module.js";
    var a_s_model_name = a_o_model.map(o=>o.s_name);
    for await (const o_entry of Deno.readDir(s_path_folder_classes_with_public_and_private_properties)) {
        if (o_entry.isFile) {
            var s_mod_suffix  = 'module.js'
            var n_index = o_entry.name.indexOf(s_mod_suffix);
            if(n_index != (o_entry.name.length-s_mod_suffix.length)){
                console.log(`${o_entry.name}: skipping file because it does not end with ${s_mod_suffix}`)
                continue
            }

            var s_name_file = o_entry.name;
            var a_s = s_name_file.split(".");
            var s_model_name = a_s.shift();
            var a_o_model__filtered = a_o_model.filter(o=>o.s_name == s_model_name);
            if(
                a_o_model__filtered.length == 0
                && s_name_file != s_file_name_all_classes
                ){
                a_s_model_name.push(s_model_name)
            }
        }
    }
    // console.log(a_s_model_name)

    var s_file_content = 
`
//${s_generated_by_line}
${a_s_model_name.map(
    function(s_model_name){
        var s_class_file_name = `${s_model_name}.module.js`;
        return `import {${s_model_name}} from "./${s_class_file_name}"`
    }
    ).join("\n")}
var a_o_class = [${a_s_model_name.map(s_model_name=>s_model_name).join(",\n")}];
var o_s_class_name_o_class = {${a_s_model_name.map(s_model_name=>`${s_model_name}:${s_model_name}`).join(",\n")}};
export { 
a_o_class,
o_s_class_name_o_class,
${a_s_model_name.map(s_model_name=>s_model_name).join(",\n")}
}
`
    var s_path_file = `${s_path_folder_classes_with_public_and_private_properties}/${s_file_name_all_classes}`;
    f_write_file(
        s_path_file, 
        s_file_content
    )

    var s_path_file = `${s_path_folder_classes_with_only_public_properties}/${s_file_name_all_classes}`;

    f_write_file(
        s_path_file, 
        s_file_content
    )

}


var s_path_folder_classes_with_public_and_private_properties = `${s_path_folder__classes}/./.`
var s_path_folder_classes_with_only_public_properties = `${s_path_folder__classes}/./classes_with_only_public_properties`
var s_generated_by_line = f_s_file_autogenerated_comment(import.meta.url.split("/").pop());

var f_s_file_content_class = function(
    o_model, 
    a_o_model_property, 
    s_prgramming_language
){
    var s_indentation = '       ';
    var s_file_content = '';
    if(s_prgramming_language == 'javascript'){
        s_file_content = 
        `
        // ${s_generated_by_line}
        class ${o_model.s_name}{
            constructor(
        ${a_o_model_property.map(o=>`${s_indentation}${o.s_name}`).join(",\n")}
            ){
        ${a_o_model_property.map(o=>`${s_indentation}this.${o.s_name} = ${o.s_name};`).join("\n")}
            }
        }
        export { ${o_model.s_name} }
        `
    }

    if(s_prgramming_language == 'python'){
        s_file_content = 
        `
        # ${s_generated_by_line}
        class ${o_model.s_name}:
            def __init__(
        ${a_o_model_property.map(o=>`${s_indentation}${o.s_name}`).join(",\n")}
            ):
        ${a_o_model_property.map(o=>`${s_indentation}self.${o.s_name} = ${o.s_name};`).join("\n")}
        `
    }

    return s_file_content
}


var f_autogenerate_class = function(
    o_model, 
    s_prgramming_language
){
    var s_file_content = '';

    var s_path_file = '';
    var o_file_extension = {
        'javascript': '.module.js',
        'python': '.py',
    };

    s_file_content = f_s_file_content_class(o_model, o_model.a_o_model_property, s_prgramming_language)
    s_path_file = `${s_path_folder_classes_with_public_and_private_properties}/${o_model.s_name}${o_file_extension[s_prgramming_language]}`;

    if(s_file_content != ''){
        f_write_file(
            s_path_file, 
            s_file_content
        )
    }
    
    var a_o_model_property_filtered_public_only = o_model.a_o_model_property.filter(o=>!o.b_private);
    s_file_content = f_s_file_content_class(o_model, a_o_model_property_filtered_public_only, s_prgramming_language)
    s_path_file = `${s_path_folder_classes_with_only_public_properties}/${o_model.s_name}${o_file_extension[s_prgramming_language]}`;
        
    if(s_file_content != ''){
        f_write_file(
            s_path_file, 
            s_file_content
        )
    }

}

export {
    f_autogenerate_classes,
    f_autogenerate_class
}