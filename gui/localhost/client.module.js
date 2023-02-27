import {f_o_html_from_o_js} from "https://deno.land/x/f_o_html_from_o_js@0.5/mod.js"


import {
    O_api_request,
    O_crud_operation_request,
    o_s_class_name_o_class
} from "./classes/a_o_class.module.js"

import {
    a_o_model
} from "./model_classes/a_o_model.module.js"

window.f_o_api_response__create = async function(
    o_data,
    s_o_model_s_name
){
    // console.log(s_o_model_s_name)
    var o_api_response = await fetch(
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
                            o_data,// no data because read
                            [],
                            "create",
                            s_o_model_s_name,
                            1,
                            1,
                        )
                    ]
                )
            ) // body data type must match "Content-Type" header
        }
    );
    o_api_response = await (o_api_response).json();
    return o_api_response;
}

window.f_a_o_model_instance__read = async function(
    s_o_model_s_name, 
    a_search_conditions_multidimensional_for_read_or_update_or_delete
){
    // console.log(s_o_model_s_name)
    var o_api_response = await fetch(
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
                            {},// no data because read
                            a_search_conditions_multidimensional_for_read_or_update_or_delete,
                            "read",
                            s_o_model_s_name,
                            1,
                            1,
                        )
                    ]
                )
            ) // body data type must match "Content-Type" header
        }
    );
    o_api_response = await (o_api_response).json();
    console.log(o_api_response)
    var a_o = []
    if(o_api_response.b_success){
        a_o = o_api_response.a_o_crud_operation_result[0].a_o_instance_from_db
    }  
    return a_o
}

window.o_data = {
    o_model: null,
    a_o_model: a_o_model,
    o_model_class: null, 
    a_o_class:[
        o_s_class_name_o_class.O_user,
        o_s_class_name_o_class.O_chatroom,
        o_s_class_name_o_class.O_message,
        o_s_class_name_o_class.O_user_o_message_o_chatroom,    
    ], 
    o_user: {}, // the current object
    a_o_user: [], // the array of all objects
    o_chatroom: {}, // the current object
    a_o_chatroom: [], // the array of all objects
    o_message: {}, // the current object
    a_o_message: [], // the array of all objects
    o_user_o_message_o_chatroom: {}, // the current object
    a_o_user_o_message_o_chatroom: [], // the array of all objects, 

    a_o_model_instance:[],
    o_model_instance:{},
    o_model_instance__new: null,
    o_api_response: false,
}

o_data.a_o_user = await f_a_o_model_instance__read("O_user", ["n_id", ">", 0]);
o_data.a_o_chatroom = await f_a_o_model_instance__read("O_chatroom", ["n_id", ">", 0]);
o_data.a_o_message = await f_a_o_model_instance__read("O_message", ["n_id", ">", 0]);
o_data.a_o_user_o_message_o_chatroom = await f_a_o_model_instance__read("O_user_o_message_o_chatroom", ["n_id", ">", 0]);

// console.log(o_data.a_o_user_o_message_o_chatroom)

const o_style = document.createElement('style');
o_style.innerHTML = `
*{
    margin:0; 
    padding:0;
}
#main{
    display:flex;
    flex-direction: column;
    min-height:100vh;
    max-height:100vh;
}
.group{
    display:flex;
}
.o_model_instance:nth-child(even){
    background: rgba(0,0,0,0.1);
}

input, label, textarea{
    width: 100%;
    padding: 0.4rem;
}
.highlight{
    background-color: rgb(239 226 24);
}
.info, .success, .warning, .error, .validation {
    border: 1px solid;
    margin: 10px 0px;
    padding: 15px 10px 15px 50px;
    background-repeat: no-repeat;
    background-position: 10px center;
}
.info {
    color: #00529B;
    background-color: #BDE5F8;
    background-image: url('https://i.imgur.com/ilgqWuX.png');
}
.success {
    color: #4F8A10;
    background-color: #DFF2BF;
    background-image: url('https://i.imgur.com/Q9BGTuy.png');
}
.warning {
    color: #9F6000;
    background-color: #FEEFB3;
    background-image: url('https://i.imgur.com/Z8q7ww7.png');
}
.error{
    color: #D8000C;
    background-color: #FFBABA;
    background-image: url('https://i.imgur.com/GnyDvKN.png');
}
.validation{
    color: #D63301;
    background-color: #FFCCBA;
    background-image: url('https://i.imgur.com/GnyDvKN.png');
}
.selected{
    color: #00529B;
    background-color: #BDE5F8;
}
`;
document.head.appendChild(o_style);

var o_div_main = document.createElement("div");
document.body.appendChild(o_div_main)


var f_s_html_highlighted = function(
    s_string_to_highlight, 
    s_searchterm
){
    try {
        var s_html = s_string_to_highlight;
        if(s_searchterm.trim() != ""){
            // return s_string_to_highlight
            s_html = s_html.replaceAll(
                s_searchterm, 
                `<span class='highlight'>${s_searchterm}</span>`
            )
        }
        return `<span>${s_html}</span>`
        
    } catch (error) {
        return s_string_to_highlight
    }

}
window.o_js_a_o_model_instance = {
    f_o_js: function(){
        return {
            class: "a_o_model_instance",
            a_o:[
                ...o_data.a_o_model_instance
                .filter(function(o_model_instance){
                    var b = false;
                    for(var o_model_property of o_data.o_model.a_o_model_property){
                        var value = o_model_instance[o_model_property.s_name];

                        if(s_searchterm.trim() == ""){
                            return true;
                        }
                        try {
                            if(value.toString().toLowerCase().includes(s_searchterm)){
                                return true;
                            }
                        } catch (error) {
                            
                        }
                    }
                    return false;
                })
                .map(function(o_model_instance){
                    return {
                        f_o_js: function(){
                            // console.log(o_model_instance)
                            return {
                                class: "o_model_instance",
                                a_o:[
                                    ...o_data.o_model.a_o_model_property
                                    .map(function(
                                        o_model_property
                                    ){
                                        var value = o_model_instance[o_model_property.s_name];
                                        // console.log(o_model_property)
                                        return {
                                                class: "group",
                                                a_o:[
                                                    {
                                                        class: "innerText",
                                                        s_tag: "label", 
                                                        innerText: o_model_property.s_name
                                                    },
                                                    {
                                                        class: "o_model_property",
                                                        // s_tag: 'input', 
                                                        // readOnly: true,
                                                        innerHTML: f_s_html_highlighted(value, s_searchterm),
                                                        // innerHTML: f_s_html_highlighted(o.s_string1, s_searchterm)
                                                    },
                                                ]
                                        }
                                        
                                    }),

                                ]
                            }
                        }

                    }
                })
            ]
        }
    }
}
var o_js_o_api_response = {
    f_o_js: function(){
        console.log("o_js_o_api_response render !")
        return {
            // b_render: this.o_api_response,
            class: `o_data.o_api_response.s_message ${o_data.o_api_response.b_success ? 'success' : 'error'}`, 
            innerText: `${o_data.o_api_response.b_success ? 'success:' : 'error:'}: ${o_data.o_api_response?.s_message}`
        }
    }
}


window.o_js_a_o_model_instance__new = {
    a_o:[
        {
            s_tag: "label",
            innerText: "create a new instance"
        },
        {
            f_o_js: function(o_js){
                console.log(o_js)

                if(!o_data.o_model){
                    return {b_render:false}
                }
                return {
                    class: "o_model_instance",
                    a_o:[
                        ...o_data.o_model.a_o_model_property
                        .map(function(
                            o_model_property
                        ){
                            return {
                                    class: "group",
                                    a_o:[
                                        {
                                            class: "innerText",
                                            s_tag: "label", 
                                            innerText: o_model_property.s_name
                                        },
                                        (function(){
                                            var f_oninput_onchange = function(){
                                                o_data.o_model_instance__new[o_model_property.s_name] = this.value;
                                            }
                                            var o_model_foreign = o_model_property?.o_model_property_key?.o_model__foreign;
                                            if(o_model_foreign){
                                                var a_o_model_instance__foreign = o_data[`a_${o_model_foreign.s_name.toLowerCase()}`];

                                                // return {
                                                //     s_tag: 'select', 
                                                //     onchange: f_oninput_onchange, 
                                                //     a_o:[
                                                //         ...a_o_model_instance__foreign.map(function(
                                                //             o_model_instance__foreign
                                                //         ){
                                                //             return {
                                                //                 s_tag: "option", 
                                                //                 value: o_model_instance__foreign.n_id,
                                                //                 innerText: JSON.stringify(o_model_instance__foreign)
                                                //             }
                                                //         })
                                                //     ]
                                                // }
                                                var s_searchterm = '';
                                                var o_model_instance__foreign_selected = null;
                                                var o_js_o_input_and_searchterm = null;
                                                var o_js_a_o_object = {
                                                    f_o_js: function(){
                                                        return {
                                                            a_o: [
                                                                ...a_o_model_instance__foreign
                                                                .filter(function(o){
                                                                    var a_value = Object.values(o);
                                                                    return JSON.stringify(o).includes(s_searchterm)
                                                                })
                                                                .map(function(
                                                                    o_model_instance__foreign
                                                                ){
                                                                    return {
                                                                        class: (function(){
                                                                            var b = o_model_instance__foreign_selected == o_model_instance__foreign;
                                                                            console.log(b);
                                                                            if(b){
                                                                                return 'selected'
                                                                            }
                                                                            return 'not_selected'
                                                                        })(),
                                                                        value: o_model_instance__foreign.n_id,
                                                                        innerHTML: f_s_html_highlighted(
                                                                            JSON.stringify(o_model_instance__foreign),
                                                                            s_searchterm
                                                                        ), 
                                                                        onclick: function(){
                                                                            console.log(o_model_instance__foreign)
                                                                            o_model_instance__foreign_selected = o_model_instance__foreign;
                                                                            o_data.o_model_instance__new[o_model_property.s_name] = o_model_instance__foreign.n_id;
                                                                            o_js_a_o_object._f_render()
                                                                            o_js_o_input_and_searchterm._f_render()
                                                                        }
                                                                    }
                                                                })
                                                            ]
                                                        }

                                                    }
                                                }
                                                o_js_o_input_and_searchterm = {
                                                    f_o_js:function(){
                                                        return {
                                                            class: "custom_select",
                                                            a_o: [
                                                                {
                                                                    s_tag: 'input', 
                                                                    value: o_model_instance__foreign_selected?.n_id,
                                                                    onkeyup: f_oninput_onchange 
                                                                },
                                                                {
                                                                    s_tag: 'input', 
                                                                    value: s_searchterm,
                                                                    onkeyup: function(){
                                                                        s_searchterm = this.value
                                                                        console.log(s_searchterm)
                                                                        o_js_a_o_object._f_render()
                                                                    }
                                                                },
                                                                o_js_a_o_object
                                                            ], 
                                                        }
                                                    }
                                                }
                                                return o_js_o_input_and_searchterm;
                                            }
                                            return {
                                                class: "o_model_property",
                                                s_tag: 'input',
                                                value: (function(){
                                                    if(o_model_property.s_name == "n_id"){
                                                        return o_data.o_model_instance__new.n_id
                                                    }
                                                    return ''
                                                })(),
                                                // readOnly: true,
                                                // innerHTML: f_s_html_highlighted(value, s_searchterm),
                                                // innerHTML: f_s_html_highlighted(o.s_string1, s_searchterm)
                                                oninput: f_oninput_onchange
                                            }
                                        })()
                                    ]
                            }
                            
                        }),
        
                    ]
                }
            }
        }, 
        {
            s_tag: 'button', 
            innerText: "create",
            onclick: async function(o_js){
                o_data.o_api_response = await f_o_api_response__create(
                    o_data.o_model_instance__new, 
                    o_data.o_model.s_name
                )
                if(o_data.o_api_response.b_success){
                    o_data.a_o_model_instance.push(o_data.o_api_response.a_o_crud_operation_result[0].a_o_instance_from_db[0]);
                    o_data.o_model_instance__new = new o_data.o_model_class();
                    o_data.o_model_instance__new.n_id = o_data.a_o_model_instance.map(o=>o.n_id).sort((n1,n2)=>n2-n1)[0]+1;
                    o_js_a_o_model_instance__new._f_render();
                }
                console.log("f_render call")
                o_js_a_o_model_instance._f_render();
                o_js_o_api_response._f_render();
            }
        },

    ],
}


var s_searchterm = ''
var n_len = 1;
var o = {
    id: "main",
    a_o: [
        {
            class: "a_o_model",
            a_o:[
                ...o_data.a_o_model.map(
                    function(o){
                        return {
                            s_tag: 'button',
                            innerText: o.s_name,
                            s_o_model_s_name: o.s_name, 
                            onclick: function(){
                                var s_o_model_s_name = this.getAttribute("s_o_model_s_name");
                                o_data.o_model = o_data.a_o_model.filter(
                                    function(o){
                                        return o.s_name == s_o_model_s_name
                                    }
                                )[0];
                                // console.log(o_model)
                                o_data.a_o_model_instance = o_data[`a_${s_o_model_s_name.toLowerCase()}`];
                                // console.log(o_data.a_o_model_instance)
                                // console.log(this)
                                o_js_a_o_model_instance._f_render();
                                o_data.o_model_class = o_s_class_name_o_class[s_o_model_s_name]
                                o_data.o_model_instance__new = new o_data.o_model_class();
                                o_data.o_model_instance__new.n_id = o_data.a_o_model_instance.map(o=>o.n_id).sort((n1,n2)=>n2-n1)[0]+1;
                                o_js_a_o_model_instance__new._f_render();
                                console.log("test")
                            }
                        }
                    }
                )
            ]
        },
        o_js_o_api_response,
        o_js_a_o_model_instance__new, 
        {
            s_tag: "label",
            innerText: "s_searchterm"
        },
        {
            s_tag: "input", 
            type: 'text',
            value: s_searchterm,
            oninput: function(o_js){
                s_searchterm = this.value;
                o_js_a_o_model_instance._f_render()
                o_data.o_model_instance__new = new o_s_class_name_o_class[s_o_model_s_name]();
                o_data.o_model_instance__new.n_id = o_data.a_o_model_instance.map(o=>o.n_id).sort((n1,n2)=>n2-n1)[0]+1;
                o_js_a_o_model_instance__new._f_render();
            }
        },
        o_js_a_o_model_instance,
    ]
}

var o_html = f_o_html_from_o_js(o);
o_div_main.appendChild(o_html)



// window.setInterval(function(){
//     f_o_very_complex_object__random__alsopush();
//     o_js_a_o_very_complex_object._f_render()
// },1000)
