import { o_o_class } from "../models/classes/a_o_class.module.js";
var f_s_ts = function(o_date){
    var a_s = [
        [
            `${(o_date.getMonth() + 1)}`.padStart(2, '0'), 
            `${(o_date.getDate())}`.padStart(2, '0'), 
            `${(o_date.getFullYear())}`.padStart(4, '0'), 
        ].join("-"), 
        [
            `${(o_date.getHours() + 1)}`.padStart(2, '0'), 
            `${(o_date.getMinutes())}`.padStart(2, '0'), 
            `${(o_date.getSeconds())}`.padStart(2, '0'), 
        ].join(":"), 
    ]
    return a_s.join(' ');
}
var o_date = new Date();
var n_ts_sec_lt = o_date.getTime();
var s_ts_lt = f_s_ts(o_date);
var a_timestamps = [s_ts_lt,s_ts_lt,n_ts_sec_lt,n_ts_sec_lt]

var o_user__hans = new o_o_class.O_user(
    0,
    'hans',
    ...a_timestamps
);
var o_user__alice = new o_o_class.O_user(
    1,
    'alice',
    ...a_timestamps
);
var o_message__vonalice = new o_o_class.O_message(
    1,
    'hallo hans, wie gehts?', 
    ...a_timestamps
);
var o_message__vonhans = new o_o_class.O_message(
    2,
    'super und dir?', 
    ...a_timestamps
);
var o_chatroom__hansundalice = new o_o_class.O_chatroom(
    1, 
    'hans und alices chatraum', 
    ...a_timestamps
)
var o_user_o_message_o_chatroom = new o_o_class.O_user_o_message_o_chatroom(
    1, 
    o_user__hans.n_id, 
    o_message__vonhans.n_id,
    o_chatroom__hansundalice.n_id,
    ...a_timestamps
)
var o_user_o_message_o_chatroom = new o_o_class.O_user_o_message_o_chatroom(
    2, 
    o_user__alice.n_id, 
    o_message__vonalice.n_id,
    o_chatroom__hansundalice.n_id,
    ...a_timestamps
)

var n_id__auto_increment = 0; // 0 is defined as auto increment
var o_user__alice = new o_o_class.O_user(
    undefined,//n_id__auto_increment,// 0 is defined as auto increment
    'new_user_lol',
    ...a_timestamps
);

var a_o__testdata = [
    o_user__hans,
    o_user__alice,
    o_message__vonalice,
    o_message__vonhans,
    o_chatroom__hansundalice,
    o_user_o_message_o_chatroom,
    o_user_o_message_o_chatroom
];

export {a_o__testdata}