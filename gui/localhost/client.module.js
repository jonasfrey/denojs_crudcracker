import { f_o_html_from_o_js } from "./f_o_html_from_o_js.module.js";


import {
    O_api_request,
    O_crud_operation_request,
    o_s_class_name_o_class
} from "./classes/a_o_class.module.js"
import {
    a_o_model
} from "./model_classes/a_o_model.module.js"

window.f_a_o_model_instance = async function(
    o_model
){
    fetch(
        "/f_o_api_response",
        {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(
                new O_api_request(
                    [
                        new O_crud_operation_request(
                            new O_crud_operation_request__params(
                                {
                                    n_id: 1
                                }
                            ),
                            "read", 
                            o_model.s_name, 
                            1,
                            1,
                        )
                    ]
                )
            ) // body data type must match "Content-Type" header
        }
    );
}
var o = await f_a_o_model_instance(a_o_model[0]);

let o_data = {
    o_model: null,
    a_o_model: a_o_model,
    a_o_class:[
        o_s_class_name_o_class.O_user,
        o_s_class_name_o_class.O_chatroom,
        o_s_class_name_o_class.O_message,
        o_s_class_name_o_class.O_user_o_message_o_chatroom,    
    ]
}
window.o_data = o_data;

var o_div = document.createElement("div");
o_div.appendChild(document.createElement("div"))
document.body.appendChild(o_div)

var f_render = function(){

    var o = {
        id: "main",
        a_o: [
            {
                a_o:[
                    ...o_data.a_o_model.map(function(o_model){
                        return {
                            innerText: o_model.s_name,
                            class: `o_model ${(o_model.s_name == o_data.o_model?.s_name) ? 'active' : ''}`,  
                            onclick: function(){
                                o_data.o_model = o_model;
                                f_render()
                            }
                        }
                    })
                ]
            },
            {
                // a_o:[
                //     ...o_data.a_o_model.map(function(o_model){
                //         return {
                //             b_render: o_data.o_model == o_model, 
                //             a_o: [
                //                 ...o_data[`a_o_${o_model.s_name.toLowerCase()}`].map(
                //                     function(o_model__instance){
                //                         return {
                //                             a_o:[
                //                                 Object.keys(o_model__instance).map(function(
                //                                     s_prop_name
                //                                 ){

                //                                     return {
                //                                         a_o:[
                //                                             {
                //                                                 s_tag: "label", 
                //                                                 innerText: s_prop_name
                //                                             },
                //                                             {
                //                                                 s_tag: "input", 
                //                                                 value: o_model__instance[s_prop_name]
                //                                             }
                //                                         ]
                //                                     }
                //                                 })
                //                             ]
                //                         }
                //                     }
                //                 )
                //             ]
                //         }
                //     })
                    
                // ]
            }
        ]
    }
    var o_html = f_o_html_from_o_js(o);
    o_div.replaceChild(o_html, o_div.firstChild)
    document.body.appendChild(o_div)
}
f_render();


console.log(o_data.a_o_model)