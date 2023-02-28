import {f_o_html_from_o_js} from "https://deno.land/x/f_o_html_from_o_js@0.6/mod.js"
// import {f_o_html_from_o_js} from "./f_o_html_from_o_js.module.js"


import {
    O_api_request,
    O_crud_operation_request,
    o_s_class_name_o_class
} from "./classes/a_o_class.module.js"

import {
    a_o_model
} from "./model_classes/a_o_model.module.js"

window.f_o_api_response = async function(
    o_data,
    a_search_conditions_multidimensional_for_read_or_update_or_delete,
    s_o_model_s_name, 
    s_crud_operation_name
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
                            a_search_conditions_multidimensional_for_read_or_update_or_delete,
                            s_crud_operation_name,
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

// o_data.a_o_model_instance = new Proxy(o_data.a_o_model_instance, {
//     set: function(obj, prop, value){
//         console.log("proxy executed")
//         console.log(obj, prop, value)
//     }
// })

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
div#main {
    display: flex;
    flex-direction: row;
}
.other{
    flex-grow:1
}
.string { color: green; }
.number { color: darkorange; }
.boolean { color: blue; }
.null { color: magenta; }
.key { color: red; }
.hoverable:hover{
    background: rgba(0,0,0,0.2) !important;
}
div#main {
    padding: 1rem;
}
`;
document.head.appendChild(o_style);

var o_div_main = document.createElement("div");
document.body.appendChild(o_div_main)

let f_s_html_highlighted_json = function(s_json){
    s_json = s_json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return s_json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}
var f_s_html_highlighted = function(
    s_string_to_highlight, 
    s_searchterm
){
    
    if(s_string_to_highlight == null){
        return null;
    }

    var s_html = s_string_to_highlight.toString();
    if(s_searchterm.trim() != ""){
        // return s_string_to_highlight
        var s_regex_case_insensitive = new RegExp(`${s_searchterm}`, 'ig');
        s_html = s_html.replaceAll(
            s_regex_case_insensitive, 
            function(s_match, n_idx) {
                // console.log(s_match, n_idx)
                return `<span class='highlight'>${s_match}</span>`
            }
        )
    }
    return `<span>${s_html}</span>`
    


}
window.o_js_a_o_model_instance = {
    f_o_js: function(){
        return {
            class: "a_o_model_instance",
            a_o:[
                ...o_data.a_o_model_instance
                .filter(function(o_model_instance){
                    var b = false;
                    for(var s_prop_name in o_model_instance){
                        var value = o_model_instance[s_prop_name];

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

                    // console.log(o_model_instance)
                    return {
                        class: "o_model_instance hoverable",
                        s_tag: 'article',
                        'data-tooltip': 'Click to edit this object!',
                        onclick: function(){
                            console.log(o_model_instance)
                            for(let s_prop_name in o_data.o_model_instance__new){
                                o_data.o_model_instance__new[s_prop_name] = o_model_instance[s_prop_name]
                            }
                            // Object.assign(o_data.o_model_instance__new, o_model_instance);
                            o_js_a_o_model_instance__new._f_render();
                        },
                        a_o:[
                            ...Object.keys(o_model_instance)
                            .map(function(
                                s_prop_name
                            ){
                                var o_model_property = o_data.o_model.a_o_model_property.filter(o=>o.s_name == s_prop_name);
                                var value = o_model_instance[s_prop_name];
                                console.log(s_searchterm)
                                // this property was added by a 'f_crud_operation_callback__after_f_a_o_crud_in_db' callback 
                                // console.log(o_model_property)
                                // console.log(o_model_property)
                                return {

                                        class: "grid",
                                        a_o:[
                                            {
                                                class: "innerText",
                                                s_tag: "label", 
                                                innerText: s_prop_name
                                            },
                                            {
                                                class: `${(o_model_property) ? 'o_model_property' : ''}`,
                                                // s_tag: 'input', 
                                                // readOnly: true,
                                                innerHTML: f_s_html_highlighted(value, s_searchterm),
                                                // innerHTML: f_s_html_highlighted(o.s_string1, s_searchterm)
                                            },
                                        ]
                                }


                                
                            }),
                            {
                                s_tag: "button", 
                                innerText: 'delete', 
                                onclick: async function(){
                                    this.setAttribute('aria-busy', true);
                                    let s_crud_operation_name = 'delete';
                                    var o_model_instance_existing = o_model_instance;
                                    let a_search_conditions_multidimensional_for_read_or_update_or_delete = [
                                        'n_id',  '=', o_model_instance_existing.n_id,
                                    ];
            
                                    o_data.o_api_response = await f_o_api_response(
                                        o_data.o_model_instance__new,//o_data,
                                        a_search_conditions_multidimensional_for_read_or_update_or_delete,//a_search_conditions_multidimensional_for_read_or_update_or_delete,
                                        o_data.o_model.s_name,//s_o_model_s_name, 
                                        s_crud_operation_name//s_crud_operation_name
                                    )
                                    if(o_data.o_api_response.b_success){
                                        let n_idx = o_data.a_o_model_instance.indexOf(o_model_instance_existing);
                                        if(n_idx != -1){
                                            o_data.a_o_model_instance.splice(n_idx, 1);
                                        }
                                    }
                                    this.setAttribute('aria-busy', false);
                                    o_js_a_o_model_instance._f_render();
                                    o_js_o_api_response._f_render();
                                }
                            }
                        ], 
                    }

                })
            ]
        }
    }
}
var o_js_search_for_a_o_model_instance = {
    f_o_js: function(){
        return {

            // <input type="search" id="search" name="search" placeholder="Search">
            s_tag: 'input',
            id:'search', 
            type:'search',
            name:'search', 
            placeholder:`search ${o_data.a_o_model_instance.length} entries`,
            // class:'s_searchterm',
            value: s_searchterm,
            oninput: function(o_js){
                s_searchterm = this.value;
                o_js_a_o_model_instance._f_render()
                // o_data.o_model_instance__new = new o_data.o_model();
                // o_data.o_model_instance__new.n_id = o_data.a_o_model_instance.map(o=>o.n_id).sort((n1,n2)=>n2-n1)[0]+1;
                // o_js_a_o_model_instance__new._f_render();
            }
        }
    }
}
var o_js_o_api_response = {
    f_o_js: function(){
        console.log("o_js_o_api_response render !")
        return {
            // s_tag: 'input',
            s_tag:'textarea', 
            oninput: function(){

                this.style.height = "";
                this.style.height = this.scrollHeight + "px";

            },
            readOnly: "true",
            'aria-invalid':`${o_data.o_api_response.b_success ? 'false' : 'true'}`,
            // b_render: this.o_api_response,
            innerText: `${o_data.o_api_response.b_success ? 'success:' : 'error:'}: ${o_data.o_api_response?.s_message}`
        }
    }
}


window.o_js_a_o_model_instance__new = {
    a_o:[
        {
            s_tag: "label",
            innerText: "create a new or update an existing instance"
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
                                                                        s_tag: 'pre',
                                                                        innerHTML:
                                                                        f_s_html_highlighted(
                                                                            f_s_html_highlighted_json(
                                                                                JSON.stringify(o_model_instance__foreign, null, 4)
                                                                            ), 
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
                                                                    type:'search',
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
            class: "grid",
            a_o: [
                {
                    s_tag: 'button', 
                    'aria-busy':"false",
                    innerText: "create or update",
                    onclick: async function(o_js){
                        this.setAttribute('aria-busy', true);
                        let s_crud_operation_name = 'create';
                        let a_search_conditions_multidimensional_for_read_or_update_or_delete = [];
                        var o_model_instance_existing = o_data.a_o_model_instance.filter(
                            o=> o.n_id == o_data.o_model_instance__new.n_id
                        )[0];
                        if(o_model_instance_existing){
                            s_crud_operation_name = 'update';
                            a_search_conditions_multidimensional_for_read_or_update_or_delete = [
                                'n_id',  '=', o_data.o_model_instance__new.n_id
                            ];
                        }
                        o_data.o_api_response = await f_o_api_response(
                            o_data.o_model_instance__new,//o_data,
                            a_search_conditions_multidimensional_for_read_or_update_or_delete,//a_search_conditions_multidimensional_for_read_or_update_or_delete,
                            o_data.o_model.s_name,//s_o_model_s_name, 
                            s_crud_operation_name//s_crud_operation_name
                        )
                        if(o_data.o_api_response.b_success){
                            if(s_crud_operation_name == 'create'){
        
                                o_data.a_o_model_instance.push(o_data.o_api_response.a_o_crud_operation_result[0].a_o_instance_from_db[0]);
                                o_data.o_model_instance__new = new o_data.o_model_class();
                                o_data.o_model_instance__new.n_id = o_data.a_o_model_instance.map(o=>o.n_id).sort((n1,n2)=>n2-n1)[0]+1;
                                o_js_a_o_model_instance__new._f_render();
                            }
                            if(s_crud_operation_name == 'update'){
                                Object.assign(o_model_instance_existing, o_data.o_api_response.a_o_crud_operation_result[0].a_o_instance_from_db[0])
                            }
                        }
                        this.setAttribute('aria-busy', false);
                        console.log("f_render call")
                        o_js_a_o_model_instance._f_render();
                        o_js_o_api_response._f_render();
                    }
                },
                {
                    s_tag: 'button', 
                    'aria-busy':"false",
                    innerText: "delete (by n_id)",
                    onclick : async function(){
                        this.setAttribute('aria-busy', true);
                        let s_crud_operation_name = 'delete';
                        var o_model_instance_existing = o_data.a_o_model_instance.filter(
                            o=> o.n_id == o_data.o_model_instance__new.n_id
                        )[0];
                        let a_search_conditions_multidimensional_for_read_or_update_or_delete = [
                            'n_id',  '=', o_data.o_model_instance__new.n_id,
                        ];

                        o_data.o_api_response = await f_o_api_response(
                            o_data.o_model_instance__new,//o_data,
                            a_search_conditions_multidimensional_for_read_or_update_or_delete,//a_search_conditions_multidimensional_for_read_or_update_or_delete,
                            o_data.o_model.s_name,//s_o_model_s_name, 
                            s_crud_operation_name//s_crud_operation_name
                        )
                        if(o_data.o_api_response.b_success){
                            let n_idx = o_data.a_o_model_instance.indexOf(o_model_instance_existing);
                            if(n_idx != -1){
                                o_data.a_o_model_instance.splice(n_idx, 1);
                            }
                        }
                        this.setAttribute('aria-busy', false);
                        o_js_a_o_model_instance._f_render();
                        o_js_o_api_response._f_render();
                    }
                }
            ]
        }

    ],
}


var s_searchterm = ''
var n_len = 1;
var o = {
    id: "main",
    a_o: [
        // {
        //     s_tag: "link", 
        //     rel:"stylesheet",
        //     href:"https://unpkg.com/@picocss/pico@1.5.7/css/pico.min.css",
        // },
        
        {
            class: "a_o_model",
            a_o:[
                {
                    s_tag: 'h2',
                    innerText: 'Model:'
                },
                ...o_data.a_o_model.map(
                    function(o){
                        return {
                        //     <label for="small">
                        //     <input type="radio" id="small" name="size" value="small" checked>
                        //     Small
                        //   </label>
                            
                            s_tag: 'label',
                            for: `o_model.${o.s_name}`,
                            a_o: [
                                {
                                    s_tag: "input", 
                                    type:'radio', 
                                    name: 'o_model',
                                    id: `o_model.${o.s_name}`, 
                                    value:  o.s_name, 
                                    onclick: function(){
                                        o_data.o_model = o_data.a_o_model.filter(
                                            function(obj){
                                                return obj.s_name == o.s_name
                                            }
                                        )[0];
                                        // console.log(o_model)
                                        o_data.a_o_model_instance = o_data[`a_${o.s_name.toLowerCase()}`];
                                        o_js_search_for_a_o_model_instance._f_render();
                                        // console.log(o_data.a_o_model_instance)
                                        // console.log(this)
                                        o_js_a_o_model_instance._f_render();
                                        o_data.o_model_class = o_s_class_name_o_class[o.s_name]
                                        o_data.o_model_instance__new = new o_data.o_model_class();
                                        o_data.o_model_instance__new.n_id = o_data.a_o_model_instance.map(o=>o.n_id).sort((n1,n2)=>n2-n1)[0]+1;
                                        o_js_a_o_model_instance__new._f_render();
                                        console.log("test")
                                    }
                                }, 
                                {
                                    s_tag: 'span',
                                    innerText:  o.s_name, 
                                }
                            ]
                        }
                    }
                )
            ]
        },
        {
            class: "other", 
            a_o:[
                o_js_o_api_response,
                o_js_a_o_model_instance__new, 
                // {
                //     s_tag: "label",
                //     innerText: "s_searchterm"
                // },

                o_js_search_for_a_o_model_instance,
                o_js_a_o_model_instance,
            ]
        }
    ]
}

var o_html = f_o_html_from_o_js(o);
o_div_main.appendChild(o_html)



// window.setInterval(function(){
//     f_o_very_complex_object__random__alsopush();
//     o_js_a_o_very_complex_object._f_render()
// },1000)
